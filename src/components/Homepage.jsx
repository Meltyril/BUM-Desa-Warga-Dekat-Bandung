import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BillboardCarousel from "./BillboardCarousel";

export default function Homepage({ isAdmin, AdminSection }) {
  const [currentStaffIndex, setCurrentStaffIndex] = useState(0);

  const staffMembers = [
    { id: 1, name: "Staff 1", position: "Jabatan" },
    { id: 2, name: "Staff 2", position: "Jabatan" },
    { id: 3, name: "Staff 3", position: "Jabatan" },
    { id: 4, name: "Staff 4", position: "Jabatan" },
    { id: 5, name: "Staff 5", position: "Jabatan" },
  ];

  const newsItems = [
    {
      id: 1,
      title: "Berita 1",
      date: "01 Desember 2025",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      title: "Berita 2",
      date: "02 Desember 2025",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 3,
      title: "Berita 3",
      date: "03 Desember 2025",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ];

  const nextStaff = () => {
    setCurrentStaffIndex((prev) =>
      prev + 3 >= staffMembers.length ? 0 : prev + 1
    );
  };

  const prevStaff = () => {
    setCurrentStaffIndex((prev) =>
      prev === 0 ? Math.max(0, staffMembers.length - 3) : prev - 1
    );
  };

  const visibleStaff = staffMembers.slice(
    currentStaffIndex,
    currentStaffIndex + 3
  );

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Hero Section with Billboard Carousel */}
      <section className="relative h-screen flex items-center justify-center mt-16">
        {/* Billboard Carousel as background */}
        <div className="absolute inset-0">
          <BillboardCarousel fullHeight={true} />
        </div>
        
        {/* Overlay text */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-6xl text-white mb-4 font-light">
              Selamat Datang
            </h1>
            <p className="text-gray-100 max-w-2xl mx-auto text-sm leading-relaxed">
              Selamat Datang di BUM Desa Warga Dekat Bandung, 
              sebuah persembahan dari cinta kami pada alam dan keinginan untuk membagikan keajaiban potensi desa 
              serta kegiatan ekonomi yang berkelanjutan kepada Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-2 text-[#3d4f45] font-light">
            Selamat Datang
          </h2>
          <h3 className="text-2xl mb-6 text-[#3d4f45] font-light">Di</h3>
          <h2 className="text-3xl mb-8 text-[#3d4f45] font-light">
            BUM Desa Warga Dekat Bandung
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 text-sm">
            Kami Dengan bangga mempersembahkan produk-produk lokal unggulan dari Desa Warga Dekat Bandung.
            hasil karya masyarakat lokal yang berkualitas dan bernilai tinggi.
            Belanja di sini Anda ikut mendukung perekonomian desa serta keberlanjutan produk lokal.
          </p>
          <button className="bg-[#3d4f45] text-white px-8 py-3 rounded-full text-sm hover:bg-[#4a5a50] transition">
            ABOUT US
          </button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-[#f5f7f6]">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl mb-6 text-[#3d4f45] font-light">
            Mengapa Memilih Kami?
          </h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 text-center shadow-sm rounded-lg">
            <div className="text-5xl font-bold text-[#3d4f45] mb-4">8+</div>
            <p className="text-gray-600 text-sm">Tahun Pengalaman</p>
          </div>
          <div className="bg-white p-8 text-center shadow-sm rounded-lg">
            <div className="text-5xl font-bold text-[#3d4f45] mb-4">100%</div>
            <p className="text-gray-600 text-sm">Produk Lokal</p>
          </div>
          <div className="bg-white p-8 text-center shadow-sm rounded-lg">
            <div className="text-5xl font-bold text-[#3d4f45] mb-4">500+</div>
            <p className="text-gray-600 text-sm">Pelanggan Puas</p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-[#3d4f45] font-light">
            Sejarah Kami
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-[#b8c5ba] h-96 relative rounded-lg">
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#a8b5aa] rounded-full"></div>
              <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent rounded-b-lg"></div>
            </div>
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-[#3d4f45] text-white rounded flex items-center justify-center mr-4 text-xl font-bold">
                    20XX
                  </div>
                  <h3 className="text-xl font-semibold text-[#3d4f45]">
                    Berdirinya BUMDes
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  BUM Desa Warga Dekat Bandung didirikan dengan tujuan untuk
                  memberdayakan ekonomi desa dan meningkatkan kesejahteraan
                  masyarakat.
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-[#3d4f45] text-white rounded flex items-center justify-center mr-4 text-xl font-bold">
                    20XX
                  </div>
                  <h3 className="text-xl font-semibold text-[#3d4f45]">
                    Ekspansi Produk
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mengembangkan berbagai produk lokal unggulan yang berkualitas
                  tinggi dan diminati pasar.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-[#3d4f45] text-white rounded flex items-center justify-center mr-4 text-xl font-bold">
                    20XX
                  </div>
                  <h3 className="text-xl font-semibold text-[#3d4f45]">
                    Penghargaan Nasional
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mendapatkan pengakuan sebagai BUM Desa terbaik tingkat
                  nasional atas dedikasi dalam pemberdayaan masyarakat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-6 bg-[#f5f7f6]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-[#3d4f45] font-light">
            Produk Unggulan Kami
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="bg-[#b8c5ba] h-64 relative">
                  <div className="absolute top-12 left-12 w-16 h-16 bg-[#a8b5aa] rounded-full"></div>
                  <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-[#3d4f45] mb-2 tracking-wider">
                    PERTANIAN
                  </div>
                  <h3 className="text-2xl mb-4 text-[#3d4f45]">Kopi Puhu</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <button className="bg-[#3d4f45] text-white px-8 py-3 rounded-full text-sm hover:bg-[#4a5a50] transition">
                    DETAIL PRODUK
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-[#3d4f45] font-light">
            Pengurus BUM Desa
          </h2>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visibleStaff.map((staff) => (
                <div key={staff.id} className="text-center">
                  <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gray-300"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#3d4f45]">
                    {staff.name}
                  </h3>
                  <p className="text-sm text-gray-600">{staff.position}</p>
                </div>
              ))}
            </div>

            <button
              onClick={prevStaff}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <ChevronLeft size={24} className="text-[#3d4f45]" />
            </button>
            <button
              onClick={nextStaff}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <ChevronRight size={24} className="text-[#3d4f45]" />
            </button>
          </div>

          <div className="text-center mt-12">
            <button className="text-sm text-[#3d4f45] hover:underline">
              Lihat Semua
            </button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-6 bg-[#f5f7f6]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-[#3d4f45] font-light">
            Berita Terkini
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="bg-[#b8c5ba] h-48 relative">
                  <div className="absolute top-8 left-8 w-12 h-12 bg-[#a8b5aa] rounded-full"></div>
                  <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent"></div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-2">{news.date}</p>
                  <h3 className="text-xl mb-3 text-[#3d4f45]">{news.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {news.description}
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

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#b8c5ba]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-6 text-[#3d4f45] font-light">
            Tertarik Bergabung dengan Kami?
          </h2>
          <p className="text-[#4a5a50] mb-8 text-sm leading-relaxed max-w-2xl mx-auto">
            Vipat bergabung dengan Kami kita dapat tumbuh bersama dan saling
            tumbuh kembangkan dari local. Hubungi kontak tim Anda dan pilih
            dengan tepat serta dapatkan info lengkapnya.
          </p>
          <button onClick={() => window.open("https://wa.me/6288290367299", "_blank")} 
          className="bg-[#3d4f45] text-white px-8 py-3 rounded-full text-sm hover:bg-[#4a5a50] transition">
            HUBUNGI KAMI
          </button>

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
