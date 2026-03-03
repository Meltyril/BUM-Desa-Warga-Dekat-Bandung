// backend/models/categories.model.js
const { pool } = require('../db');

// Get all categories
async function listCategories() {
  const [rows] = await pool.execute(
    'SELECT id, name, description FROM categories ORDER BY name ASC'
  );
  return rows;
}

// Get category by ID
async function getCategoryById(id) {
  const [rows] = await pool.execute(
    'SELECT id, name, description FROM categories WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

// Create category
async function createCategory({ name, description }) {
  const [result] = await pool.execute(
    'INSERT INTO categories (name, description) VALUES (?, ?)',
    [name, description || null]
  );
  return result.insertId;
}

// Update category
async function updateCategory(id, { name, description }) {
  await pool.execute(
    'UPDATE categories SET name = ?, description = ? WHERE id = ?',
    [name, description || null, id]
  );
  return true;
}

// Delete category
async function deleteCategory(id) {
  const [result] = await pool.execute(
    'DELETE FROM categories WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
