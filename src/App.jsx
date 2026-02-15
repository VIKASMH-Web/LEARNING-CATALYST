import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Overview from './pages/Overview';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';
import CodeEnginePage from './pages/CodeEnginePage';
import FocusMode from './pages/FocusMode';
import Profile from './pages/Profile';
import CareerPlanner from './pages/CareerPlanner';
import MockInterview from './pages/MockInterview';
import ProgressProvider from './context/ProgressContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
      <ProgressProvider>
        <Router>
        <Routes>
            <Route path="/" element={<MainLayout />}>
            <Route index element={<Overview />} />
            <Route path="roadmaps" element={<Roadmap />} />
            <Route path="career-planner" element={<CareerPlanner />} />
            <Route path="resources" element={<Resources />} />
            <Route path="code-engine" element={
              <ErrorBoundary>
                <CodeEnginePage />
              </ErrorBoundary>
            } />
            <Route path="mock-interview" element={<MockInterview />} />
            <Route path="focus" element={<FocusMode />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
        </Router>
      </ProgressProvider>
  );
}

export default App;
