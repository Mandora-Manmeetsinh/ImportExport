import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductContext } from '../context/ProductContext';
import WhatsAppButton from '../components/WhatsAppButton';
import './Catalog.css';

const Catalog = () => {
    const { products, categories, loading } = useContext(ProductContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const allCollection = { _id: 'All', name: 'All Collection' };
    const displayCategories = [allCollection, ...categories];

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' ||
            p.category?._id === selectedCategory ||
            p.category?.name === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <motion.div
            className="catalog-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="catalog-hero">
                <div className="container">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        Shop All
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Explore our complete collection of premium garments designed for international markets.
                    </motion.p>
                </div>
            </div>

            <div className="container">
                <div className="catalog-controls-minimal">
                    <div className="category-filters-minimal">
                        {displayCategories.map(cat => (
                            <button
                                key={cat._id}
                                className={`filter-btn-minimal ${selectedCategory === cat._id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat._id)}
                            >
                                {cat.name === 'All Collection' ? 'ALL' : cat.name.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="catalog-main">
                    {loading ? (
                        <div className="loading-minimal">Loading collection...</div>
                    ) : (
                        <div className="product-grid-minimal">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product._id}
                                        className="product-card-minimal"
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <Link to={`/product/${product._id}`}>
                                            <div className="product-img-minimal">
                                                <img src={product.images[0]?.url} alt={product.name} />
                                            </div>
                                            <div className="product-info-minimal">
                                                <span className="product-category-tag">{product.category?.name.toUpperCase()}</span>
                                                <h3 className="product-title-minimal">{product.name}</h3>
                                                <div className="product-action-minimal">
                                                    <WhatsAppButton product={product} variant="minimal" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}

                    {!loading && filteredProducts.length === 0 && (
                        <div className="no-results-minimal">
                            <p>No products found matching your search.</p>
                            <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="btn-reset">Clear All Filters</button>
                        </div>
                    )}
                </div>
            </div>

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

export default Catalog;



