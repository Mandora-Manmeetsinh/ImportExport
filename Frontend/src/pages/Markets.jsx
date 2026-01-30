import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Award, ShieldCheck, TrendingUp } from 'lucide-react';
import './Markets.css';

const Markets = () => {
    const mainMarkets = [
        { name: "Europe", countries: ["Germany", "UK", "France", "Spain"], icon: <Globe size={32} /> },
        { name: "North America", countries: ["USA", "Canada"], icon: <MapPin size={32} /> },
        { name: "Middle East", countries: ["UAE", "Saudi Arabia", "Qatar"], icon: <TrendingUp size={32} /> },
        { name: "Asia Pacific", countries: ["India", "Singapore", "Australia", "Japan"], icon: <Award size={32} /> }
    ];

    const stats = [
        { label: "Nations Served", value: "25+" },
        { label: "Global Clients", value: "500+" },
        { label: "Export Port", value: "JNPT / Mundra" },
        { label: "Compliance", value: "ISO 9001" }
    ];

    return (
        <motion.div
            className="markets-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Hero Section */}
            <section className="markets-hero">
                <div className="container">
                    <motion.span
                        className="market-subtitle"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        GLOBAL FOOTPRINT
                    </motion.span>
                    <motion.h1
                        className="market-title"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        JALA Markets
                    </motion.h1>
                    <motion.p
                        className="market-desc"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Bringing high-quality Indian textiles to the world. We serve diverse markets with specialized garment solutions tailored to international standards.
                    </motion.p>
                </div>
            </section>

            {/* Stats Bar */}
            <div className="market-stats-bar">
                <div className="container stats-flex">
                    {stats.map((stat, i) => (
                        <div className="market-stat-item" key={i}>
                            <span className="stat-val">{stat.value}</span>
                            <span className="stat-lab">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Global Reach Section */}
            <section className="global-presence">
                <div className="container">
                    <div className="presence-header">
                        <h2>World-Class Export Infrastructure</h2>
                        <p>Our logistics network ensures timely delivery to major global hubs across four continents.</p>
                    </div>

                    <div className="regions-grid">
                        {mainMarkets.map((region, i) => (
                            <motion.div
                                className="region-card"
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="region-icon">{region.icon}</div>
                                <h3>{region.name}</h3>
                                <div className="country-pills">
                                    {region.countries.map((c, j) => (
                                        <span key={j} className="country-pill">{c}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Standard */}
            <section className="market-quality">
                <div className="container quality-container">
                    <div className="quality-text">
                        <span><ShieldCheck size={24} /> INTERNATIONAL STANDARDS</span>
                        <h2>Exporting Excellence</h2>
                        <p>Every piece manufactured at JALAGARMENT undergoes rigorous quality checks to meet the stringent requirements of international buyers. We are compliant with global textile safety and labor regulations.</p>
                    </div>
                    <div className="quality-image">
                        <img src="/src/assets/quality-banner.png" alt="Quality Assurance" />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="markets-cta">
                <div className="container">
                    <h2>Ready to Expand Your Catalog?</h2>
                    <p>Contact our export division for bulk inquiries and international partnership opportunities.</p>
                    <button className="primary-btn">GET IN TOUCH</button>
                </div>
            </section>
        </motion.div>
    );
};

export default Markets;
