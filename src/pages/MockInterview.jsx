import React, { useState, useEffect, useRef } from 'react';
import { useProgress } from '../context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Video, Camera, Clock, CheckCircle, Play, Share, HelpCircle, AlertTriangle, Monitor, Volume2, X, Sparkles, ArrowRight, Brain, Eye, MessageCircle, BarChart3, Zap, Target } from 'lucide-react';

const MockInterview = () => {
    const { interviewHistory, addInterviewSession, careerProfile } = useProgress();
    const [view, setView] = useState('lobby');
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState(45);
    const [isRecording, setIsRecording] = useState(false);

    const feedbackMetrics = [
        { label: 'Body Language', status: 'Good', color: '#50fa7b', sub: 'Maintain Eye Contact', icon: Eye },
        { label: 'Pace', status: 'A bit fast', color: '#ffb86c', sub: 'Speaking Speed', icon: BarChart3 },
        { label: 'Clarity', status: 'Excellent', color: '#50fa7b', sub: 'Articulation', icon: MessageCircle }
    ];

    const currentQuestion = "How would you handle a situation where a critical production bug is found 10 minutes before a major feature launch? Walk me through your decision-making process.";

    const features = [
        { icon: Eye, title: 'Body Language Analysis', desc: 'AI tracks eye contact, posture and facial expressions in real-time' },
        { icon: MessageCircle, title: 'Speech Analysis', desc: 'Monitors pace, clarity, filler words and articulation quality' },
        { icon: Brain, title: 'Answer Intelligence', desc: 'Evaluates answer structure using STAR method and relevance scoring' },
        { icon: BarChart3, title: 'Performance Report', desc: 'Detailed post-session analytics with improvement suggestions' },
    ];

    const startSession = () => setView('permission');

    const requestPermissions = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            if (videoRef.current) videoRef.current.srcObject = mediaStream;
            setView('interview');
            setIsRecording(true);
        } catch (err) {
            alert("Camera access denied. Please enable permissions.");
        }
    };

    const endSession = () => {
        if (stream) stream.getTracks().forEach(track => track.stop());
        setStream(null);
        setView('feedback');
    };

    useEffect(() => {
        if (view === 'interview' && stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [view, stream]);

    // =======================
    // LOBBY VIEW — Premium
    // =======================
    if (view === 'lobby') {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
                {/* Hero Section */}
                <div style={{
                    position: 'relative', overflow: 'hidden',
                    padding: '3rem', borderRadius: '24px',
                    background: 'linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(124,58,237,0.08) 50%, rgba(15,15,30,0.9) 100%)',
                    border: '1px solid rgba(124,58,237,0.15)'
                }}>
                    {/* Background orb */}
                    <div style={{
                        position: 'absolute', top: '-60px', right: '-40px',
                        width: '300px', height: '300px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)',
                        pointerEvents: 'none'
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '-80px', left: '20%',
                        width: '250px', height: '250px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(79,70,229,0.12), transparent 70%)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                        <div style={{ maxWidth: '600px' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                padding: '6px 14px', background: 'rgba(124,58,237,0.2)',
                                borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                                color: '#a78bfa', marginBottom: '1rem', letterSpacing: '0.05em'
                            }}>
                                <Sparkles size={12} />
                                AI-POWERED
                            </div>
                            <h1 style={{ 
                                fontSize: '2.5rem', fontWeight: 800, color: '#f4f4f5', 
                                margin: '0 0 0.75rem 0', letterSpacing: '-0.03em', lineHeight: 1.15 
                            }}>
                                AI Interview Coach
                            </h1>
                            <p style={{ 
                                fontSize: '1rem', color: '#a1a1aa', lineHeight: 1.6, margin: 0 
                            }}>
                                Practice behavioral and technical interviews with real-time AI feedback on body language, speech clarity, and answer quality.
                            </p>
                            <button 
                                onClick={startSession} 
                                style={{
                                    marginTop: '1.5rem', padding: '0.875rem 2rem',
                                    background: '#7c3aed', color: 'white', border: 'none',
                                    borderRadius: '14px', fontSize: '0.95rem', fontWeight: 700,
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                                    boxShadow: '0 0 30px rgba(124,58,237,0.3)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Play size={18} fill="white" />
                                Start Mock Interview
                            </button>
                        </div>

                        {/* Preview mockup */}
                        <div style={{
                            width: '280px', height: '200px', borderRadius: '16px',
                            background: 'linear-gradient(145deg, rgba(30,30,60,0.8), rgba(15,15,30,0.9))',
                            border: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            position: 'relative', overflow: 'hidden'
                        }}>
                            <div style={{
                                width: '64px', height: '64px', borderRadius: '50%',
                                background: 'rgba(124,58,237,0.15)', border: '2px solid rgba(124,58,237,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'
                            }}>
                                <Video size={28} color="#a78bfa" />
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#71717a', fontWeight: 600 }}>Camera Preview</div>
                            {/* Glassmorphic controls mockup */}
                            <div style={{
                                position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
                                display: 'flex', gap: '8px', padding: '6px 12px',
                                background: 'rgba(255,255,255,0.06)', borderRadius: '20px',
                                backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)'
                            }}>
                                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Mic size={12} color="#71717a" />
                                </div>
                                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Video size={12} color="#71717a" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            style={{
                                padding: '1.5rem', borderRadius: '18px',
                                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                                cursor: 'default', transition: 'border-color 0.2s, transform 0.2s'
                            }}
                        >
                            <div style={{
                                width: 40, height: 40, borderRadius: '12px',
                                background: 'rgba(124,58,237,0.12)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'
                            }}>
                                <f.icon size={20} color="#a78bfa" />
                            </div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{f.title}</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Sessions placeholder */}
                <div style={{
                    padding: '2rem', borderRadius: '18px',
                    background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    minHeight: '180px'
                }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: '50%',
                        background: 'rgba(124,58,237,0.08)', border: '2px dashed rgba(124,58,237,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'
                    }}>
                        <Target size={24} color="#7c3aed" />
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>No Sessions Yet</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', textAlign: 'center', maxWidth: '400px', margin: 0 }}>
                        Start your first mock interview to receive AI-powered feedback and build your interview skills.
                    </p>
                </div>
            </motion.div>
        );
    }

    // =======================
    // PERMISSION VIEW
    // =======================
    if (view === 'permission') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        padding: '3rem', textAlign: 'center', maxWidth: '480px',
                        borderRadius: '24px', background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    <div style={{
                        width: 72, height: 72, borderRadius: '50%',
                        background: 'rgba(124,58,237,0.12)', border: '2px solid rgba(124,58,237,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <Camera size={32} color="#a78bfa" />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f4f4f5', marginBottom: '0.75rem' }}>Camera Access Required</h2>
                    <p style={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: 1.6, marginBottom: '2rem' }}>
                        To provide real-time body language analysis, we need access to your webcam and microphone. Data is processed locally.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <button onClick={requestPermissions} style={{
                            width: '100%', padding: '0.875rem', background: '#7c3aed', color: 'white',
                            border: 'none', borderRadius: '14px', fontSize: '0.95rem', fontWeight: 700,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            boxShadow: '0 0 20px rgba(124,58,237,0.25)'
                        }}>
                            <Camera size={18} />
                            Enable Camera & Start
                        </button>
                        <button onClick={() => setView('lobby')} style={{
                            width: '100%', padding: '0.75rem', background: 'transparent',
                            color: '#71717a', border: '1px solid var(--border-color)',
                            borderRadius: '14px', fontSize: '0.9rem', fontWeight: 600,
                            cursor: 'pointer'
                        }}>
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // =======================
    // INTERVIEW VIEW — Matching Figma
    // =======================
    if (view === 'interview') {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '1.5rem', height: 'calc(100vh - 140px)' }}>
                
                {/* Main Video Stage */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                        flex: 1, padding: 0, overflow: 'hidden', position: 'relative',
                        background: '#0a0a0f', borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.06)'
                    }}>
                        {/* Video Feed */}
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            muted 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
                        />
                        
                        {/* AI Active Badge */}
                        <div style={{
                            position: 'absolute', top: 20, left: 20,
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '8px 14px', background: 'rgba(0,0,0,0.7)',
                            borderRadius: '20px', backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.08)'
                        }}>
                            <div style={{ display: 'flex', gap: '2px', height: '12px', alignItems: 'flex-end' }}>
                                {[1,2,3,4,3,2,1].map((h, i) => (
                                    <motion.div 
                                        key={i} 
                                        animate={{ height: [3, 12, 3] }} 
                                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08 }}
                                        style={{ width: 2, background: '#a78bfa', borderRadius: 1 }} 
                                    />
                                ))}
                            </div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', color: '#e4e4e7' }}>AI IS LISTENING</span>
                        </div>

                        {/* Glassmorphic Controls Bar */}
                        <div style={{
                            position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
                            display: 'flex', gap: '0.75rem', alignItems: 'center',
                            padding: '10px 20px', borderRadius: '50px',
                            background: 'rgba(255,255,255,0.06)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <ControlBtn icon={<Mic size={18} />} />
                            <ControlBtn icon={<Video size={18} />} />
                            <button onClick={endSession} style={{
                                padding: '10px 24px', borderRadius: '30px',
                                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                                color: 'white', fontSize: '0.8rem', fontWeight: 700,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                                letterSpacing: '0.02em'
                            }}>
                                <Monitor size={14} />
                                Share Screen
                            </button>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div style={{
                        padding: '1.5rem 2rem', borderRadius: '18px',
                        background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                        display: 'flex', alignItems: 'start', gap: '1rem'
                    }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                            <HelpCircle size={18} color="#a78bfa" />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                                Interviewer Question:
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.5, color: '#d4d4d8', fontStyle: 'italic' }}>
                                "{currentQuestion}"
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Live Feedback */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    {/* Live Metrics */}
                    {feedbackMetrics.map((m, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            style={{
                                padding: '1.25rem 1.5rem', borderRadius: '18px',
                                background: 'var(--bg-card)', border: '1px solid var(--border-color)'
                            }}
                        >
                            <div style={{ fontSize: '0.65rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 700 }}>
                                {m.label}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 700, fontSize: '1rem', color: '#e4e4e7' }}>{m.sub}</span>
                                <span style={{ fontSize: '0.85rem', color: m.color, fontWeight: 700 }}>{m.status}</span>
                            </div>
                        </motion.div>
                    ))}

                    {/* Recommended Prep */}
                    <div style={{
                        padding: '1.5rem', borderRadius: '18px',
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        border: 'none', color: 'white', marginTop: 'auto'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                            <BarChart3 size={16} />
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 800 }}>Recommended Prep</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.5, opacity: 0.9, marginBottom: '1rem', margin: '0 0 1rem 0' }}>
                            Based on your previous sessions, you should review the "STAR Method" for behavioral questions.
                        </p>
                        <button style={{
                            width: '100%', padding: '0.625rem',
                            background: 'rgba(255,255,255,0.2)', color: 'white',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700,
                            cursor: 'pointer', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', gap: '6px',
                            backdropFilter: 'blur(4px)'
                        }}>
                            Open Resource <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // =======================
    // FEEDBACK VIEW
    // =======================
    if (view === 'feedback') {
        return (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        textAlign: 'center', padding: '3rem', maxWidth: '500px',
                        borderRadius: '24px', background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    <div style={{
                        width: 80, height: 80, borderRadius: '50%',
                        background: 'rgba(80,250,123,0.15)', border: '2px solid rgba(80,250,123,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 0 30px rgba(80, 250, 123, 0.15)'
                    }}>
                        <CheckCircle size={40} color="#50fa7b" />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f4f4f5', marginBottom: '0.5rem' }}>Interview Complete</h2>
                    <p style={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: 1.6, marginBottom: '2rem' }}>
                        Your session has been recorded. AI is generating a detailed analysis of your performance.
                    </p>

                    {/* Mock Score Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                        {[
                            { label: 'Eye Contact', score: '87%', color: '#50fa7b' },
                            { label: 'Clarity', score: '92%', color: '#50fa7b' },
                            { label: 'Pacing', score: '74%', color: '#ffb86c' }
                        ].map((s, i) => (
                            <div key={i} style={{
                                padding: '1rem', borderRadius: '14px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-color)'
                            }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.score}</div>
                                <div style={{ fontSize: '0.7rem', color: '#71717a', fontWeight: 600, textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => setView('lobby')} style={{
                        padding: '0.75rem 2rem', background: 'transparent',
                        color: '#a1a1aa', border: '1px solid var(--border-color)',
                        borderRadius: '14px', fontSize: '0.9rem', fontWeight: 600,
                        cursor: 'pointer'
                    }}>
                        Back to Dashboard
                    </button>
                </motion.div>
            </div>
        );
    }

    return null;
};

// --- Reusable Control Button ---
const ControlBtn = ({ icon }) => (
    <button style={{
        width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)',
        color: 'white', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s'
    }}>
        {icon}
    </button>
);

export default MockInterview;
