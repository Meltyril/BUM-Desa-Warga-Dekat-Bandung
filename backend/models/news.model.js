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

// === listPublished with search ?q= + sort + soft delete ===
const listPublished = async ({ page = 1, pageSize = 10, q = '', sort = 'latest' } = {}) => {
  const offset = (page - 1) * pageSize;

  const where = ["status = 'published'", 'deleted_at IS NULL'];
  const params = [];
  if (q) {
    where.push('(title LIKE ? OR summary LIKE ? OR body LIKE ?)');
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  const whereSql = `WHERE ${where.join(' AND ')}`;

  // latest = DESC, oldest = ASC
  const order = (sort === 'oldest') ? 'ASC' : 'DESC';

  const [rows] = await pool.query(
    `SELECT id, title, slug, summary, cover_url, published_at
     FROM news
     ${whereSql}
     ORDER BY published_at ${order}
     LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );
  return rows;
};

// === hitung total published (untuk pagination meta) + soft delete ===
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

const getBySlug = async (slug) => {
  const [rows] = await pool.query(
    `SELECT id, title, slug, summary, body, cover_url, status, published_at,
            created_at, updated_at
     FROM news
     WHERE slug = ? AND deleted_at IS NULL
     LIMIT 1`,
    [slug]
  );
  return rows[0] || null;
};

// === ADMIN: list semua berita (draft/published; optional termasuk deleted) ===
const listAdmin = async ({
  page = 1,
  pageSize = 10,
  q = '',
  sort = 'latest',
  status = 'all',           // 'all' | 'draft' | 'published'
  includeDeleted = false,   // true menampilkan yang deleted juga
} = {}) => {
  const offset = (page - 1) * pageSize;

  const where = [];
  const params = [];

  // filter status
  if (status === 'draft' || status === 'published') {
    where.push('status = ?');
    params.push(status);
  } else {
    where.push("status IN ('draft','published')");
  }

  // filter deleted
  if (!includeDeleted) where.push('deleted_at IS NULL');

  // search
  if (q) {
    where.push('(title LIKE ? OR summary LIKE ? OR body LIKE ?)');
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  // urutan: pakai published_at kalau ada, fallback ke created_at
  const order = (sort === 'oldest') ? 'ASC' : 'DESC';

  const [rows] = await pool.query(
    `SELECT id, title, slug, status, deleted_at, summary, cover_url,
            published_at, created_at, updated_at
     FROM news
     ${whereSql}
     ORDER BY COALESCE(published_at, created_at) ${order}
     LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );
  return rows;
};

const countAdmin = async ({
  q = '',
  status = 'all',
  includeDeleted = false,
} = {}) => {
  const where = [];
  const params = [];

  if (status === 'draft' || status === 'published') {
    where.push('status = ?');
    params.push(status);
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

// cek apakah slug sudah dipakai
const isSlugTaken = async (slug) => {
  const [rows] = await pool.query('SELECT 1 FROM news WHERE slug = ? LIMIT 1', [slug]);
  return rows.length > 0;
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
  // cek data existing (boleh edit hanya yang belum di-soft-delete)
  const [rows] = await pool.query(
    'SELECT * FROM news WHERE id = ? AND deleted_at IS NULL LIMIT 1',
    [id]
  );
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

// hard delete (kalau butuh benar-benar hapus row)
const deleteNews = async (id) => {
  const [res] = await pool.query('DELETE FROM news WHERE id = ?', [id]);
  return res.affectedRows > 0;
};

// soft delete: tandai deleted_at tanpa menghapus row
const softDeleteNews = async (id) => {
  const [res] = await pool.query(
    'UPDATE news SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL',
    [id]
  );
  return res.affectedRows > 0;
};

// restore: kembalikan deleted_at ke NULL
const restoreNews = async (id) => {
  const [res] = await pool.query(
    'UPDATE news SET deleted_at = NULL WHERE id = ? AND deleted_at IS NOT NULL',
    [id]
  );
  return res.affectedRows > 0;
};

module.exports = {
  listPublished,
  countPublished,
  getBySlug,
  isSlugTaken,
  createNews,
  updateNews,
  deleteNews,      // optional: hard delete
  softDeleteNews,  // dipakai di route DELETE
  restoreNews,     // dipakai di route PATCH /:id/restore

  // admin
  listAdmin,
  countAdmin,
};
