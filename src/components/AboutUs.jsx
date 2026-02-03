import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AboutUs({ isAdmin, AdminSection }) {
  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 bg-[#b8c5ba] flex items-center justify-center mt-16">
        <div className="absolute top-1/4 w-32 h-32 bg-[#a8b5aa] rounded-full opacity-60"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-[#3d4f45] mb-4 font-light">
            Tentang Kami
          </h1>
          <p className="text-[#4a5a50] max-w-2xl mx-auto text-sm leading-relaxed">
            Sejarah singkat di BUM Desa Warga Dekat Bandung, dengan visi
            memberdayakan dari lokal.
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent"></div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-4 text-[#3d4f45] font-light">
            Selamat Datang
          </h2>
          <h3 className="text-2xl mb-4 text-[#3d4f45] font-light">Di</h3>
          <h2 className="text-3xl mb-8 text-[#3d4f45] font-light">
            BUM Desa Warga Dekat Bandung
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm mb-6">
            Kami dengan bangga mempersembahkan produk-produk unggulan dari Desa Warga Dekat Bandung,
            hasil karya masyarakat lokal yang berkualitas dan bernilai tinggi. Belanja disini berarti
            Anda ikut mendukung perekonomian desa serta keberlanjutan produk lokal.
          </p>
          <button className="bg-[#3d4f45] text-white px-8 py-3 rounded-full text-sm hover:bg-[#4a5a50] transition">
            PELAJARI LEBIH
          </button>
        </div>
      </section>

      {/* Vision Mission Section */}
      <section className="py-20 px-6 bg-[#f5f7f6]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 text-center shadow-sm rounded-lg">
            <h2 className="text-3xl mb-6 text-[#3d4f45] font-light">
              VISI KAMI
            </h2>
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
          <div className="bg-white p-8 text-center shadow-sm rounded-lg">
            <h2 className="text-3xl mb-6 text-[#3d4f45] font-light">
              MISI KAMI
            </h2>
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-4 text-[#3d4f45] font-light">
            Layanan Kami
          </h2>
          <p className="text-center text-gray-600 mb-12 text-sm max-w-3xl mx-auto">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
            Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex gap-6">
                <div className="w-24 h-24 bg-[#b8c5ba] rounded-full flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl mb-3 text-[#3d4f45]">
                    Layanan {item}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed
                    Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna
                    Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation
                    Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#f5f7f6]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-6 text-[#3d4f45] font-light">
            Tertarik Menggunakan Layanan Kami?
          </h2>
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            Amet, urna egestas et ultrices tellus socis. Pharetra mauris viverra
            rutrum at tincidunt aenean neque gravida. Cursus sit at risus
            pellentesque sed interdum sit non. In vel sit blanque non tempor, ut
            praesent.
          </p>
          <button className="bg-[#3d4f45] text-white px-8 py-3 rounded-full text-sm hover:bg-[#4a5a50] transition">
            HUBUNGI KAMI
          </button>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-[#3d4f45] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12 font-light">
            Nilai - Nilai Kami
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center">
                <div className="text-6xl mb-4 font-light">0{item}</div>
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
