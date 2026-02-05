// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // [NEW]
const { pool } = require('./db'); // ⬅️ pakai MySQL pool

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images'))); // ✅ wajib


// Logger sederhana (lihat setiap request di terminal)
app.use((req, _res, next) => {
  console.log(`[req] ${req.method} ${req.url}`);
  next();
});

// Health & root routes (buat tes cepat)
// ⬇️ Ganti '/' jadi '/status' agar root ('/') bisa dipakai untuk SPA frontend
app.get('/status', (_req, res) => {
  res.send('Backend is running 🚀');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

/* ======== [ADD] NEWS ROUTES (2 baris) ======== */
const newsRoutes = require('./routes/news.routes');
app.use('/api/news', newsRoutes);
/* ============================================ */

/* ======== [ADD] ADMIN ROUTES (BARU) ======== */
const adminRoutes = require('./routes/admin.routes');
app.use('/api/admin', adminRoutes);
/* ========================================== */

// =======================
// PRODUCTS (MySQL)
// =======================

// CREATE ( di simpan ke MySQL)
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

// UPDATE (PUT /api/products/:id)
app.put('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, price, description, stock } = req.body;

    // ambil data lama
    const [existing] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    if (!existing.length) return res.status(404).json({ error: 'Produk tidak ditemukan' });

    const prev = existing[0];
    const next = {
      name: (name ?? prev.name).toString().trim(),
      price: price != null ? Number(price) : prev.price,
      description: description ?? prev.description,
      stock: stock != null ? Number(stock) : prev.stock,
    };

    if (!next.name || next.price == null) {
      return res.status(400).json({ error: 'name dan price wajib diisi' });
    }

    const [result] = await pool.execute(
      `UPDATE products
       SET name=?, price=?, description=?, stock=?
       WHERE id=?`,
      [next.name, next.price, next.description, next.stock, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    const [rows] = await pool.execute('SELECT * FROM products WHERE id=?', [id]);
    return res.json({ data: rows[0] });
  } catch (err) {
    console.error('[mysql:update]', err);
    return res.status(500).json({ error: 'Gagal mengubah produk' });
  }
});

// DELETE (DELETE /api/products/:id)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error('[mysql:delete]', err);
    return res.status(500).json({ error: 'Gagal menghapus produk' });
  }
});


// LOKASI / MAPS (Footer)
app.get('/api/location/business', (_req, res) => {
  const name    = process.env.BUSINESS_NAME || 'Lokasi';
  const address = process.env.BUSINESS_ADDRESS || 'Alamat';
  const lat     = Number(process.env.BUSINESS_LAT);
  const lng     = Number(process.env.BUSINESS_LNG);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return res.status(500).json({ error: 'Koordinat bisnis belum di-set di .env' });
  }

  // ✅ Klik: buka Google Maps tepat ke koordinat (format Maps URLs, api=1 wajib)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`; // [web:98]

  // ✅ Klik: petunjuk arah ke koordinat
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`; // [web:98]

  // ✅ Tampilan gambar peta (iframe) tanpa API key
  // Catatan: ini bukan Maps Embed API resmi, tapi biasanya paling “langsung jadi”.
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=m&z=16&output=embed`; // [web:125]

  res.json({ name, address, lat, lng, mapsUrl, directionsUrl, embedUrl });
});

// =======================
// [NEW] SERVE FRONTEND BUILD (SPA)
// =======================
// Lokasi folder build frontend (bisa diubah via env FRONTEND_DIST)
const FRONTEND_DIST = process.env.FRONTEND_DIST || path.join(__dirname, 'dist');

// Serve file statis dari build frontend
app.use(express.static(FRONTEND_DIST));

// ✅ Fallback baru yang kompatibel Express 5
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
});

// 404 & Error handlers
// Handler 404 khusus API (karena route SPA di atas sudah menangani non-API)
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
  console.log(`[server] serving frontend from: ${FRONTEND_DIST}`);
});