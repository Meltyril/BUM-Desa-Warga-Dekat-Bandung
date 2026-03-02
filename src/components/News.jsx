import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";


export default function News({ isAdmin, AdminSection }) {

  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH NEWS FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((result) => {
        setNewsItems(Array.isArray(result.data) ? result.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch news error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 bg-[#b8c5ba] flex items-center justify-center mt-16">
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-[#3d4f45] mb-4 font-light">
            Berita & Artikel
          </h1>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl text-center mb-12 text-[#3d4f45] font-light">
            Berita Terkini
          </h2>

          {loading ? (
            <p className="text-center">Loading berita...</p>
          ) : newsItems.length === 0 ? (
            <p className="text-center">Belum ada berita</p>
          ) : (

            <div className="grid md:grid-cols-3 gap-8">

              {newsItems.map((news) => (

                <div
                  key={news.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100"
                >

                  {/* Image */}
                  <div className="h-48 relative overflow-hidden">

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

                  <div className="p-6">

                    <p className="text-xs text-gray-500 mb-2">
                      {news.published_at
                        ? new Date(news.published_at).toLocaleDateString("id-ID")
                        : ""}
                    </p>

                    <h3 className="text-xl mb-3 text-[#3d4f45]">
                      {news.title}
                    </h3>

                    {/* Summary */}
                    {news.summary && (
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {news.summary}
                    </p>
                    )}
                  
                    <Link to={`/news/${news.id}`}
                    className="text-sm text-[#3d4f45] hover:underline"
                    >
                      Baca Selengkapnya →
                    </Link>



                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
      </section>

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
