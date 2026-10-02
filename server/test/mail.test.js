const assert = require('node:assert/strict');
const test = require('node:test');
const net = require('node:net');
const request = require('supertest');
const session = require('express-session');
const { createApp } = require('../app');
const { makeMailer } = require('../lib/mail');

async function captureSmtp({ rejectRecipient = false } = {}) {
  const messages = [];
  const server = net.createServer((socket) => {
    socket.write('220 local test SMTP\r\n');
    let buffer = '';
    let data = false;
    let message = '';
    socket.on('data', (chunk) => {
      buffer += chunk.toString();
      while (buffer.includes('\r\n')) {
        const offset = buffer.indexOf('\r\n');
        const line = buffer.slice(0, offset);
        buffer = buffer.slice(offset + 2);
        if (data) {
          if (line === '.') {
            messages.push(message);
            message = '';
            data = false;
            socket.write('250 queued locally\r\n');
          } else message += `${line}\n`;
        } else if (/^EHLO /i.test(line)) socket.write('250-localhost\r\n250-AUTH PLAIN\r\n250 OK\r\n');
        else if (/^AUTH PLAIN /i.test(line)) socket.write('235 authenticated\r\n');
        else if (/^MAIL FROM:/i.test(line)) socket.write('250 sender accepted\r\n');
        else if (/^RCPT TO:/i.test(line)) socket.write(rejectRecipient ? '550 recipient rejected\r\n' : '250 recipient accepted\r\n');
        else if (line === 'DATA') { data = true; socket.write('354 end with dot\r\n'); }
        else if (line === 'QUIT') socket.end('221 bye\r\n');
        else socket.write('250 OK\r\n');
      }
    });
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { port: server.address().port, messages, close: () => new Promise((resolve) => server.close(resolve)) };
}

for (const rejectRecipient of [false, true]) {
  test(`real local SMTP ${rejectRecipient ? 'rejection stays an error' : 'acceptance returns 202'}`, async () => {
    const smtp = await captureSmtp({ rejectRecipient });
    try {
      const env = {
        SESSION_SECRET: 'test-secret-at-least-32-characters-long',
        PUBLIC_ORIGIN: 'http://localhost:5173',
        SMTP_HOST: '127.0.0.1', SMTP_PORT: String(smtp.port),
        SMTP_USER: 'preview', SMTP_PASS: 'local-only',
        SMTP_FROM: 'preview@example.test', CONTACT_TO: 'owner@example.test',
      };
      const app = createApp({
        pool: { query: async () => [[]] },
        sessionStore: new session.MemoryStore(),
        mailer: makeMailer(env), env,
      });
      const response = await request(app).post('/api/contact').send({
        name: 'Anna', email: 'anna@example.test', phone: '', subject: 'Övrigt', message: 'Testmeddelande',
      });
      assert.equal(response.status, rejectRecipient ? 503 : 202);
      assert.equal(smtp.messages.length, rejectRecipient ? 0 : 1);
      if (!rejectRecipient) {
        assert.match(smtp.messages[0], /To: owner@example\.test/);
        assert.match(smtp.messages[0], /Reply-To: anna@example\.test/);
        assert.match(smtp.messages[0], /Testmeddelande/);
      }
    } finally {
      await smtp.close();
    }
  });
}
