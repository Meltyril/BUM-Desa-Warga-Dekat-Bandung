// backend/models/admin.model.js
const { pool } = require('../db'); // sama seperti di server.js

// cari admin berdasarkan email (untuk login & lupa password nanti)
async function findAdminByEmail(email) {
  const [rows] = await pool.execute(
    'SELECT id, email, username, role, password, reset_token, reset_expires FROM admins WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] || null;
}

// cari admin berdasarkan ID
async function findAdminById(id) {
  const [rows] = await pool.execute(
    'SELECT id, email, username, role FROM admins WHERE id = ? LIMIT 1',
    [id]
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

// List all admins (for user management)
async function listAllAdmins() {
  const [rows] = await pool.execute(
    'SELECT id, email, username, role, created_at FROM admins ORDER BY id DESC'
  );
  return rows;
}

// Create new admin user
async function createAdminUser({ email, username, passwordHash, role }) {
  const [result] = await pool.execute(
    'INSERT INTO admins (email, username, password, role) VALUES (?, ?, ?, ?)',
    [email, username, passwordHash, role || 'admin']
  );
  return result.insertId;
}

// Update admin user
async function updateAdminUser(adminId, { email, username, role }) {
  await pool.execute(
    'UPDATE admins SET email = ?, username = ?, role = ? WHERE id = ?',
    [email, username, role, adminId]
  );
  return true;
}

// Delete admin user
async function deleteAdminUser(adminId) {
  const [result] = await pool.execute(
    'DELETE FROM admins WHERE id = ?',
    [adminId]
  );
  return result.affectedRows > 0;
}

module.exports = {
  findAdminByEmail,
  findAdminById,
  updateResetToken,
  updatePassword,
  listAllAdmins,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
};
