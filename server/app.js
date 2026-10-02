const crypto = require('crypto');
const path = require('path');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { rateLimit } = require('express-rate-limit');
const { readPublicActions } = require('./lib/publicActions');
const { validateContact, validateBooking, BOOKING_STATUSES } = require('./lib/validation');

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const fail = (res, status, code, message, fields) =>
  res.status(status).json({ error: { code, message, ...(fields ? { fields } : {}) } });

function sameOrigin(req, res, next) {
  const origin = req.get('origin');
  if (origin && origin !== req.app.locals.publicOrigin) {
    return fail(res, 403, 'ORIGIN_REJECTED', 'Origin not allowed');
  }
  next();
}

function requireAdmin(req, res, next) {
  res.set('Cache-Control', 'no-store');
  if (!req.session || !req.session.userId) return fail(res, 401, 'UNAUTHORIZED', 'Log in required');
  if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    const expected = req.session.csrf;
    const actual = req.get('x-csrf-token');
    if (!expected || !actual || expected.length !== actual.length ||
        !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(actual))) {
      return fail(res, 403, 'CSRF_REJECTED', 'Request token missing or invalid');
    }
  }
  next();
}

function limiter(limit) {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_req, res) => fail(res, 429, 'RATE_LIMITED', 'Please wait before trying again'),
  });
}

function createApp({ pool, mailer, sessionStore, env = process.env, actions = readPublicActions }) {
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters');
  }
  if (env.NODE_ENV === 'production' && !env.PUBLIC_ORIGIN) {
    throw new Error('PUBLIC_ORIGIN is required in production');
  }
  const app = express();
  app.disable('x-powered-by');
  app.locals.publicOrigin = env.PUBLIC_ORIGIN || 'http://localhost:5173';
  if (env.TRUST_PROXY_HOPS) {
    const hops = Number(env.TRUST_PROXY_HOPS);
    if (!Number.isInteger(hops) || hops < 1) throw new Error('Invalid TRUST_PROXY_HOPS');
    app.set('trust proxy', hops);
  }
  app.use(express.json({ limit: '16kb' }));
  const cookiePath = env.SESSION_COOKIE_PATH || (env.NODE_ENV === 'production' ? '/brynasbilservice' : '/');
  app.use(session({
    name: 'bb_session',
    secret: env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: cookiePath,
      maxAge: 8 * 60 * 60 * 1000,
    },
  }));

  app.get('/api/health', wrap(async (_req, res) => {
    await pool.query('SELECT 1');
    res.set('Cache-Control', 'no-store').json({ status: 'ready' });
  }));
  app.get('/api/public/actions', (_req, res) => {
    try {
      res.set('Cache-Control', 'no-store').json(actions());
    } catch (cause) {
      console.error('[actions] unavailable:', cause.message);
      fail(res, 503, 'ACTIONS_UNAVAILABLE', 'Action configuration unavailable');
    }
  });
  app.get('/api/services', wrap(async (_req, res) => {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY name');
    res.json(rows);
  }));
  app.get('/api/available-dates', wrap(async (_req, res) => {
    const [rows] = await pool.query('SELECT DISTINCT date FROM bookings WHERE available = 1');
    res.json(rows.map((row) => row.date));
  }));

  app.post('/api/contact', sameOrigin, limiter(5), wrap(async (req, res) => {
    const parsed = validateContact(req.body);
    if (parsed.fields) return fail(res, 422, 'VALIDATION_FAILED', 'Check the form fields', parsed.fields);
    if (!mailer) return fail(res, 503, 'MAIL_UNAVAILABLE', 'Message delivery is not configured');
    try {
      await mailer.sendContact(parsed.value);
    } catch (cause) {
      console.error('[contact] SMTP delivery failed:', cause.code || cause.name);
      return fail(res, 503, 'MAIL_UNAVAILABLE', 'Message delivery is temporarily unavailable');
    }
    res.status(202).json({ status: 'accepted' });
  }));

  app.post('/api/bookings', sameOrigin, limiter(10), wrap(async (req, res) => {
    const parsed = validateBooking(req.body);
    if (parsed.fields) return fail(res, 422, 'VALIDATION_FAILED', 'Check the form fields', parsed.fields);
    const value = parsed.value;
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const [services] = await connection.execute('SELECT id FROM services WHERE id = ? LIMIT 1', [value.serviceId]);
      if (!services.length) {
        await connection.rollback();
        return fail(res, 422, 'VALIDATION_FAILED', 'Check the form fields', { serviceId: 'Choose a listed service' });
      }
      const [customers] = await connection.execute('SELECT id FROM customers WHERE email = ? LIMIT 1', [value.customerEmail]);
      let customerId = customers[0]?.id;
      if (!customerId) {
        const [insertCustomer] = await connection.execute(
          'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)',
          [value.customerName, value.customerEmail, value.customerPhone],
        );
        customerId = insertCustomer.insertId;
      }
      const [booking] = await connection.execute(
        'INSERT INTO bookings (customer_id, customer_name, service, date, time, comment_customer) VALUES (?, ?, ?, ?, ?, ?)',
        [customerId, value.customerName, value.serviceId, value.date, value.time, value.comment_customer],
      );
      await connection.commit();
      res.status(201).json({ status: 'pending', bookingId: booking.insertId });
    } catch (cause) {
      await connection.rollback();
      throw cause;
    } finally {
      connection.release();
    }
  }));

  app.post('/api/admin/login', sameOrigin, limiter(5), wrap(async (req, res) => {
    const username = typeof req.body?.username === 'string' ? req.body.username.trim() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!username || username.length > 60 || !password || password.length > 200) {
      return fail(res, 401, 'INVALID_CREDENTIALS', 'Invalid username or password');
    }
    const [rows] = await pool.execute(
      'SELECT id, username, display_name, password_hash FROM admin_users WHERE username = ? LIMIT 1', [username],
    );
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return fail(res, 401, 'INVALID_CREDENTIALS', 'Invalid username or password');
    }
    await pool.execute('UPDATE admin_users SET last_login_at = UTC_TIMESTAMP() WHERE id = ?', [user.id]);
    await new Promise((resolve, reject) => req.session.regenerate((cause) => cause ? reject(cause) : resolve()));
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.displayName = user.display_name;
    req.session.csrf = crypto.randomBytes(32).toString('hex');
    await new Promise((resolve, reject) => req.session.save((cause) => cause ? reject(cause) : resolve()));
    res.set('Cache-Control', 'no-store').json({
      username: user.username, displayName: user.display_name, csrfToken: req.session.csrf,
    });
  }));
  app.get('/api/admin/me', requireAdmin, (req, res) => res.json({
    username: req.session.username, displayName: req.session.displayName, csrfToken: req.session.csrf,
  }));
  app.post('/api/admin/logout', sameOrigin, requireAdmin, wrap(async (req, res) => {
    await new Promise((resolve, reject) => req.session.destroy((cause) => cause ? reject(cause) : resolve()));
    res.clearCookie('bb_session', { path: cookiePath }).status(204).end();
  }));
  app.use('/api/admin', sameOrigin, requireAdmin);

  app.get('/api/admin/bookings', wrap(async (_req, res) => {
    const [rows] = await pool.query(
      'SELECT b.id, c.name AS customer_name, c.email AS customer_email, c.phone AS customer_phone, ' +
      's.name AS service_name, s.price_hourly AS service_price, s.price_starting AS service_price_starting, ' +
      'b.date, b.time, b.status, b.created_at, b.comment_customer, b.comment_admin ' +
      'FROM bookings b JOIN customers c ON b.customer_id = c.id ' +
      "JOIN services s ON b.service = s.id WHERE b.status != 'erased' ORDER BY b.created_at DESC",
    );
    res.json(rows);
  }));
  app.put('/api/admin/bookings/:id', wrap(async (req, res) => {
    const id = Number(req.params.id);
    const status = req.body?.status;
    if (!Number.isSafeInteger(id) || id < 1 || !BOOKING_STATUSES.has(status)) {
      return fail(res, 422, 'VALIDATION_FAILED', 'Invalid booking update');
    }
    const [result] = await pool.execute('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
    if (!result.affectedRows) return fail(res, 404, 'NOT_FOUND', 'Booking not found');
    res.json({ status });
  }));
  app.delete('/api/admin/bookings/:id', wrap(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) return fail(res, 422, 'VALIDATION_FAILED', 'Invalid booking ID');
    const [result] = await pool.execute("UPDATE bookings SET status = 'erased' WHERE id = ?", [id]);
    if (!result.affectedRows) return fail(res, 404, 'NOT_FOUND', 'Booking not found');
    res.status(204).end();
  }));
  app.get('/api/admin/services', wrap(async (_req, res) => {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY created_at DESC');
    res.json(rows);
  }));
  function serviceValues(body) {
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const description = typeof body?.description === 'string' ? body.description.trim() : '';
    const hourly = Number(body?.price_hourly);
    const starting = body?.price_starting == null || body.price_starting === '' ? null : Number(body.price_starting);
    if (!name || name.length > 120 || description.length > 2000 ||
        !Number.isFinite(hourly) || hourly < 0 ||
        (starting !== null && (!Number.isFinite(starting) || starting < 0))) return null;
    return [name, description, starting, hourly];
  }
  app.post('/api/admin/services', wrap(async (req, res) => {
    const values = serviceValues(req.body);
    if (!values) return fail(res, 422, 'VALIDATION_FAILED', 'Invalid service');
    const [result] = await pool.execute(
      'INSERT INTO services (name, description, price_starting, price_hourly) VALUES (?, ?, ?, ?)', values,
    );
    res.status(201).json({ id: result.insertId });
  }));
  app.put('/api/admin/services/:id', wrap(async (req, res) => {
    const id = Number(req.params.id);
    const values = serviceValues(req.body);
    if (!Number.isSafeInteger(id) || id < 1 || !values) return fail(res, 422, 'VALIDATION_FAILED', 'Invalid service');
    const [result] = await pool.execute(
      'UPDATE services SET name = ?, description = ?, price_starting = ?, price_hourly = ? WHERE id = ?',
      [...values, id],
    );
    if (!result.affectedRows) return fail(res, 404, 'NOT_FOUND', 'Service not found');
    res.json({ id });
  }));
  app.delete('/api/admin/services/:id', wrap(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) return fail(res, 422, 'VALIDATION_FAILED', 'Invalid service ID');
    const [result] = await pool.execute('DELETE FROM services WHERE id = ?', [id]);
    if (!result.affectedRows) return fail(res, 404, 'NOT_FOUND', 'Service not found');
    res.status(204).end();
  }));
  app.get('/api/admin/customers', wrap(async (_req, res) => {
    const [rows] = await pool.query('SELECT id, name, email, phone, created_at FROM customers ORDER BY created_at DESC');
    res.json(rows);
  }));

  app.use('/api', (_req, res) => fail(res, 404, 'NOT_FOUND', 'API route not found'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
  app.use((cause, _req, res, _next) => {
    if (cause.type === 'entity.too.large') return fail(res, 413, 'PAYLOAD_TOO_LARGE', 'Request too large');
    if (cause instanceof SyntaxError && 'body' in cause) return fail(res, 400, 'INVALID_JSON', 'Invalid JSON');
    console.error('[api] request failed:', cause.code || cause.name);
    if (!res.headersSent) fail(res, 500, 'SERVER_ERROR', 'Request could not be completed');
  });
  return app;
}

module.exports = { createApp };
