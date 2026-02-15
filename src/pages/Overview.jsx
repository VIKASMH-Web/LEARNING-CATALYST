import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Brain, Code, AlertTriangle, ListChecks, CheckCircle } from 'lucide-react';
import HardwareMonitor from '../components/AMD/HardwareMonitor';
import { useProgress } from '../context/ProgressContext';
import { enDomains } from '../data/domains';

const Overview = () => {
  const { activeDays, focusMinutes, codeRuns, getSkillLevel } = useProgress();
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  
  useEffect(() => {
    if (!localStorage.getItem('lc_initialized')) {
        localStorage.setItem('lc_initialized', 'true');
    }
  }, []);

  const streak = activeDays.length;
  const focusHours = (focusMinutes / 60).toFixed(1);
  const skillsMastered = enDomains.filter(d => getSkillLevel(d.title).percentage === 100).length;

  const handleSummarize = async () => {
    if (!videoUrl) return;
    setIsProcessing(true);
    setResult(null); 
    try {
      const res = await fetch('http://localhost:8000/api/summarize-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoUrl })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      // Fallback Simulation
      setTimeout(() => {
        setResult({
            type: "coding",
            language: "Python (Simulated)",
            concepts: ["AI Fallback", "System Resilience", "Data Simulation"],
            code_topics: ["Automatic Fallback", "Mock Data Generation"],
            transcript: "[System Note: Backend Offline]\nSimulated successful analysis for demonstration.",
            summary: "SIMULATED ANALYSIS: The system detected that the backend service is unavailable and has validated the frontend UI with this generated summary."
          });
      }, 1500);
    }
    setTimeout(() => setIsProcessing(false), 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      {/* Header Section */}
      <header className="page-header">
        <div>
          <h1 className="h1">Dashboard</h1>
          <p className="body-sm">Overview of your AI-accelerated learning journey.</p>
        </div>
        <HardwareMonitor />
      </header>

      {/* Stats Grid */}
      <div className="grid-cols-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {[
            { label: 'Day Streak', value: streak, sub: 'Days', color: 'var(--accent-color)' },
            { label: 'Focus Time', value: focusHours, sub: 'Hours', color: 'var(--info)' },
            { label: 'Code Runs', value: codeRuns, sub: 'Executions', color: 'var(--success)' },
            { label: 'Skills Mastered', value: skillsMastered, sub: 'Domains', color: 'var(--warning)' }
        ].map((stat, i) => (
            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>{stat.label}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{stat.sub}</div>
            </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        {/* Video Analyzer */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
                padding: '10px', 
                background: 'rgba(255, 184, 108, 0.15)', 
                color: '#ffb86c', 
                borderRadius: 'var(--radius-sm)' 
            }}>
              <Brain size={20} />
            </div>
            <div>
              <h2 className="h3">AI Video Intelligence</h2>
              <p className="body-sm">Analyze coding tutorials instantly with local processing.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
               <Youtube size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, color: 'var(--text-secondary)' }} />
               <input 
                type="text" 
                placeholder="Paste YouTube URL..." 
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                style={{ 
                   width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.75rem', 
                   background: 'var(--bg-secondary)', 
                   border: '1px solid var(--border-color)', 
                   borderRadius: 'var(--radius-sm)', 
                   color: 'var(--text-primary)',
                   fontSize: '0.9rem',
                   outline: 'none',
                   transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>
            <button 
              className="btn btn-primary"
              onClick={handleSummarize}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Analyze'}
            </button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ 
                    marginTop: '1.5rem', 
                    padding: '1.5rem', 
                    background: 'var(--bg-secondary)', 
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                }}>
                    {result.summary && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 600, fontSize: '0.85rem' }}>
                                <CheckCircle size={16} /> Analysis Complete
                            </div>
                            <p className="body-sm" style={{ color: 'var(--text-primary)' }}>{result.summary}</p>
                        </div>
                    )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* System Status / Promo */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
           <div className="antigravity-float" style={{ 
               padding: '1.5rem', 
               background: 'var(--bg-secondary)', 
               borderRadius: '50%', 
               border: '1px solid var(--border-color)',
               boxShadow: 'var(--shadow-md)'
           }}>
              <Code size={40} color="var(--accent-color)" />
           </div>
           <div>
               <h2 className="h3" style={{ marginBottom: '0.5rem' }}>Local Integrity</h2>
               <p className="body-sm">
                   100% on-device processing via AMD Ryzen™ AI. No data leaves your machine.
               </p>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Overview;
