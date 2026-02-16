import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import VoiceControl from '../VoiceControl/VoiceControl';

const MainLayout = () => {

  // Global Keyboard Shortcut: Cmd+K (Mac) / Ctrl+K (Windows/Linux)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

      if (
        (isMac && e.metaKey && e.key.toLowerCase() === 'k') ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === 'k')
      ) {
        e.preventDefault();
        // Dispatch a custom event that VoiceControl listens for
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
          maxWidth: '1600px', 
          margin: '0 auto', 
          width: '100%', 
          padding: '2rem',
          minHeight: '100vh',
          display: 'flex', 
          flexDirection: 'column'
        }}>
          {/* Top Bar with Voice Control */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center', 
            marginBottom: '2rem', 
            height: '40px'
          }}>
            <VoiceControl />
          </div>
          
          {/* Content Area */}
          <div style={{ flex: 1, width: '100%' }}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
