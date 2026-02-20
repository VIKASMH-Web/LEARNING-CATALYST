import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, MessageSquare, ArrowRight, RotateCcw,
  CheckCircle, XCircle, ChevronRight, Sparkles, Target,
  Clock, TrendingUp, Award, BarChart2, Zap, User,
  ThumbsUp, ThumbsDown, Volume2, Star
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import interviewQuestions from '../data/interviewQuestions.json';
import { popularSearches, getInterviewDomainKey, matchDomainKey } from '../utils/roadmapEngine';

// ============================================
// MOCK INTERVIEW — Domain-Aware Engine
// ============================================
const MockInterview = () => {
  const [phase, setPhase] = useState('setup'); // setup | interview | review
  const [selectedDomain, setSelectedDomain] = useState('');
  const [domainKey, setDomainKey] = useState('general');
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [confidence, setConfidence] = useState('medium'); // low | medium | high
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [followUpAnswer, setFollowUpAnswer] = useState('');
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef(null);
  const { addXP } = useProgress();

  // Available interview domains
  const domains = [
    { key: 'backend_developer', label: 'Backend Development', icon: '⚙️', color: '#60a5fa' },
    { key: 'frontend_developer', label: 'Frontend Development', icon: '🎨', color: '#34d399' },
    { key: 'data_scientist', label: 'Data Science', icon: '📊', color: '#fbbf24' },
    { key: 'hr', label: 'HR / People Ops', icon: '👥', color: '#f472b6' },
    { key: 'product_manager', label: 'Product Management', icon: '📱', color: '#a78bfa' },
    { key: 'digital_marketing', label: 'Digital Marketing', icon: '📣', color: '#fb923c' },
    { key: 'general', label: 'General / Behavioral', icon: '💬', color: '#94a3b8' },
  ];

  // Timer logic
  useEffect(() => {
    if (isTimerActive) {
      timerRef.current = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerActive]);

  const formatTimer = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // Start interview with selected domain
  const startInterview = (domain) => {
    const dk = domain;
    setDomainKey(dk);
    const domainQuestions = interviewQuestions[dk] || interviewQuestions['general'];
    // Shuffle and pick questions
    const shuffled = [...domainQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQ(0);
    setAnswers([]);
    setUserAnswer('');
    setConfidence('medium');
    setShowFollowUp(false);
    setFollowUpAnswer('');
    setTimer(0);
    setIsTimerActive(true);
    setPhase('interview');
  };

  // Submit answer
  const submitAnswer = () => {
    if (!userAnswer.trim()) return;
    
    const currentQuestion = questions[currentQ];
    const wordCount = userAnswer.trim().split(/\s+/).length;
    
    // Determine confidence based on answer length and keywords
    let autoConfidence = 'medium';
    if (wordCount < 15) autoConfidence = 'low';
    else if (wordCount > 50) autoConfidence = 'high';
    
    setConfidence(autoConfidence);
    
    const answerData = {
      question: currentQuestion.q,
      answer: userAnswer,
      confidence: autoConfidence,
      wordCount,
      timeSpent: timer,
    };
    
    setAnswers(prev => [...prev, answerData]);
    setShowFollowUp(true);
  };

  // Handle follow-up or skip
  const handleFollowUpSubmit = () => {
    const currentQuestion = questions[currentQ];
    // Update last answer with follow-up
    setAnswers(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        followUp: {
          question: confidence === 'low' ? currentQuestion.followUp?.easy : currentQuestion.followUp?.hard,
          answer: followUpAnswer,
        }
      };
      return updated;
    });
    
    moveToNext();
  };

  const skipFollowUp = () => {
    moveToNext();
  };

  const moveToNext = () => {
    setShowFollowUp(false);
    setFollowUpAnswer('');
    setUserAnswer('');
    setTimer(0);
    
    if (currentQ + 1 >= questions.length) {
      // End of interview
      setIsTimerActive(false);
      setPhase('review');
      addXP(50);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  // Calculate score
  const score = useMemo(() => {
    if (answers.length === 0) return { total: 0, avg: 0, high: 0, low: 0 };
    
    let high = 0, medium = 0, low = 0;
    answers.forEach(a => {
      if (a.confidence === 'high') high++;
      else if (a.confidence === 'medium') medium++;
      else low++;
    });
    
    const total = (high * 10 + medium * 7 + low * 4);
    const avg = Math.round(total / answers.length);
    
    return { total, avg, high, medium, low, count: answers.length };
  }, [answers]);

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(244,114,182,0.08)', border: '1px solid rgba(244,114,182,0.15)', marginBottom: 12, fontSize: '0.8rem', color: '#f472b6', fontWeight: 600 }}>
          <Mic size={14} /> Interview Intelligence
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Mock Interview
        </h1>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
          Domain-aware questions with adaptive follow-ups
        </p>
      </motion.div>

      {/* ============================================ */}
      {/* SETUP PHASE */}
      {/* ============================================ */}
      {phase === 'setup' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 16 }}>
            Choose your interview domain
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {domains.map(domain => (
              <motion.button
                key={domain.key}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setSelectedDomain(domain.key); startInterview(domain.key); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '18px 20px', borderRadius: 14, textAlign: 'left',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{domain.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.95rem' }}>{domain.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: 2 }}>
                    {interviewQuestions[domain.key]?.length || 0} questions
                  </div>
                </div>
                <ArrowRight size={16} color="#4b5563" style={{ marginLeft: 'auto' }} />
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ============================================ */}
      {/* INTERVIEW PHASE */}
      {/* ============================================ */}
      {phase === 'interview' && questions.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Progress Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${((currentQ + 1) / questions.length) * 100}%`, background: 'linear-gradient(90deg, #7c3aed, #3b82f6)', borderRadius: 99, transition: 'width 0.3s' }} />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              {currentQ + 1} / {questions.length}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.04)', fontSize: '0.8rem', color: '#9ca3af' }}>
              <Clock size={14} /> {formatTimer(timer)}
            </div>
          </div>

          {/* Question Card */}
          {!showFollowUp ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.75rem', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <span style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(124,58,237,0.1)', color: '#a78bfa', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase' }}>
                      {questions[currentQ].difficulty}
                    </span>
                    <span style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.04)', color: '#6b7280', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase' }}>
                      {questions[currentQ].domain}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.5 }}>
                    {questions[currentQ].q}
                  </h3>
                </div>

                {/* Answer Input */}
                <textarea
                  id="interview-answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here... Be detailed and specific."
                  style={{
                    width: '100%', minHeight: 160, padding: '14px 18px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)',
                    color: '#fff', fontSize: '0.95rem', outline: 'none', resize: 'vertical',
                    fontFamily: "'Inter', sans-serif", lineHeight: 1.6
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={skipFollowUp}
                      style={{ padding: '10px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#9ca3af', fontSize: '0.85rem', cursor: 'pointer' }}>
                      Skip
                    </button>
                    <button onClick={submitAnswer} disabled={!userAnswer.trim()}
                      style={{ padding: '10px 24px', borderRadius: 10, background: userAnswer.trim() ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'rgba(255,255,255,0.04)', border: 'none', color: userAnswer.trim() ? '#fff' : '#4b5563', fontSize: '0.85rem', fontWeight: 600, cursor: userAnswer.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 6 }}>
                      Submit <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            /* Follow-up Question */
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 16, padding: '1.5rem', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Zap size={16} color="#fbbf24" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fbbf24' }}>
                    {confidence === 'low' ? 'Easier Follow-up' : 'Advanced Follow-up'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.5 }}>
                  {confidence === 'low' ? questions[currentQ].followUp?.easy : questions[currentQ].followUp?.hard}
                </h3>
              </div>

              <textarea
                id="interview-followup"
                value={followUpAnswer}
                onChange={(e) => setFollowUpAnswer(e.target.value)}
                placeholder="Your follow-up answer..."
                style={{
                  width: '100%', minHeight: 100, padding: '14px 18px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: '0.95rem', outline: 'none', resize: 'vertical',
                  fontFamily: "'Inter', sans-serif", lineHeight: 1.6
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                <button onClick={skipFollowUp}
                  style={{ padding: '10px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#9ca3af', fontSize: '0.85rem', cursor: 'pointer' }}>
                  Skip
                </button>
                <button onClick={handleFollowUpSubmit}
                  style={{ padding: '10px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Next Question <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ============================================ */}
      {/* REVIEW PHASE */}
      {/* ============================================ */}
      {phase === 'review' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Score Summary */}
          <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, marginBottom: 28 }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: 4 }}>
              {score.avg}/10
            </div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginBottom: 16 }}>
              Average confidence score
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
              {[
                { label: 'Strong', count: score.high, color: '#34d399' },
                { label: 'Good', count: score.medium, color: '#fbbf24' },
                { label: 'Needs Work', count: score.low, color: '#f87171' },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: item.color }}>{item.count}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Answer Review */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 16 }}>
            Question Review
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {answers.map((a, i) => (
              <div key={i} style={{ padding: '16px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ 
                    width: 20, height: 20, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: a.confidence === 'high' ? 'rgba(52,211,153,0.15)' : a.confidence === 'medium' ? 'rgba(251,191,36,0.15)' : 'rgba(248,113,113,0.15)',
                    fontSize: '0.7rem', fontWeight: 700,
                    color: a.confidence === 'high' ? '#34d399' : a.confidence === 'medium' ? '#fbbf24' : '#f87171'
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#d1d5db', flex: 1 }}>
                    {a.question}
                  </span>
                  <span style={{
                    padding: '2px 8px', borderRadius: 4, fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase',
                    background: a.confidence === 'high' ? 'rgba(52,211,153,0.1)' : a.confidence === 'medium' ? 'rgba(251,191,36,0.1)' : 'rgba(248,113,113,0.1)',
                    color: a.confidence === 'high' ? '#34d399' : a.confidence === 'medium' ? '#fbbf24' : '#f87171'
                  }}>
                    {a.confidence}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.5, marginLeft: 28 }}>
                  {a.answer.length > 200 ? a.answer.substring(0, 200) + '...' : a.answer}
                </p>
                {a.wordCount && (
                  <div style={{ marginLeft: 28, marginTop: 4, fontSize: '0.7rem', color: '#4b5563' }}>
                    {a.wordCount} words
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Restart */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28 }}>
            <button onClick={() => { setPhase('setup'); setAnswers([]); }}
              style={{ padding: '10px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#9ca3af', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <RotateCcw size={14} /> New Interview
            </button>
            <button onClick={() => startInterview(domainKey)}
              style={{ padding: '10px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              Retry Same Domain <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MockInterview;
