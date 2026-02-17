import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NewsDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH NEWS
  useEffect(() => {

    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((result) => {

        const allNews = Array.isArray(result.data)
          ? result.data
          : [];

        const selectedNews = allNews.find(
          (item) => String(item.id) === String(id)
        );

        setNews(selectedNews || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch news detail error:", err);
        setLoading(false);
      });

  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Loading berita...</p>;
  }

  if (!news) {
    return <p className="text-center mt-20">Berita Tidak Ditemukan</p>;
  }

  return (
    <div className="min-h-screen bg-white font-serif">

      <Navbar />

      {/* Header Section */}
      <section className="mt-16 bg-[#f5f7f6] py-10 px-6">

        <div className="max-w-6xl mx-auto">

          {/* Back + Breadcrumb */}
          <div className="flex justify-between items-center mb-8">

            <button
              onClick={() => navigate(-1)}
              className="bg-[#3d4f45] text-white px-6 py-2 rounded-full text-sm"
            >
              KEMBALI
            </button>

            <div className="text-sm text-gray-500">
              Berita » {news.title}
            </div>

          </div>

          {/* Cover Image */}
          <div className="w-full h-96 rounded-xl overflow-hidden">
            <img
              src={
                news.cover_url
                  ? `http://localhost:5000${news.cover_url}`
                  : "/no-image.jpg"
              }
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </section>

      {/* Content */}
      <section className="py-12 px-6 bg-white">

        <div className="max-w-4xl mx-auto">

          {/* Label */}
          <p className="text-xs text-gray-500 tracking-wider mb-2">
            BERITA {news.id}
          </p>

          {/* Title */}
          <h1 className="text-4xl text-[#3d4f45] mb-6 font-light">
            {news.title}
          </h1>

          {/* Summary */}
          {news.summary && (
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {news.summary}
            </p>
          )}

          {/* Body */}
          <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line space-y-4">
            {news.body}
          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}
