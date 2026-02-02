import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, List, MessageSquare, LogOut, Plus, Trash2, Edit, X, Image } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import FileUpload from '../components/FileUpload';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { admin, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!admin) {
            navigate('/jala-admin-portal-2025');
        }
    }, [admin, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/jala-admin-portal-2025');
    };

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <div className="logo-main">JALA</div>
                    <div className="logo-sub">ADMIN PORTAL</div>
                </div>

                <div className="sidebar-user">
                    <div className="user-avatar">{admin?.name?.charAt(0) || 'A'}</div>
                    <div className="user-info">
                        <span className="user-name">{admin?.name}</span>
                        <span className="user-role">Super Admin</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-group">
                        <label>Main</label>
                        <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                            <LayoutDashboard size={18} /> <span>Overview</span>
                        </Link>
                    </div>

                    <div className="nav-group">
                        <label>Management</label>
                        <Link to="/admin/products" className={location.pathname === '/admin/products' ? 'active' : ''}>
                            <Package size={18} /> <span>Products</span>
                        </Link>
                        <Link to="/admin/categories" className={location.pathname === '/admin/categories' ? 'active' : ''}>
                            <List size={18} /> <span>Categories</span>
                        </Link>
                        <Link to="/admin/inquiries" className={location.pathname === '/admin/inquiries' ? 'active' : ''}>
                            <MessageSquare size={18} /> <span>Inquiries</span>
                        </Link>
                    </div>

                    <div className="nav-group">
                        <label>System</label>
                        <Link to="/admin/settings" className={location.pathname === '/admin/settings' ? 'active' : ''}>
                            <Plus size={18} /> <span>Settings</span>
                        </Link>
                    </div>

                    <div className="nav-footer">
                        <button className="logout-btn" onClick={handleLogout}>
                            <LogOut size={18} /> <span>Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            <main className="admin-content-wrapper">
                <header className="admin-top-header">
                    <div className="search-bar">
                        <input type="text" placeholder="Search products, inquiries..." />
                    </div>
                    <div className="header-actions">
                        <Link to="/admin/notifications" className="notification-bell">
                            <MessageSquare size={20} />
                            <span className="badge">1</span>
                        </Link>
                        <Link to="/admin/profile" className="header-profile">
                            <img src={`https://ui-avatars.com/api/?name=${admin?.name}&background=1e293b&color=fff`} alt="" />
                        </Link>
                    </div>
                </header>

                <div className="admin-content">
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/products" element={<ProductManagement />} />
                        <Route path="/categories" element={<CategoryManagement />} />
                        <Route path="/inquiries" element={<InquiryManagement />} />
                        <Route path="/notifications" element={<NotificationManagement />} />
                        <Route path="/profile" element={<ProfileManagement />} />
                        <Route path="/settings" element={<SettingsManagement />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

const Overview = () => {
    const { products, categories } = useContext(ProductContext);
    const [inquiryCount, setInquiryCount] = useState(0);
    const { admin } = useContext(AuthContext);

    useEffect(() => {
        const fetchInquiryCount = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${admin.token}` } };
                const { data } = await axios.get('/api/inquiries', config);
                setInquiryCount(data.length);
            } catch (error) {
                console.error(error);
            }
        };
        if (admin) fetchInquiryCount();
    }, [admin]);

    return (
        <div className="admin-view">
            <header className="view-header">
                <div className="header-info">
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back, {admin?.name}. Here's what's happening today.</p>
                </div>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon"><Package size={24} /></div>
                    <div className="stat-info">
                        <h3>Total Products</h3>
                        <p className="stat-value">{products.length}</p>
                    </div>
                    <div className="stat-badge">Live</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><List size={24} /></div>
                    <div className="stat-info">
                        <h3>Total Categories</h3>
                        <p className="stat-value">{categories.length}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><MessageSquare size={24} /></div>
                    <div className="stat-info">
                        <h3>Total Inquiries</h3>
                        <p className="stat-value">{inquiryCount}</p>
                    </div>
                    <div className="stat-badge alert">New</div>
                </div>
            </div>
        </div>
    );
};

const ProductManagement = () => {
    const { products, categories, addProduct, updateProduct, deleteProduct, loading } = useContext(ProductContext);
    const { admin } = useContext(AuthContext);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: '', countInStock: 0,
        images: [], video: { url: '', public_id: '' },
        fabricType: '', sizes: '', colors: '', moq: '', packingDetails: '', exportCountries: '', isFeatured: false
    });

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                ...editingProduct,
                category: editingProduct.category?._id || editingProduct.category,
                sizes: editingProduct.sizes?.join(', ') || '',
                colors: editingProduct.colors?.join(', ') || '',
                exportCountries: editingProduct.exportCountries?.join(', ') || '',
            });
            setShowForm(true);
        } else {
            setFormData({
                name: '', description: '', price: '', category: '', countInStock: 0,
                images: [], video: { url: '', public_id: '' },
                fabricType: '', sizes: '', colors: '', moq: '', packingDetails: '', exportCountries: '', isFeatured: false
            });
        }
    }, [editingProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s),
            colors: formData.colors.split(',').map(c => c.trim()).filter(c => c),
            exportCountries: formData.exportCountries.split(',').map(c => c.trim()).filter(c => c),
        };

        let res;
        if (editingProduct) {
            res = await updateProduct(editingProduct._id, dataToSubmit, admin.token);
        } else {
            res = await addProduct(dataToSubmit, admin.token);
        }

        if (res.success) {
            setShowForm(false);
            setEditingProduct(null);
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="admin-view">
            <header className="view-header">
                <div className="header-info">
                    <h1>Product Management</h1>
                    <p>Add, edit, and organize your premium export catalog.</p>
                </div>
                <button className="btn-add" onClick={() => { setEditingProduct(null); setShowForm(true); }}>
                    <Plus size={18} /> New Product
                </button>
            </header>

            <div className="admin-filter-bar">
                <button
                    className={`filter-btn ${selectedFilterCategory === 'All' ? 'active' : ''}`}
                    onClick={() => setSelectedFilterCategory('All')}
                >
                    All Products
                </button>
                {categories.map(cat => (
                    <button
                        key={cat._id}
                        className={`filter-btn ${selectedFilterCategory === cat._id ? 'active' : ''}`}
                        onClick={() => setSelectedFilterCategory(cat._id)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {showForm && (
                <div className="admin-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div>
                                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                                <p>Fill in the details for your export-quality garment.</p>
                            </div>
                            <button className="close-btn" onClick={() => { setShowForm(false); setEditingProduct(null); }}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form-root">
                            <div className="form-sections-wrapper">
                                <div className="form-main-content">
                                    <section className="form-section">
                                        <h3><Package size={18} /> Basic Information</h3>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="e.g. Premium Silk Scarf" />
                                            </div>
                                            <div className="form-group">
                                                <label>Price ($)</label>
                                                <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Category</label>
                                                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
                                                    <option value="">Select</option>
                                                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Stock</label>
                                                <input type="number" value={formData.countInStock} onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })} required />
                                            </div>
                                            <div className="form-group full-width">
                                                <label>Description</label>
                                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows="4" />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="form-section">
                                        <h3><List size={18} /> Export & Specifications</h3>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Fabric Type</label>
                                                <input type="text" value={formData.fabricType} onChange={(e) => setFormData({ ...formData, fabricType: e.target.value })} />
                                            </div>
                                            <div className="form-group">
                                                <label>MOQ</label>
                                                <input type="text" value={formData.moq} onChange={(e) => setFormData({ ...formData, moq: e.target.value })} />
                                            </div>
                                            <div className="form-group">
                                                <label>Colors</label>
                                                <input type="text" value={formData.colors} onChange={(e) => setFormData({ ...formData, colors: e.target.value })} placeholder="Red, Blue..." />
                                            </div>
                                            <div className="form-group">
                                                <label>Sizes</label>
                                                <input type="text" value={formData.sizes} onChange={(e) => setFormData({ ...formData, sizes: e.target.value })} placeholder="S, M, L..." />
                                            </div>
                                            <div className="form-group full-width">
                                                <label>Export Countries</label>
                                                <input type="text" value={formData.exportCountries} onChange={(e) => setFormData({ ...formData, exportCountries: e.target.value })} placeholder="USA, Germany, UAE..." />
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <div className="form-media-content">
                                    <section className="form-section">
                                        <h3><Image size={18} /> Media Assets</h3>
                                        <FileUpload
                                            type="image"
                                            multiple={true}
                                            onUpload={(urls) => {
                                                const imageObjects = Array.isArray(urls)
                                                    ? urls.map((url, idx) => ({ url, public_id: `img_${Date.now()}_${idx}` }))
                                                    : [{ url: urls, public_id: `img_${Date.now()}` }];
                                                setFormData({ ...formData, images: imageObjects });
                                            }}
                                        />
                                        <div className="form-group checkbox-group" style={{ marginTop: '20px' }}>
                                            <label>
                                                <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} />
                                                <span>Mark as Featured Product</span>
                                            </label>
                                        </div>
                                    </section>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); setEditingProduct(null); }}>Cancel</button>
                                <button type="submit" className="btn-submit">Save Product Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Product Info</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock Status</th>
                            <th align="right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products
                            .filter(p => selectedFilterCategory === 'All' ||
                                p.category?._id === selectedFilterCategory ||
                                p.category === selectedFilterCategory)
                            .map(p => (
                                <tr key={p._id}>
                                    <td>
                                        <div className="table-product-cell">
                                            <img src={p.images?.[0]?.url} alt="" className="table-thumb" />
                                            <div className="table-text-group">
                                                <span className="font-bold">{p.name}</span>
                                                <span className="text-muted text-xs">{p.fabricType || 'No Fabric Info'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="category-tag">{p.category?.name}</span></td>
                                    <td className="font-semibold">${p.price}</td>
                                    <td>
                                        <span className={`stock-badge ${p.countInStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                            {p.countInStock > 0 ? `${p.countInStock} Units` : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td align="right">
                                        <div className="table-actions">
                                            <button className="btn-edit" onClick={() => setEditingProduct(p)} title="Edit"><Edit size={16} /></button>
                                            <button className="btn-delete" onClick={() => deleteProduct(p._id, admin.token)} title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const CategoryManagement = () => {
    const { categories, addCategory, deleteCategory } = useContext(ProductContext);
    const { admin } = useContext(AuthContext);
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await addCategory({ name }, admin.token);
        if (res.success) setName('');
        else alert(res.message);
    };

    return (
        <div className="admin-view">
            <header className="view-header">
                <div className="header-info">
                    <h1>Category Management</h1>
                    <p>Manage and organize your product classifications.</p>
                </div>
            </header>

            <div className="admin-view-body">
                <form className="inline-add-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="New Category Name (e.g. Winter Collection)" value={name} onChange={(e) => setName(e.target.value)} required />
                    <button type="submit" className="btn-add"><Plus size={18} /> Create Category</button>
                </form>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th align="right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(c => (
                                <tr key={c._id}>
                                    <td className="font-semibold">{c.name}</td>
                                    <td align="right">
                                        <div className="table-actions">
                                            <button className="btn-delete" onClick={() => deleteCategory(c._id, admin.token)} title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const InquiryManagement = () => {
    const [inquiries, setInquiries] = useState([]);
    const { admin } = useContext(AuthContext);

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${admin.token}` } };
                const { data } = await axios.get('/api/inquiries', config);
                setInquiries(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (admin) fetchInquiries();
    }, [admin]);

    return (
        <div className="admin-view">
            <header className="view-header">
                <div className="header-info">
                    <h1>Inquiry Management</h1>
                    <p>Track and respond to global buyer inquiries.</p>
                </div>
            </header>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Buyer Details</th>
                            <th>Product Interest</th>
                            <th>Status</th>
                            <th align="right">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map(i => (
                            <tr key={i._id}>
                                <td>
                                    <div className="table-text-group">
                                        <span className="font-bold">{i.name}</span>
                                        <span className="text-muted text-xs">{i.phone}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="category-tag">{i.product?.name || 'General Inquiry'}</span>
                                </td>
                                <td>
                                    <span className={`status-tag ${i.status?.toLowerCase() || 'pending'}`}>
                                        {i.status}
                                    </span>
                                </td>
                                <td align="right" className="text-muted text-xs">
                                    {new Date(i.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const NotificationManagement = () => {
    const [notifications, setNotifications] = useState([]);
    const { admin } = useContext(AuthContext);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${admin.token}` } };
                const { data } = await axios.get('/api/inquiries', config);
                // Just use the latest 10 inquiries as "notifications" for now
                setNotifications(data.slice(0, 10));
            } catch (error) {
                console.error(error);
            }
        };
        if (admin) fetchNotifications();
    }, [admin]);

    return (
        <div className="admin-view">
            <header className="view-header">
                <div className="header-info">
                    <h1>Recent Notifications</h1>
                    <p>Track latest inquiries and system updates.</p>
                </div>
            </header>

            <div className="notification-list-wrapper">
                {notifications.length > 0 ? (
                    notifications.map(n => (
                        <div key={n._id} className="notification-item-card">
                            <div className="notif-icon"><MessageSquare size={18} /></div>
                            <div className="notif-content">
                                <h4>New Inquiry from {n.name}</h4>
                                <p>Interested in {n.product?.name || 'General Inquiry'}</p>
                                <span className="notif-time">{new Date(n.createdAt).toLocaleString()}</span>
                            </div>
                            <Link to="/admin/inquiries" className="btn-view-notif">View Details</Link>
                        </div>
                    ))
                ) : (
                    <div className="no-data-notice">No new notifications.</div>
                )}
            </div>
        </div>
    );
};

const ProfileManagement = () => {
    const { admin } = useContext(AuthContext);

    return (
        <div className="admin-view">
            <header className="view-header">
                <div className="header-info">
                    <h1>Your Profile</h1>
                    <p>Manage your account settings and preferences.</p>
                </div>
            </header>

            <div className="profile-settings-grid">
                <div className="profile-main-card">
                    <div className="profile-avatar-large">
                        <img src={`https://ui-avatars.com/api/?name=${admin?.name}&size=128&background=1e293b&color=fff`} alt="" />
                    </div>
                    <div className="profile-basic-info">
                        <h2>{admin?.name}</h2>
                        <span className="profile-role-badge">Super Admin</span>
                        <p>{admin?.email}</p>
                    </div>
                </div>

                <div className="profile-form-card">
                    <h3>Account Security</h3>
                    <form className="admin-form-root" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" placeholder="Enter new password" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Confirm your password" />
                        </div>
                        <button type="button" className="btn-submit" onClick={() => alert('Password reset functionality is currently disabled for demo security.')}>
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const SettingsManagement = () => {
    const [settings, setSettings] = useState({
        whatsappNumber: '',
        companyAddress: '',
        companyEmail: '',
        companyPhone: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { admin } = useContext(AuthContext);
    const { fetchSettings } = useContext(ProductContext);

    useEffect(() => {
        const fetchSettingsData = async () => {
            try {
                const { data } = await axios.get('/api/settings');
                setSettings(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchSettingsData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const config = { headers: { Authorization: `Bearer ${admin.token}` } };
            await axios.put('/api/settings', settings, config);
            await fetchSettings();
            alert('Settings updated successfully!');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update settings');
        }
        setSaving(false);
    };


    if (loading) return <div>Loading settings...</div>;

    return (
        <div className="admin-view">
            <header className="view-header">
                <div className="header-info">
                    <h1>Website Settings</h1>
                    <p>Configure your company's global contact and export details.</p>
                </div>
            </header>

            <div className="admin-form-container" style={{ maxWidth: '800px' }}>
                <form onSubmit={handleSubmit} className="admin-form-root">
                    <section className="form-section">
                        <h3><Plus size={18} /> Communication Channels</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>WhatsApp Number</label>
                                <input
                                    type="text"
                                    value={settings.whatsappNumber}
                                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                                    required
                                    placeholder="e.g. 9313029938"
                                />
                                <span className="text-xs text-muted">Format: Country code + number (no spaces)</span>
                            </div>
                            <div className="form-group">
                                <label>Official Company Email</label>
                                <input
                                    type="email"
                                    value={settings.companyEmail}
                                    onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Official Phone Number</label>
                                <input
                                    type="text"
                                    value={settings.companyPhone}
                                    onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <section className="form-section" style={{ marginTop: '30px' }}>
                        <h3><Package size={18} /> Global Presence</h3>
                        <div className="form-group">
                            <label>Registered Office Address</label>
                            <textarea
                                value={settings.companyAddress}
                                onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                                required
                                rows="4"
                                placeholder="Full business address..."
                            ></textarea>
                        </div>
                    </section>

                    <div style={{ marginTop: '40px' }}>
                        <button type="submit" className="btn-add" disabled={saving}>
                            {saving ? 'Updating System...' : 'Save System Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;


