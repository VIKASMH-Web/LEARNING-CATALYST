import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee, Zap, Timer } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const FocusMode = () => {
    const { addFocusMinutes } = useProgress();
    
    // Initial state from localStorage or default
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

    const [sessionDuration, setSessionDuration] = useState(() => {
         // Try to infer last duration or default to 25
         return 25; 
    });

    const [lastTick, setLastTick] = useState(() => {
        const saved = localStorage.getItem('lc_focus_last_tick');
        return saved ? parseInt(saved) : Date.now();
    });

    // Sync state to localStorage on change
    useEffect(() => {
        localStorage.setItem('lc_focus_time', timeLeft);
        localStorage.setItem('lc_focus_active', isActive);
        localStorage.setItem('lc_focus_sessions', sessionsCompleted);
        localStorage.setItem('lc_focus_last_tick', Date.now());
    }, [timeLeft, isActive, sessionsCompleted]);

    // Timer Logic handling background/tab switch time diff
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsActive(false);
                        setSessionsCompleted(s => s + 1);
                        addFocusMinutes(sessionDuration); // Award minutes
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            setSessionsCompleted(s => s + 1);
            addFocusMinutes(sessionDuration); // Award minutes (edge case)
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, sessionDuration, addFocusMinutes]);

    // Recover time lost when tab was inactive/unmounted
    useEffect(() => {
        if (isActive) {
            const now = Date.now();
            const last = parseInt(localStorage.getItem('lc_focus_last_tick') || now);
            const diffSeconds = Math.floor((now - last) / 1000);
            
            if (diffSeconds > 1 && timeLeft > diffSeconds) {
                setTimeLeft(prev => prev - diffSeconds);
            }
        }
    }, []);

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

    const percent = 1 - (timeLeft / (sessionDuration * 60));

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card" 
                style={{ 
                    padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    gap: '2.5rem', width: '100%', maxWidth: '500px', textAlign: 'center' 
                }}
            >
                <div>
                     <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <Timer size={32} /> Focus Mode
                     </h1>
                     <p>Deep work powered by AMD silence and software intelligence.</p>
                </div>

                <div style={{ position: 'relative', width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="240" height="240" viewBox="0 0 240 240" style={{ transform: 'rotate(-90deg)' }}>
                         <circle cx="120" cy="120" r="110" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                         <motion.circle 
                            cx="120" cy="120" r="110" fill="none" stroke="var(--accent-color)" 
                            strokeWidth="12" strokeDasharray="691" 
                            animate={{ strokeDashoffset: isActive || timeLeft < sessionDuration * 60 ? 691 * (1 - percent) : 691 }}
                            transition={{ duration: 1, ease: 'linear' }}
                            strokeLinecap="round"
                         />
                    </svg>
                    <div style={{ position: 'absolute', fontSize: '4.5rem', fontWeight: 900, letterSpacing: '-2px' }}>
                        {formatTime(timeLeft)}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <button 
                        onClick={() => setIsActive(!isActive)}
                        style={{ 
                            width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-color)', 
                            border: 'none', color: 'white', cursor: 'pointer', display: 'flex', 
                            alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px var(--accent-glow)'
                        }}
                    >
                        {isActive ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: 4 }} />}
                    </button>
                    <button 
                        onClick={resetTimer}
                        style={{ 
                            width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', 
                            border: '1px solid var(--border-color)', color: 'white', cursor: 'pointer', display: 'flex', 
                            alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                    <button 
                        onClick={() => startTimer(25)}
                        className="glass-card"
                        style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', cursor: 'pointer', fontWeight: 600 }}
                    >
                        <Zap size={16} style={{ marginBottom: 4 }} /> 25 Min
                    </button>
                    <button 
                         onClick={() => startTimer(50)}
                         className="glass-card"
                         style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', cursor: 'pointer', fontWeight: 600 }}
                    >
                        <Coffee size={16} style={{ marginBottom: 4 }} /> 50 Min
                    </button>
                </div>

                {sessionsCompleted > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '0.85rem', color: '#50fa7b', fontWeight: 600 }}
                    >
                        Amazing! You completed {sessionsCompleted} session(s) today.
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default FocusMode;
