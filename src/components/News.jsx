import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchAdminNewsList } from "../src/api/newsApi";

export default function News({ isAdmin, AdminSection }) {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError('');
        const response = await fetchAdminNewsList({ pageSize: 50, status: 'published' });
        setNewsItems(response.data || []);
      } catch (err) {
        console.error('Error loading news:', err);
        setError('Gagal memuat berita');
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 bg-[#b8c5ba] flex items-center justify-center mt-16">
        <div className="absolute top-1/4 w-32 h-32 bg-[#a8b5aa] rounded-full opacity-60"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-[#3d4f45] mb-4 font-light">
            Berita & Artikel
          </h1>
          <p className="text-[#4a5a50] max-w-2xl mx-auto text-sm leading-relaxed">
            Informasi terkini dan artikel seputar kegiatan BUM Desa Warga Dekat
            Bandung
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent"></div>
      </section>

      {/* News Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-[#3d4f45] font-light">
            Berita Terkini
          </h2>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Sedang memuat berita...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && newsItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Belum ada berita yang dipublikasikan</p>
            </div>
          )}

          {/* News Grid */}
          {!loading && newsItems.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              {newsItems.map((news) => (
                <div
                  key={news.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100"
                >
                  <div className="bg-[#b8c5ba] h-48 relative">
                    <div className="absolute top-8 left-8 w-12 h-12 bg-[#a8b5aa] rounded-full"></div>
                    <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-gray-500 mb-2">
                      {news.created_at ? new Date(news.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Tanpa tanggal'}
                    </p>
                    <h3 className="text-xl mb-3 text-[#3d4f45]">{news.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {news.summary || news.body?.substring(0, 150) || 'Tidak ada ringkasan'}
                    </p>
                    <button className="text-sm text-[#3d4f45] hover:underline">
                      Baca Selengkapnya →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && newsItems.length > 6 && (
            <div className="text-center mt-12">
              <button className="bg-[#3d4f45] text-white px-8 py-3 rounded-full text-sm hover:bg-[#4a5a50] transition">
                MUAT LEBIH BANYAK
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Admin Section */}
      {isAdmin && (
        <div className="max-w-6xl mx-auto px-6 pb-8">
          <hr className="my-8 border-gray-200" />
          <AdminSection />
        </div>
      )}

      <Footer />
    </div>
  );
}
