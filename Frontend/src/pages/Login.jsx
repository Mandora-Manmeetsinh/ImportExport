import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, admin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (admin) {
            navigate('/admin');
        }
    }, [admin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-branding">
                    <div className="branding-content">
                        <h1>JALA</h1>
                        <p>GARMENT & TEXTILES</p>
                        <div className="branding-badge">ADMIN PORTAL</div>
                    </div>
                </div>

                <div className="login-form-side">
                    <div className="login-card">
                        <header className="login-header">
                            <h2>Welcome back</h2>
                            <p>Enter your credentials to manage the export portal.</p>
                        </header>

                        {error && (
                            <div className="error-alert">
                                <AlertCircle size={18} /> <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="premium-form">
                            <div className="form-group">
                                <label><Mail size={16} /> Email Address</label>
                                <div className="input-wrapper">
                                    <input
                                        type="email"
                                        placeholder="admin@jalagarment.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label><Lock size={16} /> Password</label>
                                <div className="input-wrapper">
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-portal-login">
                                Sign In to Dashboard
                            </button>
                        </form>

                        <footer className="login-footer">
                            <p>© 2026 Jala Garment & Textiles. Secure Portal.</p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

