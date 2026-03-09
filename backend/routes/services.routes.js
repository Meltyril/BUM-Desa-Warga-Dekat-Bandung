// backend/routes/services.routes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');
const Services = require('../models/services.model');

// List all services (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const services = await Services.listServices();
    res.json({ data: services });
  } catch (err) {
    console.error('[services:list]', err);
    res.status(500).json({ error: 'Gagal fetch services' });
  }
});

// Get service by ID (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: 'ID tidak valid' });
    }

    const service = await Services.getServiceById(id);
    if (!service) {
      return res.status(404).json({ error: 'Layanan tidak ditemukan' });
    }

    res.json(service);
  } catch (err) {
    console.error('[services:detail]', err);
    res.status(500).json({ error: 'Gagal fetch layanan' });
  }
});

// Create service (admin only)
router.post('/', auth, authorize('admin'), upload.single('image'), async (req, res) => {
  try {
    const { title, description, sort_order } = req.body;

    if (!title || !title.trim()) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Judul layanan wajib diisi' });
    }

    if (!description || !description.trim()) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Deskripsi layanan wajib diisi' });
    }

    const id = await Services.createService({
      title: title.trim(),
      description: description.trim(),
      image_url: req.file ? `/uploads/${req.file.filename}` : null,
      sort_order: sort_order ? Number(sort_order) : 999,
    });

    res.status(201).json({ id, message: 'Layanan berhasil ditambahkan' });
  } catch (err) {
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.error('[cleanup] Error deleting file:', e.message);
      }
    }
    console.error('[services:create]', err);
    res.status(500).json({ error: 'Gagal membuat layanan' });
  }
});

// Update service (admin only)
router.put('/:id', auth, authorize('admin'), upload.single('image'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'ID tidak valid' });
    }

    const { title, description, sort_order } = req.body;

    if (title && !title.trim()) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Judul layanan tidak boleh kosong' });
    }

    if (description && !description.trim()) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Deskripsi layanan tidak boleh kosong' });
    }

    // Check if service exists
    const existing = await Services.getServiceById(id);
    if (!existing) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Layanan tidak ditemukan' });
    }

    // Delete old image if new one is uploaded
    if (req.file && existing.image_url) {
      try {
        const oldPath = path.join(__dirname, '../' + existing.image_url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      } catch (e) {
        console.error('[cleanup] Error deleting old image:', e.message);
      }
    }

    await Services.updateService(id, {
      title: title ? title.trim() : undefined,
      description: description ? description.trim() : undefined,
      image_url: req.file ? `/uploads/${req.file.filename}` : undefined,
      sort_order: sort_order !== undefined ? Number(sort_order) : undefined,
    });

    res.json({ ok: true, message: 'Layanan berhasil diperbarui' });
  } catch (err) {
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.error('[cleanup] Error deleting file:', e.message);
      }
    }
    console.error('[services:update]', err);
    res.status(500).json({ error: 'Gagal mengupdate layanan' });
  }
});

// Delete service (admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: 'ID tidak valid' });
    }

    const service = await Services.getServiceById(id);
    if (!service) {
      return res.status(404).json({ error: 'Layanan tidak ditemukan' });
    }

    // Delete image file if exists
    if (service.image_url) {
      try {
        const imgPath = path.join(__dirname, '../' + service.image_url);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      } catch (e) {
        console.error('[cleanup] Error deleting image:', e.message);
      }
    }

    await Services.deleteService(id);
    res.json({ ok: true, message: 'Layanan berhasil dihapus' });
  } catch (err) {
    console.error('[services:delete]', err);
    res.status(500).json({ error: 'Gagal menghapus layanan' });
  }
});

module.exports = router;
