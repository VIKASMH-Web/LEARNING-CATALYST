import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, BookOpen, ExternalLink, ChevronRight, Sparkles, 
  Clock, CheckCircle, Wrench, FileText, Code, Play,
  TrendingUp, Star, ArrowRight, Zap, Globe, X,
  GraduationCap, Layers, Target, Upload, MessageSquare, AlertCircle,
  Lightbulb, Brain, Terminal, ShieldCheck
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useTranslation } from '../utils/i18n';

const LearningHub = () => {
  const { t } = useTranslation();
  const [sessionActive, setSessionActive] = useState(false);
  const [practiceQuery, setPracticeQuery] = useState('');
  const [solutionBlocks, setSolutionBlocks] = useState(['']);
  const [feedback, setFeedback] = useState([]);
  const [hints, setHints] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockHints = [
    { title: "Inductive Step Check", content: "Assume your hypothesis holds for 'n', then rigorously prove for 'n+1'." },
    { title: "Temporal Complexity", content: "Are there redundant sub-calls? Memoization could optimize this into O(n)." },
    { title: "Edge Case Safety", content: "Consider null inputs or extreme bounds. How does the logic handle zero-state?" }
  ];

  const handleStartSession = () => {
    if (!practiceQuery.trim()) return;
    setSessionActive(true);
    setHints(mockHints);
  };

  const addBlock = () => setSolutionBlocks([...solutionBlocks, '']);
  const updateBlock = (idx, val) => {
    const b = [...solutionBlocks]; b[idx] = val; setSolutionBlocks(b);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setFeedback([
        { type: 'validation', text: "Excellent structural integrity in your recursive hypothesis." },
        { type: 'insight', text: "Critical Logic Gap: The boundary condition in Block 2 fails for negative integers." },
        { type: 'growth', text: "Optimization: Refactoring the internal loop to a hash-map fetch would yield O(1) time." }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  if (!sessionActive) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          style={{ maxWidth: 800, width: '100%', textAlign: 'center' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: '30px', background: 'rgba(99, 102, 241, 0.08)', color: 'var(--accent-color)', marginBottom: '2.5rem', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Brain size={16} /> Cognitive Workspace
          </div>
          
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.05em', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Master any concept <br/>with <span style={{ color: 'var(--accent-color)' }}>AI Mentorship.</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3.5rem', fontWeight: 500, lineHeight: 1.6 }}>
            Input a complex problem or domain. Our Socratic engine will <br/>guide your thinking through structured logical blocks.
          </p>

          <div style={{ 
            background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '32px', padding: '12px',
            display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 12px 48px rgba(0,0,0,0.05)',
            maxWidth: 650, margin: '0 auto'
          }}>
            <div style={{ paddingLeft: '1.5rem', color: 'var(--text-tertiary)' }}><Search size={22} /></div>
            <input 
              type="text" 
              placeholder="e.g. Distributed System Scaling or SQL Joins..." 
              value={practiceQuery}
              onChange={(e) => setPracticeQuery(e.target.value)}
              style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '1.25rem', fontWeight: 500, outline: 'none', color: 'var(--text-primary)' }}
              onKeyDown={(e) => e.key === 'Enter' && handleStartSession()}
            />
            <button 
              onClick={handleStartSession}
              style={{ background: 'var(--text-primary)', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '22px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Initiate Workspace
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', height: 'calc(100vh - 120px)', margin: '-2.5rem -3rem', background: '#FFFFFF' }}>
      
      {/* ═══ LEFT: STUDENT WORKSPACE ═══ */}
      <div style={{ overflowY: 'auto', padding: '4rem', borderRight: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: 750, margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--accent-color)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '1.5px' }}>
                <Terminal size={14} /> Active Practice Session
              </div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.03em' }}>{practiceQuery}</h1>
              <p style={{ color: 'var(--text-tertiary)', marginTop: '0.75rem', fontSize: '1rem', fontWeight: 500 }}>Deconstruct the solution into atomic logical stages.</p>
            </div>
            
            <button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing}
              style={{ 
                padding: '12px 24px', borderRadius: '14px', background: 'var(--text-primary)', color: 'white', 
                border: 'none', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(30, 41, 59, 0.1)'
              }}
            >
              {isAnalyzing ? <Clock size={18} className="spin" /> : <Zap size={18} fill="currentColor" />}
              {isAnalyzing ? 'Synthesizing...' : 'Critique Solution'}
            </button>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {solutionBlocks.map((block, i) => (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: -40, top: 12, width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, border: '1px solid var(--border-color)', color: 'var(--text-tertiary)' }}>{i + 1}</div>
                <textarea 
                  value={block}
                  onChange={(e) => updateBlock(i, e.target.value)}
                  placeholder={i === 0 ? "Identify the core problem and initial assumptions..." : "Develop the next logic branch..."}
                  style={{ 
                    width: '100%', minHeight: 120, padding: '1.5rem', background: '#F8FAFC', 
                    border: '1px solid var(--border-color)', borderRadius: '24px', fontSize: '1.1rem', 
                    color: 'var(--text-primary)', fontWeight: 500, outline: 'none', transition: 'all 0.2s', resize: 'vertical',
                    lineHeight: 1.6
                  }}
                  onFocus={e => { e.target.style.background = '#FFFFFF'; e.target.style.borderColor = 'var(--accent-color)'; e.target.style.boxShadow = '0 8px 24px rgba(99,102,241,0.04)'; }}
                  onBlur={e => { e.target.style.background = '#F8FAFC'; e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none'; }}
                />
              </motion.div>
            ))}
            
            <button 
              onClick={addBlock}
              style={{ padding: '16px', borderRadius: '20px', border: '2px dashed var(--border-color)', background: 'transparent', color: 'var(--text-tertiary)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-tertiary)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
            >
              + Extend Logical Branch
            </button>

            <div style={{ marginTop: '3rem', padding: '2.5rem', background: '#F8FAFC', borderRadius: '32px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, background: '#FFFFFF', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid var(--border-color)' }}>
                <Upload size={20} color="var(--text-tertiary)" />
              </div>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Analyze Handwritten Work?</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '1.5rem', fontWeight: 500 }}>Upload a photo and the AI will extract your logic for critique.</p>
              <button style={{ padding: '10px 24px', background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '12px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}>Extract from Image</button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT: AI MENTOR ═══ */}
      <div style={{ background: '#F8FAFC', overflowY: 'auto', padding: '3rem' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '3rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 16px rgba(99,102,241,0.2)' }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-primary)' }}>AI Mentor</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase' }}>Active Socratic Mode</div>
          </div>
        </header>

        <section style={{ marginBottom: '3.5rem' }}>
          <h3 style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>Thinking Prompts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {hints.map((hint, i) => (
              <details key={i} style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <summary style={{ padding: '1.25rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 800, display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none' }}>
                  {hint.title}
                  <Lightbulb size={16} color="var(--warning)" />
                </summary>
                <div style={{ padding: '0 1.25rem 1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>
                  {hint.content}
                </div>
              </details>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {feedback.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h3 style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>Synthesis Feedback</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {feedback.map((item, i) => (
                  <div key={i} style={{ 
                    padding: '1.5rem', borderRadius: '24px', 
                    background: item.type === 'validation' ? 'rgba(16,185,129,0.05)' : item.type === 'insight' ? 'rgba(239,68,68,0.05)' : 'rgba(99,102,241,0.05)',
                    border: '1px solid',
                    borderColor: item.type === 'validation' ? 'rgba(16,185,129,0.1)' : item.type === 'insight' ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)'
                  }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      {item.type === 'validation' && <CheckCircle size={18} color="#10B981" />}
                      {item.type === 'insight' && <AlertCircle size={18} color="#EF4444" />}
                      {item.type === 'growth' && <TrendingUp size={18} color="var(--accent-color)" />}
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.5, color: '#1E293B' }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--text-primary)', borderRadius: '24px', textAlign: 'center' }}>
                <p style={{ color: 'white', fontSize: '0.85rem', fontWeight: 500, marginBottom: '1.25rem', opacity: 0.8 }}>Does this resolution satisfy your learning objective?</p>
                <Link to="/reviews" style={{ background: 'white', color: 'var(--text-primary)', padding: '12px 24px', borderRadius: '14px', fontWeight: 800, textDecoration: 'none', display: 'inline-block', fontSize: '0.9rem' }}>Confirm & Archive Mastery</Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LearningHub;
