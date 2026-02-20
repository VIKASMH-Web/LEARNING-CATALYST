import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Calendar, Clock, MapPin, ChevronRight, Zap,
  ArrowRight, CheckCircle, BookOpen, Wrench, Sparkles,
  TrendingUp, User, Globe
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { generateCareerPlan, popularSearches } from '../utils/roadmapEngine';

// ============================================
// CAREER PLANNER — Personalized Career Roadmap
// ============================================
const CareerPlanner = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    targetRole: '',
    currentLevel: 'beginner',
    timeAvailability: 'part-time',
    country: '',
    duration: '6months',
  });
  const [plan, setPlan] = useState(null);
  const [activePhase, setActivePhase] = useState(0);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    if (!formData.targetRole.trim()) return;
    const result = generateCareerPlan(formData);
    setPlan(result);
    setStep(5);
    setActivePhase(0);
  };

  const nextStep = () => {
    if (step === 1 && !formData.targetRole.trim()) return;
    if (step < 4) setStep(step + 1);
    else handleGenerate();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetPlanner = () => {
    setStep(1);
    setPlan(null);
    setFormData({ targetRole: '', currentLevel: 'beginner', timeAvailability: 'part-time', country: '', duration: '6months' });
  };

  const roleOptions = popularSearches.slice(0, 16);

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.15)', marginBottom: 12, fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
          <Target size={14} /> Career Intelligence
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.02em', marginBottom: 4 }}>
          {plan ? `Your ${plan.role} Plan` : 'Career Planner'}
        </h1>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
          {plan ? `${plan.totalMonths}-month personalized roadmap • ${plan.hoursPerWeek}` : 'Build a time-based, personalized career roadmap'}
        </p>
      </motion.div>

      {/* ============================================ */}
      {/* STEP WIZARD */}
      {/* ============================================ */}
      {!plan && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Progress Bar */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
            {[1,2,3,4].map(s => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 99, background: s <= step ? 'linear-gradient(90deg, #7c3aed, #3b82f6)' : 'rgba(255,255,255,0.06)', transition: 'all 0.3s' }} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
              {/* Step 1 — Target Role */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 4, color: '#e2e8f0' }}>
                    What role are you targeting?
                  </h2>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: 24 }}>
                    Enter any career path — technical or non-technical
                  </p>
                  <input
                    id="career-target-role"
                    type="text"
                    value={formData.targetRole}
                    onChange={(e) => handleChange('targetRole', e.target.value)}
                    placeholder="e.g. Backend Developer, Data Scientist, HR Manager..."
                    style={{ width: '100%', padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '1rem', outline: 'none', marginBottom: 20 }}
                  />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {roleOptions.map((role, i) => (
                      <button key={i} onClick={() => handleChange('targetRole', role)}
                        style={{ padding: '6px 14px', borderRadius: 8, background: formData.targetRole === role ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)', border: formData.targetRole === role ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.06)', color: formData.targetRole === role ? '#a78bfa' : '#9ca3af', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 — Current Level */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 4, color: '#e2e8f0' }}>
                    What's your current level?
                  </h2>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: 24 }}>
                    This helps us skip topics you already know
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { value: 'beginner', label: 'Beginner', desc: 'Just starting out, no prior experience', icon: '🌱' },
                      { value: 'intermediate', label: 'Intermediate', desc: 'Some knowledge, completed basic courses', icon: '🚀' },
                      { value: 'advanced', label: 'Advanced', desc: 'Strong foundation, looking to specialize', icon: '⚡' },
                    ].map(level => (
                      <button key={level.value} onClick={() => handleChange('currentLevel', level.value)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 14, border: formData.currentLevel === level.value ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.06)', background: formData.currentLevel === level.value ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left'
                        }}>
                        <span style={{ fontSize: '1.5rem' }}>{level.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, color: formData.currentLevel === level.value ? '#a78bfa' : '#e2e8f0', fontSize: '0.95rem' }}>{level.label}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{level.desc}</div>
                        </div>
                        {formData.currentLevel === level.value && <CheckCircle size={18} color="#7c3aed" style={{ marginLeft: 'auto' }} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 — Time Availability */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 4, color: '#e2e8f0' }}>
                    How much time can you dedicate?
                  </h2>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: 24 }}>
                    We'll pace your roadmap accordingly
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { value: 'part-time', label: 'Part-time', desc: '5-10 hours per week', icon: <Clock size={20} /> },
                      { value: 'full-time', label: 'Full-time', desc: '20-30 hours per week', icon: <Calendar size={20} /> },
                      { value: 'dedicated', label: 'Dedicated', desc: '40+ hours per week', icon: <Zap size={20} /> },
                    ].map(time => (
                      <button key={time.value} onClick={() => handleChange('timeAvailability', time.value)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 14, border: formData.timeAvailability === time.value ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.06)', background: formData.timeAvailability === time.value ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left'
                        }}>
                        <div style={{ color: formData.timeAvailability === time.value ? '#a78bfa' : '#6b7280' }}>{time.icon}</div>
                        <div>
                          <div style={{ fontWeight: 600, color: formData.timeAvailability === time.value ? '#a78bfa' : '#e2e8f0', fontSize: '0.95rem' }}>{time.label}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{time.desc}</div>
                        </div>
                        {formData.timeAvailability === time.value && <CheckCircle size={18} color="#7c3aed" style={{ marginLeft: 'auto' }} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4 — Duration & Country */}
              {step === 4 && (
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 4, color: '#e2e8f0' }}>
                    Plan Duration & Location
                  </h2>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: 24 }}>
                    Choose your target timeline
                  </p>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                    {[
                      { value: '3months', label: '3 Months', desc: 'Intensive' },
                      { value: '6months', label: '6 Months', desc: 'Balanced' },
                      { value: '12months', label: '12 Months', desc: 'Comprehensive' },
                    ].map(dur => (
                      <button key={dur.value} onClick={() => handleChange('duration', dur.value)}
                        style={{
                          flex: 1, padding: '16px', borderRadius: 14, textAlign: 'center',
                          border: formData.duration === dur.value ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.06)',
                          background: formData.duration === dur.value ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.02)',
                          cursor: 'pointer', transition: 'all 0.2s'
                        }}>
                        <div style={{ fontWeight: 700, color: formData.duration === dur.value ? '#a78bfa' : '#e2e8f0', fontSize: '1.1rem' }}>{dur.label}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 4 }}>{dur.desc}</div>
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Globe size={18} color="#6b7280" />
                    <input
                      id="career-country"
                      type="text"
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      placeholder="Country (optional)"
                      style={{ flex: 1, padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
            <button onClick={prevStep} disabled={step === 1}
              style={{ padding: '10px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: step === 1 ? '#4b5563' : '#9ca3af', fontSize: '0.88rem', fontWeight: 500, cursor: step === 1 ? 'not-allowed' : 'pointer' }}>
              Back
            </button>
            <button onClick={nextStep}
              style={{ padding: '10px 28px', borderRadius: 10, background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: 'none', color: '#fff', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}>
              {step === 4 ? 'Generate Plan' : 'Next'} <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      )}

      {/* ============================================ */}
      {/* GENERATED CAREER PLAN */}
      {/* ============================================ */}
      {plan && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 28 }}>
            {[
              { label: 'Duration', value: `${plan.totalMonths} Months`, icon: <Calendar size={16} />, color: '#60a5fa' },
              { label: 'Pace', value: plan.hoursPerWeek, icon: <Clock size={16} />, color: '#34d399' },
              { label: 'Level', value: plan.currentLevel.charAt(0).toUpperCase() + plan.currentLevel.slice(1), icon: <TrendingUp size={16} />, color: '#fbbf24' },
              { label: 'Type', value: plan.type.charAt(0).toUpperCase() + plan.type.slice(1), icon: <Sparkles size={16} />, color: '#f472b6' },
            ].map((card, i) => (
              <div key={i} style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color }}>{card.icon}</div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>{card.label}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e2e8f0' }}>{card.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Vertical Line */}
            <div style={{ position: 'absolute', left: 19, top: 0, bottom: 0, width: 2, background: 'rgba(124,58,237,0.15)' }} />
            
            {plan.plan.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', gap: 20, marginBottom: 16, position: 'relative' }}
              >
                {/* Timeline Dot */}
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: activePhase === i ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'rgba(255,255,255,0.04)',
                  border: activePhase === i ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.85rem',
                  color: activePhase === i ? '#fff' : '#6b7280',
                  zIndex: 2, cursor: 'pointer'
                }} onClick={() => setActivePhase(i)}>
                  {i + 1}
                </div>

                {/* Phase Card */}
                <div
                  onClick={() => setActivePhase(i)}
                  style={{
                    flex: 1, padding: '16px 20px', borderRadius: 14, cursor: 'pointer',
                    background: activePhase === i ? 'rgba(124,58,237,0.06)' : 'rgba(255,255,255,0.02)',
                    border: activePhase === i ? '1px solid rgba(124,58,237,0.2)' : '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: activePhase === i ? '#c4b5fd' : '#e2e8f0' }}>
                      {phase.title}
                    </h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 6 }}>
                      Week {phase.weekStart}-{phase.weekEnd} • {phase.monthLabel}
                    </span>
                  </div>
                  
                  <AnimatePresence>
                    {activePhase === i && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                          {phase.topics.map((topic, j) => (
                            <span key={j} style={{ padding: '4px 12px', borderRadius: 6, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.12)', fontSize: '0.78rem', color: '#c4b5fd' }}>
                              {topic}
                            </span>
                          ))}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 8 }}>
                          Duration: {phase.duration || `${phase.weekEnd - phase.weekStart + 1} weeks`}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resources Section */}
          {plan.resources.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <BookOpen size={16} /> Recommended Resources
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
                {plan.resources.slice(0, 6).map((r, i) => (
                  <a key={i} href={r.link} target="_blank" rel="noopener noreferrer" style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#d1d5db' }}>{r.title}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{r.type} • {r.source}</div>
                    </div>
                    <ChevronRight size={14} color="#6b7280" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Reset Button */}
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button onClick={resetPlanner}
              style={{ padding: '10px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>
              Create New Plan
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CareerPlanner;
