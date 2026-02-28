import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Loader, ShieldCheck, Sparkles, Globe } from 'lucide-react';

const LoginPage = () => {
    const [mode, setMode] = useState('welcome'); // 'welcome', 'email'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    };

    const handleGuestLogin = () => {
        setLoading(true);
        setTimeout(() => {
            window.location.href = '/';
        }, 800);
    };

    return (
        <div style={{
            minHeight: '100vh', width: '100vw',
            background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Inter', system-ui, sans-serif",
            position: 'relative', overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)', top: '-20%', left: '-10%', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)', bottom: '-10%', right: '-5%', borderRadius: '50%' }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    width: '100%', maxWidth: '480px',
                    background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '40px', padding: '3.5rem',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.04)',
                    position: 'relative', zIndex: 1
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        width: 72, height: 72, borderRadius: '24px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 12px 32px rgba(99, 102, 241, 0.3)'
                    }}>
                        <Sparkles size={32} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#1E293B', marginBottom: '0.75rem', letterSpacing: '-0.04em' }}>
                        Learning Catalyst
                    </h1>
                    <p style={{ fontSize: '1.05rem', color: '#64748B', fontWeight: 500 }}>
                        The Intelligence Layer for Your Ambition.
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {mode === 'welcome' ? (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                        >
                            <button
                                onClick={() => setMode('email')}
                                style={{
                                    width: '100%', padding: '16px 24px',
                                    background: '#1E293B', color: '#FFFFFF',
                                    border: 'none', borderRadius: '20px',
                                    fontSize: '1rem', fontWeight: 700,
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                    transition: 'all 0.2s', boxShadow: '0 8px 24px rgba(30, 41, 59, 0.2)'
                                }}
                            >
                                <Mail size={20} /> Continue with Email
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', margin: '1rem 0' }}>
                                <div style={{ flex: 1, height: 1, background: '#F1F5F9' }} />
                                <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>OR</span>
                                <div style={{ flex: 1, height: 1, background: '#F1F5F9' }} />
                            </div>

                            <button
                                onClick={handleGuestLogin}
                                style={{
                                    width: '100%', padding: '16px 24px',
                                    background: 'transparent', color: '#64748B',
                                    border: '2px dashed #CBD5E1', borderRadius: '20px',
                                    fontSize: '1rem', fontWeight: 600,
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Globe size={20} /> Exploration Mode (Guest)
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="email"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleEmailLogin}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                    <input
                                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email address"
                                        required
                                        style={{
                                            width: '100%', padding: '16px 16px 16px 52px',
                                            background: '#F8FAFC', border: '1px solid #E2E8F0',
                                            borderRadius: '16px', color: '#1E293B', fontSize: '1rem',
                                            outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                    <input
                                        type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                        style={{
                                            width: '100%', padding: '16px 52px 16px 52px',
                                            background: '#F8FAFC', border: '1px solid #E2E8F0',
                                            borderRadius: '16px', color: '#1E293B', fontSize: '1rem',
                                            outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box'
                                        }}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%', padding: '16px',
                                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                    color: 'white', border: 'none', borderRadius: '20px',
                                    fontSize: '1rem', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.25)'
                                }}
                            >
                                {loading ? <Loader size={20} className="spin" /> : 'Authorize Access'} <ArrowRight size={20} />
                            </button>

                            <button
                                type="button"
                                onClick={() => setMode('welcome')}
                                style={{ background: 'transparent', color: '#64748B', border: 'none', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
                            >
                                ← Return to authentication options
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#94A3B8', fontSize: '0.85rem', fontWeight: 600 }}>
                        <ShieldCheck size={16} /> Secure Access Protocol
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
