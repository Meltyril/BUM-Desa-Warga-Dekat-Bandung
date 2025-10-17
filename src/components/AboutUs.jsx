import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AboutUs({ isAdmin, AdminSection }) {
  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 bg-gray-300 flex items-center justify-center mt-16">
        <div className="absolute top-1/4 w-32 h-32 bg-gray-400 rounded-full"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Tentang Kami</h1>
          <p className="text-white max-w-2xl mx-auto text-sm leading-relaxed">
            Sejarah singkat di BUM Desa Warga Dekat Bandung, dengan visi
            memberdayakan dari lokal.
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-400 to-transparent"></div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-4">Selamat Datang</h2>
          <h3 className="text-2xl mb-4">Di</h3>
          <h2 className="text-3xl mb-8">BUM Desa Warga Dekat Bandung</h2>
          <p className="text-gray-600 leading-relaxed text-sm mb-6">
            Amet, urna egestas et ulltrices tellus socis. Pharetra mauris
            viverra rutrum at tincidunt aenean neque gravida. Cursus sit at
            risus pellentesque sed interdum sit non. In vel sit blanque non
            tempor, ut praesent. Nisi at orci turpis sapien sit. Donec arcu
            porttitor lorem et nibh commodo lacus et. Convallis aliquet elit,
            quam laoreet habitant lacus, ut bibendum at.
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm hover:bg-gray-800 transition">
            PELAJARI LEBIH
          </button>
        </div>
      </section>

      {/* Vision Mission Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="text-center p-8">
            <h2 className="text-3xl mb-6">VISI KAMI</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Ut ac enim consectetur risus tincidunt lobortis. Amet ultrices
              ultrices sit vulputate. Ut et nunc tellus id lectus. Ut ac non
              magna lorem id sagittis ultricies maecenas dui sollicitudin.
              Turpis metus risus nec est. At massa eget eget volutpat. Sit nulla
              aliquam sit vulputat fermentum sit nunc est. Risus pellentesque
              sagittis pretium aenean sed. Ultrices cursus est sit lorem.
              Sagittis mauris lorem scelerisque lobortis.
            </p>
          </div>
          <div className="text-center p-8">
            <h2 className="text-3xl mb-6">MISI KAMI</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Ut ac enim consectetur risus tincidunt lobortis. Amet ultrices
              ultrices sit vulputate. Ut et nunc tellus id lectus. Ut ac non
              magna lorem id sagittis ultricies maecenas dui sollicitudin.
              Turpis metus risus nec est. At massa eget eget volutpat. Sit nulla
              aliquam sit vulputat fermentum sit nunc est. Risus pellentesque
              sagittis pretium aenean sed. Ultrices cursus est sit lorem.
              Sagittis mauris lorem scelerisque lobortis.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-4">Layanan Kami</h2>
          <p className="text-center text-gray-600 mb-12 text-sm max-w-3xl mx-auto">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
            Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl mb-3">Layanan {item}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed
                  Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.
                  Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco
                  Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-6">Tertarik Menggunakan Layanan Kami?</h2>
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            Amet, urna egestas et ulltrices tellus socis. Pharetra mauris
            viverra rutrum at tincidunt aenean neque gravida. Cursus sit at
            risus pellentesque sed interdum sit non. In vel sit blanque non
            tempor, ut praesent.
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm hover:bg-gray-800 transition">
            HUBUNGI KAMI
          </button>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12">Nilai - Nilai Kami</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center">
                <div className="text-6xl mb-4">0{item}</div>
                <h3 className="text-xl mb-3">Nilai {item}</h3>
                <p className="text-gray-300 text-sm">
                  Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                </p>
              </div>
            ))}
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
