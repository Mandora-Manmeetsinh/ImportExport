import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import './Footer.css';

const brandName = "JALAGARMENT";
const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
};

const child = {
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
    hidden: {
        opacity: 0,
        x: -20,
        y: 10,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
};

const Footer = () => {
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
                            <div className="footer-logo-group">
                                <div className="logo-icon-premium">
                                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: '#c5a059', stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
                                        <text x="50" y="65" fontSize="45" fontWeight="800" fill="#fff" textAnchor="middle" fontFamily="Arial, sans-serif">J</text>
                                    </svg>
                                </div>
                                <motion.div
                                    className="footer-logo-premium"
                                    variants={container}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false }}
                                >
                                    {brandName.split("").map((letter, index) => (
                                        <motion.span variants={child} key={index}>
                                            {letter}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </div>
                            <p className="brand-desc-new" style={{ fontSize: '1rem', lineHeight: '1.6', fontWeight: 'bold' }}>
                                Serving international markets with quality garments since 2010. <br />
                                Trusted by 500+ clients across 25+ countries.
                            </p>
                        </motion.div>

                        {/* Shop Column */}
                        <motion.div className="footer-column-new" variants={itemVariants}>
                            <h4>SHOP</h4>
                            <ul style={{ fontWeight: 'bold' }}>
                                <li><Link to="/catalog?category=Men's Wear">Men's Wear</Link></li>
                                <li><Link to="/catalog?category=Women's Wear">Women's Wear</Link></li>
                                <li><Link to="/catalog?category=Kids Wear">Kids Wear</Link></li>
                            </ul>
                        </motion.div>

                        {/* Company Column */}
                        <motion.div className="footer-column-new" variants={itemVariants}>
                            <h4>COMPANY</h4>
                            <ul style={{ fontWeight: 'bold' }}>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/markets">Markets We Serve</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </motion.div>

                        {/* Contact Column */}
                        <motion.div className="footer-column-new" variants={itemVariants}>
                            <h4>CONTACT</h4>
                            <ul className="contact-list" style={{ fontWeight: 'bold' }}>
                                <li><Mail size={16} /> <span>contact@jalagarment.com</span></li>
                                <li><Phone size={16} /> <span>+91 8511624907</span></li>
                                <li><MapPin size={16} /> <span>Bharuch, Gujarat, India</span></li>
                            </ul>
                        </motion.div>
                    </motion.div>

                    <div className="footer-bottom-new">
                        <div className="copyright-new" style={{ fontWeight: 'bold' }}>
                            © {new Date().getFullYear()} JALA. All rights reserved | Developed by <a href="https://www.exoticinfotech.com" target="_blank" rel="noopener noreferrer">Exotic InfoTech</a>
                        </div>
                        <div className="footer-bottom-links-new" style={{ fontWeight: 'bold' }}>
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
