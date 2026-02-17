import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function ProductDetail({ isAdmin, AdminSection }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  useEffect(() => {

    async function fetchData() {

      try {

        // ambil detail product
        const detailRes = await fetch(`http://localhost:5000/api/products/${id}`);
        const detailData = await detailRes.json();

        const currentProduct = detailData.data;
        setProduct(currentProduct);

        // ambil semua produk untuk related
        const allRes = await fetch("http://localhost:5000/api/products");
        const allData = await allRes.json();

        if(allData.data){

          const related = allData.data.filter(
            p =>
              p.category === currentProduct.category &&
              p.id !== currentProduct.id
          );

          setRelatedProducts(related);
        }

      } catch(err){
        console.error(err);
      }

      setLoading(false);
    }

    fetchData();

  }, [id]);

  if(loading) return <div className="p-10 text-center">Loading...</div>;
  if(!product) return <div className="p-10 text-center">Produk tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-white font-serif">
      <Navbar />

      {/* Breadcrumb */}
      <section className="py-6 px-6 mt-16 bg-[#f5f7f6]">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-[#3d4f45] rounded-full bg-[#3d4f45] text-white px-4 py-1"
          >
            KEMBALI
          </button>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 gap-12">

            {/* IMAGE */}
            <div>
              <div className="bg-[#b8c5ba] h-96 mb-4 rounded-lg overflow-hidden">
                <img
                  src={`http://localhost:5000${product.image_url}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* INFO */}
            <div>

              <div className="text-xs text-gray-500 mb-2 tracking-wider">
                {product.category}
              </div>

              <h1 className="text-4xl mb-4 text-[#3d4f45] font-light">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-[#3d4f45]">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-8">
                {product.description}
              </p>

              {/* PRODUCT DETAIL */}
              <div className="mt-8 pt-8 border-t border-gray-200">

                <h3 className="font-semibold mb-4 text-[#3d4f45]">
                  Detail Produk
                </h3>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span>Kategori:</span>
                    <span>{product.category}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Berat:</span>
                    <span>{product.weight || "-"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Stok:</span>
                    <span className="text-green-600">
                      {product.stock}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>SKU:</span>
                    <span>PRD-{product.id}</span>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          <div className="mt-16">

            <h2 className="text-2xl mb-8 text-[#3d4f45] font-light">
              Produk Terkait
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {relatedProducts.map((item) => (

                <div key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100">

                  <div className="h-48 overflow-hidden">
                    <img
                      src={`http://localhost:5000${item.image_url}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">

                    <div className="text-xs text-gray-500 mb-2">
                      {item.category}
                    </div>

                    <h3 className="text-xl mb-2 text-[#3d4f45]">
                      {item.name}
                    </h3>

                    <p className="text-lg font-semibold text-[#3d4f45] mb-4">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </p>

                    <Link
                      to={`/products/${item.id}`}
                      className="w-full block text-center bg-[#3d4f45] text-white px-6 py-2 rounded-full text-sm"
                    >
                      LIHAT DETAIL
                    </Link>

                  </div>
                </div>

              ))}

            </div>

          </div>

        </div>
      </section>

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
