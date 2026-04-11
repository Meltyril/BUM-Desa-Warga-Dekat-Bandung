import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
import BillboardCarousel from "./BillboardCarousel";
import { fetchNewsList } from "../src/api/newsApi";
import { fetchArticlesList } from "../src/api/articlesApi";

export default function News({ isAdmin, AdminSection }) {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError('');
        const [newsRes, articlesRes] = await Promise.all([
          fetchNewsList({ pageSize: 50 }),
          fetchArticlesList({ pageSize: 50 }),
        ]);

        const newsData = (newsRes.data || []).map(n => ({ ...n, __source: 'news' }));
        const articlesData = (articlesRes.data || []).map(a => ({ ...a, __source: 'article' }));

        const combined = [...newsData, ...articlesData].map(item => ({
          ...item,
          _published_at: item.published_at || item.created_at || null,
        })).sort((a, b) => {
          const da = a._published_at ? new Date(a._published_at).getTime() : 0;
          const db = b._published_at ? new Date(b._published_at).getTime() : 0;
          return db - da;
        });

        setNewsItems(combined);
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

      {/* Hero Section with Billboard Carousel */}
      <section className="relative h-96 flex items-center justify-center mt-16">
        {/* Billboard Carousel as background */}
        <div className="absolute inset-0">
          <BillboardCarousel />
        </div>
        
        {/* Overlay text */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl text-white mb-4 font-light">
              Berita & Artikel
            </h1>
            <p className="text-gray-100 max-w-2xl mx-auto text-sm leading-relaxed">
              Informasi terkini dan artikel seputar kegiatan BUM Desa Warga Dekat
              Bandung
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-[#3d4f45] font-light">
            Berita dan Artikel Terkini
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
              {newsItems.map((item) => (
                <div
                  key={`${item.__source}-${item.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100"
                >
                  {item.cover_url || item.image_url ? (
                    <img src={`http://localhost:5000${item.cover_url || item.image_url}`} alt={item.title} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="bg-[#b8c5ba] h-48 relative">
                      <div className="absolute top-8 left-8 w-12 h-12 bg-[#a8b5aa] rounded-full"></div>
                      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-xs text-gray-500 mb-2">
                      {item._published_at ? new Date(item._published_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Tanpa tanggal'}
                    </p>
                    <h3 className="text-xl mb-3 text-[#3d4f45]">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.summary || item.body?.substring(0, 150) || 'Tidak ada ringkasan'}
                    </p>
                    <Link
                      to={item.__source === 'news' ? `/news/${encodeURIComponent(item.slug)}` : `/articles/${encodeURIComponent(item.slug)}`}
                      className="text-sm text-[#3d4f45] hover:underline"
                    >
                      Baca Selengkapnya →
                    </Link>
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
