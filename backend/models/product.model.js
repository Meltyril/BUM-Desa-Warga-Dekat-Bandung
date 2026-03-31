const { pool } = require('../db');

async function listProducts() {
  const [rows] = await pool.query(`
    SELECT 
      id,
      name,
      category,
      price,
      description,
      image_url,
      stock,
      unit,
      created_at,
      updated_at
    FROM products
    ORDER BY id DESC
  `);

  return rows;
}

async function getById(id) {
  const [rows] = await pool.query(
    `
    SELECT 
      id,
      name,
      category,
      price,
      description,
      image_url,
      stock,
      unit,
      created_at,
      updated_at
    FROM products
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
}

module.exports = {
  listProducts,
  getById,
};