import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/adminApi';
import { setToken, getToken } from '../utils/auth';
import Navbar from './Navbar';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Redirect kalau sudah login
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // ✅ Validasi sederhana
    if (!email || !password) {
      setError('Email dan password wajib diisi');
      return;
    }

    setLoading(true);

    try {
      const res = await loginAdmin({ email, password });

      if (!res.token) {
        throw new Error('Token tidak ditemukan');
      }

      setToken(res.token);
      navigate('/admin');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Login gagal. Periksa kembali akun Anda.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#b8c5ba] pt-24 pb-12">
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-semibold mb-4 text-[#3d4f45]">
            Admin Login
          </h1>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm text-[#3d4f45]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <label className="block mb-2 text-sm text-[#3d4f45]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
                required
              />
              <span
                className="absolute right-3 top-3 text-sm cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3d4f45] text-white py-2 rounded hover:bg-[#4a5a50] transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}