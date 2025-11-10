import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ProductDetail({ isAdmin, AdminSection }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Breadcrumb */}
      <section className="py-6 px-6 mt-16 bg-[#f5f7f6]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <button className="text-[#3d4f45] rounded-full bg-[#3d4f45] text-white px-4 py-1">
              KEMBALI
            </button>
          </div>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="bg-[#b8c5ba] h-96 mb-4 rounded-lg relative">
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#a8b5aa] rounded-full"></div>
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent rounded-b-lg"></div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <div
                    key={img.id}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-[#b8c5ba] h-24 rounded cursor-pointer ${
                      selectedImage === index ? "ring-2 ring-[#3d4f45]" : ""
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="text-xs text-gray-500 mb-2 tracking-wider">
                PERTANIAN
              </div>
              <h1 className="text-4xl mb-4 text-[#3d4f45] font-light">
                Kopi Puhu
              </h1>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-[#3d4f45]">
                  Rp 15.000
                </span>
                <span className="text-gray-500 text-sm">/ 50gr</span>
              </div>

              <div className="mb-8">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-[#3d4f45] text-white px-8 py-3 rounded-full text-sm hover:bg-[#4a5a50] transition">
                  HUBUNGI VIA WHATSAPP
                </button>
                <button className="w-full border-2 border-[#3d4f45] text-[#3d4f45] px-8 py-3 rounded-full text-sm hover:bg-[#3d4f45] hover:text-white transition">
                  SIMPAN KE WISHLIST
                </button>
              </div>

              {/* Product Details */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold mb-4 text-[#3d4f45]">
                  Detail Produk
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kategori:</span>
                    <span className="text-gray-900">Pertanian</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Berat:</span>
                    <span className="text-gray-900">50 gram</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stok:</span>
                    <span className="text-green-600">Tersedia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SKU:</span>
                    <span className="text-gray-900">KP-001</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-16">
            <h2 className="text-2xl mb-6 text-[#3d4f45] font-light">
              Deskripsi Produk
            </h2>
            <div className="prose max-w-none text-gray-600 text-sm leading-relaxed">
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl mb-8 text-[#3d4f45] font-light">
              Produk Terkait
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100"
                >
                  <div className="bg-[#b8c5ba] h-48 relative">
                    <div className="absolute top-8 left-8 w-12 h-12 bg-[#a8b5aa] rounded-full"></div>
                    <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-500 mb-2">PERTANIAN</div>
                    <h3 className="text-xl mb-2 text-[#3d4f45]">Kopi Puhu</h3>
                    <p className="text-lg font-semibold text-[#3d4f45] mb-4">
                      Rp 15.000{" "}
                      <span className="text-sm font-normal text-gray-500">
                        / 50gr
                      </span>
                    </p>
                    <button className="w-full bg-[#3d4f45] text-white px-6 py-2 rounded-full text-sm hover:bg-[#4a5a50] transition">
                      LIHAT DETAIL
                    </button>
                  </div>
                </div>
              ))}
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
