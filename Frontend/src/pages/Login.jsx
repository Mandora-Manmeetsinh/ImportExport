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
        <div className="login-page container">
            <div className="login-card">
                <h2>Admin Login</h2>
                <p>Enter your credentials to access the dashboard</p>

                {error && (
                    <div className="error-message" style={{ color: 'var(--error-color)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                        <AlertCircle size={18} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label><Mail size={18} /> Email Address</label>
                        <input
                            type="email"
                            placeholder="admin@elitewear.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label><Lock size={18} /> Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-login">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;

