import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

export default function HomePage({ onNavigate }) {
  const [currentStaffIndex, setCurrentStaffIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotImplemented, setShowNotImplemented] = useState(false);
  const [clickedPage, setClickedPage] = useState("");

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

  const handleNavClick = (page) => {
    setMobileMenuOpen(false);

    if (page === "About Us" && onNavigate) {
      onNavigate("About Us");
    } else if (page === "Projects" && onNavigate) {
      onNavigate("Projects");
    } else if (page === "Home" && onNavigate) {
      onNavigate("Home");
    } else {
      setClickedPage(page);
      setShowNotImplemented(true);
      setTimeout(() => setShowNotImplemented(false), 3000);
    }
  };

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
      {/* Notification */}
      {showNotImplemented && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Halaman "{clickedPage}" belum dibuat
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-gray-900 text-white px-4 sm:px-6 py-4 fixed w-full top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white"></div>
            <span className="text-xs sm:text-sm tracking-wider">
              WARGA DEKAT BANDUNG
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs tracking-wider">
            <button
              onClick={() => handleNavClick("Home")}
              className="hover:text-gray-300 transition border-b-2 border-white"
            >
              HOME
            </button>
            <button
              onClick={() => handleNavClick("About Us")}
              className="hover:text-gray-300 transition"
            >
              ABOUT US
            </button>
            <button
              onClick={() => handleNavClick("Projects")}
              className="hover:text-gray-300 transition"
            >
              PROJECTS
            </button>
            <button
              onClick={() => handleNavClick("Services")}
              className="hover:text-gray-300 transition"
            >
              SERVICES
            </button>
            <button
              onClick={() => handleNavClick("News")}
              className="hover:text-gray-300 transition"
            >
              NEWS
            </button>
            <button
              onClick={() => handleNavClick("Contact")}
              className="hover:text-gray-300 transition"
            >
              CONTACT
            </button>
          </div>

          <button
            onClick={() => handleNavClick("Share")}
            className="hidden lg:block border border-white px-4 xl:px-6 py-2 text-xs tracking-wider hover:bg-white hover:text-gray-900 transition"
          >
            SHARE
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-800 mt-4 pb-4 rounded-lg">
            <div className="flex flex-col space-y-4 text-xs tracking-wider">
              <button
                onClick={() => handleNavClick("Home")}
                className="text-left px-4 hover:text-gray-300 transition"
              >
                HOME
              </button>
              <button
                onClick={() => handleNavClick("About Us")}
                className="text-left px-4 hover:text-gray-300 transition"
              >
                ABOUT US
              </button>
              <button
                onClick={() => handleNavClick("Projects")}
                className="text-left px-4 hover:text-gray-300 transition"
              >
                PROJECTS
              </button>
              <button
                onClick={() => handleNavClick("Services")}
                className="text-left px-4 hover:text-gray-300 transition"
              >
                SERVICES
              </button>
              <button
                onClick={() => handleNavClick("News")}
                className="text-left px-4 hover:text-gray-300 transition"
              >
                NEWS
              </button>
              <button
                onClick={() => handleNavClick("Contact")}
                className="text-left px-4 hover:text-gray-300 transition"
              >
                CONTACT
              </button>
              <button
                onClick={() => handleNavClick("Share")}
                className="text-left px-4 hover:text-gray-300 transition"
              >
                SHARE
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen bg-gray-300 flex items-center justify-center pt-16">
        <div className="absolute top-1/4 w-20 h-20 sm:w-32 sm:h-32 bg-gray-400 rounded-full"></div>
        <div className="text-center z-10 px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-700 mb-4">
            Lorem Ipsum Dolor Sit Amet
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
      </section>

      {/* Welcome Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl mb-2">Selamat Datang</h2>
          <h3 className="text-xl sm:text-2xl mb-6">Di</h3>
          <h2 className="text-2xl sm:text-3xl mb-8">
            BUM Desa Warga Dekat Bandung
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 text-xs sm:text-sm">
            BUM Desa (Badan Usaha Milik Desa) adalah lembaga usaha desa yang
            dikelola oleh masyarakat dan pemerintah desa dalam upaya memperkuat
            perekonomian desa dan dibentuk berdasarkan kebutuhan dan potensi
            desa. Tujuan dari BUM Desa adalah untuk meningkatkan pendapatan
            masyarakat dan pendapatan asli desa.
          </p>
          <button
            onClick={() => handleNavClick("Selengkapnya")}
            className="bg-gray-900 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm hover:bg-gray-800 transition"
          >
            Selengkapnya
          </button>
        </div>
      </section>

      {/* History Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="bg-gray-300 h-64 sm:h-80 lg:h-96 relative order-2 md:order-1">
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-16 h-16 sm:w-24 sm:h-24 bg-gray-400 rounded-full"></div>
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl mb-6">Sejarah Kami</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-xs sm:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl text-center mb-8 sm:mb-12">
            Staff Desa
          </h2>
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {visibleStaff.map((staff) => (
                <div key={staff.id} className="text-center">
                  <div className="bg-gray-300 h-48 sm:h-56 lg:h-64 mb-4 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-28 sm:w-24 sm:h-32 bg-gray-400 rounded-full"></div>
                  </div>
                  <h3 className="text-base sm:text-lg">{staff.name}</h3>
                </div>
              ))}
            </div>

            {/* Navigation Arrows - Hidden on mobile */}
            <button
              onClick={prevStaff}
              className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextStaff}
              className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={() => handleNavClick("Lihat Semua Staff")}
              className="text-xs sm:text-sm underline hover:text-gray-600 transition"
            >
              Lihat Semua
            </button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl text-center mb-8 sm:mb-12">
            Berita Terkini
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="bg-gray-300 h-40 sm:h-48 relative">
                  <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 bg-gray-400 rounded-full"></div>
                  <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl mb-3">{news.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {news.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl mb-6">Online Booking</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm"
                  placeholder="Email Anda"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm mb-2">
                  Nomor Pendaftaran
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 px-3 sm:px-4 py-2 rounded-l text-xs sm:text-sm"
                    placeholder="123-456-7777"
                  />
                  <button
                    type="button"
                    className="bg-gray-200 px-3 sm:px-4 rounded-r hover:bg-gray-300 transition"
                  >
                    📋
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleNavClick("Booking")}
                className="bg-gray-900 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm hover:bg-gray-800 transition"
              >
                Kirim
              </button>
            </div>
          </div>

          <div className="bg-gray-300 h-64 sm:h-80 lg:h-96 relative order-1 md:order-2">
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-16 h-16 sm:w-24 sm:h-24 bg-gray-400 rounded-full"></div>
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="font-bold mb-4 text-sm sm:text-base">
              Tentang Kami
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm sm:text-base">Navigasi</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleNavClick("Home")}
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("Projects")}
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("Services")}
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("Contact")}
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm sm:text-base">
              Hubungi Kami
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Alamat: Desa Warga Dekat
              <br />
              Bandung, Indonesia
              <br />
              Email: info@bumdesa.com
              <br />
              Telp: (022) 1234-5678
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm sm:text-base">Lokasi</h3>
            <div className="bg-gray-300 h-24 sm:h-32 rounded"></div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-300 text-center text-gray-600 text-xs sm:text-sm">
          © 2024 BUM Desa Warga Dekat Bandung. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
