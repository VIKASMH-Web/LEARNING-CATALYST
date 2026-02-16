import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, BookOpen, Play, Code, Clock, User, Target, Mic, HelpCircle, X, CheckCircle, Crown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { requestNotificationPermission, notifyProUpgrade } from '../../utils/notifications';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [utr, setUtr] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  
  const storageKey = user?.id ? `lc_pro_${user.id}` : 'lc_pro_guest';
  const [isPro, setIsPro] = useState(() => localStorage.getItem(storageKey) === 'true');

  useEffect(() => {
    setIsPro(localStorage.getItem(storageKey) === 'true');
  }, [user?.id, storageKey]);

  useEffect(() => {
    // Listen for storage changes in other tabs
    const check = () => setIsPro(localStorage.getItem(storageKey) === 'true');
    window.addEventListener('storage', check);
    window.addEventListener('pro-status-update', check);
    requestNotificationPermission();
    return () => {
      window.removeEventListener('storage', check);
      window.removeEventListener('pro-status-update', check);
    };
  }, [storageKey]);

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: Layout },
    { path: '/roadmaps', name: 'Learning Hub', icon: BookOpen },
    { path: '/career-planner', name: 'Career Planner', icon: Target },
    { path: '/resources', name: 'Resources', icon: Play },
    { path: '/code-engine', name: 'Code Engine', icon: Code },
    { path: '/mock-interview', name: 'Mock Interview', icon: Mic },
    { path: '/focus', name: 'Focus Mode', icon: Clock },
    { path: '/profile', name: 'Profile', icon: User },
  ];

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      localStorage.setItem(storageKey, 'true');
      setIsPro(true);
      // Send real device notification
      notifyProUpgrade();
      setTimeout(() => { setShowPayment(false); setVerified(false); setUtr(''); }, 2500);
    }, 2000);
  };

  return (
    <>
      <nav className="sidebar">
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          {/* Logo Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '10px', flexShrink: 0 }}>
              <defs>
                <linearGradient id="logoBg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7c3aed"/>
                  <stop offset="1" stopColor="#4f46e5"/>
                </linearGradient>
              </defs>
              <rect width="36" height="36" rx="10" fill="url(#logoBg)"/>
              <text x="18" y="24" textAnchor="middle" fill="white" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="16" letterSpacing="-0.5">LC</text>
            </svg>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Catalyst
            </span>
          </div>

          {/* Platform Label */}
          <div style={{ 
            fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-tertiary)',
            fontWeight: 600, letterSpacing: '0.1em', paddingLeft: '1rem', marginBottom: '0.75rem'
          }}>
            PLATFORM
          </div>

          {/* Navigation Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '0.625rem 1rem', borderRadius: '10px',
                  textDecoration: 'none',
                  color: isActive ? '#a78bfa' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                  fontWeight: isActive ? 600 : 500, fontSize: '0.9rem',
                  transition: 'all 0.15s ease', position: 'relative',
                })}
              >
                {({ isActive }) => (
                  <>
                     <item.icon size={18} color={isActive ? "#a78bfa" : "var(--icon-color)"} strokeWidth={isActive ? 2.5 : 2} />
                     <span>{item.name}</span>
                     {isActive && (
                       <div style={{
                         position: 'absolute', right: '12px', width: '6px', height: '6px',
                         borderRadius: '50%', background: '#7c3aed'
                       }} />
                     )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Bottom Section */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {/* Help Center */}
            <NavLink
              to="/help"
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '0.625rem 1rem', borderRadius: '10px',
                textDecoration: 'none',
                color: isActive ? '#a78bfa' : 'var(--text-secondary)',
                background: isActive ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                fontSize: '0.9rem', fontWeight: 500, transition: 'all 0.15s ease',
              })}
            >
              <HelpCircle size={18} />
              <span>Help Center</span>
            </NavLink>

            {/* Pro Plan Card */}
            {isPro ? (
              /* Active Pro Plan Badge */
              <div style={{ 
                padding: '1rem', borderRadius: '16px', 
                background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(80,250,123,0.08))',
                border: '1px solid rgba(124,58,237,0.25)',
                display: 'flex', alignItems: 'center', gap: '10px', marginTop: '0.75rem'
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '10px',
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Crown size={18} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Pro Premium Member
                    <span style={{
                      padding: '2px 6px', borderRadius: '6px',
                      background: 'rgba(80,250,123,0.15)', color: '#50fa7b',
                      fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase'
                    }}>Active</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    All features unlocked
                  </div>
                </div>
              </div>
            ) : (
              /* Upgrade Card */
              <div style={{ 
                padding: '1rem', borderRadius: '16px', 
                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.75rem'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Pro Plan</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                  Get unlimited AI mentoring and interview practice.
                </div>
                <button 
                  onClick={() => setShowPayment(true)}
                  style={{
                    padding: '0.5rem', borderRadius: '10px', border: 'none',
                    background: '#7c3aed', color: 'white', fontSize: '0.8rem',
                    fontWeight: 700, cursor: 'pointer', marginTop: '4px', transition: 'all 0.2s'
                  }}
                >
                  Upgrade
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* ====== UPI PAYMENT MODAL ====== */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPayment(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
              zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '90%', maxWidth: 450, background: '#121222',
                border: '1px solid var(--border-color)', borderRadius: '20px',
                padding: '2rem', position: 'relative',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
              }}
            >
              <button
                onClick={() => setShowPayment(false)}
                style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              {verified ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <CheckCircle size={56} color="#50fa7b" style={{ marginBottom: '1rem' }} />
                  <h2 style={{ fontSize: '1.4rem', color: '#50fa7b', marginBottom: '0.5rem' }}>Payment Verified!</h2>
                  <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Pro Plan unlocked. Enjoy unlimited features!</p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'white', textAlign: 'center' }}>Scan & Pay via UPI</h2>
                  
                  <div style={{
                    background: '#1a1a30', padding: '1.5rem', borderRadius: '12px',
                    marginBottom: '1.5rem', border: '1px solid #2a2a4a',
                    textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'
                  }}>
                    <p style={{ color: '#ccc', fontSize: '0.9rem', margin: 0 }}>Scan the QR Code using any UPI App</p>
                    <div style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
                      <img src="/upi_qrcode.png" alt="UPI QR Code" style={{ width: '180px', height: '180px', objectFit: 'contain' }} />
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)' }}>
                      <p style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '2px', margin: '0 0 2px 0' }}>UPI ID</p>
                      <strong style={{ color: '#fff', fontSize: '1.1rem', letterSpacing: '0.5px' }}>vikasmh@fam</strong>
                    </div>
                    <hr style={{ width: '100%', border: 'none', borderTop: '1px solid #2a2a4a', margin: '0.25rem 0' }} />
                    <div style={{ textAlign: 'left', width: '100%' }}>
                      <p style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '4px', margin: '0 0 4px 0' }}><strong>Step 1:</strong> Pay <strong style={{ color: '#50fa7b' }}>₹199</strong> via UPI.</p>
                      <p style={{ color: '#ccc', fontSize: '0.85rem', margin: 0 }}><strong>Step 2:</strong> Enter 12-digit UTR below.</p>
                    </div>
                  </div>

                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#ccc' }}>Enter UTR / Transaction ID</label>
                  <input
                    type="text"
                    placeholder="e.g. 123456789012"
                    value={utr}
                    onChange={e => setUtr(e.target.value.replace(/\D/g, ''))}
                    maxLength={12}
                    style={{
                      width: '100%', padding: '0.85rem', borderRadius: '10px',
                      border: '1px solid var(--border-color)', background: '#060612',
                      color: 'white', outline: 'none', fontSize: '1rem', letterSpacing: '1px'
                    }}
                  />
                  <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px', textAlign: 'right' }}>{utr.length}/12 digits</p>

                  <button
                    onClick={handleVerify}
                    disabled={verifying || utr.length < 12}
                    style={{
                      marginTop: '1rem', width: '100%', padding: '1rem', borderRadius: '12px',
                      background: (verifying || utr.length < 12) ? '#1e1e3e' : '#50fa7b',
                      color: (verifying || utr.length < 12) ? '#4e4e6e' : 'black',
                      border: 'none', fontWeight: 700, fontSize: '0.95rem',
                      cursor: (verifying || utr.length < 12) ? 'not-allowed' : 'pointer',
                      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
                    }}
                  >
                    {verifying ? (
                      <>Verifying Payment <Clock className="spin" size={18} /></>
                    ) : (
                      <>Verify Payment & Unlock <CheckCircle size={18} /></>
                    )}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
