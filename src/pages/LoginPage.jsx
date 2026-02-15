import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Zap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { loginWithEmail, loginWithGoogle, loginAsGuest } = useAuth();
    const [mode, setMode] = useState('welcome'); // 'welcome', 'email'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleEmailLogin = (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields');
            return;
        }
        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }
        loginWithEmail(email, password, name);
    };

    return (
        <div style={{
            minHeight: '100vh', width: '100vw',
            background: '#09090b',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Inter', system-ui, sans-serif",
            position: 'relative', overflow: 'hidden'
        }}>
            {/* Background Effects */}
            <div style={{
                position: 'absolute', width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
                top: '-10%', left: '-5%', borderRadius: '50%'
            }} />
            <div style={{
                position: 'absolute', width: '500px', height: '500px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                bottom: '-10%', right: '-5%', borderRadius: '50%'
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    width: '100%', maxWidth: '460px',
                    background: '#18181b', border: '1px solid #27272a',
                    borderRadius: '24px', padding: '3rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    position: 'relative', zIndex: 1
                }}
            >
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: '16px',
                        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.25rem auto',
                        boxShadow: '0 8px 24px rgba(124, 58, 237, 0.3)'
                    }}>
                        <Zap size={28} color="white" />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f4f4f5', marginBottom: '0.5rem' }}>
                        Learning Catalyst
                    </h1>
                    <p style={{ fontSize: '0.9rem', color: '#71717a' }}>
                        Accelerate your learning journey
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {mode === 'welcome' ? (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                        >
                            {/* Google Login */}
                            <button
                                onClick={loginWithGoogle}
                                style={{
                                    width: '100%', padding: '14px 20px',
                                    background: '#ffffff', color: '#1f2937',
                                    border: 'none', borderRadius: '12px',
                                    fontSize: '0.95rem', fontWeight: 600,
                                    cursor: 'pointer', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', gap: '12px',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 20px rgba(255,255,255,0.1)'; }}
                                onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Continue with Google
                            </button>

                            {/* Email Login */}
                            <button
                                onClick={() => setMode('email')}
                                style={{
                                    width: '100%', padding: '14px 20px',
                                    background: '#27272a', color: '#f4f4f5',
                                    border: '1px solid #3f3f46', borderRadius: '12px',
                                    fontSize: '0.95rem', fontWeight: 600,
                                    cursor: 'pointer', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', gap: '12px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => { e.target.style.background = '#3f3f46'; }}
                                onMouseLeave={e => { e.target.style.background = '#27272a'; }}
                            >
                                <Mail size={20} />
                                Continue with Email
                            </button>

                            {/* Divider */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0' }}>
                                <div style={{ flex: 1, height: 1, background: '#27272a' }} />
                                <span style={{ fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>or</span>
                                <div style={{ flex: 1, height: 1, background: '#27272a' }} />
                            </div>

                            {/* Guest Login */}
                            <button
                                onClick={loginAsGuest}
                                style={{
                                    width: '100%', padding: '14px 20px',
                                    background: 'transparent', color: '#a1a1aa',
                                    border: '1px dashed #3f3f46', borderRadius: '12px',
                                    fontSize: '0.9rem', fontWeight: 500,
                                    cursor: 'pointer', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', gap: '12px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.color = '#f4f4f5'; }}
                                onMouseLeave={e => { e.target.style.borderColor = '#3f3f46'; e.target.style.color = '#a1a1aa'; }}
                            >
                                <User size={18} />
                                Continue as Guest
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="email"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleEmailLogin}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                        >
                            {/* Name Field */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '6px', fontWeight: 500 }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
                                    <input
                                        type="text" value={name} onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                        style={{
                                            width: '100%', padding: '12px 14px 12px 44px',
                                            background: '#09090b', border: '1px solid #27272a',
                                            borderRadius: '10px', color: '#f4f4f5', fontSize: '0.9rem',
                                            outline: 'none', transition: 'border-color 0.2s',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                                        onBlur={e => e.target.style.borderColor = '#27272a'}
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '6px', fontWeight: 500 }}>Email</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
                                    <input
                                        type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                        placeholder="you@example.com"
                                        style={{
                                            width: '100%', padding: '12px 14px 12px 44px',
                                            background: '#09090b', border: '1px solid #27272a',
                                            borderRadius: '10px', color: '#f4f4f5', fontSize: '0.9rem',
                                            outline: 'none', transition: 'border-color 0.2s',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                                        onBlur={e => e.target.style.borderColor = '#27272a'}
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '6px', fontWeight: 500 }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
                                    <input
                                        type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                        placeholder="••••••••"
                                        style={{
                                            width: '100%', padding: '12px 44px 12px 44px',
                                            background: '#09090b', border: '1px solid #27272a',
                                            borderRadius: '10px', color: '#f4f4f5', fontSize: '0.9rem',
                                            outline: 'none', transition: 'border-color 0.2s',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={e => e.target.style.borderColor = '#7c3aed'}
                                        onBlur={e => e.target.style.borderColor = '#27272a'}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#71717a', display: 'flex', padding: 0 }}>
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', fontSize: '0.85rem', color: '#ef4444' }}>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                style={{
                                    width: '100%', padding: '14px',
                                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                                    color: 'white', border: 'none', borderRadius: '12px',
                                    fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    marginTop: '0.5rem', transition: 'transform 0.2s, box-shadow 0.2s',
                                    boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)'
                                }}
                                onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.4)'; }}
                                onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(124, 58, 237, 0.3)'; }}
                            >
                                Sign In <ArrowRight size={18} />
                            </button>

                            <button
                                type="button"
                                onClick={() => { setMode('welcome'); setError(''); }}
                                style={{
                                    width: '100%', padding: '10px',
                                    background: 'transparent', color: '#71717a',
                                    border: 'none', borderRadius: '8px',
                                    fontSize: '0.85rem', cursor: 'pointer',
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={e => e.target.style.color = '#f4f4f5'}
                                onMouseLeave={e => e.target.style.color = '#71717a'}
                            >
                                ← Back to all options
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#52525b', marginTop: '2rem' }}>
                    By continuing, you agree to our Terms of Service
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
