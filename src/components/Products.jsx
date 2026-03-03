import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchProductsList } from "../src/api/productsApi";
import { fetchCategoriesList } from "../src/api/categoriesApi";

export default function Products({ isAdmin, AdminSection }) {
  const [activeCategory, setActiveCategory] = useState("SEMUA");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError('');
        
        // Load categories
        const categoryList = await fetchCategoriesList();
        setCategories(categoryList || []);
        
        // Load products
        const response = await fetchProductsList({ limit: 50 });
        setAllProducts(response.data || []);
        setProducts(response.data || []);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Gagal memuat produk');
        setAllProducts([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter products when activeCategory changes
  useEffect(() => {
    if (activeCategory === "SEMUA") {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => {
        if (!product.category_id) return false;
        // Find category by id and match with active category name
        const matchedCategory = categories.find(cat => cat.id === product.category_id);
        return matchedCategory && matchedCategory.name.toUpperCase() === activeCategory.toUpperCase();
      });
      setProducts(filtered);
    }
  }, [activeCategory, allProducts, categories]);

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 bg-[#b8c5ba] flex items-center justify-center mt-16">
        <div className="absolute top-1/4 w-32 h-32 bg-[#a8b5aa] rounded-full opacity-60"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl text-[#3d4f45] mb-4 font-light">
            Produk Kami
          </h1>
          <p className="text-[#4a5a50] max-w-2xl mx-auto text-sm leading-relaxed">
            Berbagai produk berkualitas hasil karya masyarakat desa dengan
            standar profesional untuk kemajuan bersama. Setiap produk adalah
            wujud dedikasi untuk mengembangkan potensi lokal.
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent"></div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-4 text-[#3d4f45] font-light">
            Koleksi Produk
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Produk unggulan dari BUM Desa yang dikembangkan dengan standar
            kualitas
          </p>

          {/* Category Filters */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setActiveCategory("SEMUA")}
              className={`px-6 py-2 rounded-full text-sm transition ${
                activeCategory === "SEMUA"
                  ? "bg-[#3d4f45] text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              SEMUA
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.name.toUpperCase())}
                className={`px-6 py-2 rounded-full text-sm transition ${
                  activeCategory === category.name.toUpperCase()
                    ? "bg-[#3d4f45] text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Sedang memuat produk...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {activeCategory === "SEMUA" 
                  ? "Belum ada produk yang ditambahkan" 
                  : `Belum ada produk di kategori ${activeCategory}`}
              </p>
            </div>
          )}

          {/* Products Grid */}
          {!loading && products.length > 0 && (
            <div className="grid md:grid-cols-2 gap-12">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col md:flex-row gap-6">
                  {product.image_url ? (
                    <img 
                      src={`http://localhost:5000${product.image_url}`}
                      alt={product.name}
                      className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="bg-[#b8c5ba] w-full md:w-1/2 h-64 relative flex-shrink-0 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#a8b5aa] rounded-full"></div>
                        <p className="text-gray-500 text-sm">Tidak ada gambar</p>
                      </div>
                      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#a8b5aa] to-transparent rounded-b-lg"></div>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-2 tracking-wider">
                      {product.category_id 
                        ? categories.find(cat => cat.id === product.category_id)?.name.toUpperCase() || "PRODUK"
                        : "PRODUK"}
                    </p>
                    <h3 className="text-2xl mb-2 text-[#3d4f45]">
                      {product.name}
                    </h3>
                    {product.price && (
                      <p className="text-lg font-semibold text-[#3d4f45] mb-2">
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                    )}
                    {product.stock !== undefined && (
                      <p className="text-sm text-gray-600 mb-4">
                        Stok: {product.stock} unit
                      </p>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {product.description || "Produk berkualitas dari BUM Desa"}
                    </p>
                    <button className="bg-[#3d4f45] text-white px-6 py-2 rounded-full text-sm hover:bg-[#4a5a50] transition">
                      DETAIL PRODUK
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-6 bg-[#f5f7f6]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl mb-4 text-[#3d4f45] font-light">
            Informasi Pemesanan
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Semua Produk Kami Dibuat Dengan Berkualitas Tinggi Dan Diproses
            Lokal Yang Terampil. Kami Menerima Pesanan Dalam Jumlah Besar Maupun
            Retail.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Untuk Informasi Lebih Lanjut Tentang Pemesanan, Harga, Atau
            Kustomisasi Produk, Silakan Hubungi WhatsApp Kami.
          </p>
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
