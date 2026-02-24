const express = require('express');
const router = express.Router();
const Articles = require('../models/articles.model');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');
const fs = require('fs');

function slugify(text = '') {
  return text.toString().trim().toLowerCase()
    .replace(/[^\\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 200);
}

function validateArticle(payload, { isUpdate = false } = {}) {
  const errors = [];
  const out = {};
  if (!isUpdate || payload.title !== undefined) {
    const t = (payload.title ?? '').toString().trim();
    if (!t) errors.push('title wajib diisi'); else out.title = t;
  }
  if (!isUpdate || payload.body !== undefined) {
    const b = (payload.body ?? '').toString().trim();
    if (!b) errors.push('body wajib diisi'); else out.body = b;
  }
  if (payload.summary !== undefined && payload.summary !== null) {
    const s = payload.summary.toString().trim();
    out.summary = s.length ? s : null;
  } else if (!isUpdate) out.summary = null;
  if (payload.image_url !== undefined && payload.image_url !== null) {
    const u = payload.image_url.toString().trim();
    out.image_url = u.length ? u : null;
  } else if (!isUpdate) out.image_url = null;
  if (payload.status !== undefined && payload.status !== null) {
    const st = payload.status.toString().trim().toLowerCase();
    if (!['draft', 'published'].includes(st)) errors.push('status harus draft/published'); else out.status = st;
  }
  if (payload.slug !== undefined && payload.slug !== null) out.slug = slugify(payload.slug);
  return { ok: errors.length === 0, errors, data: out };
}

// PUBLIC list
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const pageSize = parseInt(req.query.pageSize || '10', 10);
    const q = (req.query.q || '').toString().trim();
    const sortRaw = (req.query.sort || 'latest').toString().toLowerCase();
    const sort = ['latest', 'oldest'].includes(sortRaw) ? sortRaw : 'latest';
    const [data, total] = await Promise.all([
      Articles.listPublished({ page, pageSize, q, sort }),
      Articles.countPublished({ q }),
    ]);
    res.json({ meta: { total, page, limit: pageSize, pages: Math.max(1, Math.ceil(total / pageSize)), q, sort }, data });
  } catch (err) {
    console.error('[articles:list]', err);
    res.status(500).json({ error: 'failed to fetch articles' });
  }
});

// ADMIN list
router.get('/admin', auth, authorize('content_manager', 'admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const pageSize = parseInt(req.query.pageSize || '10', 10);
    const q = (req.query.q || '').toString().trim();
    const sortRaw = (req.query.sort || 'latest').toString().toLowerCase();
    const sort = ['latest', 'oldest'].includes(sortRaw) ? sortRaw : 'latest';
    const statusRaw = (req.query.status || 'all').toString().toLowerCase();
    const status = ['all', 'draft', 'published'].includes(statusRaw) ? statusRaw : 'all';
    const includeDeleted = String(req.query.includeDeleted || 'false').toLowerCase() === 'true';
    const [data, total] = await Promise.all([
      Articles.listAdmin({ page, pageSize, q, sort, status, includeDeleted }),
      Articles.countAdmin({ q, status, includeDeleted }),
    ]);
    res.json({ meta: { total, page, limit: pageSize, pages: Math.max(1, Math.ceil(total / pageSize)), q, sort, status, includeDeleted }, data });
  } catch (err) {
    console.error('[articles:admin-list]', err);
    res.status(500).json({ error: 'failed to fetch admin articles' });
  }
});

// PUBLIC detail
router.get('/:slug', async (req, res) => {
  try {
    const row = await Articles.getBySlug(req.params.slug);
    if (!row) return res.status(404).json({ error: 'article not found' });
    res.json(row);
  } catch (err) {
    console.error('[articles:get]', err);
    res.status(500).json({ error: 'failed to fetch article' });
  }
});

// CREATE (admin) - support image upload (field 'image')
router.post('/', auth, authorize('content_manager', 'admin'), upload.single('image'), async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) {
      body.image_url = `/uploads/${req.file.filename}`;
    }

    const v = validateArticle(body, { isUpdate: false });
    if (!v.ok) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: v.errors.join(', ') });
    }

    const base = slugify(body.slug || v.data.title);
    let slug = base;
    for (let i = 1; i <= 100; i++) {
      const candidate = i === 1 ? base : `${base}-${i}`;
      const taken = await Articles.isSlugTaken(candidate);
      if (!taken) { slug = candidate; break; }
    }
    if (!slug) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(409).json({ error: 'cannot generate unique slug' });
    }

    const id = await Articles.createArticle({
      title: v.data.title,
      slug,
      summary: v.data.summary ?? null,
      body: v.data.body,
      image_url: v.data.image_url ?? null,
      status: v.data.status === 'published' ? 'published' : 'draft',
      published_at: v.data.status === 'published' ? (v.data.published_at || new Date()) : null,
    });
    res.status(201).json({ id, slug });
  } catch (err) {
    console.error('[articles:create]', err);
    if (req.file) {
      try { fs.unlinkSync(req.file.path); } catch (e) { /* ignore */ }
    }
    res.status(500).json({ error: 'failed to create article' });
  }
}, (err, req, res, next) => {
  console.error('[multer:error]', err && err.message);
  if (req.file) {
    try { fs.unlinkSync(req.file.path); } catch (e) {}
  }
  return res.status(400).json({ error: err.message || 'failed to upload image' });
});

// UPDATE (admin)
router.put('/:id', auth, authorize('content_manager', 'admin'), upload.single('image'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid id' });
    const body = { ...req.body };
    if (req.file) body.image_url = `/uploads/${req.file.filename}`;

    const v = validateArticle(body, { isUpdate: true });
    if (!v.ok) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: v.errors.join(', ') });
    }

    if (v.data.slug) v.data.slug = slugify(v.data.slug);

    // if new image uploaded, need to remove old image after successful update
    const [existing] = await Promise.all([Articles.getBySlug(body.slug || v.data.slug || '')]).catch(()=>[null]);

    const result = await Articles.updateArticle(id, v.data);
    if (!result.ok) {
      if (result.reason === 'not_found') return res.status(404).json({ error: 'article not found' });
      if (result.reason === 'duplicate_slug') return res.status(409).json({ error: 'slug already exists' });
    }

    // delete previous image file if replaced
    if (req.file && existing && existing.image_url) {
      const prevPath = existing.image_url.replace(/^\/uploads\//, '');
      try { fs.unlinkSync(require('path').join(__dirname, '..', 'uploads', prevPath)); } catch (e) {}
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('[articles:update]', err);
    if (req.file) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }
    res.status(500).json({ error: 'failed to update article' });
  }
}, (err, req, res, next) => {
  console.error('[multer:error]', err && err.message);
  if (req.file) { try { fs.unlinkSync(req.file.path); } catch (e) {} }
  return res.status(400).json({ error: err.message || 'failed to upload image' });
});

// RESTORE
router.patch('/:id/restore', auth, authorize('content_manager', 'admin'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid id' });
    const ok = await Articles.restoreArticle(id);
    if (!ok) return res.status(404).json({ error: 'article not found or not deleted' });
    res.json({ ok: true, restored: true });
  } catch (err) {
    console.error('[articles:restore]', err);
    res.status(500).json({ error: 'failed to restore article' });
  }
});

// DELETE (soft)
router.delete('/:id', auth, authorize('content_manager', 'admin'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid id' });
    const ok = await Articles.softDeleteArticle(id);
    if (!ok) return res.status(404).json({ error: 'article not found or already deleted' });
    res.json({ ok: true, softDeleted: true });
  } catch (err) {
    console.error('[articles:delete]', err);
    res.status(500).json({ error: 'failed to delete article' });
  }
});

module.exports = router;
