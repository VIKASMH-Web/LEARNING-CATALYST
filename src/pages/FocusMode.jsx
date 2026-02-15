import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, Plus, Music } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const FocusMode = () => {
    // --- 1. CIRCULAR TIMER (25:00 DEFAULT) ---
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('Focus'); // Focus, Short Break
    const { addFocusMinutes } = useProgress();

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // 2. DEVICE NOTIFICATION
            if (Notification.permission === 'granted') {
                new Notification("Focus Session Complete", { body: "Great job! Take a short break." });
            }
            addFocusMinutes(mode === 'Focus' ? 25 : 5);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode, addFocusMinutes]);

    const toggleTimer = () => setIsActive(!isActive);
    
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'Focus' ? 25 * 60 : 5 * 60);
    };

    const setFocusMode = () => {
        setMode('Focus');
        setTimeLeft(25 * 60);
        setIsActive(false);
    };

    const setBreakMode = () => {
        setMode('Short Break');
        setTimeLeft(5 * 60);
        setIsActive(false);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Calculate progress for ring
    const totalTime = mode === 'Focus' ? 25 * 60 : 5 * 60;
    const progress = (totalTime - timeLeft) / totalTime;
    const radius = 140; 
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress * circumference);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full relative"
            style={{ height: 'calc(100vh - 100px)' }}
        >
            {/* Background Glow */}
            <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', zIndex: -1 }} />

            {/* Mode Switcher */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                <ModeButton label="Deep Work" active={mode === 'Focus'} onClick={setFocusMode} />
                <ModeButton label="Short Break" active={mode === 'Short Break'} onClick={setBreakMode} />
            </div>

            {/* Circular Timer */}
            <div style={{ position: 'relative', width: 320, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="320" height="320" style={{ transform: 'rotate(-90deg)' }}>
                    {/* Background Ring */}
                    <circle cx="160" cy="160" r={radius} stroke="var(--bg-elevated)" strokeWidth="8" fill="transparent" />
                    {/* Progress Ring */}
                    <circle 
                        cx="160" cy="160" r={radius} 
                        stroke={mode === 'Focus' ? 'var(--accent-color)' : '#50fa7b'} 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray={circumference} 
                        strokeDashoffset={strokeDashoffset} 
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                </svg>

                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '-2px' }}>
                        {formatTime(timeLeft)}
                    </div>
                    <div style={{ fontSize: '1rem', opacity: 0.6, marginTop: '0.5rem' }}>
                        {isActive ? 'FOCUSING' : 'READY'}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
                <button 
                    onClick={toggleTimer} 
                    className="btn btn-primary"
                    style={{ 
                        width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isActive ? 'var(--bg-elevated)' : 'var(--accent-color)',
                        color: isActive ? 'white' : 'white',
                        border: isActive ? '1px solid var(--border-color)' : 'none',
                        boxShadow: isActive ? 'none' : '0 0 30px rgba(124, 58, 237, 0.4)'
                    }}
                >
                    {isActive ? <Pause size={28} /> : <Play size={28} fill="white" />}
                </button>
                
                <button 
                    onClick={resetTimer} 
                    className="btn btn-secondary"
                    style={{ 
                        width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'transparent', border: '1px solid var(--border-color)'
                    }}
                >
                    <RotateCcw size={24} />
                </button>

                <button 
                    className="btn btn-secondary"
                    style={{ 
                        width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'transparent', border: '1px solid var(--border-color)'
                    }}
                >
                    <Music size={24} />
                </button>

            </div>
        </motion.div>
    );
};

const ModeButton = ({ label, active, onClick }) => (
    <button 
        onClick={onClick}
        style={{ 
            padding: '0.5rem 1.5rem', 
            borderRadius: '20px', 
            background: active ? 'rgba(255,255,255,0.1)' : 'transparent', 
            color: active ? 'white' : 'var(--text-secondary)',
            border: active ? '1px solid var(--accent-color)' : '1px solid transparent',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'all 0.2s'
        }}
    >
        {label}
    </button>
);

export default FocusMode;
