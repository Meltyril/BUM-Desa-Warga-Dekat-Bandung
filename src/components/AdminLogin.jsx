import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../src/api/adminApi';
import { setToken, setAdminInfo } from '../utils/auth';
import Navbar from './Navbar';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginAdmin({ email, password });
      setToken(res.token);
      setAdminInfo(res.admin);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#b8c5ba] pt-24 pb-12">
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-semibold mb-4 text-[#3d4f45]">Admin Login</h1>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm text-[#3d4f45]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <label className="block mb-2 text-sm text-[#3d4f45]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#3d4f45] text-white py-2 rounded hover:bg-[#4a5a50] transition"
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
