import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import axios from 'axios';
import './InquiryModal.css';

const InquiryModal = ({ product, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: `I am interested in ${product?.name}. Please provide more details regarding pricing and shipping.`,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/inquiries', {
                ...formData,
                product: product._id,
            });
            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setFormData({ name: '', phone: '', message: '' });
            }, 3000);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to send inquiry');
        }
        setLoading(false);
    };

    return (
        <div className="inquiry-modal-overlay">
            <div className="inquiry-modal-content">
                <div className="modal-header">
                    <h2>Product Inquiry</h2>
                    <button onClick={onClose} className="close-btn"><X size={24} /></button>
                </div>

                {success ? (
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <h3>Inquiry Sent!</h3>
                        <p>Thank you for your interest. Our team will contact you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="product-summary">
                            <img src={product.images[0]?.url} alt={product.name} />
                            <div>
                                <h4>{product.name}</h4>
                                <p>Category: {product.category?.name}</p>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                placeholder="Enter your email"
                            />
                        </div> */}

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                rows="4"
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Sending...' : <><Send size={18} /> Send Inquiry</>}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default InquiryModal;
