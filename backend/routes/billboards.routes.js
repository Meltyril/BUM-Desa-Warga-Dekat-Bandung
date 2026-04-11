// backend/routes/billboards.routes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');
const Billboards = require('../models/billboards.model');

// List all active billboards (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const billboards = await Billboards.listBillboards();
    res.json({ data: billboards });
  } catch (err) {
    console.error('[billboards:list]', err);
    res.status(500).json({ error: 'Gagal fetch billboards' });
  }
});

// List all billboards including inactive (admin only)
router.get('/admin/list', auth, authorize('admin'), async (req, res) => {
  try {
    const billboards = await Billboards.listBillboardsAdmin();
    res.json({ data: billboards });
  } catch (err) {
    console.error('[billboards:admin-list]', err);
    res.status(500).json({ error: 'Gagal fetch billboards' });
  }
});

// Get billboard by ID (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: 'ID tidak valid' });
    }

    const billboard = await Billboards.getBillboardById(id);
    if (!billboard) {
      return res.status(404).json({ error: 'Billboard tidak ditemukan' });
    }

    res.json(billboard);
  } catch (err) {
    console.error('[billboards:detail]', err);
    res.status(500).json({ error: 'Gagal fetch billboard' });
  }
});

// Create billboard (admin only)
router.post('/', auth, authorize('admin'), upload.single('image'), async (req, res) => {
  try {
    const { title, link, sort_order, is_active } = req.body;

    if (!title || !title.trim()) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Judul billboard wajib diisi' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Gambar billboard wajib diupload' });
    }

    const id = await Billboards.createBillboard({
      title: title.trim(),
      image_url: `/uploads/${req.file.filename}`,
      link: link ? link.trim() : null,
      sort_order: sort_order ? Number(sort_order) : 999,
      is_active: is_active === 'true' || is_active === true ? 1 : 0,
    });

    res.status(201).json({ id, message: 'Billboard berhasil ditambahkan' });
  } catch (err) {
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.error('[cleanup] Error deleting file:', e.message);
      }
    }
    console.error('[billboards:create]', err);
    res.status(500).json({ error: 'Gagal membuat billboard' });
  }
});

// Update billboard (admin only)
router.put('/:id', auth, authorize('admin'), upload.single('image'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'ID tidak valid' });
    }

    const { title, link, sort_order, is_active } = req.body;

    if (title && !title.trim()) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Judul billboard tidak boleh kosong' });
    }

    // Check if billboard exists
    const existing = await Billboards.getBillboardById(id);
    if (!existing) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Billboard tidak ditemukan' });
    }

    // Delete old image if new one is uploaded
    if (req.file && existing.image_url) {
      const oldImagePath = path.join(__dirname, '../uploads', path.basename(existing.image_url));
      try {
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      } catch (e) {
        console.error('[cleanup] Error deleting old image:', e.message);
      }
    }

    const success = await Billboards.updateBillboard(id, {
      title: title ? title.trim() : undefined,
      image_url: req.file ? `/uploads/${req.file.filename}` : undefined,
      link: link !== undefined ? (link ? link.trim() : null) : undefined,
      sort_order: sort_order !== undefined ? Number(sort_order) : undefined,
      is_active: is_active !== undefined ? (is_active === 'true' || is_active === true ? 1 : 0) : undefined,
    });

    if (success) {
      res.json({ ok: true, message: 'Billboard berhasil diperbarui' });
    } else {
      res.status(500).json({ error: 'Billboard gagal diperbarui' });
    }
  } catch (err) {
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.error('[cleanup] Error deleting file:', e.message);
      }
    }
    console.error('[billboards:update]', err);
    res.status(500).json({ error: 'Gagal update billboard' });
  }
});

// Delete billboard (admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: 'ID tidak valid' });
    }

    const existing = await Billboards.getBillboardById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Billboard tidak ditemukan' });
    }

    // Delete image file
    if (existing.image_url) {
      const imagePath = path.join(__dirname, '../uploads', path.basename(existing.image_url));
      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (e) {
        console.error('[cleanup] Error deleting image:', e.message);
      }
    }

    const success = await Billboards.deleteBillboard(id);
    if (success) {
      res.json({ ok: true, message: 'Billboard berhasil dihapus' });
    } else {
      res.status(500).json({ error: 'Billboard gagal dihapus' });
    }
  } catch (err) {
    console.error('[billboards:delete]', err);
    res.status(500).json({ error: 'Gagal hapus billboard' });
  }
});

module.exports = router;
