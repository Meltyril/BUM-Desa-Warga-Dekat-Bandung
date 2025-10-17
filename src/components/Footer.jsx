import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">Tentang Kami</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            BUM Desa adalah lembaga usaha desa yang dikelola oleh masyarakat
            untuk meningkatkan perekonomian desa.
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="text-gray-600 hover:text-gray-900"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-600 hover:text-gray-900"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-gray-600 hover:text-gray-900"
              >
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Hubungi Kami</h3>
          <p className="text-gray-600 text-sm">
            Desa Warga Dekat
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
  );
}
