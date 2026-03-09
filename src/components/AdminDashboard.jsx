import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchAdminProfile } from '../src/api/adminApi';
import { createProduct, fetchProductsList, updateProduct, deleteProduct } from '../src/api/productsApi';
import { createNews, fetchAdminNewsList, updateNews, softDeleteNews } from '../src/api/newsApi';
import { createArticle, fetchAdminArticlesList, updateArticle, softDeleteArticle } from '../src/api/articlesApi';
import { fetchUsersList, createUser, updateUser, deleteUser, resetUserPassword } from '../src/api/usersApi';
import { fetchCategoriesList, createCategory, updateCategory, deleteCategory } from '../src/api/categoriesApi';
import { fetchServicesList, createService, updateService, deleteService } from '../src/api/servicesApi';
import { getToken, removeToken, getAdminRole, setAdminInfo, logout } from '../utils/auth';
import Navbar from './Navbar';

export default function AdminDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('user');
  
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
    category_id: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Category states (admin only)
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState('');
  const [categorySuccess, setCategorySuccess] = useState('');
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryFormData, setCategoryFormData] = useState({ name: '', description: '' });

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
  const [newsImageFile, setNewsImageFile] = useState(null);
  const [newsImagePreview, setNewsImagePreview] = useState(null);

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

  // User management states (admin only)
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState('');
  const [userSuccess, setUserSuccess] = useState('');
  const [showUserForm, setShowUserForm] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'admin',
  });

  // Services states (admin only)
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [serviceError, setServiceError] = useState('');
  const [serviceSuccess, setServiceSuccess] = useState('');
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [isEditingService, setIsEditingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [deletingService, setDeletingService] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({ title: '', description: '', sort_order: '' });
  const [serviceImageFile, setServiceImageFile] = useState(null);
  const [serviceImagePreview, setServiceImagePreview] = useState(null);

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
        setUserRole(res.admin?.role || getAdminRole());
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
    loadCategories();
    loadServices();
    if (userRole === 'admin') {
      loadUsers();
    }
  }, [userRole]);

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

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const usersList = await fetchUsersList();
      setUsers(usersList || []);
    } catch (err) {
      console.error('Error loading users:', err);
      setUserError('Gagal memuat pengguna');
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const categoryList = await fetchCategoriesList();
      setCategories(categoryList || []);
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadServices = async () => {
    try {
      setLoadingServices(true);
      const servicesList = await fetchServicesList();
      setServices(servicesList.data || []);
    } catch (err) {
      console.error('Error loading services:', err);
      setServiceError('Gagal memuat layanan');
    } finally {
      setLoadingServices(false);
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
    setFormData({ name: '', price: '', description: '', stock: '', category_id: '' });
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

      // Add category if selected
      if (formData.category_id) {
        productData.category_id = Number(formData.category_id);
      }

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
      category_id: product.category_id || '',
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

  // User management handlers
  const resetUserForm = () => {
    setUserFormData({ email: '', username: '', password: '', role: 'admin' });
    setIsEditingUser(false);
    setEditingUserId(null);
    setUserError('');
    setUserSuccess('');
  };

  const handleUserFormInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setUserError('');
    setUserSuccess('');

    try {
      if (!userFormData.email.trim() || !userFormData.username.trim()) {
        setUserError('Email dan username harus diisi');
        return;
      }

      if (!isEditingUser && !userFormData.password.trim()) {
        setUserError('Password harus diisi untuk user baru');
        return;
      }

      if (isEditingUser && editingUserId) {
        // Update user (without password)
        await updateUser(editingUserId, {
          email: userFormData.email.trim(),
          username: userFormData.username.trim(),
          role: userFormData.role,
        });
        setUserSuccess('Pengguna berhasil diperbarui!');
      } else {
        // Create new user
        await createUser({
          email: userFormData.email.trim(),
          username: userFormData.username.trim(),
          password: userFormData.password.trim(),
          role: userFormData.role,
        });
        setUserSuccess('Pengguna berhasil dibuat!');
      }

      resetUserForm();
      await loadUsers();
      setTimeout(() => {
        setShowUserForm(false);
        setUserSuccess('');
      }, 2000);
    } catch (err) {
      setUserError(err.message || 'Gagal menyimpan pengguna');
    }
  };

  const handleEditUser = (user) => {
    setUserFormData({
      email: user.email,
      username: user.username,
      password: '',
      role: user.role || 'admin',
    });
    setIsEditingUser(true);
    setEditingUserId(user.id);
    setShowUserForm(true);
    setUserError('');
    setUserSuccess('');
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      return;
    }

    try {
      setDeletingUser(userId);
      await deleteUser(userId);
      setUserSuccess('Pengguna berhasil dihapus!');
      await loadUsers();
      setTimeout(() => setUserSuccess(''), 2000);
    } catch (err) {
      setUserError(err.message || 'Gagal menghapus pengguna');
    } finally {
      setDeletingUser(null);
    }
  };

  // Services handlers
  const resetServiceForm = () => {
    setServiceFormData({ title: '', description: '', sort_order: '' });
    setServiceImageFile(null);
    setServiceImagePreview(null);
    setIsEditingService(false);
    setEditingServiceId(null);
    setServiceError('');
    setServiceSuccess('');
  };

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setServiceFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setServiceImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setServiceImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setServiceError('');
    setServiceSuccess('');

    try {
      if (!serviceFormData.title.trim() || !serviceFormData.description.trim()) {
        setServiceError('Judul dan deskripsi layanan harus diisi');
        return;
      }

      const serviceData = {
        title: serviceFormData.title.trim(),
        description: serviceFormData.description.trim(),
        sort_order: serviceFormData.sort_order || 999,
        image: serviceImageFile,
      };

      if (isEditingService && editingServiceId) {
        await updateService(editingServiceId, serviceData);
        setServiceSuccess('Layanan berhasil diperbarui!');
      } else {
        await createService(serviceData);
        setServiceSuccess('Layanan berhasil ditambahkan!');
      }

      resetServiceForm();
      await loadServices();

      setTimeout(() => {
        setShowServiceForm(false);
        setServiceSuccess('');
      }, 2000);
    } catch (err) {
      setServiceError(err.message || 'Gagal menyimpan layanan');
    }
  };

  const handleEditService = (serviceItem) => {
    setServiceFormData({
      title: serviceItem.title,
      description: serviceItem.description,
      sort_order: serviceItem.sort_order || '',
    });
    setIsEditingService(true);
    setEditingServiceId(serviceItem.id);
    setShowServiceForm(true);
    setServiceError('');
    setServiceSuccess('');
    setServiceImagePreview(serviceItem.image_url ? `http://localhost:5000${serviceItem.image_url}` : null);
    setServiceImageFile(null);
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
      return;
    }

    try {
      setDeletingService(serviceId);
      await deleteService(serviceId);
      setServiceSuccess('Layanan berhasil dihapus!');
      await loadServices();
      setTimeout(() => setServiceSuccess(''), 2000);
    } catch (err) {
      setServiceError(err.message || 'Gagal menghapus layanan');
    } finally {
      setDeletingService(null);
    }
  };

  // News handlers
  const resetNewsForm = () => {
    setNewsFormData({ title: '', body: '', summary: '', status: 'draft' });
    setNewsImageFile(null);
    setNewsImagePreview(null);
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

  const handleNewsImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewsImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setNewsImagePreview(reader.result);
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
        image: newsImageFile,
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
    setNewsImagePreview(newsItem.image_url ? `http://localhost:5000${newsItem.image_url}` : null);
    setNewsImageFile(null);
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
                logout();
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
              <p className="mb-1">Role: <strong className="capitalize px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{userRole}</strong></p>
            </div>
          ) : (
            <div>Tidak ada data profil</div>
          )}

          <hr className="my-6" />

          {/* CATEGORY MANAGEMENT SECTION - FOR admin AND product_manager ROLES */}
          {(userRole === 'admin' || userRole === 'product_manager') && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-[#3d4f45] text-lg">Kelola Kategori</h2>
              <button
                className="bg-[#3d4f45] text-white text-sm px-4 py-2 rounded hover:bg-[#4a5a50] transition"
                onClick={() => {
                  if (showCategoryForm) {
                    setCategoryFormData({ name: '', description: '' });
                    setIsEditingCategory(false);
                    setEditingCategoryId(null);
                    setShowCategoryForm(false);
                  } else {
                    setShowCategoryForm(true);
                  }
                }}
              >
                {showCategoryForm ? 'Tutup Form' : 'Tambah Kategori'}
              </button>
            </div>

            {/* Category Form */}
            {showCategoryForm && (
              <div className="bg-[#f5f7f6] p-6 rounded-lg mb-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-[#3d4f45] mb-4">
                  {isEditingCategory ? 'Edit Kategori' : 'Form Tambah Kategori'}
                </h3>

                {categoryError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {categoryError}
                  </div>
                )}

                {categorySuccess && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {categorySuccess}
                  </div>
                )}

                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setCategoryError('');
                  setCategorySuccess('');

                  try {
                    if (!categoryFormData.name.trim()) {
                      setCategoryError('Nama kategori harus diisi');
                      return;
                    }

                    if (isEditingCategory && editingCategoryId) {
                      await updateCategory(editingCategoryId, categoryFormData);
                      setCategorySuccess('Kategori berhasil diperbarui!');
                    } else {
                      await createCategory(categoryFormData);
                      setCategorySuccess('Kategori berhasil ditambahkan!');
                    }

                    setCategoryFormData({ name: '', description: '' });
                    setIsEditingCategory(false);
                    setEditingCategoryId(null);
                    await loadCategories();

                    setTimeout(() => {
                      setShowCategoryForm(false);
                      setCategorySuccess('');
                    }, 2000);
                  } catch (err) {
                    setCategoryError(err.message || 'Gagal menyimpan kategori');
                  }
                }}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                      Nama Kategori *
                    </label>
                    <input
                      type="text"
                      value={categoryFormData.name}
                      onChange={(e) => setCategoryFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Contoh: Pertanian"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      value={categoryFormData.description}
                      onChange={(e) => setCategoryFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Deskripsi kategori..."
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-[#3d4f45] text-white font-medium py-2 rounded-lg hover:bg-[#4a5a50] transition"
                    >
                      {isEditingCategory ? 'Perbarui Kategori' : 'Simpan Kategori'}
                    </button>
                    {isEditingCategory && (
                      <button
                        type="button"
                        onClick={() => {
                          setCategoryFormData({ name: '', description: '' });
                          setIsEditingCategory(false);
                          setEditingCategoryId(null);
                        }}
                        className="px-4 bg-gray-400 text-white font-medium py-2 rounded-lg hover:bg-gray-500 transition"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Categories List */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#3d4f45] mb-4">Daftar Kategori ({categories.length})</h3>

              {loadingCategories && <p className="text-gray-600">Memuat kategori...</p>}

              {!loadingCategories && categories.length === 0 && (
                <p className="text-gray-600">Belum ada kategori. Buat yang pertama!</p>
              )}

              {!loadingCategories && categories.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border border-gray-300">
                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Nama</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Deskripsi</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((cat) => (
                        <tr key={cat.id} className="border border-gray-300 hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">{cat.id}</td>
                          <td className="border border-gray-300 px-4 py-2">{cat.name}</td>
                          <td className="border border-gray-300 px-4 py-2">{cat.description || '-'}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <button
                              onClick={() => {
                                setCategoryFormData({ name: cat.name, description: cat.description || '' });
                                setIsEditingCategory(true);
                                setEditingCategoryId(cat.id);
                                setShowCategoryForm(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={async () => {
                                if (!window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) return;
                                try {
                                  await deleteCategory(cat.id);
                                  setCategorySuccess('Kategori berhasil dihapus!');
                                  await loadCategories();
                                  setTimeout(() => setCategorySuccess(''), 2000);
                                } catch (err) {
                                  setCategoryError(err.message || 'Gagal menghapus kategori');
                                }
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          )}

          <hr className="my-6" />

          {/* USER MANAGEMENT SECTION - ONLY FOR admin ROLE */}
          {userRole === 'admin' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-[#3d4f45] text-lg">Kelola Pengguna</h2>
              <button
                className="bg-[#3d4f45] text-white text-sm px-4 py-2 rounded hover:bg-[#4a5a50] transition"
                onClick={() => {
                  if (showUserForm) {
                    resetUserForm();
                    setShowUserForm(false);
                  } else {
                    setShowUserForm(true);
                  }
                }}
              >
                {showUserForm ? 'Tutup Form' : 'Tambah Pengguna'}
              </button>
            </div>

            {/* User Form */}
            {showUserForm && (
              <div className="bg-[#f5f7f6] p-6 rounded-lg mb-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-[#3d4f45] mb-4">
                  {isEditingUser ? 'Edit Pengguna' : 'Form Tambah Pengguna'}
                </h3>

                {userError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {userError}
                  </div>
                )}

                {userSuccess && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {userSuccess}
                  </div>
                )}

                <form onSubmit={handleUserSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userFormData.email}
                      onChange={handleUserFormInputChange}
                      placeholder="user@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={userFormData.username}
                      onChange={handleUserFormInputChange}
                      placeholder="Username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                      required
                    />
                  </div>

                  {!isEditingUser && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                        Password * {isEditingUser && '(Kosongkan jika tidak ingin mengubah)'}
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={userFormData.password}
                        onChange={handleUserFormInputChange}
                        placeholder="Masukkan password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                        required={!isEditingUser}
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">
                      Role *
                    </label>
                    <select
                      name="role"
                      value={userFormData.role}
                      onChange={handleUserFormInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                      required
                    >
                      <option value="admin">Admin (Full Access)</option>
                      <option value="product_manager">Product Manager (Kelola Produk)</option>
                      <option value="content_manager">Content Manager (Kelola Berita & Artikel)</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-[#3d4f45] text-white font-medium py-2 rounded-lg hover:bg-[#4a5a50] transition"
                    >
                      {isEditingUser ? 'Perbarui Pengguna' : 'Buat Pengguna'}
                    </button>
                    {isEditingUser && (
                      <button
                        type="button"
                        onClick={resetUserForm}
                        className="px-4 bg-gray-400 text-white font-medium py-2 rounded-lg hover:bg-gray-500 transition"
                      >
                        Batal
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Users List */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#3d4f45] mb-4">Daftar Pengguna ({users.length})</h3>

              {loadingUsers && <p className="text-gray-600">Memuat pengguna...</p>}

              {!loadingUsers && users.length === 0 && (
                <p className="text-gray-600">Belum ada pengguna.</p>
              )}

              {!loadingUsers && users.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border border-gray-300">
                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Role</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border border-gray-300 hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                          <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                          <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <span className="capitalize px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {user.role}
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={deletingUser === user.id}
                                className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition disabled:opacity-50"
                              >
                                {deletingUser === user.id ? 'Menghapus...' : 'Hapus'}
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
          </div>
          )}

          <hr className="my-6" />

          <div>
            <h2 className="font-medium mb-2 text-[#3d4f45]">Quick Links</h2>
            <div className="grid gap-3 sm:grid-cols-2">
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

          {/* PRODUCT MANAGEMENT SECTION - ONLY FOR product_manager AND admin ROLES */}
          {(userRole === 'product_manager' || userRole === 'admin') && (
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
                      Kategori
                    </label>
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                    >
                      <option value="">-- Pilih Kategori --</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
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
          )}

          <hr className="my-6" />

          {/* NEWS MANAGEMENT SECTION - ONLY FOR content_manager AND admin ROLES */}
          {(userRole === 'content_manager' || userRole === 'admin') && (
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
                      Gambar Berita
                    </label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleNewsImageChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f45]"
                        />
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP atau GIF (max 5MB)</p>
                      </div>
                      {newsImagePreview && (
                        <div className="w-24 h-24">
                          <img 
                            src={newsImagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover rounded-lg border border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                  </div>

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
          </div>
          )}

          {/* ARTICLES MANAGEMENT SECTION - ONLY FOR content_manager AND admin ROLES */}
          {(userRole === 'content_manager' || userRole === 'admin') && (
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
          )}

          {/* SERVICES MANAGEMENT SECTION - ONLY FOR admin ROLE */}
          {userRole === 'admin' && (
          <div>
            <hr className="my-6" />
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-[#3d4f45] text-lg">Kelola Layanan</h2>
              <button
                className="bg-[#3d4f45] text-white text-sm px-4 py-2 rounded hover:bg-[#4a5a50] transition"
                onClick={() => { if (showServiceForm) { resetServiceForm(); setShowServiceForm(false); } else { setShowServiceForm(true); } }}
              >
                {showServiceForm ? 'Tutup Form' : 'Tambah Layanan'}
              </button>
            </div>

            {showServiceForm && (
              <div className="bg-[#f5f7f6] p-6 rounded-lg mb-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-[#3d4f45] mb-4">{isEditingService ? 'Edit Layanan' : 'Form Tambah Layanan'}</h3>

                {serviceError && (<div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{serviceError}</div>)}
                {serviceSuccess && (<div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{serviceSuccess}</div>)}

                <form onSubmit={handleServiceSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">Gambar Layanan</label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input type="file" accept="image/*" onChange={handleServiceImageChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP atau GIF (max 5MB)</p>
                      </div>
                      {serviceImagePreview && (<div className="w-24 h-24"><img src={serviceImagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg border"/></div>)}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">Judul Layanan *</label>
                    <input type="text" name="title" value={serviceFormData.title} onChange={handleServiceInputChange} placeholder="Contoh: Pengerajin Kayu" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">Deskripsi Layanan *</label>
                    <textarea name="description" value={serviceFormData.description} onChange={handleServiceInputChange} placeholder="Deskripsi lengkap layanan..." rows="4" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#3d4f45] mb-1">Urutan Tampil</label>
                    <input type="number" name="sort_order" value={serviceFormData.sort_order} onChange={handleServiceInputChange} placeholder="999" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>

                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-[#3d4f45] text-white font-medium py-2 rounded-lg hover:bg-[#4a5a50]">
                      {isEditingService ? 'Perbarui Layanan' : 'Simpan Layanan'}
                    </button>
                    {isEditingService && (
                      <button type="button" onClick={resetServiceForm} className="px-4 bg-gray-400 text-white font-medium py-2 rounded-lg hover:bg-gray-500">
                        Batal
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {loadingServices && <div className="text-center py-4 text-gray-600">Sedang memuat layanan...</div>}
            {serviceError && !loadingServices && <div className="text-center py-4 text-red-600">{serviceError}</div>}

            {!loadingServices && services.length > 0 && (
              <div className="space-y-3">
                {services.map(s => (
                  <div key={s.id} className="border border-gray-300 rounded p-4 bg-white hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-[#3d4f45] mb-1">{s.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{s.description}</p>
                        <p className="text-xs text-gray-500 mt-2">Urutan: {s.sort_order}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button onClick={() => handleEditService(s)} className="bg-blue-500 text-white px-3 py-1 rounded text-xs">Edit</button>
                        <button onClick={() => handleDeleteService(s.id)} disabled={deletingService===s.id} className="bg-red-500 text-white px-3 py-1 rounded text-xs">{deletingService===s.id ? 'Menghapus...' : 'Hapus'}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-600 mt-6">Layanan yang ditambahkan akan langsung muncul di halaman <Link to="/services" className="text-[#3d4f45] hover:underline font-medium">Layanan</Link>.</p>
          </div>
          )}

          {/* MESSAGE FOR LIMITED ACCESS */}
          {userRole !== 'admin' && userRole !== 'product_manager' && userRole !== 'content_manager' && (
            <div className="mt-10 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800"><strong>Akses Terbatas:</strong> Role Anda ({userRole}) tidak memiliki akses ke fitur kelola produk atau konten. Hubungi administrator untuk mendapatkan akses.</p>
            </div>
          )}

          {userRole === 'product_manager' && (userRole !== 'admin') && (
            <div className="mt-10 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800"><strong>Informasi:</strong> Anda memiliki akses sebagai Product Manager. Anda hanya dapat mengelola produk.</p>
            </div>
          )}

          {userRole === 'content_manager' && (userRole !== 'admin') && (
            <div className="mt-10 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800"><strong>Informasi:</strong> Anda memiliki akses sebagai Content Manager. Anda hanya dapat mengelola berita dan artikel.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
