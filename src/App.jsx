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
import { GameProvider } from './context/GameContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ProjectReviewer from './pages/ProjectReviewer';
import AcademicPlanner from './pages/AcademicPlanner';
import HelpCentre from './pages/HelpCentre';

function App() {
    return (
        <GameProvider>
            <ProgressProvider>
                <Router>
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
                </Router>
            </ProgressProvider>
        </GameProvider>
    );
}

export default App;
