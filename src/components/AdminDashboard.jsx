import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchAdminProfile } from '../src/api/adminApi';
import { getToken, removeToken } from '../utils/auth';
import Navbar from './Navbar';

export default function AdminDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const token = getToken();
      if (!token) {
        navigate('/admin/login');
        return;
      }
      try {
        const res = await fetchAdminProfile(token);
        setProfile(res.admin || res);
      } catch (err) {
        // jika token invalid, arahkan ke login
        removeToken();
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  if (loading) return <div className="mt-24 text-center">Memuat...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f5f7f6] pt-24 pb-12">
        <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-[#3d4f45]">Admin Dashboard</h1>
            <button
              className="bg-[#3d4f45] text-white text-sm px-3 py-1 rounded hover:bg-[#4a5a50] transition"
              onClick={() => {
                removeToken();
                navigate('/admin/login');
              }}
            >
              Logout
            </button>
          </div>

          {profile ? (
            <div>
              <p className="mb-1">ID: <strong>{profile.id}</strong></p>
              <p className="mb-1">Email: <strong>{profile.email}</strong></p>
              <p className="mb-1">Username: <strong>{profile.username}</strong></p>
            </div>
          ) : (
            <div>Tidak ada data profil</div>
          )}

          <hr className="my-6" />

          <div>
            <h2 className="font-medium mb-2 text-[#3d4f45]">Quick Links</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link to="/admin/users" className="block p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg transition">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#3d4f45] text-white rounded flex items-center justify-center mr-4">U</div>
                  <div>
                    <div className="text-sm text-gray-500">Pengguna</div>
                    <div className="font-medium text-[#3d4f45]">Kelola Pengguna</div>
                  </div>
                </div>
              </Link>

              <Link to="/admin/posts" className="block p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg transition">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#3d4f45] text-white rounded flex items-center justify-center mr-4">P</div>
                  <div>
                    <div className="text-sm text-gray-500">Konten</div>
                    <div className="font-medium text-[#3d4f45]">Kelola Konten</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
