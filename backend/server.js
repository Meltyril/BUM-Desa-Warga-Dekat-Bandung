// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./db'); // ⬅️ pakai MySQL pool

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Logger sederhana (lihat setiap request di terminal)
app.use((req, _res, next) => {
  console.log(`[req] ${req.method} ${req.url}`);
  next();
});

// Health & root routes (buat tes cepat)
app.get('/', (_req, res) => {
  res.send('Backend is running 🚀');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

/* =======================
   PRODUCTS (MySQL)
   ======================= */

// CREATE (simpan ke MySQL)
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ error: 'name dan price wajib diisi' });
    }
    const p = {
      name: String(name).trim(),
      price: Number(price),
      description: description ?? null,
      stock: Number.isFinite(Number(stock)) ? Number(stock) : 0,
    };

    const [result] = await pool.execute(
      'INSERT INTO products (name, price, description, stock) VALUES (?,?,?,?)',
      [p.name, p.price, p.description, p.stock]
    );
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [result.insertId]);
    return res.status(201).json({ data: rows[0] });
  } catch (err) {
    console.error('[mysql:create]', err);
    return res.status(500).json({ error: 'Gagal membuat produk' });
  }
});

// READ (list + query sederhana ?q=&page=&limit=)
app.get('/api/products', async (req, res) => {
  try {
    const q = (req.query.q || '').toString().trim();
    const limit = Math.max(1, Math.min(50, Number(req.query.limit) || 10));
    const page  = Math.max(1, Number(req.query.page) || 1);
    const offset = (page - 1) * limit;

    let where = '';
    let params = [];
    if (q) {
      where = 'WHERE name LIKE ? OR description LIKE ?';
      params = [`%${q}%`, `%${q}%`];
    }

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM products ${where}`,
      params
    );
    const [rows] = await pool.query(
      `SELECT * FROM products ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return res.json({ meta: { total, page, limit }, data: rows });
  } catch (err) {
    console.error('[mysql:list]', err);
    return res.status(500).json({ error: 'Gagal mengambil produk' });
  }
});

// READ (detail by id)
app.get('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    return res.json({ data: rows[0] });
  } catch (err) {
    console.error('[mysql:detail]', err);
    return res.status(500).json({ error: 'Gagal mengambil produk' });
  }
});

// 404 & Error handlers
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} tidak ditemukan` });
});

app.use((err, _req, res, _next) => {
  console.error('[error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
