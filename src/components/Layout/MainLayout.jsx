import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import VoiceControl from '../VoiceControl/VoiceControl';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const MainLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
          <ThemeToggle />
          <VoiceControl />
        </div>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
