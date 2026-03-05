import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { fetchArticleDetail } from '../src/api/articlesApi';

export default function ArticleDetail({ isAdmin, AdminSection }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetchArticleDetail(slug);
        setArticle(res);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Gagal memuat artikel');
      } finally { 
        setLoading(false); 
      }
    }
    load();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">Memuat...</main>
      <Footer/>
    </div>
  );

  if (error) return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 text-red-600">{error}</main>
      <Footer/>
    </div>
  );

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
        {article.image_url && (
          <img 
            src={`http://localhost:5000${article.image_url}`}
            alt={article.title} 
            className="w-full h-80 object-cover rounded-lg mb-12"
          />
        )}

        {/* Meta Info */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            {article.published_at 
              ? new Date(article.published_at).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : (article.created_at 
                ? new Date(article.created_at).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : '')} 
            {' • '}
            <span className="capitalize font-medium">Artikel</span>
          </p>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-light text-[#3d4f45] mb-10 leading-tight">
          {article.title}
        </h1>

        {/* Body Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <div 
            className="font-serif text-base md:text-lg text-gray-700 leading-8 space-y-6"
            dangerouslySetInnerHTML={{ 
              __html: article.body.split('\n\n').map(p => `<p>${p}</p>`).join('')
            }} 
          />
        </div>
      </main>
      
      {isAdmin && (
        <div className="max-w-4xl mx-auto px-6 pb-8">
          <hr className="my-8 border-gray-200" />
          <AdminSection />
        </div>
      )}

      <Footer />
    </div>
  );
}
