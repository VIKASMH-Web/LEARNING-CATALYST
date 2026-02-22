import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, BookOpen, Code, Clock, User, Target, Mic, X, CheckCircle, Crown, Search, Flame, Star, Zap, Network, Briefcase, Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFocus } from '../../context/FocusContext';
import { useGame } from '../../context/GameContext';
import { requestNotificationPermission, notifyProUpgrade } from '../../utils/notifications';

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

const Sidebar = () => {
  const { logout, user } = useAuth();
  const { isRunning, formattedTime } = useFocus();
  const { xp, level, streak, dailyQuests, completedQuests, completeQuest, isPremium, upgradeToPremium, userRole, setUserRole } = useGame();
  const [showPayment, setShowPayment] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const studentMenuItems = [
    { path: '/', name: 'Dashboard', icon: Layout },
    { path: '/learning-hub', name: 'Learning Hub', icon: Search },
    { path: '/skill-tree', name: 'Skill Tree', icon: Network },
    { path: '/mock-interview', name: 'Mock Interview', icon: Mic },
    { path: '/career-planner', name: 'Career Planner', icon: Target },
    { path: '/marketplace', name: 'Career Marketplace', icon: Briefcase },
    { path: '/code-engine', name: 'Code Engine', icon: Code },
    { path: '/focus', name: 'Focus Mode', icon: Clock },
    { path: '/profile', name: 'Profile', icon: User },
  ];

  const recruiterMenuItems = [
    { path: '/marketplace', name: 'Talent Search', icon: Users },
  ];

  const menuItems = userRole === 'recruiter' ? recruiterMenuItems : studentMenuItems;

  const handleRoleToggle = () => {
     setUserRole(prev => prev === 'student' ? 'recruiter' : 'student');
  };

  const handleUpgrade = () => {
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT;
    script.onload = () => {
      const options = {
        key: "rzp_test_dummykey", // Mock dummy key
        amount: "19900", // 199.00 INR
        currency: "INR",
        name: "Learning Catalyst",
        description: "Premium Member Upgrade",
        theme: { color: "#7c3aed" },
        handler: function (response) {
            setVerifying(true);
            setTimeout(() => {
              setVerifying(false);
              setVerified(true);
              upgradeToPremium();
              notifyProUpgrade();
              setTimeout(() => { setShowPayment(false); setVerified(false); }, 2500);
            }, 1000);
        },
        prefill: {
            name: user?.name || "Premium Learner",
            email: user?.email || "learner@example.com",
        }
      };
      
      try {
         const rzp = new window.Razorpay(options);
         rzp.on('payment.failed', function (response){
            alert("Payment failed: " + response.error.description);
         });
         rzp.open();
      } catch (err) {
         // Fallback mock if script fails to eval properly without real keys
         simulateMockPayment();
      }
    };
    script.onerror = () => {
        simulateMockPayment();
    };
    document.body.appendChild(script);
  };

  const simulateMockPayment = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      upgradeToPremium();
      notifyProUpgrade();
      setTimeout(() => { setShowPayment(false); setVerified(false); }, 2500);
    }, 1500);
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

          {/* Gamification Stats (Only show for students) */}
          {userRole === 'student' && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 12px', background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '8px',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 800, fontSize: '0.85rem'
                  }}>
                    L{level}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>XP</span>
                    <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: 800 }}>{xp.toLocaleString()}</span>
                  </div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 10px', background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '8px', color: '#ef4444'
                }}>
                  <Flame size={16} fill="currentColor" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{streak}</span>
                </div>
              </div>
          )}

          {/* Role Toggle Switch */}
          <div style={{
             display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem',
             background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem'
          }}>
             <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                 {userRole === 'student' ? 'Student Mode' : 'Recruiter Mode'}
             </span>
             <button onClick={handleRoleToggle} style={{
                 background: userRole === 'recruiter' ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.1)', border: 'none',
                 width: '40px', height: '22px', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s'
             }}>
                 <div style={{
                     width: '18px', height: '18px', background: 'white', borderRadius: '50%',
                     position: 'absolute', top: '2px', left: userRole === 'recruiter' ? '20px' : '2px',
                     transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                 }} />
             </button>
          </div>

          {/* Platform Label */}
          <div style={{ 
            fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-tertiary)',
            fontWeight: 600, letterSpacing: '0.1em', paddingLeft: '1rem', marginBottom: '0.75rem'
          }}>
            PLATFORM
          </div>

          {/* Navigation Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '1.5rem' }}>
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
                     {item.path === '/focus' && isRunning && (
                        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#34d399', fontWeight: 600, fontVariantNumeric: 'tabular-nums', background: 'rgba(52,211,153,0.1)', padding: '2px 6px', borderRadius: 4 }}>
                          {formattedTime}
                        </span>
                     )}
                     {isActive && !(item.path === '/focus' && isRunning) && (
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

          {/* Daily Quests Section */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-tertiary)',
              fontWeight: 600, letterSpacing: '0.1em', paddingLeft: '1rem', marginBottom: '0.75rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '0.5rem'
            }}>
              <span>DAILY QUESTS</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {dailyQuests?.map((q, i) => {
                const isCompleted = completedQuests.includes(q.id);
                return (
                  <div key={q.id} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    padding: '10px', borderRadius: '12px',
                    background: isCompleted ? 'rgba(250, 204, 21, 0.1)' : 'rgba(255,255,255,0.02)',
                    border: isCompleted ? '1px solid rgba(250, 204, 21, 0.2)' : '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.2s', cursor: isCompleted ? 'default' : 'pointer',
                  }} onClick={() => !isCompleted && completeQuest(q.id, q.reward)}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      background: isCompleted ? '#eab308' : 'rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: '2px'
                    }}>
                      {isCompleted ? <CheckCircle size={12} color="white" /> : <Star size={10} color="#a1a1aa" />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ 
                        margin: 0, fontSize: '0.8rem', fontWeight: isCompleted ? 600 : 500,
                        color: isCompleted ? '#fde047' : 'var(--text-secondary)',
                        textDecoration: isCompleted ? 'line-through' : 'none',
                        opacity: isCompleted ? 0.8 : 1
                      }}>
                        {q.title}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <Zap size={10} color={isCompleted ? '#eab308' : '#a78bfa'} />
                        <span style={{ fontSize: '0.7rem', color: isCompleted ? '#eab308' : '#a78bfa', fontWeight: 600 }}>
                          +{q.reward} XP
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Section */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>

            {/* Pro Plan Card */}
            {isPremium ? (
              /* Active Premium Plan Badge */
              <div style={{ 
                padding: '1rem', borderRadius: '16px', 
                background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(251,191,36,0.08))',
                border: '1px solid rgba(251,191,36,0.25)',
                display: 'flex', alignItems: 'center', gap: '10px', marginTop: '0.75rem'
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '10px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Crown size={18} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Premium Member
                    <Star size={12} fill="#fbbf24" color="#fbbf24" />
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    All AI Features Unlocked
                  </div>
                </div>
              </div>
            ) : (
              /* Upgrade Card */
              <div style={{ 
                padding: '1.25rem', borderRadius: '16px', 
                background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(0,0,0,0.5))', 
                border: '1px solid rgba(124,58,237,0.2)',
                display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.85rem', color: '#e2e8f0' }}>
                  <Star size={14} fill="#fbbf24" color="#fbbf24" /> Unlock Premium
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                  Weekly Growth Reports, AI Interview insights, and advanced metrics.
                </div>
                <button 
                  onClick={handleUpgrade}
                  style={{
                    padding: '0.75rem', borderRadius: '10px', border: '1px solid rgba(251,191,36,0.15)',
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(217,119,6,0))', 
                    color: '#fbbf24', fontSize: '0.8rem',
                    fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: '0 4px 15px rgba(245,158,11,0.05)'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.1))'}
                  onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(217,119,6,0))'}
                >
                  Upgrade Now
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* ====== PREMIUM ACTION MODAL (Fallback/Loading state) ====== */}
      <AnimatePresence>
        {verifying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
              zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)'
            }}
          >
             <div style={{ padding: '3rem', background: '#121222', borderRadius: '24px', textAlign: 'center', border: '1px solid #7c3aed' }}>
                 {!verified ? (
                   <>
                     <div className="spin" style={{ width: 48, height: 48, border: '4px solid rgba(124,58,237,0.2)', borderTopColor: '#7c3aed', borderRadius: '50%', margin: '0 auto 1.5rem' }} />
                     <h3 style={{ color: 'white' }}>Processing Payment...</h3>
                   </>
                 ) : (
                   <>
                     <CheckCircle size={56} color="#fbbf24" style={{ margin: '0 auto 1.5rem' }} />
                     <h3 style={{ color: '#fbbf24' }}>Premium Unlocked!</h3>
                   </>
                 )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
