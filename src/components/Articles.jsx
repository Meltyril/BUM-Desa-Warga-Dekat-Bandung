import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { fetchArticlesList } from '../src/api/articlesApi';

export default function Articles() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetchArticlesList({ pageSize: 50 });
        setItems(res.data || []);
      } catch (err) {
        console.error('Error loading articles:', err);
        setError('Gagal memuat artikel');
      } finally { setLoading(false); }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-[#3d4f45] mb-4">Artikel</h1>
        {loading && <p>Memuat artikel...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && items.length === 0 && <p>Belum ada artikel.</p>}
        <div className="space-y-4">
          {items.map(a => (
            <article key={a.id} className="p-4 border rounded bg-white">
              <h2 className="font-medium text-[#3d4f45]">{a.title}</h2>
              <p className="text-xs text-gray-500">{a.published_at ? new Date(a.published_at).toLocaleDateString('id-ID') : ''}</p>
              <p className="mt-2 text-gray-700">{a.summary || a.body?.substring(0,200)}</p>
              <a className="text-[#3d4f45] hover:underline" href={`/articles/${a.slug}`}>Baca selengkapnya</a>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
