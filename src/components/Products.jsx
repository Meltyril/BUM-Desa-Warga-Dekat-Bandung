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
      <section className="relative h-96 bg-[#b8c5ba] flex items-center justify-center mt-16">
        <div className="absolute top-1/4 w-32 h-32 bg-[#a8b5aa] rounded-full opacity-60"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-[#3d4f45] mb-4 font-light">
            Produk Kami
          </h1>
          <p className="text-[#4a5a50] max-w-2xl mx-auto text-sm leading-relaxed">
            Berbagai produk berkualitas hasil karya masyarakat desa dengan
            standar profesional untuk kemajuan bersama. Setiap produk adalah
            wujud dedikasi untuk mengembangkan potensi lokal.
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent"></div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-4 text-[#3d4f45] font-light">
            Koleksi Produk
          </h2>
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
                    ? "bg-[#3d4f45] text-white"
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
                <div className="bg-[#b8c5ba] w-full md:w-1/2 h-64 relative flex-shrink-0 rounded-lg">
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#a8b5aa] rounded-full"></div>
                  <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent rounded-b-lg"></div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-2 tracking-wider">
                    {product.category}
                  </p>
                  <h3 className="text-2xl mb-4 text-[#3d4f45]">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <button className="bg-[#3d4f45] text-white px-6 py-2 rounded-full text-sm hover:bg-[#4a5a50] transition">
                    DETAIL PRODUK
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-6 bg-[#f5f7f6]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl mb-4 text-[#3d4f45] font-light">
            Informasi Pemesanan
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Semua Produk Kami Dibuat Dengan Berkualitas Tinggi Dan Diproses
            Lokal Yang Terampil. Kami Menerima Pesanan Dalam Jumlah Besar Maupun
            Retail.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Untuk Informasi Lebih Lanjut Tentang Pemesanan, Harga, Atau
            Kustomisasi Produk, Silakan Hubungi WhatsApp Kami.
          </p>
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
