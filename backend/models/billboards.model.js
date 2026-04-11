// backend/models/billboards.model.js
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

// Get all billboards
async function listBillboards() {
  const [rows] = await pool.execute(
    'SELECT id, title, image_url, link, sort_order, is_active, created_at, updated_at FROM billboards WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
  );
  return rows;
}

// Get all billboards (admin view - including inactive)
async function listBillboardsAdmin() {
  const [rows] = await pool.execute(
    'SELECT id, title, image_url, link, sort_order, is_active, created_at, updated_at FROM billboards ORDER BY sort_order ASC, id ASC'
  );
  return rows;
}

// Get billboard by ID
async function getBillboardById(id) {
  const [rows] = await pool.execute(
    'SELECT id, title, image_url, link, sort_order, is_active, created_at, updated_at FROM billboards WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

// Create billboard
async function createBillboard({ title, image_url, link, sort_order, is_active }) {
  const [result] = await pool.execute(
    'INSERT INTO billboards (title, image_url, link, sort_order, is_active) VALUES (?, ?, ?, ?, ?)',
    [title, image_url || null, link || null, sort_order || 999, is_active ? 1 : 0]
  );
  return result.insertId;
}

// Update billboard
async function updateBillboard(id, { title, image_url, link, sort_order, is_active }) {
  const updates = [];
  const values = [];
  
  if (title !== undefined) { updates.push('title = ?'); values.push(title); }
  if (image_url !== undefined) { updates.push('image_url = ?'); values.push(image_url); }
  if (link !== undefined) { updates.push('link = ?'); values.push(link); }
  if (sort_order !== undefined) { updates.push('sort_order = ?'); values.push(sort_order); }
  if (is_active !== undefined) { updates.push('is_active = ?'); values.push(is_active ? 1 : 0); }
  
  if (updates.length === 0) return true;
  
  updates.push('updated_at = NOW()');
  values.push(id);
  
  const [result] = await pool.execute(
    `UPDATE billboards SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  return result.affectedRows > 0;
}

// Delete billboard
async function deleteBillboard(id) {
  const [result] = await pool.execute(
    'DELETE FROM billboards WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = {
  listBillboards,
  listBillboardsAdmin,
  getBillboardById,
  createBillboard,
  updateBillboard,
  deleteBillboard,
};
