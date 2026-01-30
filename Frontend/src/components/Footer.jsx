import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = 'JALAGARMENT';
    const typingSpeed = 120;

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <footer className="footer-new">
            <div className="footer-background">
                <div className="container">
                    <motion.div
                        className="footer-grid-new"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Brand Column */}
                        <motion.div className="footer-brand-new" variants={itemVariants}>
                            <div className="footer-logo-section">
                                <div className="logo-icon">
                                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
                                        <text x="50" y="65" fontSize="45" fontWeight="800" fill="#fff" textAnchor="middle" fontFamily="Arial, sans-serif">J</text>
                                    </svg>
                                </div>
                                <div className="typing-container">
                                    <span className="typing-text">{displayedText}</span>
                                    {displayedText.length < fullText.length && (
                                        <span className="cursor-blink">|</span>
                                    )}
                                </div>
                            </div>
                            <p className="brand-desc-new">
                                Serving international markets with quality garments since 2010. Trusted by 500+ clients across 25+ countries.
                            </p>
                            <div className="social-links-new">
                                <a href="#" aria-label="Instagram">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" aria-label="Facebook">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" aria-label="Twitter">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </motion.div>

                        {/* Shop Column */}
                        <motion.div className="footer-column-new" variants={itemVariants}>
                            <h4>Shop</h4>
                            <ul>
                                <li><Link to="/catalog?category=Men">Men</Link></li>
                                <li><Link to="/catalog?category=Women">Women</Link></li>
                                <li><Link to="/catalog?category=Kids">Kids</Link></li>
                                <li><Link to="/catalog?new=true">New Arrivals</Link></li>
                            </ul>
                        </motion.div>

                        {/* Company Column */}
                        <motion.div className="footer-column-new" variants={itemVariants}>
                            <h4>Company</h4>
                            <ul>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/video-gallery">Videos</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="/catalog?new=true">New Arrivals</Link></li>
                            </ul>
                        </motion.div>

                        {/* Contact Column */}
                        <motion.div className="footer-column-new" variants={itemVariants}>
                            <h4>Contact</h4>
                            <ul className="contact-list">
                                <li>
                                    <Mail size={16} />
                                    <span>[EMAIL_ADDRESS]</span>
                                </li>
                                <li>
                                    <Phone size={16} />
                                    <span>+91 8511624907</span>
                                </li>
                                <li>
                                    <MapPin size={16} />
                                    <span>Bharuch, Gujarat, India</span>
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>

                    <div className="footer-bottom-new">
                        <div className="copyright-new">
                            © {new Date().getFullYear()} Jalagarment. All rights reserved.
                        </div>
                        <div className="footer-bottom-links-new">
                            <Link to="/privacy">Privacy Policy</Link>
                            <Link to="/terms">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
