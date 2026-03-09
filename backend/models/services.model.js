// backend/models/services.model.js
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

// Get all services
async function listServices() {
  const [rows] = await pool.execute(
    'SELECT id, title, description, image_url, sort_order, created_at, updated_at FROM services ORDER BY sort_order ASC, id ASC'
  );
  return rows;
}

// Get service by ID
async function getServiceById(id) {
  const [rows] = await pool.execute(
    'SELECT id, title, description, image_url, sort_order, created_at, updated_at FROM services WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

// Create service
async function createService({ title, description, image_url, sort_order }) {
  const [result] = await pool.execute(
    'INSERT INTO services (title, description, image_url, sort_order) VALUES (?, ?, ?, ?)',
    [title, description || null, image_url || null, sort_order || 999]
  );
  return result.insertId;
}

// Update service
async function updateService(id, { title, description, image_url, sort_order }) {
  const updates = [];
  const values = [];
  
  if (title !== undefined) { updates.push('title = ?'); values.push(title); }
  if (description !== undefined) { updates.push('description = ?'); values.push(description); }
  if (image_url !== undefined) { updates.push('image_url = ?'); values.push(image_url); }
  if (sort_order !== undefined) { updates.push('sort_order = ?'); values.push(sort_order); }
  
  if (updates.length === 0) return true;
  
  values.push(id);
  await pool.execute(
    `UPDATE services SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  return true;
}

// Delete service
async function deleteService(id) {
  const [result] = await pool.execute(
    'DELETE FROM services WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = {
  listServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
