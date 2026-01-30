import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Ruler, Palette, Box, Archive, Globe, MessageCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ProductContext } from '../context/ProductContext';
import WhatsAppButton from '../components/WhatsAppButton';
import InquiryModal from '../components/InquiryModal';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImg, setActiveImg] = useState(0);
    const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                setLoading(false);
                window.scrollTo(0, 0);
            } catch (err) {
                setError(err.response?.data?.message || 'Product not found');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const relatedProducts = products
        .filter(p => p.category?._id === product?.category?._id && p._id !== product?._id)
        .slice(0, 4);

    if (loading) return <div className="loading-minimal" style={{ padding: '200px 0' }}>Loading product details...</div>;
    if (error) return <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: 'red' }}>{error}</div>;
    if (!product) return null;

    return (
        <motion.div
            className="product-detail-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb-new">
                    <Link to="/catalog">Shop</Link>
                    <ChevronRight size={14} />
                    <Link to={`/catalog?category=${product.category?.name}`}>{product.category?.name}</Link>
                    <ChevronRight size={14} />
                    <span>{product.name}</span>
                </div>

                <div className="product-main-layout">
                    {/* Left: Gallery */}
                    <div className="product-gallery-new">
                        <div className="main-img-new">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImg}
                                    src={product.images[activeImg]?.url}
                                    alt={product.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </AnimatePresence>
                        </div>
                        {product.images.length > 1 && (
                            <div className="thumbnail-grid-new">
                                {product.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`thumb-item-new ${activeImg === index ? 'active' : ''}`}
                                        onClick={() => setActiveImg(index)}
                                    >
                                        <img src={img.url} alt="" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info */}
                    <div className="product-info-new">
                        <h1 className="product-title-new">{product.name}</h1>
                        <p className="product-description-new">{product.description}</p>

                        {/* Specification Cards */}
                        <div className="specs-grid-new">
                            {product.fabricType && (
                                <div className="spec-card-new">
                                    <div className="spec-icon-new">
                                        <Package size={20} />
                                    </div>
                                    <div className="spec-content-new">
                                        <span className="spec-label-new">Fabric</span>
                                        <span className="spec-value-new">{product.fabricType}</span>
                                    </div>
                                </div>
                            )}

                            {product.sizes && product.sizes.length > 0 && (
                                <div className="spec-card-new">
                                    <div className="spec-icon-new">
                                        <Ruler size={20} />
                                    </div>
                                    <div className="spec-content-new">
                                        <span className="spec-label-new">Sizes</span>
                                        <span className="spec-value-new">{product.sizes.join(', ')}</span>
                                    </div>
                                </div>
                            )}

                            {product.colors && product.colors.length > 0 && (
                                <div className="spec-card-new">
                                    <div className="spec-icon-new">
                                        <Palette size={20} />
                                    </div>
                                    <div className="spec-content-new">
                                        <span className="spec-label-new">Colors</span>
                                        <span className="spec-value-new">{product.colors.join(', ')}</span>
                                    </div>
                                </div>
                            )}

                            {product.moq && (
                                <div className="spec-card-new">
                                    <div className="spec-icon-new">
                                        <Box size={20} />
                                    </div>
                                    <div className="spec-content-new">
                                        <span className="spec-label-new">MOQ</span>
                                        <span className="spec-value-new">{product.moq}</span>
                                    </div>
                                </div>
                            )}

                            {product.packingDetails && (
                                <div className="spec-card-new">
                                    <div className="spec-icon-new">
                                        <Archive size={20} />
                                    </div>
                                    <div className="spec-content-new">
                                        <span className="spec-label-new">Packing</span>
                                        <span className="spec-value-new">{product.packingDetails}</span>
                                    </div>
                                </div>
                            )}

                            {product.exportCountries && product.exportCountries.length > 0 && (
                                <div className="spec-card-new">
                                    <div className="spec-icon-new">
                                        <Globe size={20} />
                                    </div>
                                    <div className="spec-content-new">
                                        <span className="spec-label-new">Export Countries</span>
                                        <span className="spec-value-new">{product.exportCountries.join(', ')}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* WhatsApp CTA */}
                        <WhatsAppButton product={product} variant="detail" />
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="related-section section-padding">
                        <div className="section-header-flex">
                            <h2>Related Collection</h2>
                            <Link to="/catalog" className="btn-outline-minimal">View All</Link>
                        </div>
                        <div className="product-grid-minimal">
                            {relatedProducts.map((p) => (
                                <div key={p._id} className="product-card-minimal">
                                    <Link to={`/product/${p._id}`}>
                                        <div className="product-img-minimal">
                                            <img src={p.images[0]?.url} alt={p.name} />
                                        </div>
                                        <div className="product-info-minimal">
                                            <div className="product-meta">
                                                <span className="cat-name">{p.category?.name}</span>
                                                <span className="price">${p.price.toFixed(2)}</span>
                                            </div>
                                            <h3>{p.name}</h3>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <InquiryModal
                product={product}
                isOpen={isInquiryModalOpen}
                onClose={() => setIsInquiryModalOpen(false)}
            />
        </motion.div>
    );
};

export default ProductDetail;
