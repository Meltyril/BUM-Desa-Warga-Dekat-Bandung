import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchProfilesList } from "../src/api/profilesApi";

export default function AboutUs({ isAdmin, AdminSection }) {
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [errorProfiles, setErrorProfiles] = useState('');

  useEffect(() => {
    async function loadProfiles() {
      try {
        console.log('[AboutUs] Loading profiles...');
        setLoadingProfiles(true);
        setErrorProfiles('');
        const res = await fetchProfilesList();
        console.log('[AboutUs] Response:', res);
        const profilesData = res.data || [];
        console.log('[AboutUs] Profiles data:', profilesData);
        setProfiles(profilesData);
        console.log('[AboutUs] Set profiles to:', profilesData.length, 'items');
      } catch (err) {
        console.error('[AboutUs] Error loading profiles:', err);
        setErrorProfiles(err.message || 'Gagal memuat profil');
        setProfiles([]);
      } finally {
        setLoadingProfiles(false);
      }
    }
    loadProfiles();
  }, []);
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
            Amet, urna egestas et ultrices tellus socis. Pharetra mauris viverra
            rutrum at tincidunt aenean neque gravida. Cursus sit at risus
            pellentesque sed interdum sit non. In vel sit blanque non tempor, ut
            praesent. Nisi at orci turpis sapien sit. Donec arcu porttitor lorem
            et nibh commodo lacus et. Convallis aliquet elit, quam laoreet
            habitant lacus, ut bibendum at.
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

      {/* Values Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-[#3d4f45] font-light">
            Pengurus BUM Desa
          </h2>
          
          {loadingProfiles && <div className="text-center py-8 text-gray-600">Sedang memuat profil...</div>}
          {errorProfiles && !loadingProfiles && <div className="text-center py-8 text-red-600">{errorProfiles}</div>}
          {!loadingProfiles && profiles.length === 0 && <div className="text-center py-8 text-gray-600">Belum ada profil yang ditambahkan</div>}
          
          {!loadingProfiles && profiles.length > 0 && (
            <div className="grid md:grid-cols-2 gap-12">
              {profiles.map((profile) => (
                <div key={profile.id} className="text-center">
                  {profile.image_url ? (
                    <img 
                      src={`http://localhost:5000${profile.image_url}`}
                      alt={profile.name}
                      className="w-32 h-32 object-cover rounded-full mx-auto mb-4 shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-[#b8c5ba] rounded-full mx-auto mb-4 shadow-lg"></div>
                  )}
                  <h3 className="text-xl font-medium text-[#3d4f45] mb-1">{profile.name}</h3>
                  {profile.position && <p className="text-sm text-gray-500 mb-3 font-medium">{profile.position}</p>}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {profile.description}
                  </p>
                </div>
              ))}
            </div>
          )}
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
