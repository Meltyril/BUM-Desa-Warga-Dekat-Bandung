import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchAdminProfile } from '../src/api/adminApi';
import { createProduct, fetchProductsList, updateProduct, deleteProduct } from '../src/api/productsApi';
import { createNews, fetchAdminNewsList, updateNews, softDeleteNews } from '../src/api/newsApi';
import { createArticle, fetchAdminArticlesList, updateArticle, softDeleteArticle } from '../src/api/articlesApi';
import { getToken, removeToken } from '../utils/auth';
import Navbar from './Navbar';

export default function AdminDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Product states
  const [productError, setProductError] = useState('');
  const [productSuccess, setProductSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // News states
  const [newsError, setNewsError] = useState('');
  const [newsSuccess, setNewsSuccess] = useState('');
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [deletingNews, setDeletingNews] = useState(null);
  const [newsFormData, setNewsFormData] = useState({
    title: '',
    body: '',
    summary: '',
    status: 'draft',
  });

  // Article states
  const [articleError, setArticleError] = useState('');
  const [articleSuccess, setArticleSuccess] = useState('');
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [deletingArticle, setDeletingArticle] = useState(null);
  const [articleFormData, setArticleFormData] = useState({ title: '', body: '', summary: '', status: 'draft' });
  const [articleImageFile, setArticleImageFile] = useState(null);
  const [articleImagePreview, setArticleImagePreview] = useState(null);
  
  const navigate = useNavigate();

  // Load admin profile
  useEffect(() => {
    async function load() {
      const token = getToken();
      if (!token) {
        navigate('/admin/login');
        return;
      }
      try {
        const res = await fetchAdminProfile(token);
        setProfile(res.admin || res);
      } catch (err) {
        removeToken();
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  // Load products list
  useEffect(() => {
    loadProducts();
    loadNews();
    loadArticles();
  }, []);

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetchProductsList({ limit: 100 });
      setProducts(response.data || []);
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadNews = async () => {
    try {
      setLoadingNews(true);
      const response = await fetchAdminNewsList({ pageSize: 100 });
      setNews(response.data || []);
    } catch (err) {
      console.error('Error loading news:', err);
    } finally {
      setLoadingNews(false);
    }
  };

  const loadArticles = async () => {
    try {
      setLoadingArticles(true);
      const response = await fetchAdminArticlesList({ pageSize: 100 });
      setArticles(response.data || []);
    } catch (err) {
      console.error('Error loading articles:', err);
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', description: '', stock: '' });
    setImageFile(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditingId(null);
    setProductError('');
    setProductSuccess('');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setProductError('');
    setProductSuccess('');
    setSubmitting(true);

    try {
      if (!formData.name.trim() || !formData.price.trim()) {
        setProductError('Nama dan harga produk harus diisi');
        setSubmitting(false);
        return;
      }

      const productData = {
        name: formData.name.trim(),
        price: Number(formData.price),
        description: formData.description.trim() || null,
        stock: formData.stock.trim() ? Number(formData.stock) : 0,
      };

      // Add image if file is selected
      if (imageFile) {
        productData.image = imageFile;
      }

      if (isEditing && editingId) {
        // Update existing product
        await updateProduct(editingId, productData);
        setProductSuccess('Produk berhasil diperbarui!');
      } else {
        // Create new product
        await createProduct(productData);
        setProductSuccess('Produk berhasil ditambahkan!');
      }

      resetForm();
      await loadProducts();

      setTimeout(() => {
        setShowProductForm(false);
        setProductSuccess('');
      }, 2000);
    } catch (err) {
      setProductError(err.message || 'Gagal menyimpan produk');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      price: String(product.price),
      description: product.description || '',
      stock: String(product.stock || 0),
    });
    setIsEditing(true);
    setEditingId(product.id);
    setShowProductForm(true);
    setProductError('');
    setProductSuccess('');
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      return;
    }

    try {
      setDeleting(productId);
      await deleteProduct(productId);
      setProductSuccess('Produk berhasil dihapus!');
      await loadProducts();
      setTimeout(() => setProductSuccess(''), 2000);
    } catch (err) {
      setProductError(err.message || 'Gagal menghapus produk');
    } finally {
      setDeleting(null);
    }
  };

  // News handlers
  const resetNewsForm = () => {
    setNewsFormData({ title: '', body: '', summary: '', status: 'draft' });
    setIsEditingNews(false);
    setEditingNewsId(null);
    setNewsError('');
    setNewsSuccess('');
  };

  const handleNewsInputChange = (e) => {
    const { name, value } = e.target;
    setNewsFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Article handlers
  const handleArticleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArticleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setArticleImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setArticleImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const resetArticleForm = () => {
    setArticleFormData({ title: '', body: '', summary: '', status: 'draft' });
    setIsEditingArticle(false);
    setEditingArticleId(null);
    setArticleError('');
    setArticleSuccess('');
    setArticleImageFile(null);
    setArticleImagePreview(null);
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    setArticleError('');
    setArticleSuccess('');

    try {
      if (!articleFormData.title.trim() || !articleFormData.body.trim()) {
        setArticleError('Judul dan isi artikel harus diisi');
        return;
      }

      const payload = {
        title: articleFormData.title.trim(),
        body: articleFormData.body.trim(),
        summary: articleFormData.summary.trim() || null,
        status: articleFormData.status,
        image: articleImageFile,
      };

      if (isEditingArticle && editingArticleId) {
        await updateArticle(editingArticleId, payload);
        setArticleSuccess('Artikel berhasil diperbarui!');
      } else {
        await createArticle(payload);
        setArticleSuccess('Artikel berhasil ditambahkan!');
      }

      resetArticleForm();
      await loadArticles();
      setTimeout(() => { setShowArticleForm(false); setArticleSuccess(''); }, 2000);
    } catch (err) {
      setArticleError(err.message || 'Gagal menyimpan artikel');
    }
  };

  const handleEditArticle = (article) => {
    setArticleFormData({ title: article.title, body: article.body || '', summary: article.summary || '', status: article.status || 'draft' });
    setIsEditingArticle(true);
    setEditingArticleId(article.id);
    setShowArticleForm(true);
    setArticleError('');
    setArticleSuccess('');
    setArticleImagePreview(article.image_url ? `http://localhost:5000${article.image_url}` : null);
    setArticleImageFile(null);
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    try {
      setDeletingArticle(id);
      await softDeleteArticle(id);
      setArticleSuccess('Artikel berhasil dihapus!');
      await loadArticles();
      setTimeout(() => setArticleSuccess(''), 2000);
    } catch (err) {
      setArticleError(err.message || 'Gagal menghapus artikel');
    } finally { setDeletingArticle(null); }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    setNewsError('');
    setNewsSuccess('');

    try {
      if (!newsFormData.title.trim() || !newsFormData.body.trim()) {
        setNewsError('Judul dan isi berita harus diisi');
        return;
      }

      const newsData = {
        title: newsFormData.title.trim(),
        body: newsFormData.body.trim(),
        summary: newsFormData.summary.trim() || null,
        status: newsFormData.status,
      };

      if (isEditingNews && editingNewsId) {
        await updateNews(editingNewsId, newsData);
        setNewsSuccess('Berita berhasil diperbarui!');
      } else {
        await createNews(newsData);
        setNewsSuccess('Berita berhasil ditambahkan!');
      }

      resetNewsForm();
      await loadNews();

      setTimeout(() => {
        setShowNewsForm(false);
        setNewsSuccess('');
      }, 2000);
    } catch (err) {
      setNewsError(err.message || 'Gagal menyimpan berita');
    }
  };

  const handleEditNews = (newsItem) => {
    setNewsFormData({
      title: newsItem.title,
      body: newsItem.body,
      summary: newsItem.summary || '',
      status: newsItem.status || 'draft',
    });
    setIsEditingNews(true);
    setEditingNewsId(newsItem.id);
    setShowNewsForm(true);
    setNewsError('');
    setNewsSuccess('');
  };

  const handleDeleteNews = async (newsId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      return;
    }

    try {
      setDeletingNews(newsId);
      await softDeleteNews(newsId);
      setNewsSuccess('Berita berhasil dihapus!');
      await loadNews();
      setTimeout(() => setNewsSuccess(''), 2000);
    } catch (err) {
      setNewsError(err.message || 'Gagal menghapus berita');
    } finally {
      setDeletingNews(null);
    }
  };

  if (loading) return <div className="mt-24 text-center">Memuat...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f5f7f6] pt-24 pb-12">
        <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-[#3d4f45]">Admin Dashboard</h1>
            <button
              className="bg-[#3d4f45] text-white text-sm px-3 py-1 rounded hover:bg-[#4a5a50] transition"
              onClick={() => {
                removeToken();
                navigate('/admin/login');
              }}
            >
              Logout
            </button>
          </div>

          {profile ? (
            <div>
              <p className="mb-1">ID: <strong>{profile.id}</strong></p>
              <p className="mb-1">Email: <strong>{profile.email}</strong></p>
              <p className="mb-1">Username: <strong>{profile.username}</strong></p>
            </div>
          ) : (
            <div>Tidak ada data profil</div>
          )}

          <hr className="my-6" />

          <div>
            <h2 className="font-medium mb-2 text-[#3d4f45]">Quick Links</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link to="/admin/users" className="block p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg transition">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#3d4f45] text-white rounded flex items-center justify-center mr-4">U</div>
                  <div>
                    <div className="text-sm text-gray-500">Pengguna</div>
                    <div className="font-medium text-[#3d4f45]">Kelola Pengguna</div>
                  </div>
                </div>
              </Link>

              <Link to="/admin/posts" className="block p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg transition">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#3d4f45] text-white rounded flex items-center justify-center mr-4">P</div>
                  <div>
                    <div className="text-sm text-gray-500">Konten</div>
                    <div className="font-medium text-[#3d4f45]">Kelola Konten</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <hr className="my-6" />

          {/* PRODUCT MANAGEMENT SECTION */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-[#3d4f45] text-lg">Kelola Produk</h2>
              <button
                className="bg-[#3d4f45] text-white text-sm px-4 py-2 rounded hover:bg-[#4a5a50] transition"
                onClick={() => {
                  if (showProductForm) {
                    resetForm();
                    setShowProductForm(false);
                  } else {
                    setShowProductForm(true);
                  }
                }}
              >
                {showProductForm ? 'Tutup Form' : 'Tambah Produk'}
              </button>
            </div>

            {/* Product Form */}
            {showProductForm && (
              <div className="bg-[#f5f7f6] p-6 rounded-lg mb-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-[#3d4f45] mb-4">
                  {isEditing ? 'Edit Produk' : 'Form Tambah Produk'}
                </h3>

                {productError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {productError}
                  </div>
                )}

                {productSuccess && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {productSuccess}
                  </div>
                )}

                <form onSubmit={handleProductSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                      Gambar Produk
                    </label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                        />
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP atau GIF (max 5MB)</p>
                      </div>
                      {imagePreview && (
                        <div className="w-24 h-24">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover rounded-lg border border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                      Nama Produk *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Contoh: Kopi Puhu"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                        Harga (Rp) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="50000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                        Stok
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Deskripsi produk..."
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-[#3d4f45] text-white font-medium py-2 rounded-lg hover:bg-[#4a5a50] transition disabled:opacity-50"
                    >
                      {submitting ? 'Sedang menyimpan...' : isEditing ? 'Perbarui Produk' : 'Simpan Produk'}
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 bg-gray-400 text-white font-medium py-2 rounded-lg hover:bg-gray-500 transition"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Products List */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#3d4f45] mb-4">Daftar Produk ({products.length})</h3>

              {loadingProducts && <p className="text-gray-600">Memuat produk...</p>}

              {!loadingProducts && products.length === 0 && (
                <p className="text-gray-600">Belum ada produk. Buat yang pertama!</p>
              )}

              {!loadingProducts && products.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border border-gray-300">
                        <th className="border border-gray-300 px-4 py-2 text-left">Gambar</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Nama</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Harga</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Stok</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border border-gray-300 hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">
                            {product.image_url ? (
                              <img 
                                src={`http://localhost:5000${product.image_url}`}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                No img
                              </div>
                            )}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <div>
                              <p className="font-medium text-[#3d4f45]">{product.name}</p>
                              {product.description && (
                                <p className="text-xs text-gray-500 truncate max-w-xs">
                                  {product.description}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            Rp {product.price?.toLocaleString('id-ID') || '0'}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            {product.stock || 0}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                disabled={deleting === product.id}
                                className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition disabled:opacity-50"
                              >
                                {deleting === product.id ? 'Menghapus...' : 'Hapus'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-600 mt-6">
              Produk yang ditambahkan/diperbarui akan langsung muncul di halaman <Link to="/products" className="text-[#3d4f45] hover:underline font-medium">Produk</Link>.
            </p>
          </div>

          <hr className="my-6" />

          {/* NEWS MANAGEMENT SECTION */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-[#3d4f45] text-lg">Kelola Berita</h2>
              <button
                className="bg-[#3d4f45] text-white text-sm px-4 py-2 rounded hover:bg-[#4a5a50] transition"
                onClick={() => {
                  if (showNewsForm) {
                    resetNewsForm();
                    setShowNewsForm(false);
                  } else {
                    setShowNewsForm(true);
                  }
                }}
              >
                {showNewsForm ? 'Tutup Form' : 'Tambah Berita'}
              </button>
            </div>

            {/* News Form */}
            {showNewsForm && (
              <div className="bg-[#f5f7f6] p-6 rounded-lg mb-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-[#3d4f45] mb-4">
                  {isEditingNews ? 'Edit Berita' : 'Form Tambah Berita'}
                </h3>

                {newsError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {newsError}
                  </div>
                )}

                {newsSuccess && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {newsSuccess}
                  </div>
                )}

                <form onSubmit={handleNewsSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                      Judul Berita *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newsFormData.title}
                      onChange={handleNewsInputChange}
                      placeholder="Contoh: BUM Desa Luncurkan Program Baru"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={newsFormData.status}
                        onChange={handleNewsInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                      >
                        <option value="draft">Draft (Belum Dipublikasikan)</option>
                        <option value="published">Published (Sudah Dipublikasikan)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                      Ringkasan
                    </label>
                    <textarea
                      name="summary"
                      value={newsFormData.summary}
                      onChange={handleNewsInputChange}
                      placeholder="Ringkasan singkat berita (optional)..."
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                      Isi Berita *
                    </label>
                    <textarea
                      name="body"
                      value={newsFormData.body}
                      onChange={handleNewsInputChange}
                      placeholder="Isi lengkap berita..."
                      rows="6"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-[#3d4f45] text-white font-medium py-2 rounded-lg hover:bg-[#4a5a50] transition"
                    >
                      {isEditingNews ? 'Perbarui Berita' : 'Simpan Berita'}
                    </button>
                    {isEditingNews && (
                      <button
                        type="button"
                        onClick={resetNewsForm}
                        className="px-4 bg-gray-400 text-white font-medium py-2 rounded-lg hover:bg-gray-500 transition"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* News List */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#3d4f45] mb-4">Daftar Berita ({news.length})</h3>

              {loadingNews && <p className="text-gray-600">Memuat berita...</p>}

              {!loadingNews && news.length === 0 && (
                <p className="text-gray-600">Belum ada berita. Buat yang pertama!</p>
              )}

              {!loadingNews && news.length > 0 && (
                <div className="space-y-3">
                  {news.map((newsItem) => (
                    <div key={newsItem.id} className="border border-gray-300 rounded p-4 bg-white hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-[#3d4f45] mb-1">{newsItem.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">
                            {newsItem.created_at ? new Date(newsItem.created_at).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : 'Tanpa tanggal'}
                            {' - '}
                            <span className={newsItem.status === 'published' ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}>
                              {newsItem.status === 'published' ? 'Dipublikasikan' : 'Draft'}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {newsItem.body?.substring(0, 100)}...
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditNews(newsItem)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition whitespace-nowrap"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteNews(newsItem.id)}
                            disabled={deletingNews === newsItem.id}
                            className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition disabled:opacity-50 whitespace-nowrap"
                          >
                            {deletingNews === newsItem.id ? 'Menghapus...' : 'Hapus'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-sm text-gray-600 mt-6">
              Berita yang dipublikasikan akan langsung muncul di halaman <Link to="/news" className="text-[#3d4f45] hover:underline font-medium">Berita</Link>.
            </p>
            {/* ARTICLES MANAGEMENT SECTION */}
            <hr className="my-6" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-[#3d4f45] text-lg">Kelola Artikel</h2>
                <button
                  className="bg-[#3d4f45] text-white text-sm px-4 py-2 rounded hover:bg-[#4a5a50] transition"
                  onClick={() => { if (showArticleForm) { resetArticleForm(); setShowArticleForm(false); } else { setShowArticleForm(true); } }}
                >
                  {showArticleForm ? 'Tutup Form' : 'Tambah Artikel'}
                </button>
              </div>

              {showArticleForm && (
                <div className="bg-[#f5f7f6] p-6 rounded-lg mb-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-[#3d4f45] mb-4">{isEditingArticle ? 'Edit Artikel' : 'Form Tambah Artikel'}</h3>

                  {articleError && (<div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{articleError}</div>)}
                  {articleSuccess && (<div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{articleSuccess}</div>)}

                  <form onSubmit={handleArticleSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#3d4f45] mb-1">Gambar Artikel</label>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <input type="file" accept="image/*" onChange={handleArticleImageChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP atau GIF (max 5MB)</p>
                        </div>
                        {articleImagePreview && (<div className="w-24 h-24"><img src={articleImagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg border"/></div>)}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#3d4f45] mb-1">Judul Artikel *</label>
                      <input type="text" name="title" value={articleFormData.title} onChange={handleArticleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#3d4f45] mb-1">Ringkasan</label>
                      <textarea name="summary" value={articleFormData.summary} onChange={handleArticleInputChange} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#3d4f45] mb-1">Isi Artikel *</label>
                      <textarea name="body" value={articleFormData.body} onChange={handleArticleInputChange} rows="6" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3d4f45] mb-1">Status</label>
                        <select name="status" value={articleFormData.status} onChange={handleArticleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option value="draft">Draft (Belum Dipublikasikan)</option>
                          <option value="published">Published (Sudah Dipublikasikan)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button type="submit" className="flex-1 bg-[#3d4f45] text-white font-medium py-2 rounded-lg">{isEditingArticle ? 'Perbarui Artikel' : 'Simpan Artikel'}</button>
                      {isEditingArticle && (<button type="button" onClick={resetArticleForm} className="px-4 bg-gray-400 text-white py-2 rounded-lg">Batal</button>)}
                    </div>
                  </form>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#3d4f45] mb-4">Daftar Artikel ({articles.length})</h3>
                {loadingArticles && <p className="text-gray-600">Memuat artikel...</p>}
                {!loadingArticles && articles.length === 0 && (<p className="text-gray-600">Belum ada artikel. Buat yang pertama!</p>)}
                {!loadingArticles && articles.length > 0 && (
                  <div className="space-y-3">
                    {articles.map(a => (
                      <div key={a.id} className="border border-gray-300 rounded p-4 bg-white hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-[#3d4f45] mb-1">{a.title}</h4>
                            <p className="text-xs text-gray-500 mb-2">{a.created_at ? new Date(a.created_at).toLocaleDateString('id-ID') : 'Tanpa tanggal'} - <span className={a.status==='published' ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}>{a.status==='published' ? 'Dipublikasikan' : 'Draft'}</span></p>
                            <p className="text-sm text-gray-600 line-clamp-2">{a.summary || a.body?.substring(0,100)}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button onClick={() => handleEditArticle(a)} className="bg-blue-500 text-white px-3 py-1 rounded text-xs">Edit</button>
                            <button onClick={() => handleDeleteArticle(a.id)} disabled={deletingArticle===a.id} className="bg-red-500 text-white px-3 py-1 rounded text-xs">{deletingArticle===a.id ? 'Menghapus...' : 'Hapus'}</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 mt-6">Artikel yang dipublikasikan akan langsung muncul di halaman <Link to="/articles" className="text-[#3d4f45] hover:underline font-medium">Artikel</Link>.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
