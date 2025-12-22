const express = require('express');
const router = express.Router();
const News = require('../models/news.model');

// === Import middleware auth ===
const auth = require('../middleware/auth');

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

/* ===== helper validasi sederhana ===== */
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

/* ===== LIST BERITA PUBLIK ===== */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const pageSize = parseInt(req.query.pageSize || '10', 10);
    const q = (req.query.q || '').toString().trim();
    const sortRaw = (req.query.sort || 'latest').toString().toLowerCase();
    const sort = ['latest', 'oldest'].includes(sortRaw) ? sortRaw : 'latest';

    const [data, total] = await Promise.all([
      News.listPublished({ page, pageSize, q, sort }),
      News.countPublished({ q }),
    ]);

    res.json({
      meta: {
        total,
        page,
        limit: pageSize,
        pages: Math.max(1, Math.ceil(total / pageSize)),
        q,
        sort,
      },
      data,
    });
  } catch (err) {
    console.error('[news:list]', err);
    res.status(500).json({ error: 'failed to fetch news' });
  }
});

/* ===== LIST ADMIN (HARUS LOGIN ADMIN) ===== */
router.get('/admin', auth, async (req, res) => {
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
      News.listAdmin({ page, pageSize, q, sort, status, includeDeleted }),
      News.countAdmin({ q, status, includeDeleted }),
    ]);

    res.json({
      meta: {
        total,
        page,
        limit: pageSize,
        pages: Math.max(1, Math.ceil(total / pageSize)),
        q, sort, status, includeDeleted,
      },
      data,
    });
  } catch (err) {
    console.error('[news:admin-list]', err);
    res.status(500).json({ error: 'failed to fetch admin news' });
  }
});

// DETAIL PUBLIK
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

// CREATE (HARUS LOGIN ADMIN)
router.post('/', auth, async (req, res) => {
  try {
    const v = validateNewsPayload(req.body || {}, { isUpdate: false });
    if (!v.ok) return res.status(400).json({ error: v.errors.join(', ') });

    const base = slugify(req.body.slug || v.data.title);
    let slug = base;

    for (let i = 1; i <= 100; i++) {
      const candidate = i === 1 ? base : `${base}-${i}`;
      const taken = await News.isSlugTaken(candidate);
      if (!taken) { slug = candidate; break; }
    }

    if (!slug) return res.status(409).json({ error: 'cannot generate unique slug' });

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

// UPDATE (HARUS LOGIN ADMIN)
router.put('/:id', auth, async (req, res) => {
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

// RESTORE (HARUS LOGIN ADMIN)
router.patch('/:id/restore', auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid id' });

    const ok = await News.restoreNews(id);
    if (!ok) {
      return res.status(404).json({ error: 'news not found or not deleted' });
    }

    res.json({ ok: true, restored: true });
  } catch (err) {
    console.error('[news:restore]', err);
    res.status(500).json({ error: 'failed to restore news' });
  }
});

// DELETE (HARUS LOGIN ADMIN)
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid id' });

    const ok = await News.softDeleteNews(id);
    if (!ok) return res.status(404).json({ error: 'news not found or already deleted' });

    res.json({ ok: true, softDeleted: true });
  } catch (err) {
    console.error('[news:delete]', err);
    res.status(500).json({ error: 'failed to delete news' });
  }
});

module.exports = router;
