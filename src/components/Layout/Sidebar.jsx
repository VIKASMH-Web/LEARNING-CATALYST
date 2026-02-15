import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Layout, Map, Play, Code, Clock, User, Target, Mic, Settings, HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: Layout },
    { path: '/roadmaps', name: 'Roadmaps', icon: Map },
    { path: '/career-planner', name: 'Career Planner', icon: Target },
    { path: '/resources', name: 'Resources', icon: Play },
    { path: '/code-engine', name: 'Code Engine', icon: Code },
    { path: '/mock-interview', name: 'Mock Interview', icon: Mic },
    { path: '/focus', name: 'Focus Mode', icon: Clock },
    { path: '/profile', name: 'Profile', icon: User },
  ];

  return (
    <nav className="sidebar">
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
          <img 
            src="/lc-logo-icon.png" 
            alt="LC Logo" 
            style={{ 
              width: '36px', height: '36px', 
              borderRadius: '10px',
              objectFit: 'cover'
            }} 
          />
          <span style={{ 
            fontSize: '1.25rem', fontWeight: 700, margin: 0, 
            color: 'var(--text-primary)', letterSpacing: '-0.02em' 
          }}>
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
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.625rem 1rem',
                borderRadius: '10px',
                textDecoration: 'none',
                color: isActive ? '#a78bfa' : 'var(--text-secondary)',
                background: isActive ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                borderLeft: 'none',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.9rem',
                transition: 'all 0.15s ease',
                position: 'relative',
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
          {/* Settings */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '0.625rem 1rem', borderRadius: '10px',
            color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500,
            cursor: 'pointer', transition: 'all 0.15s ease'
          }}>
            <Settings size={18} color="var(--icon-color)" />
            <span>Settings</span>
          </div>
          {/* Help Center */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '0.625rem 1rem', borderRadius: '10px',
            color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500,
            cursor: 'pointer', transition: 'all 0.15s ease'
          }}>
            <HelpCircle size={18} color="var(--icon-color)" />
            <span>Help Center</span>
          </div>

          {/* Pro Plan Card */}
          <div style={{ 
            padding: '1rem', 
            borderRadius: '16px', 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border-color)',
            display: 'flex', flexDirection: 'column', gap: '8px',
            marginTop: '0.75rem'
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              Pro Plan
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
              Get unlimited AI mentoring and interview practice.
            </div>
            <button style={{
              padding: '0.5rem', borderRadius: '10px', border: 'none',
              background: '#7c3aed', color: 'white', fontSize: '0.8rem',
              fontWeight: 700, cursor: 'pointer', marginTop: '4px',
              transition: 'all 0.2s'
            }}>
              Upgrade
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Sidebar;
