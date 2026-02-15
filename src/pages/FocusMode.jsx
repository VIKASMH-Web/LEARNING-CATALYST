import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee, Zap, Timer } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const FocusMode = () => {
    const { addFocusMinutes } = useProgress();
    
    // Initial state from localStorage
    const [timeLeft, setTimeLeft] = useState(() => {
        const saved = localStorage.getItem('lc_focus_time');
        return saved ? parseInt(saved) : 25 * 60;
    });

    const [isActive, setIsActive] = useState(() => {
        const saved = localStorage.getItem('lc_focus_active');
        return saved === 'true';
    });

    const [sessionsCompleted, setSessionsCompleted] = useState(() => {
        const saved = localStorage.getItem('lc_focus_sessions');
        return saved ? parseInt(saved) : 0;
    });

    const [sessionDuration, setSessionDuration] = useState(25);

    // Sync state
    useEffect(() => {
        localStorage.setItem('lc_focus_time', timeLeft);
        localStorage.setItem('lc_focus_active', isActive);
        localStorage.setItem('lc_focus_sessions', sessionsCompleted);
    }, [timeLeft, isActive, sessionsCompleted]);

    // Timer Logic
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsActive(false);
                        setSessionsCompleted(s => s + 1);
                        addFocusMinutes(sessionDuration);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, sessionDuration, addFocusMinutes]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startTimer = (minutes) => {
        setSessionDuration(minutes);
        setTimeLeft(minutes * 60);
        setIsActive(true);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(25 * 60);
        setSessionDuration(25);
    };

    // Calculate progress for ring
    const totalSeconds = sessionDuration * 60;
    const progress = totalSeconds > 0 ? (totalSeconds - timeLeft) / totalSeconds : 0;
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress * circumference);

    return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="card glass-panel"
                style={{ 
                    padding: '3rem', 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    gap: '2.5rem', width: '100%', maxWidth: '480px', textAlign: 'center',
                    background: 'var(--bg-elevated)',
                    boxShadow: 'var(--shadow-lg)'
                }}
            >
                <div>
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>
                        <Timer size={24} /> 
                        <span style={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Focus Mode</span>
                     </div>
                     <p className="body-sm">Immersive deep work environment.</p>
                </div>

                <div style={{ position: 'relative', width: 260, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="260" height="260" style={{ transform: 'rotate(-90deg)' }}>
                         <circle 
                            cx="130" cy="130" r={radius} 
                            fill="none" 
                            stroke="var(--border-color)" 
                            strokeWidth="8" 
                         />
                         <motion.circle 
                            cx="130" cy="130" r={radius} 
                            fill="none" 
                            stroke="var(--accent-color)" 
                            strokeWidth="8" 
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 0.5 }}
                         />
                    </svg>
                    <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: '4rem', fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)', lineHeight: 1 }}>
                            {formatTime(timeLeft)}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: isActive ? 'var(--accent-color)' : 'var(--text-tertiary)', fontWeight: 600, marginTop: '8px' }}>
                            {isActive ? 'FOCUSING' : 'PAUSED'}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <button 
                        onClick={() => setIsActive(!isActive)}
                        className="btn btn-primary"
                        style={{ 
                            width: 64, height: 64, borderRadius: '50%', padding: 0,
                            boxShadow: '0 0 20px var(--accent-glow)'
                        }}
                    >
                        {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} style={{ marginLeft: 4 }} fill="currentColor" />}
                    </button>
                    
                    <button 
                        onClick={resetTimer}
                        className="btn btn-secondary"
                        style={{ 
                            width: 56, height: 56, borderRadius: '50%', padding: 0,
                            background: 'transparent', borderColor: 'var(--border-color)'
                        }}
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
                    <button 
                        onClick={() => startTimer(25)}
                        className="btn btn-secondary"
                        style={{ justifyContent: 'center', height: '48px', opacity: sessionDuration === 25 ? 1 : 0.7, borderColor: sessionDuration === 25 ? 'var(--accent-color)' : 'var(--border-color)' }}
                    >
                        <Zap size={16} /> 25 Min
                    </button>
                    <button 
                         onClick={() => startTimer(50)}
                         className="btn btn-secondary"
                         style={{ justifyContent: 'center', height: '48px', opacity: sessionDuration === 50 ? 1 : 0.7, borderColor: sessionDuration === 50 ? 'var(--accent-color)' : 'var(--border-color)' }}
                    >
                        <Coffee size={16} /> 50 Min
                    </button>
                </div>

                {sessionsCompleted > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <span>★</span> {sessionsCompleted} sessions completed
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default FocusMode;
