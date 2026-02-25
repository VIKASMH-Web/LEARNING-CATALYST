import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout, BookOpen, Code, Clock, User, Target, Mic, X, CheckCircle, Crown, Search, Flame, Star, Zap, Network, Briefcase, Users, Calendar, GraduationCap
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
    { path: '/marketplace', name: 'Marketplace', icon: Briefcase },
    { path: '/presentation-booster', name: 'Pres. Booster', icon: Sparkles },
    { path: '/academic-planner', name: 'Academic Planner', icon: GraduationCap },
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
        key: "rzp_test_dummykey",
        amount: "19900",
        currency: "INR",
        name: "Learning Catalyst",
        description: "Premium Member Upgrade",
        theme: { color: "#6366f1" },
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
        rzp.on('payment.failed', function (response) {
          alert("Payment failed: " + response.error.description);
        });
        rzp.open();
      } catch (err) {
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
        <div style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', height: '100%' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.75rem', paddingLeft: '0.5rem' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: 'var(--accent-color)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0,
              letterSpacing: '-0.02em'
            }}>
              LC
            </div>
            <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              Catalyst
            </span>
            {isPremium && <Star size={12} fill="#fbbf24" color="#fbbf24" style={{ marginLeft: 'auto', opacity: 0.7 }} />}
          </div>

          {/* Minimal XP / Streak Row */}
          {userRole === 'student' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '0 0.5rem', marginBottom: '1.5rem',
              fontSize: '0.75rem', color: 'var(--text-tertiary)'
            }}>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{xp.toLocaleString()} XP</span>
              <span style={{ width: 1, height: 12, background: 'var(--border-color)' }} />
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Flame size={11} /> {streak}d streak
              </span>
            </div>
          )}

          {/* Role Toggle */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.375rem 0.625rem',
            borderRadius: 6, border: '1px solid var(--border-color)', marginBottom: '1.25rem'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-tertiary)' }}>
              {userRole === 'student' ? 'Student' : 'Recruiter'}
            </span>
            <button onClick={handleRoleToggle} style={{
              background: userRole === 'recruiter' ? 'var(--success)' : 'rgba(255,255,255,0.08)', border: 'none',
              width: '32px', height: '18px', borderRadius: '9px', position: 'relative', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <div style={{
                width: '14px', height: '14px', background: 'white', borderRadius: '50%',
                position: 'absolute', top: '2px', left: userRole === 'recruiter' ? '16px' : '2px',
                transition: 'left 0.2s ease'
              }} />
            </button>
          </div>

          {/* Section Label */}
          <div className="label" style={{ paddingLeft: '0.75rem', marginBottom: '0.5rem' }}>
            Navigation
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '1.5rem' }}>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '0.4375rem 0.75rem', borderRadius: 6,
                  textDecoration: 'none',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                  fontWeight: isActive ? 500 : 400, fontSize: '0.8125rem',
                  transition: 'all 0.1s ease',
                })}
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={15} color={isActive ? "var(--text-primary)" : "var(--text-tertiary)"} strokeWidth={isActive ? 2 : 1.5} />
                    <span>{item.name}</span>
                    {item.path === '/focus' && isRunning && (
                      <span style={{ marginLeft: 'auto', fontSize: '0.6875rem', color: 'var(--success)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                        {formattedTime}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Daily Quests */}
          <div style={{ marginBottom: '1rem' }}>
            <div className="label" style={{ paddingLeft: '0.75rem', marginBottom: '0.5rem' }}>
              Today
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {dailyQuests?.map((q) => {
                const isCompleted = completedQuests.includes(q.id);
                return (
                  <div key={q.id}
                    onClick={() => !isCompleted && completeQuest(q.id, q.reward)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '0.375rem 0.75rem', borderRadius: 6,
                      cursor: isCompleted ? 'default' : 'pointer',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => !isCompleted && (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{
                      width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                      border: isCompleted ? 'none' : '1px solid var(--border-hover)',
                      background: isCompleted ? 'var(--accent-color)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {isCompleted && <CheckCircle size={10} color="white" />}
                    </div>
                    <span style={{
                      fontSize: '0.75rem', fontWeight: 400,
                      color: isCompleted ? 'var(--text-tertiary)' : 'var(--text-secondary)',
                      textDecoration: isCompleted ? 'line-through' : 'none',
                      flex: 1
                    }}>
                      {q.title}
                    </span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
                      +{q.reward}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Area */}
          <div style={{ marginTop: 'auto', padding: '0 0.5rem' }}>
            {!isPremium && (
              <button
                onClick={handleUpgrade}
                style={{
                  width: '100%', padding: '0.75rem', borderRadius: 10,
                  background: 'linear-gradient(135deg, var(--accent-color) 0%, #4f46e5 100%)',
                  border: 'none',
                  color: 'white', fontSize: '0.8125rem',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                  position: 'relative', overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                }}
              >
                <Crown size={15} fill="white" />
                <span>Upgrade to Pro</span>
                {/* Subtle shimmer effect */}
                <div style={{
                  position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shimmer 2s infinite linear'
                }} />
              </button>
            )}
          </div>

        </div>
      </nav>

      {/* Payment Verification Modal */}
      <AnimatePresence>
        {verifying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
              zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)'
            }}
          >
            <div style={{ padding: '2.5rem', background: 'var(--bg-elevated)', borderRadius: 12, textAlign: 'center', border: '1px solid var(--border-color)', minWidth: 280 }}>
              {!verified ? (
                <>
                  <div className="spin" style={{ width: 36, height: 36, border: '2px solid var(--border-color)', borderTopColor: 'var(--accent-color)', borderRadius: '50%', margin: '0 auto 1.25rem' }} />
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Processing...</p>
                </>
              ) : (
                <>
                  <CheckCircle size={40} color="var(--success)" style={{ margin: '0 auto 1rem', display: 'block' }} />
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 500 }}>Premium Activated</p>
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
