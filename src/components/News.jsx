import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function News({ isAdmin, AdminSection }) {
  const newsItems = [
    {
      id: 1,
      title: "Berita 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 2,
      title: "Berita 2",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: 3,
      title: "Berita 3",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 4,
      title: "Berita 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 5,
      title: "Berita 5",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: 6,
      title: "Berita 6",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 bg-gray-300 flex items-center justify-center mt-16">
        <div className="absolute top-1/4 w-32 h-32 bg-gray-400 rounded-full"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-white mb-4">
            Berita & Artikel
          </h1>
          <p className="text-white max-w-2xl mx-auto text-sm leading-relaxed">
            Informasi terkini dan artikel seputar kegiatan BUM Desa Warga Dekat
            Bandung
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
      </section>

      {/* News Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12">Berita Terkini</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <div className="bg-gray-300 h-48 relative">
                  <div className="absolute top-8 left-8 w-12 h-12 bg-gray-400 rounded-full"></div>
                  <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-3">{news.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {news.description}
                  </p>
                  <button className="text-sm text-gray-900 hover:underline">
                    Baca Selengkapnya →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm hover:bg-gray-800 transition">
              MUAT LEBIH BANYAK
            </button>
          </div>
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
