require('dotenv').config();
const readline = require('readline');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

function ask(label, secret = false) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (secret) {
      rl._writeToOutput = function (value) {
        if (value.includes(label)) this.output.write(value);
        else if (value.includes('\n')) this.output.write('\n');
        else this.output.write('*');
      };
    }
    rl.question(label, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  const username = await ask('Username: ');
  const displayName = await ask('Display name: ');
  const password = await ask('Password: ', true);
  if (!username || username.length > 60 || !displayName || displayName.length > 100 || password.length < 12) {
    throw new Error('Username/display name required; password must be at least 12 characters');
  }
  const hash = await bcrypt.hash(password, 12);
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  try {
    await pool.execute(
      'INSERT INTO admin_users (username, display_name, password_hash) VALUES (?, ?, ?)',
      [username, displayName, hash],
    );
    process.stdout.write('Admin account created.\n');
  } finally {
    await pool.end();
  }
}

main().catch((cause) => {
  process.stderr.write('Admin setup failed: ' + (cause.code || cause.message) + '\n');
  process.exitCode = 1;
});
