import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#e8ebe9] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Tentang Kami */}
          <div>
            <h3 className="font-semibold mb-4 text-[#3d4f45]">Tentang Kami</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Ultrices interdum viverra pharetra, tellus. Sapien eu diam ipsum
              volutpat, amet fingi verra placeratea.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="font-semibold mb-4 text-[#3d4f45]">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-700 hover:text-[#3d4f45]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-gray-700 hover:text-[#3d4f45]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-[#3d4f45]"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-700 hover:text-[#3d4f45]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-700 hover:text-[#3d4f45]">
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-[#3d4f45]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="font-semibold mb-4 text-[#3d4f45]">Hubungi Kami</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Platform Sosial Media
            </p>
            <p className="text-gray-700 text-sm mt-2">+62 812-XXXX-XXXX</p>
          </div>

          {/* Lokasi */}
          <div>
            <h3 className="font-semibold mb-4 text-[#3d4f45]">Lokasi</h3>
            <div className="bg-gray-300 h-32 rounded"></div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-300 text-center text-gray-600 text-sm">
          © 2024 BUM Desa Warga Dekat Bandung. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
