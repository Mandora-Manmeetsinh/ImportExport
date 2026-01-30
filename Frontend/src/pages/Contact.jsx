import React, { useState, useContext } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ProductContext } from '../context/ProductContext';
import './Contact.css';

const Contact = () => {
    const { settings } = useContext(ProductContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/inquiries', formData);
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to send message');
        }
        setLoading(false);
    };

    const whatsappNumber = settings?.whatsappNumber || '8511624907';
    const companyEmail = settings?.companyEmail || EMAIL_ADDRESS;
    const companyPhone = settings?.companyPhone || '+91 8511624907';
    const companyAddress = settings?.companyAddress || 'D-25, Bussa locality, Bharuch';

    return (
        <motion.div
            className="contact-page-new"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Section */}
            <section className="contact-hero-new">
                <div className="container">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        GET IN TOUCH
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Ready to discuss your requirements? We'd love to hear from you.
                    </motion.p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="contact-info-cards">
                <div className="container">
                    <div className="info-cards-grid">
                        <div className="info-card-new">
                            <Mail size={24} />
                            <h3>Send Email</h3>
                            <p>{companyEmail}</p>
                        </div>
                        <div className="info-card-new">
                            <Phone size={24} />
                            <h3>Call Us Now</h3>
                            <p>{companyPhone}</p>
                        </div>
                        <div className="info-card-new">
                            <MapPin size={24} />
                            <h3>Location</h3>
                            <p>{companyAddress}</p>
                        </div>
                        <div className="info-card-new">
                            <Headphones size={24} />
                            <h3>Update Info</h3>
                            <p>24/7 support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Image and Contact Form Section */}
            <section className="contact-main-section section-padding">
                <div className="container">
                    <div className="contact-main-grid">
                        {/* Left: Team Image */}
                        <div className="team-image-section">
                            <img src="/src/assets/contact-team.jpg" alt="GALA GARMENT Team" />
                        </div>

                        {/* Right: Contact Form */}
                        <div className="contact-form-section">
                            <h2>Sent a Message</h2>
                            {success && <div className="success-alert-new">Message sent successfully! We'll get back to you soon.</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-row-new">
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="Enter Name"
                                    />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        placeholder="Your Email"
                                    />
                                </div>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                    placeholder="Subject"
                                />
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows="6"
                                    placeholder="Write Your message"
                                ></textarea>
                                <p className="terms-text">I agree Terms and condition.</p>
                                <button type="submit" className="btn-subscribe" disabled={loading}>
                                    {loading ? 'Sending...' : 'Subscribe'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map and Quick Enquiry Section - Side by Side */}
            <section className="map-enquiry-section">
                <div className="map-enquiry-grid">
                    {/* Left: Map */}
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.583344616423!2d77.2711683150801!3d28.52130098246142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce14e8e379963%3A0x7d6a54388e379963!2sOkhla%20Industrial%20Estate%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1631234567890!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Office Location"
                        ></iframe>
                    </div>

                    {/* Right: Quick Enquiry */}
                    <div className="quick-enquiry-container">
                        <h2>Quick Enquiry</h2>
                        <p>The fastest way to reach us is through WhatsApp. Click below to start a conversation and get instant responses.</p>
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=Hello! I'm interested in your products.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp-enquiry"
                        >
                            <MessageCircle size={20} /> CHAT ON WHATSAPP
                        </a>
                        <p className="email-alternative">Or email us at <span>{companyEmail}</span></p>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Contact;
