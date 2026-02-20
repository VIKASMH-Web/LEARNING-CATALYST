import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, Headphones, Sparkles, Coffee, Moon,
  Zap, Clock, Award, TrendingUp, Timer, CheckCircle
} from 'lucide-react';
import { useFocus } from '../context/FocusContext';

// ============================================
// FOCUS MODE — Persistent Global Timer
// ============================================
const FocusMode = () => {
  const {
    isRunning, isPaused, mode, remainingSeconds, totalSeconds,
    completedSessions, totalFocusMinutes, formattedTime, progress,
    startTimer, pauseTimer, resumeTimer, resetTimer, setMode, setDuration
  } = useFocus();

  const [customMinutes, setCustomMinutes] = useState(25);
  const [showAmbient, setShowAmbient] = useState(false);

  // Mode options
  const modes = [
    { key: 'pomodoro', label: 'Pomodoro', time: '25 min', icon: <Timer size={16} />, color: '#ef4444' },
    { key: 'short-break', label: 'Short Break', time: '5 min', icon: <Coffee size={16} />, color: '#34d399' },
    { key: 'long-break', label: 'Long Break', time: '15 min', icon: <Moon size={16} />, color: '#60a5fa' },
    { key: 'deep-work', label: 'Deep Work', time: '50 min', icon: <Zap size={16} />, color: '#fbbf24' },
  ];

  // Ambient sounds (visual only, no actual audio)
  const ambientSounds = [
    { name: 'Rain', emoji: '🌧️' },
    { name: 'Ocean', emoji: '🌊' },
    { name: 'Forest', emoji: '🌲' },
    { name: 'Fireplace', emoji: '🔥' },
    { name: 'Coffee Shop', emoji: '☕' },
    { name: 'Night', emoji: '🌙' },
  ];

  // Calculate progress ring
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const modeColor = modes.find(m => m.key === mode)?.color || '#7c3aed';

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: `${modeColor}12`, border: `1px solid ${modeColor}25`, marginBottom: 12, fontSize: '0.8rem', color: modeColor, fontWeight: 600 }}>
          <Sparkles size={14} /> Focus Mode
          {isRunning && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }} />}
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.02em' }}>
          Deep Focus Session
        </h1>
        {isRunning && (
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: 4 }}>
            Timer continues even if you navigate away ✨
          </p>
        )}
      </motion.div>

      {/* Timer Circle */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}
      >
        <div style={{ position: 'relative', width: 280, height: 280 }}>
          {/* Background Glow */}
          <div style={{
            position: 'absolute', inset: -20, borderRadius: '50%',
            background: `radial-gradient(circle, ${modeColor}08, transparent 70%)`,
            filter: 'blur(20px)', opacity: isRunning ? 1 : 0.3,
            transition: 'opacity 0.5s'
          }} />

          <svg width="280" height="280" style={{ position: 'relative', zIndex: 1, transform: 'rotate(-90deg)' }}>
            {/* Background Ring */}
            <circle cx="140" cy="140" r="120" stroke="rgba(255,255,255,0.04)" strokeWidth="6" fill="none" />
            {/* Progress Ring */}
            <circle
              cx="140" cy="140" r="120"
              stroke={modeColor}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>

          {/* Timer Display */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', zIndex: 2
          }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#e2e8f0', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
              {formattedTime}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 500, marginTop: 4 }}>
              {modes.find(m => m.key === mode)?.label || 'Focus'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
        {!isRunning && !isPaused ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startTimer}
            style={{
              padding: '14px 40px', borderRadius: 14, border: 'none',
              background: `linear-gradient(135deg, ${modeColor}, ${modeColor}cc)`,
              color: '#fff', fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: `0 8px 24px ${modeColor}30`
            }}
          >
            <Play size={20} /> Start Focus
          </motion.button>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isRunning ? pauseTimer : resumeTimer}
              style={{
                padding: '14px 30px', borderRadius: 14, border: 'none',
                background: isRunning ? 'rgba(255,255,255,0.06)' : `linear-gradient(135deg, ${modeColor}, ${modeColor}cc)`,
                color: '#fff', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8
              }}
            >
              {isRunning ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Resume</>}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetTimer}
              style={{
                padding: '14px 20px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.03)',
                color: '#9ca3af', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6
              }}
            >
              <RotateCcw size={16} /> Reset
            </motion.button>
          </>
        )}
      </div>

      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
        {modes.map(m => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 10,
              background: mode === m.key ? `${m.color}15` : 'rgba(255,255,255,0.02)',
              border: mode === m.key ? `1px solid ${m.color}30` : '1px solid rgba(255,255,255,0.06)',
              color: mode === m.key ? m.color : '#6b7280',
              fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            {m.icon} {m.label} <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>({m.time})</span>
          </button>
        ))}
      </div>

      {/* Custom Timer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 32 }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>Custom:</span>
        <input
          id="focus-custom-minutes"
          type="number"
          min="1"
          max="120"
          value={customMinutes}
          onChange={(e) => setCustomMinutes(Number(e.target.value))}
          style={{ width: 60, padding: '6px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', textAlign: 'center', fontSize: '0.85rem', outline: 'none' }}
        />
        <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>minutes</span>
        <button onClick={() => setDuration(customMinutes)}
          style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#a78bfa', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>
          Set
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { label: 'Sessions Today', value: completedSessions, icon: <CheckCircle size={16} />, color: '#34d399' },
          { label: 'Total Focus', value: `${totalFocusMinutes}m`, icon: <Clock size={16} />, color: '#60a5fa' },
          { label: 'Streak', value: `${Math.min(completedSessions, 7)} days`, icon: <Award size={16} />, color: '#fbbf24' },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: '16px', borderRadius: 14, textAlign: 'center',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ color: stat.color, marginBottom: 6, display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#e2e8f0' }}>{stat.value}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Ambient Sounds */}
      <div style={{ marginTop: 28, textAlign: 'center' }}>
        <button onClick={() => setShowAmbient(!showAmbient)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: '#6b7280', fontSize: '0.82rem', cursor: 'pointer' }}>
          <Headphones size={14} /> Ambient Sounds
        </button>
        {showAmbient && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 12, flexWrap: 'wrap' }}>
            {ambientSounds.map((sound, i) => (
              <button key={i} style={{
                padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)', color: '#9ca3af', fontSize: '0.8rem',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
                {sound.emoji} {sound.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Timer completed notification */}
      {remainingSeconds === 0 && completedSessions > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: 24, padding: '16px 20px', borderRadius: 14,
            background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>🎉</div>
          <div style={{ fontWeight: 600, color: '#34d399', fontSize: '0.95rem' }}>Session Complete!</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: 4 }}>
            You've completed {completedSessions} session{completedSessions > 1 ? 's' : ''} so far. Keep going!
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FocusMode;
