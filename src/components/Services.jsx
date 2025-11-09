import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Services({ isAdmin, AdminSection }) {
  const services = [
    {
      id: 1,
      title: "Layanan 1",
      description:
        "Kami menyediakan sebuah layanan yang tepat. Kami adalah pihak penyedia Untuk BUM Desa yang juga untuk digunakan oleh atau untuk komunitas kepentingan bersama. Layanan dan dukungan support dapat dihubungi untuk waktu waktu yang tepat. Hasilkan dan kenali tipe kualitas kami dan lain-lain.",
    },
    {
      id: 2,
      title: "Layanan 2",
      description:
        "Kami menyediakan sebuah layanan yang tepat. Kami adalah pihak penyedia Untuk BUM Desa yang juga untuk digunakan oleh atau untuk komunitas kepentingan bersama. Layanan dan dukungan support dapat dihubungi untuk waktu waktu yang tepat. Hasilkan dan kenali tipe kualitas kami dan lain-lain.",
    },
    {
      id: 3,
      title: "Layanan 3",
      description:
        "Kami menyediakan sebuah layanan yang tepat. Kami adalah pihak penyedia Untuk BUM Desa yang juga untuk digunakan oleh atau untuk komunitas kepentingan bersama. Layanan dan dukungan support dapat dihubungi untuk waktu waktu yang tepat. Hasilkan dan kenali tipe kualitas kami dan lain-lain.",
    },
    {
      id: 4,
      title: "Layanan 4",
      description:
        "Kami menyediakan sebuah layanan yang tepat. Kami adalah pihak penyedia Untuk BUM Desa yang juga untuk digunakan oleh atau untuk komunitas kepentingan bersama. Layanan dan dukungan support dapat dihubungi untuk waktu waktu yang tepat. Hasilkan dan kenali tipe kualitas kami dan lain-lain.",
    },
    {
      id: 5,
      title: "Layanan 5",
      description:
        "Kami menyediakan sebuah layanan yang tepat. Kami adalah pihak penyedia Untuk BUM Desa yang juga untuk digunakan oleh atau untuk komunitas kepentingan bersama. Layanan dan dukungan support dapat dihubungi untuk waktu waktu yang tepat. Hasilkan dan kenali tipe kualitas kami dan lain-lain.",
    },
    {
      id: 6,
      title: "Layanan 6",
      description:
        "Kami menyediakan sebuah layanan yang tepat. Kami adalah pihak penyedia Untuk BUM Desa yang juga untuk digunakan oleh atau untuk komunitas kepentingan bersama. Layanan dan dukungan support dapat dihubungi untuk waktu waktu yang tepat. Hasilkan dan kenali tipe kualitas kami dan lain-lain.",
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
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl mb-6 text-[#3d4f45] font-light">
            Melayani Dengan Sepenuh Hati
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            AMDEC (Tax agenda) et nihilum tellus socus. Pharetra mauris riserra
            ritum at tincidunt aenean neque gravida. Et non quam lorem et et
            risus duis amet sint, ut ridiculus at.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {services.map((service) => (
            <div key={service.id} className="flex gap-6">
              <div className="w-24 h-24 bg-[#b8c5ba] rounded-full flex-shrink-0"></div>
              <div>
                <h3 className="text-xl mb-3 text-[#3d4f45]">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
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
