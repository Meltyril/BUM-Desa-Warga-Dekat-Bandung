// db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const host = process.env.MYSQLHOST;
const user = process.env.MYSQLUSER;
const password = process.env.MYSQLPASSWORD;
const database = process.env.MYSQLDATABASE;
const port = process.env.MYSQLPORT || 3306;

if (!host || !user || !database) {
  console.error('[db] ❌ Missing database environment variables');
  console.error({
    MYSQLHOST: host,
    MYSQLUSER: user,
    MYSQLDATABASE: database,
    MYSQLPORT: port
  });
  process.exit(1);
}

const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test koneksi
(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.query('SELECT 1');
    conn.release();
    console.log(`[db] ✅ Connected to MySQL ${host}:${port}`);
  } catch (err) {
    console.error('[db] ❌ Failed connect to MySQL:', err.message);
  }
})();

module.exports = { pool };
