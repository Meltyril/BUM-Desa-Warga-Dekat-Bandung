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
    <div className="min-h-screen bg-white font-serif">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="text-sm text-[#3d4f45] hover:underline">← Kembali</button>
        </div>

        <h1 className="text-4xl mb-4 text-[#3d4f45] font-light">{item.title}</h1>
        <p className="text-xs text-gray-500 mb-6">{item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID') : (item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : '')} • {type === 'news' ? 'Berita' : 'Artikel'}</p>

        {item.image_url && (<img src={item.image_url} alt={item.title} className="w-full mb-6 rounded" />)}

        <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: item.body }} />
      </main>
      <Footer />
    </div>
  );
}
