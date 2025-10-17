import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Homepage({ isAdmin, AdminSection }) {
  const [currentStaffIndex, setCurrentStaffIndex] = useState(0);

  const staffMembers = [
    { id: 1, name: "Staff Member 1" },
    { id: 2, name: "Staff Member 2" },
    { id: 3, name: "Staff Member 3" },
    { id: 4, name: "Staff Member 4" },
    { id: 5, name: "Staff Member 5" },
  ];

  const newsItems = [
    {
      id: 1,
      title: "Berita 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      title: "Berita 2",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 3,
      title: "Berita 3",
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

      {/* Hero Section */}
      <section className="relative h-screen bg-gray-300 flex items-center justify-center mt-16">
        <div className="absolute top-1/4 w-32 h-32 bg-gray-400 rounded-full"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-gray-700 mb-4">
            Lorem Ipsum Dolor Sit Amet
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-2">Selamat Datang</h2>
          <h3 className="text-2xl mb-6">Di</h3>
          <h2 className="text-3xl mb-8">BUM Desa Warga Dekat Bandung</h2>
          <p className="text-gray-600 leading-relaxed mb-8 text-sm">
            BUM Desa (Badan Usaha Milik Desa) adalah lembaga usaha desa yang
            dikelola oleh masyarakat dan pemerintah desa dalam upaya memperkuat
            perekonomian desa dan dibentuk berdasarkan kebutuhan dan potensi
            desa.
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm hover:bg-gray-800 transition">
            Selengkapnya
          </button>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-300 h-96 relative">
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-400 rounded-full"></div>
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
          </div>
          <div>
            <h2 className="text-3xl mb-6">Sejarah Kami</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12">Staff Desa</h2>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visibleStaff.map((staff) => (
                <div key={staff.id} className="text-center">
                  <div className="bg-gray-300 h-64 mb-4 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-32 bg-gray-400 rounded-full"></div>
                  </div>
                  <h3 className="text-lg">{staff.name}</h3>
                </div>
              ))}
            </div>

            <button
              onClick={prevStaff}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextStaff}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="text-center mt-12">
            <button className="text-sm underline hover:text-gray-600">
              Lihat Semua
            </button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12">Berita Terkini</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="bg-gray-300 h-48 relative">
                  <div className="absolute top-8 left-8 w-12 h-12 bg-gray-400 rounded-full"></div>
                  <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-3">{news.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {news.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl mb-6">Online Booking</h2>
            <p className="text-gray-600 mb-8 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-4 py-2 rounded text-sm"
                  placeholder="Email Anda"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Nomor Pendaftaran</label>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 px-4 py-2 rounded-l text-sm"
                    placeholder="123-456-7777"
                  />
                  <button
                    type="button"
                    className="bg-gray-200 px-4 rounded-r hover:bg-gray-300"
                  >
                    📋
                  </button>
                </div>
              </div>
              <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm hover:bg-gray-800 transition">
                Kirim
              </button>
            </div>
          </div>

          <div className="bg-gray-300 h-96 relative">
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-400 rounded-full"></div>
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
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
