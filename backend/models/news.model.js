// backend/models/news.model.js
const mysql = require('mysql2/promise');
let pool;

// gunakan pool dari db.js kalau ada
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

// LIST BERITA PUBLISH
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
    `SELECT id, title, summary, body, cover_url, published_at
     FROM news
     ${whereSql}
     ORDER BY published_at ${order}
     LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );
  return rows;
};

// COUNT PUBLISHED
const countPublished = async ({ q = '' } = {}) => {
  const where = ["status = 'published'", 'deleted_at IS NULL'];
  const params = [];
  if (q) {
    where.push('(title LIKE ? OR summary LIKE ? OR body LIKE ?)');
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  const whereSql = `WHERE ${where.join(' AND ')}`;
  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) AS total FROM news ${whereSql}`,
    params
  );
  return total;
};

// DETAIL BERITA BERDASARKAN ID
const getById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, title, summary, body, cover_url, status, published_at, created_at, updated_at
     FROM news
     WHERE id = ? AND deleted_at IS NULL
     LIMIT 1`,
    [id]
  );
  return rows[0] || null;
};

// ADMIN LIST
const listAdmin = async ({
  page = 1, pageSize = 10, q = '', sort = 'latest', status = 'all', includeDeleted = false
} = {}) => {
  const offset = (page - 1) * pageSize;
  const where = [];
  const params = [];

  if (status === 'draft' || status === 'published') {
    where.push('status = ?'); params.push(status);
  } else {
    where.push("status IN ('draft','published')");
  }

  if (!includeDeleted) where.push('deleted_at IS NULL');

  if (q) {
    where.push('(title LIKE ? OR summary LIKE ? OR body LIKE ?)');
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const order = (sort === 'oldest') ? 'ASC' : 'DESC';

  const [rows] = await pool.query(
    `SELECT id, title, summary, body, status, cover_url, deleted_at, published_at, created_at, updated_at
     FROM news
     ${whereSql}
     ORDER BY COALESCE(published_at, created_at) ${order}
     LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );
  return rows;
};

// COUNT ADMIN
const countAdmin = async ({ q = '', status = 'all', includeDeleted = false } = {}) => {
  const where = [];
  const params = [];

  if (status === 'draft' || status === 'published') {
    where.push('status = ?'); params.push(status);
  } else {
    where.push("status IN ('draft','published')");
  }

  if (!includeDeleted) where.push('deleted_at IS NULL');

  if (q) {
    where.push('(title LIKE ? OR summary LIKE ? OR body LIKE ?)');
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) AS total FROM news ${whereSql}`,
    params
  );
  return total;
};

// CREATE NEWS
const createNews = async ({ title, summary, body, cover_url, status = 'draft', published_at = null }) => {
  const [res] = await pool.query(
    `INSERT INTO news (title, summary, body, cover_url, status, published_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, summary, body, cover_url, status, published_at]
  );
  return res.insertId;
};

// UPDATE NEWS
const updateNews = async (id, { title, summary, body, cover_url, status, published_at }) => {
  const [rows] = await pool.query('SELECT * FROM news WHERE id = ? AND deleted_at IS NULL LIMIT 1', [id]);
  if (!rows.length) return { ok: false, reason: 'not_found' };
  const prev = rows[0];

  const next = {
    title: title ?? prev.title,
    summary: summary ?? prev.summary,
    body: body ?? prev.body,
    cover_url: cover_url ?? prev.cover_url,
    status: status ?? prev.status,
    published_at: (status === 'published' && !published_at && !prev.published_at)
      ? new Date()
      : (published_at ?? prev.published_at),
  };

  const [res] = await pool.query(
    `UPDATE news SET title=?, summary=?, body=?, cover_url=?, status=?, published_at=? WHERE id=?`,
    [next.title, next.summary, next.body, next.cover_url, next.status, next.published_at, id]
  );

  return { ok: res.affectedRows > 0 };
};

// SOFT DELETE
const softDeleteNews = async (id) => {
  const [res] = await pool.query('UPDATE news SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL', [id]);
  return res.affectedRows > 0;
};

// RESTORE
const restoreNews = async (id) => {
  const [res] = await pool.query('UPDATE news SET deleted_at = NULL WHERE id = ? AND deleted_at IS NOT NULL', [id]);
  return res.affectedRows > 0;
};

// HARD DELETE
const deleteNews = async (id) => {
  const [res] = await pool.query('DELETE FROM news WHERE id = ?', [id]);
  return res.affectedRows > 0;
};

module.exports = {
  listPublished,
  countPublished,
  getById,
  createNews,
  updateNews,
  softDeleteNews,
  restoreNews,
  deleteNews,
  listAdmin,
  countAdmin,
};