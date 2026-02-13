import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NewsDetail() {

  const { id } = useParams();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((result) => {

        const allNews = Array.isArray(result.data)
          ? result.data
          : [];

        // IMPORTANT → convert ID ke number
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

      {/* Cover Image */}
      <div className="mt-16 h-96 overflow-hidden">
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        <p className="text-sm text-gray-500 mb-3">
          {news.published_at
            ? new Date(news.published_at).toLocaleDateString("id-ID")
            : ""}
        </p>

        <h1 className="text-3xl text-[#3d4f45] mb-6">
          {news.title}
        </h1>

        {/* SUMMARY */}
        {news.summary && (
          <p className="mb-6 text-lg text-gray-700">
            {news.summary}
          </p>
        )}

        {/* CONTENT */}
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {news.content}
        </div>

      </div>

      <Footer />

    </div>
  );
}
