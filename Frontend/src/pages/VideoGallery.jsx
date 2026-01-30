import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Play, ShieldCheck, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import './VideoGallery.css';

const VideoGallery = () => {
    const { products, loading } = useContext(ProductContext);
    const videoProducts = products.filter(p => p.video && p.video.url);

    return (
        <motion.div
            className="video-gallery-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <section className="video-hero-minimal">
                <div className="container">
                    <motion.span
                        className="subtitle"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        Visual Showcase
                    </motion.span>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        Manufacturing & <br /><span>Product Excellence</span>
                    </motion.h1>
                </div>
            </section>

            <div className="container section-padding">
                {loading ? (
                    <div className="loading-minimal">Loading visual gallery...</div>
                ) : videoProducts.length > 0 ? (
                    <div className="video-grid-minimal">
                        {videoProducts.map((product, index) => (
                            <motion.div
                                key={product._id}
                                className="video-card-minimal"
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="video-wrapper-minimal">
                                    <video controls poster={product.images[0]?.url}>
                                        <source src={product.video.url} type="video/mp4" />
                                    </video>
                                    <div className="video-badge-minimal">HD Showcase</div>
                                </div>
                                <div className="video-info-minimal">
                                    <span className="cat-tag">{product.category?.name}</span>
                                    <h3>{product.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="no-videos-minimal">
                        <p>Our latest manufacturing videos are being processed. Check back soon!</p>
                    </div>
                )}
            </div>

            <section className="transparency-section-minimal">
                <div className="container">
                    <div className="transparency-layout-minimal">
                        <div className="transparency-content-minimal">
                            <span className="subtitle">Transparency</span>
                            <h2>Why We Show Our Process?</h2>
                            <p>In international trade, trust is built through transparency. We showcase our manufacturing facilities, quality control stages, and packing processes to provide our global partners with complete peace of mind.</p>

                            <div className="transparency-features-minimal">
                                <div className="feature-item-minimal">
                                    <ShieldCheck size={24} />
                                    <div>
                                        <h4>Quality Audits</h4>
                                        <p>Visual proof of our multi-stage inspection process.</p>
                                    </div>
                                </div>
                                <div className="feature-item-minimal">
                                    <Globe size={24} />
                                    <div>
                                        <h4>Global Standards</h4>
                                        <p>Compliance with international manufacturing protocols.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="transparency-visual-minimal">
                            <div className="visual-overlay-box">
                                <Zap size={40} />
                                <h3>Real-time Quality</h3>
                                <p>Unedited footage of our production lines in action.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default VideoGallery;


