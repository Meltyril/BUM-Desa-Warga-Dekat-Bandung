// backend/routes/users.routes.js
const express = require('express');
const router = express.Router();
const _bcryptjs = require('bcryptjs');
const bcrypt = {
  hash: (data, salt) => new Promise((resolve, reject) => _bcryptjs.hash(data, salt, (err, hashed) => err ? reject(err) : resolve(hashed))),
  compare: (data, hashed) => new Promise((resolve, reject) => _bcryptjs.compare(data, hashed, (err, res) => err ? reject(err) : resolve(res)))
};

const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const {
  listAllAdmins,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  findAdminById,
} = require('../models/admin.model');

// List all users (admin only)
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const users = await listAllAdmins();
    res.json({ data: users });
  } catch (err) {
    console.error('[users:list]', err);
    res.status(500).json({ message: 'Gagal fetch users' });
  }
});

// Create user (admin only)
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    // Validation
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Email, username, dan password wajib diisi' });
    }

    if (!['admin', 'product_manager', 'content_manager'].includes(role)) {
      return res.status(400).json({ message: 'Role tidak valid' });
    }

    // Check duplicate email
    const existing = await findAdminById(0); // dummy call
    try {
      const [rows] = await require('../db').pool.execute(
        'SELECT id FROM admins WHERE email = ? LIMIT 1',
        [email]
      );
      if (rows.length > 0) {
        return res.status(409).json({ message: 'Email sudah digunakan' });
      }
    } catch (e) {}

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const userId = await createAdminUser({
      email: email.toLowerCase().trim(),
      username: username.trim(),
      passwordHash,
      role: role.toLowerCase(),
    });

    res.status(201).json({
      message: 'User berhasil dibuat',
      userId,
      email,
      username,
      role,
    });
  } catch (err) {
    console.error('[users:create]', err);
    res.status(500).json({ message: 'Gagal membuat user' });
  }
});

// Update user (admin only)
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { email, username, role } = req.body;

    if (!userId || !Number.isFinite(userId)) {
      return res.status(400).json({ message: 'ID tidak valid' });
    }

    if (!email || !username) {
      return res.status(400).json({ message: 'Email dan username wajib diisi' });
    }

    if (role && !['admin', 'product_manager', 'content_manager'].includes(role)) {
      return res.status(400).json({ message: 'Role tidak valid' });
    }

    // Check user exists
    const user = await findAdminById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Check duplicate email (if email changed)
    if (email.toLowerCase() !== user.email.toLowerCase()) {
      try {
        const [rows] = await require('../db').pool.execute(
          'SELECT id FROM admins WHERE email = ? AND id != ? LIMIT 1',
          [email.toLowerCase(), userId]
        );
        if (rows.length > 0) {
          return res.status(409).json({ message: 'Email sudah digunakan' });
        }
      } catch (e) {}
    }

    // Update user
    await updateAdminUser(userId, {
      email: email.toLowerCase().trim(),
      username: username.trim(),
      role: role || user.role,
    });

    res.json({ message: 'User berhasil diperbarui' });
  } catch (err) {
    console.error('[users:update]', err);
    res.status(500).json({ message: 'Gagal update user' });
  }
});

// Reset password (admin only)
router.post('/:id/reset-password', auth, authorize('admin'), async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { password } = req.body;

    if (!userId || !Number.isFinite(userId)) {
      return res.status(400).json({ message: 'ID tidak valid' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password baru wajib diisi' });
    }

    // Check user exists
    const user = await findAdminById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 10);

    // Update password directly
    await require('../db').pool.execute(
      'UPDATE admins SET password = ? WHERE id = ?',
      [passwordHash, userId]
    );

    res.json({ message: 'Password berhasil direset' });
  } catch (err) {
    console.error('[users:reset-password]', err);
    res.status(500).json({ message: 'Gagal reset password' });
  }
});

// Delete user (admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const userId = Number(req.params.id);

    if (!userId || !Number.isFinite(userId)) {
      return res.status(400).json({ message: 'ID tidak valid' });
    }

    // Check user exists
    const user = await findAdminById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Prevent deleting self
    if (req.admin.id === userId) {
      return res.status(403).json({ message: 'Tidak bisa menghapus akun sendiri' });
    }

    // Delete user
    const success = await deleteAdminUser(userId);
    if (!success) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.json({ message: 'User berhasil dihapus' });
  } catch (err) {
    console.error('[users:delete]', err);
    res.status(500).json({ message: 'Gagal hapus user' });
  }
});

module.exports = router;
