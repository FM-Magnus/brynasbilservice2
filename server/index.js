require('dotenv').config();

const mysql = require('mysql2/promise');
const { createApp } = require('./app');
const { makeMailer } = require('./lib/mail');
const { MySqlSessionStore } = require('./lib/mysqlSessionStore');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  timezone: 'Z',
});
const app = createApp({
  pool,
  mailer: makeMailer(),
  sessionStore: new MySqlSessionStore(pool),
  env: process.env,
});
const port = Number(process.env.PORT || 3000);

app.listen(port, () => console.log(`Brynäs API listening on port ${port}`));
