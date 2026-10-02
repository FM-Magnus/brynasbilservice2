const session = require('express-session');

class MySqlSessionStore extends session.Store {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  get(sid, callback) {
    this.pool.execute(
      'SELECT data FROM admin_sessions WHERE sid = ? AND expires_at > UTC_TIMESTAMP()',
      [sid],
    ).then(([rows]) => callback(null, rows.length ? JSON.parse(rows[0].data) : null))
      .catch(callback);
  }

  set(sid, value, callback) {
    const expires = value.cookie && value.cookie.expires
      ? new Date(value.cookie.expires)
      : new Date(Date.now() + 8 * 60 * 60 * 1000);
    this.pool.execute(
      'INSERT INTO admin_sessions (sid, data, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data), expires_at = VALUES(expires_at)',
      [sid, JSON.stringify(value), expires],
    ).then(() => callback && callback()).catch((error) => callback && callback(error));
  }

  destroy(sid, callback) {
    this.pool.execute('DELETE FROM admin_sessions WHERE sid = ?', [sid])
      .then(() => callback && callback()).catch((error) => callback && callback(error));
  }

  touch(sid, value, callback) {
    const expires = value.cookie && value.cookie.expires
      ? new Date(value.cookie.expires)
      : new Date(Date.now() + 8 * 60 * 60 * 1000);
    this.pool.execute('UPDATE admin_sessions SET expires_at = ? WHERE sid = ?', [expires, sid])
      .then(() => callback && callback()).catch((error) => callback && callback(error));
  }
}

module.exports = { MySqlSessionStore };
