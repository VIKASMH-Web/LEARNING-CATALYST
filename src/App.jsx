import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Overview from './pages/Overview';
import Roadmap from './pages/Roadmap';

import CodeEnginePage from './pages/CodeEnginePage';
import FocusMode from './pages/FocusMode';
import Profile from './pages/Profile';
import CareerPlanner from './pages/CareerPlanner';
import MockInterview from './pages/MockInterview';
import HelpCenter from './pages/HelpCenter';
import LoginPage from './pages/LoginPage';
import ProgressProvider from './context/ProgressContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// Auth Gate: shows login if not authenticated
const AuthGate = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
        return (
            <div style={{ 
                minHeight: '100vh', background: '#09090b', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#71717a', fontFamily: "'Inter', sans-serif"
            }}>
                Loading...
            </div>
        );
    }
    
    if (!isAuthenticated) {
        return <LoginPage />;
    }
    
    return children;
};

function App() {
    return (
        <AuthProvider>
            <ProgressProvider>
                <Router>
                    <AuthGate>
                        <Routes>
                            <Route path="/" element={<MainLayout />}>
                                <Route index element={<Overview />} />
                                <Route path="roadmaps" element={<Roadmap />} />
                                <Route path="career-planner" element={<CareerPlanner />} />

                                <Route path="code-engine" element={
                                    <ErrorBoundary>
                                        <CodeEnginePage />
                                    </ErrorBoundary>
                                } />
                                <Route path="mock-interview" element={<MockInterview />} />
                                <Route path="focus" element={<FocusMode />} />
                                <Route path="profile" element={<Profile />} />
                                <Route path="help" element={<HelpCenter />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Route>
                        </Routes>
                    </AuthGate>
                </Router>
            </ProgressProvider>
        </AuthProvider>
    );
}

export default App;
