// db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const DATABASE_URL = process.env.MYSQL_PUBLIC_URL;

if (!DATABASE_URL) {
  console.error('[db] ❌ MYSQL_PUBLIC_URL not found');
  process.exit(1);
}

const pool = mysql.createPool({
  uri: DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
});

// test koneksi
(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.query('SELECT 1');
    conn.release();
    console.log('[db] ✅ Connected to MySQL');
  } catch (err) {
    console.error('[db] ❌ Failed connect to MySQL:', err.message);
  }
})();

module.exports = { pool };
