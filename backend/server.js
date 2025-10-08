require('dotenv').config();
const express = require('express');
const cors = require('cors');

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

// In-memory store (sementara, sebelum pakai Data Base) 
let products = [];
let nextId = 1;

// CREATE (simpan ke memory)
app.post('/api/products', (req, res) => {
  const { name, price, description, stock } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ error: 'name dan price wajib diisi' });
  }

  const created = {
    id: nextId++,
    name,
    price: Number(price),
    description: description ?? '',
    stock: Number.isFinite(Number(stock)) ? Number(stock) : 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  products.push(created);
  return res.status(201).json(created);
});

// READ (list semua produk)
app.get('/api/products', (_req, res) => {
  res.json(products);
});

// READ (detail by id)
app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = products.find(p => p.id === id);
  if (!found) return res.status(404).json({ error: 'Produk tidak ditemukan' });
  res.json(found);
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
