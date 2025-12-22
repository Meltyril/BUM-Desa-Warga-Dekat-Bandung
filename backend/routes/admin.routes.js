// backend/routes/admin.routes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const router = express.Router();

const {
  findAdminByEmail,
  updateResetToken,
  updatePassword
} = require('../models/admin.model');

const auth = require('../middleware/auth');


// =========================
// LOGIN UNTUK ADMIN
// =========================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi' });
    }

    const admin = await findAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // BUAT TOKEN JWT
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES || '1d'
      }
    );

    return res.json({
      message: 'Login berhasil',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        username: admin.username
      }
    });
  } catch (err) {
    console.error('[admin:login]', err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});


// =========================
// ENDPOINT TERPROTEKSI
// =========================
router.get('/profile', auth, (req, res) => {
  res.json({
    message: 'Ini halaman profil admin yang dilindungi token',
    admin: req.admin
  });
});


// =========================
// FORGOT PASSWORD
// =========================
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email wajib diisi' });
    }

    const admin = await findAdminByEmail(email);
    if (!admin) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }

    // buat token unik
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 menit

    await updateResetToken(admin.id, resetToken, expiresAt);

    return res.json({
      message: 'Token reset password berhasil dibuat',
      reset_token: resetToken,
      expires_at: expiresAt
    });

  } catch (error) {
    console.error('[admin:forgot-password]', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});


// =========================
// VERIFY RESET PASSWORD TOKEN (DAY 5 – STEP 1)
// =========================
router.get('/reset-password/verify', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Token wajib disertakan' });
    }

    const [rows] = await require('../db').pool.execute(
      'SELECT * FROM admins WHERE reset_token = ? LIMIT 1',
      [token]
    );

    const admin = rows[0];

    if (!admin) {
      return res.status(400).json({ message: 'Token tidak valid' });
    }

    if (new Date(admin.reset_expires) < new Date()) {
      return res.status(400).json({ message: 'Token sudah kadaluarsa' });
    }

    return res.json({
      message: 'Token valid',
      email: admin.email
    });

  } catch (err) {
    console.error('[admin:verify-token]', err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});


// =========================
// RESET PASSWORD
// =========================
router.post('/reset-password', async (req, res) => {
  try {
    const { token, new_password } = req.body;

    if (!token || !new_password) {
      return res.status(400).json({ message: 'Token dan password baru wajib diisi' });
    }

    // cari admin berdasarkan token
    const [rows] = await require('../db').pool.execute(
      'SELECT * FROM admins WHERE reset_token = ? LIMIT 1',
      [token]
    );

    const admin = rows[0];

    if (!admin) {
      return res.status(400).json({ message: 'Token tidak valid' });
    }

    if (new Date(admin.reset_expires) < new Date()) {
      return res.status(400).json({ message: 'Token sudah kadaluarsa' });
    }

    // hash password baru
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // update password → hapus token
    await updatePassword(admin.id, hashedPassword);

    return res.json({ message: 'Password berhasil direset' });

  } catch (error) {
    console.error('[admin:reset-password]', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});


module.exports = router;
