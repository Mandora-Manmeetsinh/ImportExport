import React, { useContext } from 'react';
import { MessageCircle } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
import './WhatsAppButton.css';

const WhatsAppButton = ({ product, variant = 'float' }) => {
    const { settings } = useContext(ProductContext);
    const phoneNumber = settings?.whatsappNumber || '9313029938';


    const getWhatsAppUrl = () => {
        let message = 'Hello, I am interested in your products. Please share price & MOQ';
        if (product) {
            const productUrl = `${window.location.origin}/product/${product._id}`;
            message = `Hello! I am interested in the product: ${product.name}. Link: ${productUrl}`;
        }
        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    };

    if (variant === 'detail') {
        return (
            <a
                href={getWhatsAppUrl()}
                className="whatsapp-detail-btn"
                target="_blank"
                rel="noopener noreferrer"
            >
                <MessageCircle size={20} /> Enquire Now On Whatsapp
            </a>
        );
    }

    if (variant === 'card' || variant === 'minimal') {
        return (
            <a
                href={getWhatsAppUrl()}
                className={variant === 'minimal' ? 'whatsapp-minimal-btn' : 'whatsapp-card-btn'}
                target="_blank"
                rel="noopener noreferrer"
            >
                <MessageCircle size={16} /> {variant === 'minimal' ? 'Enquire Now' : 'Inquiry'}
            </a>
        );
    }

    return (
        <a
            href={getWhatsAppUrl()}
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            title="Chat with us on WhatsApp"
        >
            <MessageCircle size={30} />
        </a>
    );
};


export default WhatsAppButton;
