//ProductsPage.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Products({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("SEMUA");

  const categories = ["SEMUA", "PERTANIAN", "KERAJINAN", "OLAHAN"];

  const products = [
    {
      id: 1,
      category: "PERTANIAN",
      name: "Kopi Puhu",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
    {
      id: 2,
      category: "PERTANIAN",
      name: "Kopi Puhu",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
    {
      id: 3,
      category: "PERTANIAN",
      name: "Kopi Puhu",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
    {
      id: 4,
      category: "PERTANIAN",
      name: "Kopi Puhu",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
  ];

  const handleNavClick = (page) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const filteredProducts =
    activeCategory === "SEMUA"
      ? products
      : products.filter((p) => p.category === activeCategory);

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
              className="hover:text-gray-300"
            >
              ABOUT US
            </button>
            <button
              onClick={() => handleNavClick("Projects")}
              className="hover:text-gray-300 border-b-2 border-white"
            >
              PRODUCTS
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
            onClick={() => handleNavClick("Order")}
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
                onClick={() => handleNavClick("Products")}
                className="text-left px-4 hover:text-gray-300"
              >
                PRODUCTS
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
      <section className="relative h-96 bg-gray-300 flex items-center justify-center mt-16">
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gray-400 rounded-full"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-gray-700 mb-4">
            Produk Kami
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Berbagai produk berkualitas hasil karya masyarakat desa dengan
            standar profesional untuk kemajuan bersama. Setiap produk adalah
            wujud dedikasi untuk mengembangkan potensi lokal.
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
      </section>

      {/* Product Collection Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-4">Koleksi Produk</h2>
          <p className="text-gray-600 text-center mb-12 text-sm max-w-3xl mx-auto">
            Produk unggulan dari BUM Desa yang dikembangkan dengan cermat,
            berkualitas tinggi untuk memenuhi kebutuhan Anda.
          </p>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm transition ${
                  activeCategory === cat
                    ? "bg-gray-900 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200"
              >
                <div className="bg-gray-300 h-64 relative">
                  <div className="absolute top-12 left-12 w-16 h-16 bg-gray-400 rounded-full"></div>
                  <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-2 tracking-wider">
                    {product.category}
                  </div>
                  <h3 className="text-2xl mb-4">{product.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm hover:bg-gray-800 transition">
                    DETAIL PRODUK
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Tentang Kami</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ufuran software aangan phrasetra, takto, scelerisque
              diamfringilla, tellus. Cras velit cursusequat imperdiet.
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
                  onClick={() => handleNavClick("Services")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Services
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
              Pertajan Siapel Alpin
              <br />
              <br />
              Email: tantuet@gmail.com
              <br />
              Phone: 021334484
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
