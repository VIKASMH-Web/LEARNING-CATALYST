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
      <div style={{ padding: '2rem' }}>
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}
        >
          <div style={{ padding: '8px', background: 'var(--accent-color)', borderRadius: '12px', boxShadow: '0 0 15px var(--accent-glow)' }}>
            <Cpu size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '900', margin: 0, color: 'var(--text-primary)' }}>LC</h1>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.875rem 1.25rem',
                borderRadius: '12px',
                textDecoration: 'none',
                color: isActive ? 'white' : 'var(--text-secondary)',
                background: isActive ? 'rgba(130, 87, 229, 0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(130, 87, 229, 0.3)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              })}
            >
              <item.icon size={20} />
              <span style={{ fontWeight: 600, fontSize: '0.925rem' }}>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 'auto', padding: '2rem' }}>
        <div className="glass-card" style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>AI Engine</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: 8, height: 8, background: '#50fa7b', borderRadius: '50%' }}></div>
            AMD Ryzen™ AI
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
