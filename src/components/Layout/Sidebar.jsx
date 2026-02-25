import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Layout, Code, User, Mic, Search, Network
} from 'lucide-react';
import { requestNotificationPermission } from '../../utils/notifications';
import './Sidebar.css';


const Sidebar = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: Layout },
    { path: '/learning-hub', name: 'Learning Hub', icon: Search },
    { path: '/skill-tree', name: 'Skill Tree', icon: Network },
    { path: '/mock-interview', name: 'Mock Interview', icon: Mic },
    { path: '/code-engine', name: 'Code Engine', icon: Code },
    { path: '/profile', name: 'Profile', icon: User },
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
                </>
              )}
            </NavLink>
          ))}
        </div>

      </div>
    </nav>
  );
};

export default Sidebar;
