// backend/routes/news.routes.js
const express = require('express');
const router = express.Router();
const News = require('../models/news.model');

// util kecil buat slug
function slugify(text = '') {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')      
    .replace(/\s+/g, '-')         
    .replace(/-+/g, '-')           
    .slice(0, 200);
}

// GET /api/news  -> list berita published
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const pageSize = parseInt(req.query.pageSize || '10', 10);
    const data = await News.listPublished({ page, pageSize });
    res.json({ page, pageSize, data });
  } catch (err) {
    console.error('[news:list]', err);
    res.status(500).json({ error: 'failed to fetch news' });
  }
});

// GET /api/news/:slug -> detail berita
router.get('/:slug', async (req, res) => {
  try {
    const row = await News.getBySlug(req.params.slug);
    if (!row) return res.status(404).json({ error: 'news not found' });
    res.json(row);
  } catch (err) {
    console.error('[news:get]', err);
    res.status(500).json({ error: 'failed to fetch news' });
  }
});

// POST /api/news -> buat draft berita sederhana
// body: { title, summary, body, cover_url, status?, published_at? }
router.post('/', async (req, res) => {
  try {
    const { title, summary, body, cover_url, status, published_at } = req.body || {};
    if (!title || !body) return res.status(400).json({ error: 'title and body are required' });
    const slug = slugify(req.body.slug || title);

    const id = await News.createNews({
      title, slug, summary: summary || null, body, cover_url: cover_url || null,
      status: status === 'published' ? 'published' : 'draft',
      published_at: status === 'published' ? (published_at || new Date()) : null,
    });

    res.status(201).json({ id, slug });
  } catch (err) {
    // ada kemungkinan error duplikat slug
    if (err && err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'slug already exists' });
    }
    console.error('[news:create]', err);
    res.status(500).json({ error: 'failed to create news' });
  }
});

// ===== [ADD] PUT /api/news/:id -> edit/publish =====
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid id' });

    const payload = { ...req.body };
    if (payload.slug) payload.slug = slugify(payload.slug);

    const result = await News.updateNews(id, payload);
    if (!result.ok) {
      if (result.reason === 'not_found') return res.status(404).json({ error: 'news not found' });
      if (result.reason === 'duplicate_slug') return res.status(409).json({ error: 'slug already exists' });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('[news:update]', err);
    res.status(500).json({ error: 'failed to update news' });
  }
});

module.exports = router;
