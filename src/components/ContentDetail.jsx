import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { fetchNewsDetail } from '../src/api/newsApi';
import { fetchArticleDetail } from '../src/api/articlesApi';

export default function ContentDetail({ isAdmin, AdminSection }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [type, setType] = useState(null); // 'news' | 'article'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError('');

        // Try news first
        try {
          const res = await fetchNewsDetail(slug);
          setItem(res);
          setType('news');
          return;
        } catch (err) {
          // ignore and try article
        }

        try {
          const res2 = await fetchArticleDetail(slug);
          setItem(res2);
          setType('article');
          return;
        } catch (err) {
          // nothing
        }

        setError('Konten tidak ditemukan');
      } catch (err) {
        console.error('Error loading content detail', err);
        setError('Gagal memuat konten');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) return (<div className="min-h-screen"><Navbar /><main className="max-w-4xl mx-auto p-6">Memuat...</main><Footer/></div>);
  if (error) return (<div className="min-h-screen"><Navbar /><main className="max-w-4xl mx-auto p-6 text-red-600">{error}</main><Footer/></div>);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {/* Back Button */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="text-sm text-[#3d4f45] hover:text-[#4a5a50] transition flex items-center gap-1"
          >
            ← Kembali
          </button>
        </div>

        {/* Image */}
        {(item.cover_url || item.image_url) && (
          <img 
            src={`http://localhost:5000${item.cover_url || item.image_url}`} 
            alt={item.title} 
            className="w-full h-80 object-cover rounded-lg mb-12"
          />
        )}

        {/* Meta Info */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            {item.published_at 
              ? new Date(item.published_at).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : (item.created_at 
                ? new Date(item.created_at).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : '')} 
            {' • '}
            <span className="capitalize font-medium">
              {type === 'news' ? 'Berita' : 'Artikel'}
            </span>
          </p>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-light text-[#3d4f45] mb-10 leading-tight">
          {item.title}
        </h1>

        {/* Body Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <div className="font-serif text-base md:text-lg text-gray-700 leading-8">
            {item.body
              .split(/\n\n+/)
              .filter(p => p.trim())
              .map((paragraph, idx) => (
                <p key={idx} className="mb-6 text-gray-700">
                  {paragraph.trim()}
                </p>
              ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
