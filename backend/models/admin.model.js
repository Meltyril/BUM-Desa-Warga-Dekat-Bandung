// backend/models/admin.model.js
const { pool } = require('../db'); // sama seperti di server.js

// cari admin berdasarkan email (untuk login & lupa password nanti)
async function findAdminByEmail(email) {
  const [rows] = await pool.execute(
    'SELECT * FROM admins WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] || null;
}

// untuk fitur lupa password nanti (Day berikutnya)
async function updateResetToken(adminId, token, expiresAt) {
  await pool.execute(
    'UPDATE admins SET reset_token = ?, reset_expires = ? WHERE id = ?',
    [token, expiresAt, adminId]
  );
}

async function updatePassword(adminId, passwordHash) {
  await pool.execute(
    'UPDATE admins SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?',
    [passwordHash, adminId]
  );
}

module.exports = {
  findAdminByEmail,
  updateResetToken,
  updatePassword,
};
