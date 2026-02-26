import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Layout, Code, User, Mic, Search, GraduationCap, Sparkles, LifeBuoy, Globe
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
    { path: '/', name: t('dashboard'), icon: Layout },
    { path: '/learning-hub', name: t('learning_hub'), icon: Search },
    { path: '/academic-planner', name: t('academic_planner'), icon: GraduationCap },
    { path: '/presentation-booster', name: t('presentation_booster'), icon: Sparkles },
    { path: '/mock-interview', name: t('mock_interview'), icon: Mic },
    { path: '/code-engine', name: t('code_engine'), icon: Code },
    { path: '/profile', name: t('profile'), icon: User },
    { path: '/help', name: t('help_centre'), icon: LifeBuoy },
  ];

  return (
    <nav className="sidebar">
      <div style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '2.5rem', paddingLeft: '0.5rem' }}>
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
        </div>

        {/* Section Label */}
        <div className="label" style={{ paddingLeft: '0.75rem', marginBottom: '0.5rem' }}>
          {t('navigation')}
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
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Language Selector */}
        <div style={{ marginTop: 'auto', padding: '1rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="label" style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem' }}>
             <Globe size={12} /> Language
          </div>
          <select 
            value={lang} 
            onChange={(e) => changeLanguage(e.target.value)}
            style={{
              width: '100%', padding: '8px', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
              color: 'var(--text-secondary)', fontSize: '0.75rem', outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="mr">मराठी</option>
            <option value="ml">മലയാളം</option>
          </select>
        </div>

      </div>
    </nav>
  );
};

export default Sidebar;
