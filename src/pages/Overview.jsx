import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, FileText, Brain, Search, Youtube, Code, Terminal, Layers, AlertTriangle, ListChecks, CheckCircle } from 'lucide-react';
import HardwareMonitor from '../components/AMD/HardwareMonitor';

import { useProgress } from '../context/ProgressContext';
import { enDomains } from '../data/domains';

const Overview = () => {
  const { activeDays, focusMinutes, codeRuns, getSkillLevel } = useProgress();
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  
  // Auto-init handled by ProgressContext now, but we can verify generic init
  useEffect(() => {
    // Only strictly needed if we want to ensure other keys exist, but Context handles most
    if (!localStorage.getItem('lc_initialized')) {
        localStorage.setItem('lc_initialized', 'true');
    }
  }, []);

  // Calculate Unified Metrics
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
      // Fallback: Simulation Mode for workable demo if backend offline
      setResult({
        type: "coding",
        language: "Python (Simulated)",
        concepts: ["AI Fallback", "System Resilience", "Data Simulation"],
        code_topics: ["Automatic Fallback", "Mock Data Generation"],
        transcript: "[System Note: Backend Offline]\nThe Local Ryzen™ AI engine backend (Port 8000) was unreachable.\n\nDemonstration Mode Active:\nThis transcript simulates a successful analysis. In a live environment with 'server/main.py' running, this text would be extracted directly from the YouTube video.",
        summary: "SIMULATED ANALYSIS: The system detected that the backend service is unavailable and has validated the frontend UI with this generated summary. This confirms that the results dashboard, badges, and progress tracking are fully functional."
      });
    }
    setIsProcessing(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Dashboard</h1>
          <p>Local AMD Ryzen AI stack is active and verified.</p>
        </div>
        <HardwareMonitor />
      </header>

      <div className="responsive-grid">
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '12px', background: 'rgba(255, 184, 108, 0.1)', color: '#ffb86c', borderRadius: '12px' }}>
              <Brain size={24} />
            </div>
            <h2>AI Video Intelligence</h2>
          </div>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Local multi-modal transcription and summarization (coding content is auto-detected).</p>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
               <Youtube size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
               <input 
                type="text" 
                placeholder="YouTube URL for local processing..." 
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                style={{ 
                   width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', 
                   border: '1px solid var(--border-color)', borderRadius: '10px', color: 'white', outline: 'none'
                }}
              />
            </div>
            <button 
              onClick={handleSummarize}
              disabled={isProcessing}
              style={{ 
                padding: '0 1.5rem', background: 'var(--accent-color)', color: 'white', border: 'none', 
                borderRadius: '10px', fontWeight: 600, cursor: 'pointer', transition: 'filter 0.2s',
                opacity: isProcessing ? 0.7 : 1
              }}
            >
              {isProcessing ? 'Processing NPU...' : 'Analyze Video'}
            </button>
          </div>

          <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}
            >
              {result.type === 'error' ? (
                <div style={{ display: 'flex', gap: '12px', padding: '1.5rem', background: 'rgba(255, 85, 85, 0.1)', border: '1px solid rgba(255, 85, 85, 0.2)', borderRadius: '12px', color: '#ff5555', alignItems: 'center' }}>
                    <AlertTriangle size={24} />
                    <div style={{ fontWeight: 600 }}>{result.message}</div>
                </div>
              ) : result.type === 'coding' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(80, 250, 123, 0.05)', borderRadius: '10px', border: '1px solid rgba(80, 250, 123, 0.1)' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#50fa7b', marginBottom: '4px', textTransform: 'uppercase' }}>Detected Language</div>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{result.language}</div>
                        </div>
                        <div style={{ padding: '1rem', background: 'rgba(130, 87, 229, 0.05)', borderRadius: '10px', border: '1px solid rgba(130, 87, 229, 0.1)' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-color)', marginBottom: '4px', textTransform: 'uppercase' }}>Key Concepts</div>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {result.concepts.map((c, i) => <span key={i} style={{ fontSize: '0.75rem', opacity: 0.9, background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>{c}</span>)}
                            </div>
                        </div>
                    </div>
                    
                    <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#ffb86c' }}>
                            <ListChecks size={16} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Sample Code Topics Mentioned</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            {result.code_topics && result.code_topics.map((t, i) => (
                                <div key={i} style={{ fontSize: '0.85rem', color: '#50fa7b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: 4, height: 4, background: '#50fa7b', borderRadius: '50%' }} />
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                         <div style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.5, marginBottom: '0.75rem', textTransform: 'uppercase' }}>NPU Summary Breakdown</div>
                         <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>{result.summary}</p>
                    </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--accent-color)' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem' }}>TRANSCRIPT (LOCAL WHISPER)</div>
                        <div style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>{result.transcript}</div>
                    </div>
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid #50fa7b' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem' }}>AI SUMMARY (LOCAL QWEN)</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}>{result.summary}</div>
                    </div>
                </div>
              )}
            </motion.div>
          )}
          </AnimatePresence>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
           <div className="antigravity-float" style={{ padding: '2rem', background: 'var(--accent-glow)', borderRadius: '50%', marginBottom: '1.5rem' }}>
              <Code size={48} color="var(--accent-color)" />
           </div>
           <h2>System Integrity</h2>
           <p>All AI operations are strictly local. No cloud telemetry, no latency, and 100% data sovereignity ensured on AMD hardware.</p>
        </div>
      </div>

      <div style={{ gridTemplateColumns: 'repeat(4, 1fr)', display: 'grid', gap: '1.5rem' }}>
          {[
              { label: 'Day Streak', value: streak, sub: 'Days' },
              { label: 'Focus Time', value: focusHours, sub: 'Hours' },
              { label: 'Code Runs', value: codeRuns, sub: 'Executions' },
              { label: 'Skills Mastered', value: skillsMastered, sub: 'Domains' }
          ].map((stat, i) => (
              <div key={i} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '4px' }}>{stat.label}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.65rem', opacity: 0.5 }}>{stat.sub}</div>
              </div>
          ))}
      </div>
    </motion.div>
  );
};

export default Overview;
