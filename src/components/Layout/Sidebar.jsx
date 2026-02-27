import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Layout, Code, User, Mic, Search, GraduationCap, Sparkles, LifeBuoy, Globe, Clock, Compass, ShieldCheck, Zap, ChevronRight
} from 'lucide-react';
import { requestNotificationPermission } from '../../utils/notifications';
import { useTranslation } from '../../utils/i18n';
import './Sidebar.css';

const Sidebar = () => {
  const { t, lang, changeLanguage, languages } = useTranslation();
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const menuItems = [
    { path: '/', name: 'Analytics', icon: Layout },
    { path: '/practice', name: 'Learning Hub', icon: Zap },
    { path: '/reviews', name: 'Project Reviewer', icon: ShieldCheck },
    { path: '/roadmap', name: 'Academic Planner', icon: Compass },
    { path: '/career-simulator', name: 'AI Mock Interview', icon: Sparkles },
    { path: '/profile', name: t('profile'), icon: User },
    { path: '/help', name: t('help_centre'), icon: LifeBuoy },
  ];

  return (
    <nav className="sidebar" style={{ background: '#FFFFFF', borderRight: '1px solid #F1F5F9', width: '260px' }}>
      <div style={{ padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Brand Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3.5rem', paddingLeft: '0.25rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 900, fontSize: '0.9rem', flexShrink: 0,
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
          }}>
            LC
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1E293B', letterSpacing: '-0.04em' }}>
            Catalyst
          </span>
        </div>

        {/* Main Navigation */}
        <div className="label" style={{ paddingLeft: '0.5rem', marginBottom: '1rem', color: '#94A3B8', fontSize: '0.7rem', fontWeight: 800 }}>
          {t('navigation')}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '2rem' }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 14px', borderRadius: '16px',
                textDecoration: 'none',
                color: isActive ? '#4F46E5' : '#64748B',
                background: isActive ? '#F5F3FF' : 'transparent',
                fontWeight: isActive ? 800 : 500, fontSize: '0.9rem',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              })}
            >
              <item.icon size={18} strokeWidth={2.5} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Global Localisation */}
        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #F1F5F9' }}>
          <div className="label" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8' }}>
             <Globe size={14} /> Global Access
          </div>
          <div style={{ position: 'relative' }}>
            <select 
              value={lang} 
              onChange={(e) => changeLanguage(e.target.value)}
              style={{
                width: '100%', padding: '10px 14px', background: '#F8FAFC',
                border: '1px solid #E2E8F0', borderRadius: '12px',
                color: '#475569', fontSize: '0.85rem', fontWeight: 600, outline: 'none',
                appearance: 'none', cursor: 'pointer'
              }}
            >
              <option value="en">English (US)</option>
              <option value="hi">हिन्दी</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
              <option value="mr">मराठी</option>
              <option value="ml">മലയാളം</option>
            </select>
            <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94A3B8' }}>
              <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} />
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Sidebar;
