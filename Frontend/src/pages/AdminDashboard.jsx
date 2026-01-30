import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, List, MessageSquare, LogOut, Plus, Trash2, Edit, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import FileUpload from '../components/FileUpload';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { admin, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!admin) {
            navigate('/login');
        }
    }, [admin, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h3>Admin Panel</h3>
                    <p>{admin?.name}</p>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/admin"><LayoutDashboard size={20} /> Overview</Link>
                    <Link to="/admin/products"><Package size={20} /> Products</Link>
                    <Link to="/admin/categories"><List size={20} /> Categories</Link>
                    <Link to="/admin/inquiries"><MessageSquare size={20} /> Inquiries</Link>
                    <Link to="/admin/settings"><Plus size={20} /> Settings</Link>
                    <button className="logout-btn" onClick={handleLogout}><LogOut size={20} /> Logout</button>

                </nav>
            </aside>

            <main className="admin-content">
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/products" element={<ProductManagement />} />
                    <Route path="/categories" element={<CategoryManagement />} />
                    <Route path="/inquiries" element={<InquiryManagement />} />
                    <Route path="/settings" element={<SettingsManagement />} />
                </Routes>

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
            <h1>Dashboard Overview</h1>
            <div className="stats-grid">
                <div className="stat-card"><h3>Total Products</h3><p>{products.length}</p></div>
                <div className="stat-card"><h3>Total Categories</h3><p>{categories.length}</p></div>
                <div className="stat-card"><h3>Total Inquiries</h3><p>{inquiryCount}</p></div>
            </div>
        </div>
    );
};

const ProductManagement = () => {
    const { products, categories, addProduct, updateProduct, deleteProduct, loading } = useContext(ProductContext);
    const { admin } = useContext(AuthContext);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
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
            <div className="view-header">
                <h1>Product Management</h1>
                <button className="btn-add" onClick={() => { setEditingProduct(null); setShowForm(true); }}><Plus size={18} /> Add Product</button>
            </div>

            {showForm && (
                <div className="admin-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={() => { setShowForm(false); setEditingProduct(null); }}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form-grid">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Price ($)</label>
                                <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Stock</label>
                                <input type="number" value={formData.countInStock} onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })} required />
                            </div>
                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Fabric Type</label>
                                <input type="text" value={formData.fabricType} onChange={(e) => setFormData({ ...formData, fabricType: e.target.value })} placeholder="e.g. 100% Cotton" />
                            </div>
                            <div className="form-group">
                                <label>MOQ</label>
                                <input type="text" value={formData.moq} onChange={(e) => setFormData({ ...formData, moq: e.target.value })} placeholder="e.g. 500 units" />
                            </div>
                            <div className="form-group">
                                <label>Sizes (comma separated)</label>
                                <input type="text" value={formData.sizes} onChange={(e) => setFormData({ ...formData, sizes: e.target.value })} placeholder="S, M, L, XL" />
                            </div>
                            <div className="form-group">
                                <label>Colors (comma separated)</label>
                                <input type="text" value={formData.colors} onChange={(e) => setFormData({ ...formData, colors: e.target.value })} placeholder="Red, Blue, Black" />
                            </div>
                            <div className="form-group">
                                <label>Packing Details</label>
                                <input type="text" value={formData.packingDetails} onChange={(e) => setFormData({ ...formData, packingDetails: e.target.value })} placeholder="e.g. 50 units per carton" />
                            </div>
                            <div className="form-group">
                                <label>Export Countries (comma separated)</label>
                                <input type="text" value={formData.exportCountries} onChange={(e) => setFormData({ ...formData, exportCountries: e.target.value })} placeholder="USA, UK, Germany" />
                            </div>

                            {/* Product Images Section */}
                            <div className="form-section full-width">
                                <h3>Product Images</h3>
                                <FileUpload
                                    type="image"
                                    multiple={true}
                                    maxSize={5}
                                    onUpload={(urls) => {
                                        const imageObjects = Array.isArray(urls)
                                            ? urls.map((url, idx) => ({ url, public_id: `img_${Date.now()}_${idx}` }))
                                            : [{ url: urls, public_id: `img_${Date.now()}` }];
                                        setFormData({ ...formData, images: imageObjects });
                                    }}
                                />
                                <div className="url-input-option">
                                    <label>Or enter image URLs manually:</label>
                                    <input
                                        type="text"
                                        value={formData.images[0]?.url || ''}
                                        onChange={(e) => {
                                            const newImages = [...formData.images];
                                            if (newImages[0]) newImages[0].url = e.target.value;
                                            else newImages[0] = { url: e.target.value, public_id: Date.now().toString() };
                                            setFormData({ ...formData, images: newImages });
                                        }}
                                        placeholder="Main image URL"
                                    />
                                    <input
                                        type="text"
                                        value={formData.images[1]?.url || ''}
                                        onChange={(e) => {
                                            const newImages = [...formData.images];
                                            if (newImages[1]) newImages[1].url = e.target.value;
                                            else newImages[1] = { url: e.target.value, public_id: (Date.now() + 1).toString() };
                                            setFormData({ ...formData, images: newImages });
                                        }}
                                        placeholder="Additional image URL"
                                    />
                                </div>
                            </div>

                            {/* Product Video Section */}
                            <div className="form-section full-width">
                                <h3>Product Video (Optional)</h3>
                                <FileUpload
                                    type="video"
                                    multiple={false}
                                    maxSize={50}
                                    onUpload={(url) => {
                                        setFormData({ ...formData, video: { url, public_id: `vid_${Date.now()}` } });
                                    }}
                                />
                                <div className="url-input-option">
                                    <label>Or enter video URL:</label>
                                    <input
                                        type="text"
                                        value={formData.video?.url || ''}
                                        onChange={(e) => setFormData({ ...formData, video: { ...formData.video, url: e.target.value, public_id: 'video_' + Date.now() } })}
                                        placeholder="Video URL (MP4)"
                                    />
                                </div>
                            </div>

                            <div className="form-group checkbox">
                                <label>
                                    <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} />
                                    Featured Product
                                </label>
                            </div>
                            <button type="submit" className="btn-submit full-width">Save Product</button>
                        </form>

                    </div>
                </div>
            )}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p._id}>
                                <td>{p.name}</td>
                                <td>{p.category?.name}</td>
                                <td>${p.price}</td>
                                <td>{p.countInStock}</td>
                                <td className="table-actions">
                                    <button className="btn-edit" onClick={() => setEditingProduct(p)}><Edit size={16} /></button>
                                    <button className="btn-delete" onClick={() => deleteProduct(p._id, admin.token)}><Trash2 size={16} /></button>
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
            <h1>Category Management</h1>
            <form className="inline-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <button type="submit" className="btn-add"><Plus size={18} /> Add</button>
            </form>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(c => (
                            <tr key={c._id}>
                                <td>{c.name}</td>
                                <td className="table-actions">
                                    <button className="btn-delete" onClick={() => deleteCategory(c._id, admin.token)}><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
            <h1>Inquiry Management</h1>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Product</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map(i => (
                            <tr key={i._id}>
                                <td>{i.name}</td>
                                <td>{i.email}</td>
                                <td>{i.product?.name || 'General'}</td>
                                <td><span className={`status-tag ${i.status.toLowerCase()}`}>{i.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
            <h1>Website Settings</h1>
            <div className="admin-form-container" style={{ maxWidth: '600px', marginTop: '30px' }}>
                <form onSubmit={handleSubmit} className="admin-form-grid" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="form-group">
                        <label>WhatsApp Number (without + or 0)</label>
                        <input
                            type="text"
                            value={settings.whatsappNumber}
                            onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                            required
                            placeholder="e.g. 9313029938"
                        />
                    </div>
                    <div className="form-group">
                        <label>Company Email</label>
                        <input
                            type="email"
                            value={settings.companyEmail}
                            onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Company Phone</label>
                        <input
                            type="text"
                            value={settings.companyPhone}
                            onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Company Address</label>
                        <textarea
                            value={settings.companyAddress}
                            onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                            required
                            rows="3"
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-submit" disabled={saving} style={{ marginTop: '20px' }}>
                        {saving ? 'Saving...' : 'Update Settings'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;


