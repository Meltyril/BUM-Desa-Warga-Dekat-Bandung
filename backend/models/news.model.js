// backend/models/news.model.js
const mysql = require('mysql2/promise');
let pool;

// gunakan pool dari db.js kalau ada
try {
  ({ pool } = require('../db')); // pastikan db.js export { pool }
} catch (e) {
  // fallback sederhana kalau db.js belum ada
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'your_db_name',
    waitForConnections: true,
    connectionLimit: 10,
  });
}

const listPublished = async ({ page = 1, pageSize = 10 } = {}) => {
  const offset = (page - 1) * pageSize;
  const [rows] = await pool.query(
    `SELECT id, title, slug, summary, cover_url, published_at
     FROM news
     WHERE status = 'published'
     ORDER BY published_at DESC
     LIMIT ? OFFSET ?`,
    [pageSize, offset]
  );
  return rows;
};

const getBySlug = async (slug) => {
  const [rows] = await pool.query(
    `SELECT id, title, slug, summary, body, cover_url, status, published_at,
            created_at, updated_at
     FROM news WHERE slug = ? LIMIT 1`,
    [slug]
  );
  return rows[0] || null;
};

const createNews = async ({ title, slug, summary, body, cover_url, status = 'draft', published_at = null }) => {
  const [res] = await pool.query(
    `INSERT INTO news (title, slug, summary, body, cover_url, status, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, slug, summary, body, cover_url, status, published_at]
  );
  return res.insertId;
};

// UPDATE news by id (edit/publish)
const updateNews = async (id, { title, slug, summary, body, cover_url, status, published_at }) => {
  // cek data existing
  const [rows] = await pool.query('SELECT * FROM news WHERE id = ? LIMIT 1', [id]);
  if (!rows.length) return { ok: false, reason: 'not_found' };
  const prev = rows[0];

  const next = {
    title: title ?? prev.title,
    slug: slug ?? prev.slug,
    summary: summary ?? prev.summary,
    body: body ?? prev.body,
    cover_url: cover_url ?? prev.cover_url,
    status: status ?? prev.status,
    published_at:
      (status === 'published' && !published_at && !prev.published_at)
        ? new Date()
        : (published_at ?? prev.published_at),
  };

  try {
    const [res] = await pool.query(
      `UPDATE news
       SET title=?, slug=?, summary=?, body=?, cover_url=?, status=?, published_at=?
       WHERE id=?`,
      [next.title, next.slug, next.summary, next.body, next.cover_url, next.status, next.published_at, id]
    );
    return { ok: res.affectedRows > 0 };
  } catch (err) {
    // tangani slug duplikat
    if (err && err.code === 'ER_DUP_ENTRY') return { ok: false, reason: 'duplicate_slug' };
    throw err;
  }
};

module.exports = {
  listPublished,
  getBySlug,
  createNews,
  updateNews, // ⬅️ ditambah
};
