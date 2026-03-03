// backend/routes/categories.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../models/categories.model');

// List all categories (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const categories = await listCategories();
    res.json({ data: categories });
  } catch (err) {
    console.error('[categories:list]', err);
    res.status(500).json({ message: 'Gagal fetch categories' });
  }
});

// Get category detail (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ message: 'ID tidak valid' });
    }

    const category = await getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category tidak ditemukan' });
    }

    res.json({ data: category });
  } catch (err) {
    console.error('[categories:detail]', err);
    res.status(500).json({ message: 'Gagal fetch category' });
  }
});

// Create category (admin & product_manager)
router.post('/', auth, authorize('admin', 'product_manager'), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Nama category wajib diisi' });
    }

    const categoryId = await createCategory({
      name: name.trim(),
      description: description ? description.trim() : null,
    });

    res.status(201).json({
      message: 'Category berhasil dibuat',
      id: categoryId,
      name: name.trim(),
      description,
    });
  } catch (err) {
    console.error('[categories:create]', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Nama category sudah ada' });
    }
    res.status(500).json({ message: 'Gagal membuat category' });
  }
});

// Update category (admin & product_manager)
router.put('/:id', auth, authorize('admin', 'product_manager'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    if (!Number.isFinite(id)) {
      return res.status(400).json({ message: 'ID tidak valid' });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Nama category wajib diisi' });
    }

    // Check if exists
    const existing = await getCategoryById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Category tidak ditemukan' });
    }

    await updateCategory(id, {
      name: name.trim(),
      description: description ? description.trim() : null,
    });

    res.json({
      message: 'Category berhasil diperbarui',
      id,
      name: name.trim(),
      description,
    });
  } catch (err) {
    console.error('[categories:update]', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Nama category sudah ada' });
    }
    res.status(500).json({ message: 'Gagal update category' });
  }
});

// Delete category (admin & product_manager)
router.delete('/:id', auth, authorize('admin', 'product_manager'), async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isFinite(id)) {
      return res.status(400).json({ message: 'ID tidak valid' });
    }

    const existing = await getCategoryById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Category tidak ditemukan' });
    }

    const success = await deleteCategory(id);
    if (!success) {
      return res.status(500).json({ message: 'Gagal hapus category' });
    }

    res.json({ message: 'Category berhasil dihapus' });
  } catch (err) {
    console.error('[categories:delete]', err);
    res.status(500).json({ message: 'Gagal hapus category' });
  }
});

module.exports = router;
