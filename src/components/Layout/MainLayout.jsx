import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import VoiceControl from '../VoiceControl/VoiceControl';

const MainLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div style={{ 
          maxWidth: '1600px', 
          margin: '0 auto', 
          width: '100%', 
          padding: '2rem', // Generous padding
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
            height: '40px' // Fixed height for alignment
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
