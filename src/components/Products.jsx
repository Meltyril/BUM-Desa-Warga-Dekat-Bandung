import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Products({ isAdmin, AdminSection }) {
  const [activeCategory, setActiveCategory] = useState("SEMUA");

  const categories = ["SEMUA", "PERTANIAN", "KERAJINAN", "OLAHAN"];

  const products = [
    {
      id: 1,
      category: "PERTANIAN",
      name: "Kopi Puhu",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 2,
      category: "PERTANIAN",
      name: "Kopi Puhu",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 3,
      category: "PERTANIAN",
      name: "Kopi Puhu",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 4,
      category: "PERTANIAN",
      name: "Kopi Puhu",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 bg-gray-300 flex items-center justify-center mt-16">
        <div className="absolute top-1/4 w-32 h-32 bg-gray-400 rounded-full"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Produk Kami</h1>
          <p className="text-white max-w-2xl mx-auto text-sm leading-relaxed">
            Berbagai produk terbaharuan hasil karya masyarakat desa. Semuanya
            original profesional untuk kepuasan bersama. Setiap produk adalah
            untuk kembangkan produk lokal.
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-4">Koleksi Produk</h2>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Produk unggulan dari BUM Desa yang dikembangkan dengan standar
            kualitas
          </p>

          {/* Category Filters */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm transition ${
                  activeCategory === category
                    ? "bg-gray-900 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col md:flex-row gap-6">
                <div className="bg-gray-300 w-full md:w-1/2 h-64 relative flex-shrink-0">
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-400 rounded-full"></div>
                  <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-2xl mb-4">{product.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition">
                    DETAIL PRODUK
                  </button>
                </div>
              </div>
            ))}
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
