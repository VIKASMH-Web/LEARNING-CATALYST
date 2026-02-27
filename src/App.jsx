import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Overview from './pages/Overview';
import LearningHub from './pages/LearningHub';
import CodeEnginePage from './pages/CodeEnginePage';
import Profile from './pages/Profile';
import MockInterview from './pages/MockInterview';
import LoginPage from './pages/LoginPage';
import ProgressProvider from './context/ProgressContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';


// Auth Gate: shows login if not authenticated
const AuthGate = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh', background: '#FFFFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#94A3B8', fontFamily: "'Inter', sans-serif"
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div className="spin" style={{ width: '40px', height: '40px', border: '3px solid #F1F5F9', borderTopColor: '#4F46E5', borderRadius: '50%' }} />
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Initializing Analytics...</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <LoginPage />;
    }

    return children;
};

import ProjectReviewer from './pages/ProjectReviewer';
import AcademicPlanner from './pages/AcademicPlanner';

import HelpCentre from './pages/HelpCentre';

function App() {
    return (
        <AuthProvider>
            <GameProvider>
                <ProgressProvider>
                    <Router>
                        <AuthGate>
                            <Routes>
                                <Route path="/" element={<MainLayout />}>
                                    <Route index element={<Overview />} />
                                    <Route path="practice" element={<LearningHub />} />
                                    <Route path="reviews" element={<ProjectReviewer />} />
                                    <Route path="roadmap" element={<AcademicPlanner />} />
                                    <Route path="career-simulator" element={<MockInterview />} />
                                    <Route path="code-engine" element={
                                        <ErrorBoundary message="Code Engine">
                                            <CodeEnginePage />
                                        </ErrorBoundary>
                                    } />
                                    <Route path="profile" element={<Profile />} />
                                    <Route path="help" element={<HelpCentre />} />
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Route>
                            </Routes>
                        </AuthGate>
                    </Router>
                </ProgressProvider>
            </GameProvider>
        </AuthProvider>
    );
}

export default App;
