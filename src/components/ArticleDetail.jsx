import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { fetchArticleDetail } from '../src/api/articlesApi';
import { useParams } from 'react-router-dom';

export default function ArticleDetail() {
  const { slug } = useParams();
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
      } finally { setLoading(false); }
    }
    load();
  }, [slug]);

  if (loading) return <div className="min-h-screen"><Navbar /><main className="max-w-4xl mx-auto p-6">Memuat...</main><Footer/></div>;
  if (error) return <div className="min-h-screen"><Navbar /><main className="max-w-4xl mx-auto p-6 text-red-600">{error}</main><Footer/></div>;

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-[#3d4f45] mb-2">{article.title}</h1>
        <p className="text-xs text-gray-500 mb-4">{article.published_at ? new Date(article.published_at).toLocaleDateString('id-ID') : ''}</p>
        {article.image_url && (<img src={`http://localhost:5000${article.image_url}`} alt={article.title} className="w-full mb-4 rounded" />)}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.body }} />
      </main>
      <Footer />
    </div>
  );
}
