import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, ShieldCheck, MessageCircle, ArrowUpRight, Award, CheckCircle, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductContext } from '../context/ProductContext';
import WhatsAppButton from '../components/WhatsAppButton';
import './Home.css';

const Home = () => {
    const { products, settings, loading } = useContext(ProductContext);
    const whatsappNumber = settings?.whatsappNumber || '9313029938';

    const categories = [
        { name: "MEN'S WEAR", img: "/src/assets/men-category.png", path: "/catalog?category=Men's Wear" },
        { name: "WOMEN'S WEAR", img: "/src/assets/women-category.png", path: "/catalog?category=Women's Wear" },
        { name: "KID'S WEAR", img: "/src/assets/kids-category.png", path: "/catalog?category=Kids Wear" }
    ];

    const markets = [
        { code: "IN", name: "India", region: "SOUTH ASIA" },
        { code: "AE", name: "UAE", region: "MIDDLE EAST" },
        { code: "GB", name: "UK", region: "EUROPE" },
        { code: "DE", name: "Germany", region: "EUROPE" },
        { code: "FR", name: "France", region: "EUROPE" },
        { code: "US", name: "USA", region: "NORTH AMERICA" },
        { code: "CA", name: "Canada", region: "NORTH AMERICA" },
        { code: "AU", name: "Australia", region: "OCEANIA" },
        { code: "JP", name: "Japan", region: "ASIA PACIFIC" },
        { code: "SG", name: "Singapore", region: "ASIA PACIFIC" },
        { code: "SA", name: "Saudi Arabia", region: "MIDDLE EAST" },
        { code: "ZA", name: "South Africa", region: "AFRICA" }
    ];

    const displayBestSellers = products.filter(p => p.isFeatured).slice(0, 4).length > 0
        ? products.filter(p => p.isFeatured).slice(0, 4)
        : products.slice(0, 4);

    return (
        <motion.div
            className="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg">
                    <img src="/src/assets/hero-bg.png" alt="Premium Garment Showcase" />
                </div>
                <div className="container hero-container">
                    <motion.div
                        className="hero-content"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="hero-subtitle">PREMIUM TEXTILE EXPORTS SINCE 2010</span>
                        <h1 className="hero-title">JALAGARMENT</h1>
                        <p className="hero-description">
                            Quality garments for global markets. Trusted by 500+ clients across 25+ countries.
                        </p>
                        <div className="hero-actions">
                            <Link to="/catalog" className="btn-view-collection">
                                VIEW COLLECTION
                            </Link>
                            <Link to="/contact" className="btn-contact-us">
                                CONTACT US
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="hero-stats-bar">
                    <div className="container stats-container">
                        <div className="stat-box">
                            <span className="stat-number">25+</span>
                            <span className="stat-label">COUNTRIES</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-number">14+</span>
                            <span className="stat-label">YEARS</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">CLIENTS</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-number">1M+</span>
                            <span className="stat-label">PIECES</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges Section */}
            <section className="trust-badges-bar">
                <div className="container">
                    <div className="badges-wrapper">
                        <div className="badge-item">
                            <ShieldCheck size={20} />
                            <span>ISO 9001 CERTIFIED</span>
                        </div>
                        <div className="badge-item">
                            <Award size={20} />
                            <span>OEKO-TEX® STANDARD</span>
                        </div>
                        <div className="badge-item">
                            <CheckCircle size={20} />
                            <span>GOTS ORGANIC</span>
                        </div>
                        <div className="badge-item">
                            <Package size={20} />
                            <span>ETHICAL MANUFACTURING</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Section */}
            <section className="category-section section-padding">
                <div className="container">
                    <div className="section-header-minimal">
                        <h2>Shop By Category</h2>
                    </div>
                    <div className="category-grid-minimal">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={index}
                                className="category-card-minimal"
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={cat.path}>
                                    <div className="category-img-wrapper">
                                        <img src={cat.img} alt={cat.name} />
                                        <div className="category-overlay-minimal">
                                            <h3>{cat.name}</h3>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Markets Section */}
            <section className="markets-section">
                <div className="container">
                    <div className="markets-header">
                        <div className="global-reach-tag">
                            <Globe size={20} />
                            <span>GLOBAL REACH</span>
                        </div>
                        <h2>Markets We Serve</h2>
                        <p>Delivering premium textile exports to clients across the globe</p>
                    </div>

                    <div className="markets-grid-new">
                        {markets.map((market, index) => (
                            <motion.div
                                key={index}
                                className="market-card-new"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <span className="market-code-new">{market.code}</span>
                                <span className="market-name-new">{market.name}</span>
                                <span className="market-region-new">{market.region}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="markets-footer">
                        <p>And many more countries across <span>25+ nations</span> worldwide</p>
                    </div>
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="best-sellers-section section-padding">
                <div className="container">
                    <div className="best-sellers-header">
                        <h2>Best Sellers</h2>
                        <Link to="/catalog" className="view-all-link">
                            VIEW ALL <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="best-sellers-grid">
                        {loading ? (
                            <div className="loading-minimal">Loading Best Sellers...</div>
                        ) : displayBestSellers.length > 0 ? (
                            displayBestSellers.map((product, index) => (
                                <motion.div
                                    key={product._id || index}
                                    className="best-seller-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="best-seller-img">
                                        <img src={product.images?.[0]?.url || '/src/assets/placeholder.png'} alt={product.name} />
                                    </div>
                                    <div className="best-seller-info">
                                        <h3>{product.name}</h3>
                                        <span className="best-seller-cat">{product.category?.name || product.category}</span>
                                        <a
                                            href={`https://wa.me/${whatsappNumber}?text=I'm interested in ${product.name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="enquire-now-link"
                                        >
                                            <MessageCircle size={16} />
                                            Enquire Now
                                        </a>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="no-results-minimal">No best sellers found.</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Premium Export Quality Banner */}
            <section className="premium-banner-section">
                <div className="container" style={{ margin: "0px 100px" }}>
                    <div className="premium-banner-content">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2>Premium Export<br />Quality</h2>
                            <p>Serving international markets with quality garments since 2010. Trusted by 500+ clients across 25+ countries.</p>
                            <Link to="/catalog" className="btn-view-collection">
                                VIEW COLLECTION
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
