import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <nav className="navbar">
                <div className="container nav-container">
                    <div className="nav-left">
                        <Link to="/" className="logo">
                            JALAGARMENT
                        </Link>
                    </div>

                    <div className="nav-center">
                        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                            <Link to="/" onClick={() => setIsOpen(false)}>HOME</Link>
                            <Link to="/catalog" onClick={() => setIsOpen(false)}>SHOP</Link>
                            <Link to="/markets" onClick={() => setIsOpen(false)}>MARKETS</Link>
                            <Link to="/about" onClick={() => setIsOpen(false)}>ABOUT</Link>
                            <Link to="/contact" onClick={() => setIsOpen(false)}>CONTACT</Link>
                        </div>
                    </div>

                    <div className="nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </div>
                </div>
            </nav>
            <div className="announcement-bar">
                <p>Summer is here get ready! • Free shipping on international orders</p>
            </div>
        </header>
    );
};

export default Navbar;

