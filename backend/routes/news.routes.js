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

/* ===== helper validasi sederhana (ADD) ===== */
function validateNewsPayload(payload, { isUpdate = false } = {}) {
  const errors = [];
  const out = {};

  // title
  if (!isUpdate || payload.title !== undefined) {
    const t = (payload.title ?? '').toString().trim();
    if (!t) errors.push('title wajib diisi');
    else if (t.length < 3) errors.push('title minimal 3 karakter');
    else if (t.length > 200) errors.push('title maksimal 200 karakter');
    else out.title = t;
  }

  // body
  if (!isUpdate || payload.body !== undefined) {
    const b = (payload.body ?? '').toString().trim();
    if (!b) errors.push('body wajib diisi');
    else if (b.length < 10) errors.push('body minimal 10 karakter');
    else out.body = b;
  }

  // summary (opsional)
  if (payload.summary !== undefined && payload.summary !== null) {
    const s = payload.summary.toString().trim();
    if (s.length > 1000) errors.push('summary maksimal 1000 karakter');
    else out.summary = s;
  } else if (!isUpdate) {
    out.summary = null;
  }

  // cover_url (opsional)
  if (payload.cover_url !== undefined && payload.cover_url !== null) {
    const c = payload.cover_url.toString().trim();
    if (c.length > 500) errors.push('cover_url terlalu panjang');
    else out.cover_url = c;
  } else if (!isUpdate) {
    out.cover_url = null;
  }

  // status (opsional)
  if (payload.status !== undefined && payload.status !== null) {
    const st = payload.status.toString().trim().toLowerCase();
    if (!['draft', 'published'].includes(st)) errors.push('status harus draft/published');
    else out.status = st;
  }

  // published_at (opsional)
  if (payload.published_at !== undefined && payload.published_at !== null) {
    const p = new Date(payload.published_at);
    if (isNaN(p.getTime())) errors.push('published_at tidak valid');
    else out.published_at = p;
  }

  // slug (opsional)
  if (payload.slug !== undefined && payload.slug !== null) {
    out.slug = slugify(payload.slug);
  }

  return { ok: errors.length === 0, errors, data: out };
}
/* =========================================== */

// GET /api/news  -> list published (+ search ?q=) + META
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const pageSize = parseInt(req.query.pageSize || '10', 10);
    const q = (req.query.q || '').toString().trim();

    const [data, total] = await Promise.all([
      News.listPublished({ page, pageSize, q }),
      News.countPublished({ q }),
    ]);

    res.json({
      meta: {
        total,
        page,
        limit: pageSize,
        pages: Math.max(1, Math.ceil(total / pageSize)),
        q,
      },
      data,
    });
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

// POST /api/news -> buat draft / publish sederhana
router.post('/', async (req, res) => {
  try {
    const v = validateNewsPayload(req.body || {}, { isUpdate: false });
    if (!v.ok) return res.status(400).json({ error: v.errors.join(', ') });

    const slug = slugify(req.body.slug || v.data.title);

    const id = await News.createNews({
      title: v.data.title,
      slug,
      summary: v.data.summary ?? null,
      body: v.data.body,
      cover_url: v.data.cover_url ?? null,
      status: v.data.status === 'published' ? 'published' : 'draft',
      published_at: v.data.status === 'published'
        ? (v.data.published_at || new Date())
        : null,
    });

    res.status(201).json({ id, slug });
  } catch (err) {
    if (err && err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'slug already exists' });
    }
    console.error('[news:create]', err);
    res.status(500).json({ error: 'failed to create news' });
  }
});

// PUT /api/news/:id -> edit/publish
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid id' });

    const v = validateNewsPayload(req.body || {}, { isUpdate: true });
    if (!v.ok) return res.status(400).json({ error: v.errors.join(', ') });

    if (v.data.slug) v.data.slug = slugify(v.data.slug);

    const result = await News.updateNews(id, v.data);
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
