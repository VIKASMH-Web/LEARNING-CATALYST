import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import VoiceControl from '../VoiceControl/VoiceControl';

const MainLayout = () => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if (
        (isMac && e.metaKey && e.key.toLowerCase() === 'k') ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === 'k')
      ) {
        e.preventDefault();
        window.dispatchEvent(new Event('toggleVoiceMode'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div style={{ 
          maxWidth: '1152px',
          margin: '0 auto', 
          width: '100%', 
          padding: '2.5rem 3rem',
          minHeight: '100vh',
          display: 'flex', 
          flexDirection: 'column'
        }}>
          {/* Top bar */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center', 
            marginBottom: '2rem', 
            height: '32px'
          }}>
            <VoiceControl />
          </div>
          
          {/* Content */}
          <div style={{ flex: 1, width: '100%' }}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
