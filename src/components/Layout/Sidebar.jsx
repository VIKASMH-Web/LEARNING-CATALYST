import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Layout, Map, Play, Code, Clock, User, Cpu, Target, Mic 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
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
          <div style={{ 
            width: '32px', height: '32px', 
            background: 'var(--accent-color)', 
            borderRadius: 'var(--radius-sm)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px var(--accent-glow)'
          }}>
            <Cpu size={18} color="white" />
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>LC</h1>
        </div>

        {/* Navigation Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.625rem 1rem', // Compressed padding for denser, pro feel
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--bg-elevated)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-color)' : '3px solid transparent',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.9rem',
                transition: 'all 0.15s ease',
              })}
            >
              {({ isActive }) => (
                <>
                   <item.icon size={18} color={isActive ? "var(--accent-color)" : "var(--icon-color)"} strokeWidth={isActive ? 2.5 : 2} />
                   <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Bottom Status Card */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ 
            padding: '1rem', 
            borderRadius: 'var(--radius-md)', 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border-color)',
            display: 'flex', flexDirection: 'column', gap: '8px'
          }}>
            <div style={{ 
              fontSize: '0.65rem', 
              textTransform: 'uppercase', 
              color: 'var(--text-tertiary)', 
              fontWeight: 600,
              letterSpacing: '0.05em'
            }}>
              AI Engine Status
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <div style={{ 
                 width: '8px', height: '8px', 
                 background: 'var(--success)', 
                 borderRadius: '50%',
                 boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)'
               }} />
               <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>AMD Ryzen™ AI</span>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Sidebar;
