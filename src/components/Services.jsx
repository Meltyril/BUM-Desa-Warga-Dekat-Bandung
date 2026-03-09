import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchServicesList } from "../src/api/servicesApi";

export default function Services({ isAdmin, AdminSection }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        setError('');
        const res = await fetchServicesList();
        setServices(res.data || []);
      } catch (err) {
        console.error('Error loading services:', err);
        setError('Gagal memuat layanan');
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 bg-[#b8c5ba] flex items-center justify-center mt-16">
        <div className="absolute top-1/4 w-32 h-32 bg-[#a8b5aa] rounded-full opacity-60"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-[#3d4f45] mb-4 font-light">
            Layanan Kami
          </h1>
          <p className="text-[#4a5a50] max-w-2xl mx-auto text-sm leading-relaxed">
            Sekarang! closing di BUM Desa Warga Dekat Bandung. Kami dapat
            memperbaharuan dari Lokal. Kami juga dapat menolong untuk berbagai
            layanan lainnya. Desa warga dapat mengakses informasi kepada
            sebaiknya untuk untuk Anda.
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent"></div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {loading && <div className="text-center py-8 text-gray-600">Sedang memuat layanan...</div>}
          {error && !loading && <div className="text-center py-8 text-red-600">{error}</div>}
          {!loading && services.length === 0 && <div className="text-center py-8 text-gray-600">Belum ada layanan yang ditambahkan</div>}
          
          {!loading && services.length > 0 && services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            const serviceNumber = String(idx + 1).padStart(2, '0');

            return (
              <div key={service.id} className={`flex items-center gap-12 mb-24 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Text Content */}
                <div className="flex-1 relative">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 bg-[#b8c5ba] rounded-full flex items-center justify-center flex-shrink-0 text-[#3d4f45] font-light text-xl">
                      {serviceNumber}
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-[#3d4f45] mb-3">{service.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                      <ul className="text-xs text-gray-600 space-y-2">
                        {/* You can add bullet points here if needed */}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Image Content */}
                <div className="flex-1">
                  {service.image_url ? (
                    <img 
                      src={`http://localhost:5000${service.image_url}`} 
                      alt={service.title} 
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-[#b8c5ba] rounded-lg shadow-lg"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#f5f7f6]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-6 text-[#3d4f45] font-light">
            Tertarik Menggunakan Layanan Kami?
          </h2>
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            Amet, urna egestas et ultrices tellus socus. Pharetra mauris viverra
            rutrum at tincidunt aenean neque gravida. Cursus sit at risus
            pellentesque sed interdum sit non. In vel sit blanque non tempor, ut
            praesent.
          </p>
          <button className="bg-[#3d4f45] text-white px-8 py-3 rounded-full text-sm hover:bg-[#4a5a50] transition">
            HUBUNGI KAMI
          </button>
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
