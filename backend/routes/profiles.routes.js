// backend/routes/profiles.routes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');
const Profiles = require('../models/profiles.model');

// List all profiles (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const profiles = await Profiles.listProfiles();
    res.json({ data: profiles });
  } catch (err) {
    console.error('[profiles:list]', err);
    res.status(500).json({ error: 'Gagal fetch profiles' });
  }
});

// Get profile by ID (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: 'ID tidak valid' });
    }

    const profile = await Profiles.getProfileById(id);
    if (!profile) {
      return res.status(404).json({ error: 'Profil tidak ditemukan' });
    }

    res.json(profile);
  } catch (err) {
    console.error('[profiles:detail]', err);
    res.status(500).json({ error: 'Gagal fetch profil' });
  }
});

// Create profile (admin only)
router.post('/', auth, authorize('admin'), upload.single('image'), async (req, res) => {
  try {
    console.log('[profiles:create] req.body:', req.body);
    console.log('[profiles:create] req.file:', req.file);
    
    const { name, position, description, sort_order } = req.body;

    if (!name || !name.trim()) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Nama pengurus wajib diisi' });
    }

    const id = await Profiles.createProfile({
      name: name.trim(),
      position: position ? position.trim() : null,
      description: description ? description.trim() : null,
      image_url: req.file ? `/uploads/${req.file.filename}` : null,
      sort_order: sort_order ? Number(sort_order) : 999,
    });

    res.status(201).json({ id, message: 'Profil berhasil ditambahkan' });
  } catch (err) {
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.error('[cleanup] Error deleting file:', e.message);
      }
    }
    console.error('[profiles:create] Error:', err.message, err.code);
    if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW') {
      return res.status(400).json({ error: 'Reference error' });
    }
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Profil sudah ada' });
    }
    res.status(500).json({ error: 'Gagal membuat profil: ' + err.message });
  }
});

// Update profile (admin only)
router.put('/:id', auth, authorize('admin'), upload.single('image'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'ID tidak valid' });
    }

    const { name, position, description, sort_order } = req.body;

    if (name && !name.trim()) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Nama pengurus tidak boleh kosong' });
    }

    // Check if profile exists
    const existing = await Profiles.getProfileById(id);
    if (!existing) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Profil tidak ditemukan' });
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

    await Profiles.updateProfile(id, {
      name: name ? name.trim() : undefined,
      position: position ? position.trim() : undefined,
      description: description ? description.trim() : undefined,
      image_url: req.file ? `/uploads/${req.file.filename}` : undefined,
      sort_order: sort_order !== undefined ? Number(sort_order) : undefined,
    });

    res.json({ ok: true, message: 'Profil berhasil diperbarui' });
  } catch (err) {
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.error('[cleanup] Error deleting file:', e.message);
      }
    }
    console.error('[profiles:update]', err);
    res.status(500).json({ error: 'Gagal mengupdate profil' });
  }
});

// Delete profile (admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: 'ID tidak valid' });
    }

    const profile = await Profiles.getProfileById(id);
    if (!profile) {
      return res.status(404).json({ error: 'Profil tidak ditemukan' });
    }

    // Delete image file if exists
    if (profile.image_url) {
      try {
        const imgPath = path.join(__dirname, '../' + profile.image_url);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      } catch (e) {
        console.error('[cleanup] Error deleting image:', e.message);
      }
    }

    await Profiles.deleteProfile(id);
    res.json({ ok: true, message: 'Profil berhasil dihapus' });
  } catch (err) {
    console.error('[profiles:delete]', err);
    res.status(500).json({ error: 'Gagal menghapus profil' });
  }
});

module.exports = router;
