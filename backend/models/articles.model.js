// backend/models/articles.model.js
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

const listPublished = async ({ page = 1, pageSize = 10, q = '', sort = 'latest' } = {}) => {
  const offset = (page - 1) * pageSize;
  const where = ["status = 'published'", 'deleted_at IS NULL'];
  const params = [];
  if (q) {
    where.push('(title LIKE ? OR summary LIKE ? OR body LIKE ?)');
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  const whereSql = `WHERE ${where.join(' AND ')}`;
  const order = (sort === 'oldest') ? 'ASC' : 'DESC';

  const [rows] = await pool.query(
    `SELECT id, title, slug, summary, image_url, published_at
     FROM articles
     ${whereSql}
     ORDER BY published_at ${order}
     LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );
  return rows;
};

const countPublished = async ({ q = '' } = {}) => {
  const where = ["status = 'published'", 'deleted_at IS NULL'];
  const params = [];
  if (q) {
    where.push('(title LIKE ? OR summary LIKE ? OR body LIKE ?)');
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  const whereSql = `WHERE ${where.join(' AND ')}`;
  const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM articles ${whereSql}`, params);
  return total;
};

const getBySlug = async (slug) => {
  const [rows] = await pool.query(
    `SELECT id, title, slug, summary, body, image_url, status, published_at, created_at, updated_at
     FROM articles
     WHERE slug = ? AND deleted_at IS NULL
     LIMIT 1`,
    [slug]
  );
  return rows[0] || null;
};

const listAdmin = async ({ page = 1, pageSize = 10, q = '', sort = 'latest', status = 'all', includeDeleted = false } = {}) => {
  const offset = (page - 1) * pageSize;
  const where = [];
  const params = [];
  if (status === 'draft' || status === 'published') {
    where.push('status = ?'); params.push(status);
  } else {
    where.push("status IN ('draft','published')");
  }
  if (!includeDeleted) where.push('deleted_at IS NULL');
  if (q) { where.push('(title LIKE ? OR summary LIKE ? OR body LIKE ?)'); params.push(`%${q}%`, `%${q}%`, `%${q}%`); }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const order = (sort === 'oldest') ? 'ASC' : 'DESC';

  const [rows] = await pool.query(
    `SELECT id, title, slug, status, deleted_at, summary, image_url, published_at, created_at, updated_at
     FROM articles
     ${whereSql}
     ORDER BY COALESCE(published_at, created_at) ${order}
     LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );
  return rows;
};

const countAdmin = async ({ q = '', status = 'all', includeDeleted = false } = {}) => {
  const where = [];
  const params = [];
  if (status === 'draft' || status === 'published') { where.push('status = ?'); params.push(status); } else { where.push("status IN ('draft','published')"); }
  if (!includeDeleted) where.push('deleted_at IS NULL');
  if (q) { where.push('(title LIKE ? OR summary LIKE ? OR body LIKE ?)'); params.push(`%${q}%`, `%${q}%`, `%${q}%`); }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM articles ${whereSql}`, params);
  return total;
};

const isSlugTaken = async (slug) => {
  const [rows] = await pool.query('SELECT 1 FROM articles WHERE slug = ? LIMIT 1', [slug]);
  return rows.length > 0;
};

const createArticle = async ({ title, slug, summary, body, image_url, status = 'draft', published_at = null }) => {
  const [res] = await pool.query(
    `INSERT INTO articles (title, slug, summary, body, image_url, status, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, slug, summary, body, image_url, status, published_at]
  );
  return res.insertId;
};

const updateArticle = async (id, { title, slug, summary, body, image_url, status, published_at }) => {
  const [rows] = await pool.query('SELECT * FROM articles WHERE id = ? AND deleted_at IS NULL LIMIT 1', [id]);
  if (!rows.length) return { ok: false, reason: 'not_found' };
  const prev = rows[0];
  const next = {
    title: title ?? prev.title,
    slug: slug ?? prev.slug,
    summary: summary ?? prev.summary,
    body: body ?? prev.body,
    image_url: image_url ?? prev.image_url,
    status: status ?? prev.status,
    published_at: (status === 'published' && !published_at && !prev.published_at) ? new Date() : (published_at ?? prev.published_at),
  };
  try {
    const [res] = await pool.query(
      `UPDATE articles SET title=?, slug=?, summary=?, body=?, image_url=?, status=?, published_at=? WHERE id=?`,
      [next.title, next.slug, next.summary, next.body, next.image_url, next.status, next.published_at, id]
    );
    return { ok: res.affectedRows > 0 };
  } catch (err) {
    if (err && err.code === 'ER_DUP_ENTRY') return { ok: false, reason: 'duplicate_slug' };
    throw err;
  }
};

const deleteArticle = async (id) => {
  const [res] = await pool.query('DELETE FROM articles WHERE id = ?', [id]);
  return res.affectedRows > 0;
};

const softDeleteArticle = async (id) => {
  const [res] = await pool.query('UPDATE articles SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL', [id]);
  return res.affectedRows > 0;
};

const restoreArticle = async (id) => {
  const [res] = await pool.query('UPDATE articles SET deleted_at = NULL WHERE id = ? AND deleted_at IS NOT NULL', [id]);
  return res.affectedRows > 0;
};

module.exports = {
  listPublished,
  countPublished,
  getBySlug,
  isSlugTaken,
  createArticle,
  updateArticle,
  deleteArticle,
  softDeleteArticle,
  restoreArticle,
  listAdmin,
  countAdmin,
};

