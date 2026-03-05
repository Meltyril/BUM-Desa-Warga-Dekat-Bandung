import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NewsDetail({ isAdmin, AdminSection }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {/* Back Button */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="text-sm text-[#3d4f45] hover:text-[#4a5a50] transition flex items-center gap-1"
          >
            ← Kembali
          </button>
        </div>

        {/* Featured Image */}
        <div className="bg-[#b8c5ba] w-full h-80 rounded-lg relative mb-12">
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#a8b5aa] rounded-full"></div>
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent rounded-b-lg"></div>
        </div>

        {/* Meta Info */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            01 Desember 2025 
            {' • '}
            <span className="font-medium">Berita</span>
          </p>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-light text-[#3d4f45] mb-10 leading-tight">
          Judul Lengkap Berita 1
        </h1>

        {/* Body Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <div className="font-serif text-base md:text-lg text-gray-700 leading-8 space-y-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <h2 className="text-2xl font-light text-[#3d4f45] mt-8">
              Subjudul Artikel
            </h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>Point pertama dari artikel ini</li>
              <li>Point kedua yang penting untuk diperhatikan</li>
              <li>Point ketiga sebagai kesimpulan</li>
            </ul>
          </div>
        </div>
      </main>

      {isAdmin && (
        <div className="max-w-4xl mx-auto px-6 pb-8">
          <hr className="my-8 border-gray-200" />
          <AdminSection />
        </div>
      )}

      <Footer />
    </div>
  );
}
