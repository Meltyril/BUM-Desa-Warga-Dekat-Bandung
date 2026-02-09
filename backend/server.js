// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const { pool } = require('./db'); // MySQL pool

const newsRoutes = require('./routes/news.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// =======================
// GLOBAL MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

// Static images (WAJIB supaya gambar dari database bisa diakses)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Logger sederhana
app.use((req, _res, next) => {
  console.log(`[req] ${req.method} ${req.url}`);
  next();
});

// =======================
// HEALTH CHECK
// =======================
app.get('/status', (_req, res) => {
  res.send('Backend is running 🚀');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// =======================
// ROUTES
// =======================

app.use('/api/news', newsRoutes);
app.use('/api/admin', adminRoutes);

// =======================
// PRODUCTS (MySQL)
// =======================

// CREATE
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

    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({ data: rows[0] });

  } catch (err) {
    console.error('[mysql:create]', err);
    res.status(500).json({ error: 'Gagal membuat produk' });
  }
});

// READ LIST
app.get('/api/products', async (req, res) => {
  try {
    const q = (req.query.q || '').toString().trim();

    const limit = Math.max(1, Math.min(50, Number(req.query.limit) || 10));
    const page = Math.max(1, Number(req.query.page) || 1);
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

    res.json({ meta: { total, page, limit }, data: rows });

  } catch (err) {
    console.error('[mysql:list]', err);
    res.status(500).json({ error: 'Gagal mengambil produk' });
  }
});

// READ DETAIL
app.get('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    res.json({ data: rows[0] });

  } catch (err) {
    console.error('[mysql:detail]', err);
    res.status(500).json({ error: 'Gagal mengambil produk' });
  }
});

// UPDATE
app.put('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, price, description, stock } = req.body;

    const [existing] = await pool.execute(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    const prev = existing[0];

    const next = {
      name: (name ?? prev.name).toString().trim(),
      price: price != null ? Number(price) : prev.price,
      description: description ?? prev.description,
      stock: stock != null ? Number(stock) : prev.stock,
    };

    await pool.execute(
      `UPDATE products SET name=?, price=?, description=?, stock=? WHERE id=?`,
      [next.name, next.price, next.description, next.stock, id]
    );

    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE id=?',
      [id]
    );

    res.json({ data: rows[0] });

  } catch (err) {
    console.error('[mysql:update]', err);
    res.status(500).json({ error: 'Gagal mengubah produk' });
  }
});

// DELETE
app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [result] = await pool.execute(
      'DELETE FROM products WHERE id = ?',
      [id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    res.json({ ok: true });

  } catch (err) {
    console.error('[mysql:delete]', err);
    res.status(500).json({ error: 'Gagal menghapus produk' });
  }
});

// =======================
// MAP LOCATION
// =======================

app.get('/api/location/business', (_req, res) => {

  const name = process.env.BUSINESS_NAME || 'Lokasi';
  const address = process.env.BUSINESS_ADDRESS || 'Alamat';
  const lat = Number(process.env.BUSINESS_LAT);
  const lng = Number(process.env.BUSINESS_LNG);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return res.status(500).json({ error: 'Koordinat bisnis belum di-set di .env' });
  }

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=m&z=16&output=embed`;

  res.json({ name, address, lat, lng, mapsUrl, directionsUrl, embedUrl });

});

// =======================
// SERVE FRONTEND (SPA)
// =======================

const FRONTEND_DIST = process.env.FRONTEND_DIST || path.join(__dirname, 'dist');

app.use(express.static(FRONTEND_DIST));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
});

// =======================
// ERROR HANDLER
// =======================

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} tidak ditemukan` });
});

app.use((err, _req, res, _next) => {
  console.error('[error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

// =======================
// START SERVER
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
  console.log(`[server] serving frontend from: ${FRONTEND_DIST}`);
});
