// db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const host = process.env.DB_HOST || process.env.MYSQL_HOST || 'localhost';
const user = process.env.DB_USER || process.env.MYSQL_USER || 'root';
const password = (process.env.DB_PASS ?? process.env.MYSQL_PASSWORD ?? '');
const database = process.env.DB_NAME || process.env.MYSQL_DATABASE || 'shopdb';
const port = Number(process.env.DB_PORT || process.env.MYSQL_PORT || 3306);

const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  port,
  waitForConnections: true,
  connectionLimit: 10,
});

// Tes koneksi ringan saat start (opsional tapi membantu debug)
(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.query('SELECT 1');
    conn.release();
    console.log(`[db] Connected to MySQL ${host}:${port}, db=${database}`);
  } catch (err) {
    console.error('[db] Failed connect to MySQL:', err.message);
  }
})();

module.exports = { pool };
