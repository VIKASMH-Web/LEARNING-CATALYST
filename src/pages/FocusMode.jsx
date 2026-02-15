import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Headphones, Sparkles, Coffee, Moon } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const FocusMode = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('deep');   // 'deep' | 'break'
    const [audioPlaying, setAudioPlaying] = useState(false);
    const { addFocusMinutes } = useProgress();

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (Notification.permission === 'granted') {
                new Notification("Focus Session Complete", { body: "Great job! Take a short break." });
            }
            addFocusMinutes(mode === 'deep' ? 25 : 5);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode, addFocusMinutes]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => { setIsActive(false); setTimeLeft(mode === 'deep' ? 25 * 60 : 5 * 60); };

    const selectMode = (m) => {
        setMode(m);
        setIsActive(false);
        setTimeLeft(m === 'deep' ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const totalTime = mode === 'deep' ? 25 * 60 : 5 * 60;
    const progress = (totalTime - timeLeft) / totalTime;
    const radius = 130;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress * circumference);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                height: 'calc(100vh - 100px)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                position: 'relative'
            }}
        >
            {/* Background Glow */}
            <div style={{
                position: 'absolute', width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
                borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
            }} />

            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem', zIndex: 1 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.03em' }}>
                    Focus Engine
                </h1>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    Deep work session powered by catalyst AI.
                </p>
            </div>

            {/* Circular Timer */}
            <div style={{ position: 'relative', width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                {/* Outer glow ring */}
                <div style={{
                    position: 'absolute', inset: '-10px', borderRadius: '50%',
                    background: isActive ? 'none' : 'none',
                    boxShadow: isActive ? '0 0 60px rgba(124, 58, 237, 0.15), inset 0 0 60px rgba(124, 58, 237, 0.05)' : 'none',
                    transition: 'box-shadow 0.5s ease'
                }} />

                <svg width="300" height="300" style={{ transform: 'rotate(-90deg)' }}>
                    {/* Background Ring */}
                    <circle cx="150" cy="150" r={radius}
                        stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="transparent" />
                    {/* Progress Ring */}
                    <circle cx="150" cy="150" r={radius}
                        stroke={mode === 'deep' ? '#7c3aed' : '#50fa7b'}
                        strokeWidth="6" fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                </svg>

                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                        fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem'
                    }}>
                        {isActive ? 'STUDYING' : mode === 'deep' ? 'READY' : 'BREAK'}
                    </div>
                    <div style={{
                        fontSize: '4rem', fontWeight: 800,
                        fontFamily: "'Inter', system-ui, monospace",
                        letterSpacing: '-2px', color: 'var(--text-primary)'
                    }}>
                        {formatTime(timeLeft)}
                    </div>

                    {/* Play / Reset Buttons inside circle */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                        <button
                            onClick={toggleTimer}
                            style={{
                                width: 44, height: 44, borderRadius: '50%',
                                background: isActive ? 'rgba(255,255,255,0.08)' : '#7c3aed',
                                border: 'none', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', transition: 'all 0.2s',
                                boxShadow: isActive ? 'none' : '0 0 20px rgba(124,58,237,0.4)'
                            }}
                        >
                            {isActive ? <Pause size={20} /> : <Play size={20} fill="white" />}
                        </button>
                        <button
                            onClick={resetTimer}
                            style={{
                                width: 44, height: 44, borderRadius: '50%',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--text-secondary)', transition: 'all 0.2s'
                            }}
                        >
                            <RotateCcw size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mode Cards */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', zIndex: 1 }}>
                <ModeCard
                    icon={<Sparkles size={20} />}
                    label="DEEP WORK"
                    active={mode === 'deep'}
                    onClick={() => selectMode('deep')}
                />
                <ModeCard
                    icon={<Coffee size={20} />}
                    label="SHORT BREAK"
                    active={mode === 'break'}
                    onClick={() => selectMode('break')}
                />
                <ModeCard
                    icon={<Headphones size={20} />}
                    label={`FOCUS AUDIO ${audioPlaying ? '■' : '▶'}`}
                    active={audioPlaying}
                    onClick={() => setAudioPlaying(!audioPlaying)}
                />
            </div>

            {/* Bottom Status Bar */}
            <div style={{
                display: 'flex', gap: '2rem', marginTop: '2.5rem',
                fontSize: '0.8rem', color: 'var(--text-tertiary)', zIndex: 1,
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.85rem' }}>🎵</span>
                    {audioPlaying ? 'Lo-fi coding beats playing...' : 'Audio paused'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Moon size={14} />
                    Do Not Disturb Active
                </div>
            </div>
        </motion.div>
    );
};

// --- Mode Card Component ---
const ModeCard = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        style={{
            padding: '1.25rem 2rem',
            minWidth: '140px',
            background: active ? 'rgba(124, 58, 237, 0.1)' : 'var(--bg-card)',
            border: active ? '1px solid rgba(124, 58, 237, 0.3)' : '1px solid var(--border-color)',
            borderRadius: '16px',
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '0.75rem',
            color: active ? '#a78bfa' : 'var(--text-secondary)',
            transition: 'all 0.2s ease',
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
        }}
    >
        <div style={{
            opacity: active ? 1 : 0.6,
            transition: 'opacity 0.2s'
        }}>
            {icon}
        </div>
        {label}
    </button>
);

export default FocusMode;
