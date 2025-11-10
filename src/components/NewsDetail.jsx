import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NewsDetail({ isAdmin, AdminSection }) {
  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Breadcrumb */}
      <section className="py-6 px-6 mt-16 bg-[#f5f7f6]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <button className="text-[#3d4f45] rounded-full bg-[#3d4f45] text-white px-4 py-1">
              KEMBALI
            </button>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="text-xs text-gray-500 tracking-wider">
              BERITA 1
            </span>
          </div>
          <h1 className="text-4xl mb-6 text-[#3d4f45] font-light">
            Judul Lengkap Berita 1
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
            <span>📅 01 Desember 2025</span>
            <span>•</span>
            <span>👤 Admin BUMDes</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#b8c5ba] h-96 rounded-lg relative">
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#a8b5aa] rounded-full"></div>
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent rounded-b-lg"></div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="prose max-w-none text-gray-600 text-sm leading-relaxed">
            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <h2 className="text-2xl mb-4 mt-8 text-[#3d4f45] font-light">
              Subjudul Artikel
            </h2>

            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Point pertama dari artikel ini</li>
              <li>Point kedua yang penting untuk diperhatikan</li>
              <li>Point ketiga sebagai kesimpulan</li>
            </ul>

            <p className="mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-semibold mb-4 text-[#3d4f45]">
              Bagikan Artikel
            </h3>
            <div className="flex gap-4">
              <button className="bg-[#3d4f45] text-white px-6 py-2 rounded-full text-sm hover:bg-[#4a5a50] transition">
                Share via WhatsApp
              </button>
              <button className="border border-[#3d4f45] text-[#3d4f45] px-6 py-2 rounded-full text-sm hover:bg-[#3d4f45] hover:text-white transition">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related News */}
      <section className="py-20 px-6 bg-[#f5f7f6]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-[#3d4f45] font-light">
            Berita Terkait
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="bg-[#b8c5ba] h-48 relative">
                  <div className="absolute top-8 left-8 w-12 h-12 bg-[#a8b5aa] rounded-full"></div>
                  <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent"></div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-2">
                    0{item} Desember 2025
                  </p>
                  <h3 className="text-xl mb-3 text-[#3d4f45]">Berita {item}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt.
                  </p>
                  <button className="text-sm text-[#3d4f45] hover:underline">
                    Baca Selengkapnya →
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
