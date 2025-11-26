// src/components/FooterGPS.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FooterGPS() {
  const [loc, setLoc] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch("/api/location/business"); // backend kamu
        if (!res.ok) throw new Error("Gagal memuat lokasi");
        const data = await res.json();
        if (isMounted) setLoc(data);
      } catch (e) {
        if (isMounted) setError(e.message || "Gagal memuat peta");
      }
    })();
    return () => { isMounted = false; };
  }, []);

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
                <Link to="/about-us" className="text-gray-700 hover:text-[#3d4f45]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-700 hover:text-[#3d4f45]">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-700 hover:text-[#3d4f45]">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-700 hover:text-[#3d4f45]">
                  News
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-[#3d4f45]">
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
            <h3 className="font-semibold mb-2 text-[#3d4f45]">Lokasi</h3>

            {/* Loading skeleton */}
            {!loc && !error && (
              <div
                className="bg-gray-300 h-32 md:h-40 rounded animate-pulse"
                aria-hidden
              />
            )}

            {/* Error */}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Map (iframe) + links */}
            {loc && (
              <>
                <div
                  className="relative w-full rounded overflow-hidden bg-gray-300"
                  style={{ paddingBottom: "56.25%" /* 16:9 */ }}
                  aria-label={`Peta lokasi ${loc.name || "bisnis"}`}
                >
                  <iframe
                    title={`Peta ${loc.name || "Lokasi"}`}
                    src={loc.embedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div className="text-sm mt-2">
                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3d4f45] hover:underline"
                  >
                    Lihat di Google Maps
                  </a>
                  <span className="mx-1 text-gray-500">·</span>
                  <a
                    href={loc.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3d4f45] hover:underline"
                  >
                    Petunjuk Arah
                  </a>
                  {loc.address && (
                    <p className="text-gray-700 text-xs mt-1">{loc.address}</p>
                  )}
                </div>
              </>
            )}
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
