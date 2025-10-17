import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Contact({ isAdmin, AdminSection }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesan Anda telah dikirim!");
  };

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 bg-gray-300 flex items-center justify-center mt-16">
        <div className="absolute top-1/4 w-32 h-32 bg-gray-400 rounded-full"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Hubungi Kami</h1>
          <p className="text-white max-w-2xl mx-auto text-sm leading-relaxed">
            Kami siap membantu Anda. Silakan hubungi kami untuk informasi lebih
            lanjut
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl mb-6">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="Nama Anda"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Subjek</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="Subjek Pesan"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Pesan</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border border-gray-300 px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm hover:bg-gray-800 transition"
              >
                KIRIM PESAN
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl mb-6">Informasi Kontak</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Alamat</h3>
                <p className="text-gray-600 text-sm">
                  Desa Warga Dekat
                  <br />
                  Bandung, Jawa Barat
                  <br />
                  Indonesia 40xxx
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Telepon</h3>
                <p className="text-gray-600 text-sm">
                  (022) 1234-5678
                  <br />
                  +62 812-3456-7890
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-gray-600 text-sm">
                  info@bumdesa.com
                  <br />
                  support@bumdesa.com
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Jam Operasional</h3>
                <p className="text-gray-600 text-sm">
                  Senin - Jumat: 08:00 - 16:00
                  <br />
                  Sabtu: 08:00 - 12:00
                  <br />
                  Minggu: Tutup
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8">
              <h3 className="font-bold mb-4">Lokasi Kami</h3>
              <div className="bg-gray-300 h-64 rounded"></div>
            </div>
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
