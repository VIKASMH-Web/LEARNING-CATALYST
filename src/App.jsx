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
import SkillTreePage from './pages/SkillTreePage';

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

import ProjectReviewer from './pages/ProjectReviewer';
import AcademicPlanner from './pages/AcademicPlanner';

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
                                    <Route path="learning-hub" element={<LearningHub />} />
                                    <Route path="code-engine" element={
                                        <ErrorBoundary>
                                            <CodeEnginePage />
                                        </ErrorBoundary>
                                    } />
                                    <Route path="mock-interview" element={<MockInterview />} />
                                    <Route path="skill-tree" element={<SkillTreePage />} />
                                    <Route path="presentation-booster" element={<ProjectReviewer />} />
                                    <Route path="academic-planner" element={<AcademicPlanner />} />
                                    <Route path="profile" element={<Profile />} />
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
