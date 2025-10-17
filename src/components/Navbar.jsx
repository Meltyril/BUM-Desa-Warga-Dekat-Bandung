import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 fixed w-full top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white"></div>
          <span className="text-sm tracking-wider">
            BUM DESA WARGA DEKAT BANDUNG
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-xs tracking-wider">
          <Link to="/" className="hover:text-gray-300">
            HOME
          </Link>
          <Link to="/about-us" className="hover:text-gray-300">
            ABOUT US
          </Link>
          <Link to="/products" className="hover:text-gray-300">
            PRODUCTS
          </Link>
          <Link to="/services" className="hover:text-gray-300">
            SERVICES
          </Link>
          <Link to="/news" className="hover:text-gray-300">
            NEWS
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            CONTACT
          </Link>
        </div>

        <button className="hidden md:block border border-white px-6 py-2 text-xs tracking-wider hover:bg-white hover:text-gray-900 transition">
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
            <Link
              to="/"
              className="text-left px-4 hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              to="/about-us"
              className="text-left px-4 hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT US
            </Link>
            <Link
              to="/products"
              className="text-left px-4 hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              PRODUCTS
            </Link>
            <Link
              to="/services"
              className="text-left px-4 hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              SERVICES
            </Link>
            <Link
              to="/news"
              className="text-left px-4 hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              NEWS
            </Link>
            <Link
              to="/contact"
              className="text-left px-4 hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
