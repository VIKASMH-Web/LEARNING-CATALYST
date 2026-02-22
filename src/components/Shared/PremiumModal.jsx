import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, X, Star } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { notifyProUpgrade } from '../../utils/notifications';

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

const PremiumModal = ({ isOpen, onClose, featureName }) => {
  const { upgradeToPremium } = useGame();
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  if (!isOpen) return null;

  const handlePaymentConfirm = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      upgradeToPremium();
      notifyProUpgrade();
      setTimeout(() => { onClose(); setVerified(false); }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(6px)'
        }}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={e => e.stopPropagation()}
          style={{
            width: '90%', maxWidth: 420,
            background: '#121222', border: '1px solid rgba(251,191,36,0.2)',
            borderRadius: '24px', padding: '2.5rem', position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(251,191,36,0.15)',
            textAlign: 'center'
          }}
        >
          {verifying ? (
             <div style={{ padding: '2rem 0' }}>
               <div className="spin" style={{ width: 48, height: 48, border: '4px solid rgba(124,58,237,0.2)', borderTopColor: '#7c3aed', borderRadius: '50%', margin: '0 auto 1.5rem' }} />
               <h3 style={{ color: 'white' }}>Processing Payment...</h3>
             </div>
          ) : verified ? (
             <div style={{ padding: '2rem 0' }}>
               <CheckCircle size={56} color="#fbbf24" style={{ margin: '0 auto 1.5rem' }} />
               <h3 style={{ color: '#fbbf24' }}>Premium Unlocked!</h3>
             </div>
          ) : (
            <>
              <button
                onClick={onClose}
                style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
              
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(217,119,6,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Star size={32} fill="#fbbf24" color="#fbbf24" />
              </div>
              
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Premium Upgrade</h2>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.5 }}>
                {featureName ? `Access to ${featureName} requires a Premium membership.` : 'This feature requires a Premium membership.'}
              </p>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src="/upi_qrcode.png" alt="UPI QR Code" style={{ width: '180px', height: '180px', borderRadius: '12px', border: '2px solid rgba(251,191,36,0.4)', marginBottom: '12px' }} />
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b', marginBottom: '6px' }}>Amount: ₹200</div>
                  <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0, lineHeight: 1.5 }}>Scan this QR code using any UPI App (PhonePe, GPay, Paytm) to upgrade.</p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <button
                  onClick={handlePaymentConfirm}
                  style={{
                    width: '100%', padding: '1rem', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: 'white', border: 'none', fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(245,158,11,0.3)', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                  }}
                >
                  <CheckCircle size={16} fill="white" color="#d97706" /> I have completed the payment
                </button>
                <button
                  onClick={onClose}
                  style={{
                    width: '100%', padding: '1rem', borderRadius: '12px',
                    background: 'transparent', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PremiumModal;
