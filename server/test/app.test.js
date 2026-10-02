const assert = require('node:assert/strict');
const test = require('node:test');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const request = require('supertest');
const { createApp } = require('../app');

const env = { SESSION_SECRET: 'a-local-test-secret-of-at-least-32-characters', PUBLIC_ORIGIN: 'http://localhost:5173' };
const contact = {
  name: 'Anna Andersson',
  email: 'anna@example.se',
  phone: '0701234567',
  subject: 'AC-service',
  message: 'AC:n blåser varmt.',
};

function setup({ mailer = { sendContact: async () => 'captured-id' }, pool } = {}) {
  const database = pool || {
    query: async () => [[]],
    execute: async () => [[]],
    getConnection: async () => { throw new Error('No database fixture'); },
  };
  return createApp({ pool: database, mailer, sessionStore: new session.MemoryStore(), env });
}

test('contact succeeds only after the mail transport accepts the message', async () => {
  const captured = [];
  const app = setup({ mailer: { sendContact: async (message) => { captured.push(message); } } });
  const response = await request(app).post('/api/contact').set('Origin', env.PUBLIC_ORIGIN).send(contact);
  assert.equal(response.status, 202);
  assert.deepEqual(response.body, { status: 'accepted' });
  assert.deepEqual(captured, [contact]);
});

test('contact failures and invalid input are never reported as sent', async () => {
  const app = setup({ mailer: { sendContact: async () => { throw new Error('SMTP outage'); } } });
  assert.equal((await request(app).post('/api/contact').send(contact)).status, 503);
  const invalid = await request(app).post('/api/contact').send({ ...contact, email: 'bad\r\nBcc:evil@example.se' });
  assert.equal(invalid.status, 422);
  assert.ok(invalid.body.error.fields.email);
  assert.equal((await request(app).post('/api/contact').set('Origin', 'https://other.example').send(contact)).status, 403);
});

test('public action mapping is read through one validated endpoint', async () => {
  const app = createApp({
    pool: { query: async () => [[]] },
    mailer: null,
    sessionStore: new session.MemoryStore(),
    env,
    actions: () => ({ version: 1, actions: { book: 'call', contact: 'contact', call: 'call', email: 'email', directions: 'directions' } }),
  });
  const response = await request(app).get('/api/public/actions');
  assert.equal(response.status, 200);
  assert.equal(response.body.actions.book, 'call');
});

test('booking keeps the local day and customer comment in the INSERT', async () => {
  const statements = [];
  const connection = {
    beginTransaction: async () => {},
    rollback: async () => {},
    commit: async () => {},
    release: () => {},
    execute: async (sql, values) => {
      statements.push({ sql, values });
      if (sql.startsWith('SELECT id FROM services')) return [[{ id: 3 }]];
      if (sql.startsWith('SELECT id FROM customers')) return [[]];
      if (sql.startsWith('INSERT INTO customers')) return [{ insertId: 7 }];
      if (sql.startsWith('INSERT INTO bookings')) return [{ insertId: 42 }];
      throw new Error('Unexpected SQL');
    },
  };
  const app = setup({ pool: { getConnection: async () => connection } });
  const response = await request(app).post('/api/bookings').send({
    customerName: 'Anna Andersson', customerEmail: 'anna@example.se',
    customerPhone: '0701234567', serviceId: 3, date: '2026-10-02',
    time: '09:30', comment_customer: 'Gäller Peugeot',
  });
  assert.equal(response.status, 201);
  assert.deepEqual(response.body, { status: 'pending', bookingId: 42 });
  assert.deepEqual(statements.at(-1).values, [7, 'Anna Andersson', 3, '2026-10-02', '09:30', 'Gäller Peugeot']);
});

test('invalid booking and the old bearer token cannot bypass protection', async () => {
  const app = setup();
  const bad = await request(app).post('/api/bookings').send({
    customerName: 'A', customerEmail: 'a@example.se', customerPhone: '0701234567',
    serviceId: 3, date: '2026-02-30', time: '09:30',
  });
  assert.equal(bad.status, 422);
  assert.ok(bad.body.error.fields.date);
  const admin = await request(app).get('/api/admin/bookings').set('Authorization', 'Bearer admin-secret-token');
  assert.equal(admin.status, 401);
});

test('admin login requires a session and CSRF token for writes', async () => {
  const user = {
    id: 1, username: 'owner', display_name: 'Owner',
    password_hash: await bcrypt.hash('a-strong-test-password', 4),
  };
  const pool = {
    query: async () => [[]],
    execute: async (sql) => {
      if (sql.startsWith('SELECT id, username')) return [[user]];
      if (sql.startsWith('UPDATE admin_users')) return [{}];
      if (sql.startsWith('UPDATE bookings')) return [{ affectedRows: 1 }];
      throw new Error('Unexpected SQL');
    },
  };
  const agent = request.agent(setup({ pool }));
  const login = await agent.post('/api/admin/login').set('Origin', env.PUBLIC_ORIGIN)
    .send({ username: 'owner', password: 'a-strong-test-password' });
  assert.equal(login.status, 200);
  assert.ok(login.headers['set-cookie'].some((cookie) => cookie.includes('HttpOnly')));
  assert.ok(login.body.csrfToken);
  assert.equal((await agent.get('/api/admin/me')).status, 200);
  assert.equal((await agent.put('/api/admin/bookings/1').send({ status: 'confirmed' })).status, 403);
  assert.equal((await agent.put('/api/admin/bookings/1')
    .set('X-CSRF-Token', login.body.csrfToken).send({ status: 'confirmed' })).status, 200);
  assert.equal((await agent.post('/api/admin/logout')
    .set('X-CSRF-Token', login.body.csrfToken)).status, 204);
  assert.equal((await agent.get('/api/admin/me')).status, 401);
});
