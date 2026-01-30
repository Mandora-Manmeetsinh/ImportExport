import React from 'react';
import { Package, Globe, Leaf, Lightbulb, MessageCircle, ShieldCheck, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
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

    const certifications = [
        {
            title: "ISO 9001:2015",
            desc: "International standard for Quality Management Systems (QMS).",
            icon: <ShieldCheck size={32} />
        },
        {
            title: "OEKO-TEX®",
            desc: "Standard 100 certification for textile products free from harmful substances.",
            icon: <Award size={32} />
        },
        {
            title: "GOTS",
            desc: "Global Organic Textile Standard for organic fibers and sustainable processing.",
            icon: <CheckCircle size={32} />
        },
        {
            title: "SEDEX",
            desc: "Empowering responsible supply chains through ethical data sharing.",
            icon: <Globe size={32} />
        },
        {
            title: "WRAP",
            desc: "Worldwide Responsible Accredited Production for ethical manufacturing.",
            icon: <Package size={32} />
        }
    ];

    const officialCertificates = [
        {
            title: "Import Export Code (IEC)",
            desc: "Government of India issued Importer-Exporter Code.",
            img: "/src/assets/cert-iec.png"
        },
        {
            title: "Import Export Management",
            desc: "Professional certification in global trade operations.",
            img: "/src/assets/cert-iii-em.png"
        },
        {
            title: "Industrial Development",
            desc: "Certification for specialized industrial manufacturing.",
            img: "/src/assets/cert-iid.png"
        }
    ];

    return (
        <motion.div
            className="about-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Section */}
            <section className="about-hero-new">
                <div className="container">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        SHOP ALL
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle-new"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        A legacy of quality and craftsmanship in the global fashion industry since 2010.
                    </motion.p>
                </div>
            </section>

            {/* Company Story Section */}
            <section className="company-story-section section-padding">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-image">
                            <img src="/src/assets/manufacturing-premium.png" alt="Premium Manufacturing Facility" />
                        </div>
                        <div className="story-content">
                            <h2>Crafting Excellence Since 2010</h2>
                            <p>
                                KnitKnot began with a simple vision: to bring the finest craftsmanship to the global fashion market. Over the past 14 years, we have grown from a small workshop to a leading clothing export company.
                            </p>
                            <p>
                                Our commitment to quality, combined with our understanding of international fashion trends, has made us a trusted partner for retailers and brands across 25+ countries.
                            </p>
                            <p>
                                We specialize in men's, women's, and children's wear, offering a comprehensive range of products from casual wear to formal attire.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Official Documentation Section */}
            <section className="official-docs-section section-padding">
                <div className="container">
                    <div className="section-header-centered">
                        <span className="subtitle">OFFICIAL CLEARANCE</span>
                        <h2>Verification & Compliance</h2>
                        <p>We operate with full governmental transparency and international trade adherence.</p>
                    </div>

                    <div className="official-certs-grid">
                        {officialCertificates.map((cert, index) => (
                            <motion.div
                                key={index}
                                className="official-cert-card glass-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className="official-cert-img">
                                    <img src={cert.img} alt={cert.title} />
                                    <div className="img-overlay">
                                        <Link to={cert.img} target="_blank" className="view-btn">
                                            View Original
                                        </Link>
                                    </div>
                                </div>
                                <div className="official-cert-info">
                                    <h3>{cert.title}</h3>
                                    <p>{cert.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industry Standards Section */}
            <section className="certifications-section section-padding">
                <div className="container">
                    <div className="section-header-centered">
                        <span className="subtitle">TRUSTED QUALITY</span>
                        <h2>Industry Certifications</h2>
                        <p>Our commitment to excellence is backed by globally recognized certifications.</p>
                    </div>

                    <div className="certifications-grid">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                className="cert-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="cert-icon">{cert.icon}</div>
                                <h3>{cert.title}</h3>
                                <p>{cert.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Markets We Serve Section */}
            <section className="markets-section-new">
                <div className="container">
                    <div className="markets-header-new">
                        <div className="global-tag">
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
                                <span className="market-code">{market.code}</span>
                                <span className="market-name">{market.name}</span>
                                <span className="market-region">{market.region}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="markets-footer-new">
                        <p>And many more countries across <span>25+ nations</span> worldwide</p>
                    </div>
                </div>
            </section>

            {/* Premium Export Quality Banner */}
            <section className="premium-banner-about">
                <div className="container">
                    <div className="premium-content-about">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2>Premium Export Quality</h2>
                            <p>Serving international markets with quality garments since 2010. Trusted by 500+ clients across 25+ countries.</p>
                            <a
                                href="https://wa.me/9313029938?text=Hello! I'm interested in your premium export quality garments."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp-about"
                            >
                                <MessageCircle size={20} /> CHAT ON WHATSAPP
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default About;
