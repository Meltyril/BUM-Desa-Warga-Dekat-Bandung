//AboutUsPage.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function AboutUs({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="min-h-screen bg-white font-serif">
      {/* Navigation */}
      <nav className="bg-gray-900 text-white px-6 py-4 fixed w-full top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white"></div>
            <span className="text-sm tracking-wider">WARGA DEKAT BANDUNG</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-xs tracking-wider">
            <button
              onClick={() => handleNavClick("Home")}
              className="hover:text-gray-300"
            >
              HOME
            </button>
            <button
              onClick={() => handleNavClick("About Us")}
              className="hover:text-gray-300 border-b-2 border-white"
            >
              ABOUT US
            </button>
            <button
              onClick={() => handleNavClick("Projects")}
              className="hover:text-gray-300"
            >
              PROJECTS
            </button>
            <button
              onClick={() => handleNavClick("Services")}
              className="hover:text-gray-300"
            >
              SERVICES
            </button>
            <button
              onClick={() => handleNavClick("News")}
              className="hover:text-gray-300"
            >
              NEWS
            </button>
            <button
              onClick={() => handleNavClick("Contact")}
              className="hover:text-gray-300"
            >
              CONTACT
            </button>
          </div>

          <button
            onClick={() => handleNavClick("Share")}
            className="hidden md:block border border-white px-6 py-2 text-xs tracking-wider hover:bg-white hover:text-gray-900 transition"
          >
            ORDER
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 mt-4 pb-4">
            <div className="flex flex-col space-y-4 text-xs tracking-wider">
              <button
                onClick={() => handleNavClick("Home")}
                className="text-left px-4 hover:text-gray-300"
              >
                HOME
              </button>
              <button
                onClick={() => handleNavClick("About Us")}
                className="text-left px-4 hover:text-gray-300"
              >
                ABOUT US
              </button>
              <button
                onClick={() => handleNavClick("Projects")}
                className="text-left px-4 hover:text-gray-300"
              >
                PROJECTS
              </button>
              <button
                onClick={() => handleNavClick("Services")}
                className="text-left px-4 hover:text-gray-300"
              >
                SERVICES
              </button>
              <button
                onClick={() => handleNavClick("News")}
                className="text-left px-4 hover:text-gray-300"
              >
                NEWS
              </button>
              <button
                onClick={() => handleNavClick("Contact")}
                className="text-left px-4 hover:text-gray-300"
              >
                CONTACT
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-80 bg-gray-300 flex items-center justify-center mt-16">
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-400 rounded-full"></div>
        <h1 className="text-4xl md:text-5xl text-gray-700 z-10">
          Tentang Kami
        </h1>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-6">Selamat Datang</h2>
          <h3 className="text-2xl mb-4">Di</h3>
          <h2 className="text-3xl mb-8">BUM Desa Warga Dekat Bandung</h2>
          <p className="text-gray-600 leading-relaxed text-sm mb-6">
            BUM Desa (Badan Usaha Milik Desa) adalah lembaga usaha desa yang
            dikelola oleh masyarakat dan pemerintah desa dalam upaya memperkuat
            perekonomian desa dan dibentuk berdasarkan kebutuhan dan potensi
            desa. Tujuan dari BUM Desa adalah untuk meningkatkan pendapatan
            masyarakat dan pendapatan asli desa melalui berbagai program dan
            layanan yang kami tawarkan.
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm hover:bg-gray-800 transition mt-4">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-3xl mb-6 text-center">VISI KAMI</h2>
            <p className="text-gray-600 leading-relaxed text-sm text-center">
              Menjadi BUM Desa yang mandiri, profesional, dan terpercaya dalam
              mengembangkan potensi ekonomi desa untuk kesejahteraan masyarakat.
              Kami berkomitmen untuk menciptakan lapangan kerja dan meningkatkan
              kualitas hidup warga desa melalui pengelolaan usaha yang
              berkelanjutan dan inovatif.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-3xl mb-6 text-center">MISI KAMI</h2>
            <p className="text-gray-600 leading-relaxed text-sm text-center">
              Mengembangkan usaha ekonomi produktif yang berbasis potensi lokal,
              memberikan pelayanan terbaik kepada masyarakat, menciptakan
              lapangan kerja bagi warga desa, dan meningkatkan pendapatan asli
              desa melalui berbagai unit usaha yang dikelola secara profesional
              dan transparan.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12">Layanan Kami</h2>
          <p className="text-gray-600 text-center mb-12 text-sm max-w-3xl mx-auto leading-relaxed">
            Lorem Ipsum Dolor Sit Amet. Consectetur Adipiscing Elit. Sed Do
            Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="text-xl mb-3">Layanan {item}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lorem Ipsum Dolor Sit Amet. Consectetur Adipiscing Elit. Sed
                  Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.
                  Ut Enim Ad Minim Veniam Quis Nostrud Exercitation.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12">Nilai - Nilai Kami</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="text-6xl mb-4">01</div>
              <h3 className="text-2xl mb-3">Nilai 1</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem Ipsum Dolor Sit Amet. Consectetur Adipiscing Elit.
                Incididunt Ut Labore Et Dolore Magna Aliqua.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">02</div>
              <h3 className="text-2xl mb-3">Nilai 2</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem Ipsum Dolor Sit Amet. Consectetur Adipiscing Elit.
                Incididunt Ut Labore Et Dolore Magna Aliqua.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">03</div>
              <h3 className="text-2xl mb-3">Nilai 3</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem Ipsum Dolor Sit Amet. Consectetur Adipiscing Elit.
                Incididunt Ut Labore Et Dolore Magna Aliqua.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">04</div>
              <h3 className="text-2xl mb-3">Nilai 4</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem Ipsum Dolor Sit Amet. Consectetur Adipiscing Elit.
                Incididunt Ut Labore Et Dolore Magna Aliqua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Tentang Kami</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavClick("Home")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("About")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("Products")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("Contact")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Hubungi Kami</h3>
            <p className="text-gray-600 text-sm">
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
            <h3 className="font-bold mb-4">Lokasi</h3>
            <div className="bg-gray-300 h-32 rounded"></div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-300 text-center text-gray-600 text-sm">
          © 2024 BUM Desa Warga Dekat Bandung. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
