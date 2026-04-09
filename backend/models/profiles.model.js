// backend/models/profiles.model.js
const mysql = require('mysql2/promise');
let pool;

try {
  ({ pool } = require('../db'));
} catch (e) {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'your_db_name',
    waitForConnections: true,
    connectionLimit: 10,
  });
}

// Get all profiles
async function listProfiles() {
  const [rows] = await pool.execute(
    'SELECT id, name, position, description, image_url, sort_order, created_at, updated_at FROM profiles ORDER BY sort_order ASC, id ASC'
  );
  return rows;
}

// Get profile by ID
async function getProfileById(id) {
  const [rows] = await pool.execute(
    'SELECT id, name, position, description, image_url, sort_order, created_at, updated_at FROM profiles WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

// Create profile
async function createProfile({ name, position, description, image_url, sort_order }) {
  const [result] = await pool.execute(
    'INSERT INTO profiles (name, position, description, image_url, sort_order) VALUES (?, ?, ?, ?, ?)',
    [name, position || null, description || null, image_url || null, sort_order || 999]
  );
  return result.insertId;
}

// Update profile
async function updateProfile(id, { name, position, description, image_url, sort_order }) {
  const updates = [];
  const values = [];
  
  if (name !== undefined) { updates.push('name = ?'); values.push(name); }
  if (position !== undefined) { updates.push('position = ?'); values.push(position); }
  if (description !== undefined) { updates.push('description = ?'); values.push(description); }
  if (image_url !== undefined) { updates.push('image_url = ?'); values.push(image_url); }
  if (sort_order !== undefined) { updates.push('sort_order = ?'); values.push(sort_order); }
  
  if (updates.length === 0) return true;
  
  values.push(id);
  await pool.execute(
    `UPDATE profiles SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  return true;
}

// Delete profile
async function deleteProfile(id) {
  const [result] = await pool.execute(
    'DELETE FROM profiles WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = {
  listProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
};
