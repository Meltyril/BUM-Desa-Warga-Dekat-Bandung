import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#3d4f45] text-white px-6 py-4 fixed w-full top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#b8c5ba]"></div>
          <span className="text-xs tracking-widest font-light">
            BUM DESA
            <br />
            WARGA DEKAT BANDUNG
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-xs tracking-wider font-light">
          <Link to="/" className="hover:text-[#b8c5ba] transition">
            HOME
          </Link>
          <Link to="/about-us" className="hover:text-[#b8c5ba] transition">
            ABOUT US
          </Link>
          <Link to="/products" className="hover:text-[#b8c5ba] transition">
            PRODUCTS
          </Link>
          <Link to="/services" className="hover:text-[#b8c5ba] transition">
            SERVICES
          </Link>
          <Link to="/news" className="hover:text-[#b8c5ba] transition">
            NEWS
          </Link>
          <Link to="/contact" className="hover:text-[#b8c5ba] transition">
            CONTACT
          </Link>
        </div>

        <Link
          to="/contact"
          className="hidden md:block border border-white px-6 py-2 text-xs tracking-wider hover:bg-white hover:text-[#3d4f45] transition rounded"
        >
          CONTACT
        </Link>

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
        <div className="md:hidden bg-[#354539] mt-4 pb-4 rounded">
          <div className="flex flex-col space-y-4 text-xs tracking-wider font-light">
            <Link
              to="/"
              className="text-left px-4 hover:text-[#b8c5ba] py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              to="/about-us"
              className="text-left px-4 hover:text-[#b8c5ba] py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT US
            </Link>
            <Link
              to="/products"
              className="text-left px-4 hover:text-[#b8c5ba] py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              PRODUCTS
            </Link>
            <Link
              to="/services"
              className="text-left px-4 hover:text-[#b8c5ba] py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              SERVICES
            </Link>
            <Link
              to="/news"
              className="text-left px-4 hover:text-[#b8c5ba] py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              NEWS
            </Link>
            <Link
              to="/contact"
              className="text-left px-4 hover:text-[#b8c5ba] py-2"
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
