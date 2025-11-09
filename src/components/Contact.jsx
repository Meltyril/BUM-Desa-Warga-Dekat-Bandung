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

  const contactInfo = [
    {
      name: "Staff Bumdes",
      role: "Information & Etc andra",
      phone: "+62 812-XXXX-XXXX",
    },
    {
      name: "Staff Bumdes",
      role: "Berandalan & Propart",
      phone: "+62 812-XXXX-XXXX",
    },
    {
      name: "Staff Bumdes",
      role: "Information & Etc andra",
      phone: "+62 012XXXXXXXXX",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 bg-[#b8c5ba] flex items-center justify-center mt-16">
        <div className="absolute top-1/4 w-32 h-32 bg-[#a8b5aa] rounded-full opacity-60"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-[#3d4f45] mb-4 font-light">
            Hubungi Kami
          </h1>
          <p className="text-[#4a5a50] max-w-2xl mx-auto text-sm leading-relaxed">
            Kami siap membantu Anda. Silakan hubungi kami untuk informasi lebih
            lanjut
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent"></div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl mb-6 text-[#3d4f45] font-light">
              Kirim Pesan
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Anda ada keluhan dan ingin menyampaikan sesuatu? silahkan isi form
              dibawah ini. Hubungi kami jika ada pertanyaan.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                  placeholder=""
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                  placeholder=""
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Subjek
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                  placeholder=""
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Pesan
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border border-gray-300 px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                  placeholder=""
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#3d4f45] text-white px-8 py-3 rounded-full text-sm hover:bg-[#4a5a50] transition"
              >
                KIRIM PESAN
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl mb-6 text-[#3d4f45] font-light">
              Informasi Kontak
            </h2>
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#b8c5ba] rounded-full flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-[#3d4f45]">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-gray-600">{contact.role}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {contact.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-2 text-[#3d4f45]">Email</h3>
              <p className="text-gray-600 text-sm">
                info01@puhu.id
                <br />
                email02@gmail.com
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-2 text-[#3d4f45]">
                Jam Operasional
              </h3>
              <p className="text-gray-600 text-sm">
                Senin - Kamis : 08.00 - 16.00
                <br />
                Jum'at : 08.00 - 11.30
                <br />
                Sabtu : 08.00 - 14.00
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8">
              <h3 className="font-semibold mb-4 text-[#3d4f45]">Lokasi Kami</h3>
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
