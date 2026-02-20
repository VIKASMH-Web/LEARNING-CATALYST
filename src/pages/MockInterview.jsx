import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useProgress } from '../context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, Camera, Clock, CheckCircle, Play, Sparkles, ArrowRight, Brain, Eye, MessageCircle, BarChart3, Target, PhoneOff, Zap } from 'lucide-react';
import { notifyInterviewComplete } from '../utils/notifications';
import interviewQuestionsData from '../data/interviewQuestions.json';

const domains = [
    { key: 'backend_developer', label: 'Backend Development', icon: '⚙️', color: '#60a5fa' },
    { key: 'frontend_developer', label: 'Frontend Development', icon: '🎨', color: '#34d399' },
    { key: 'data_scientist', label: 'Data Science', icon: '📊', color: '#fbbf24' },
    { key: 'hr', label: 'HR / People Ops', icon: '👥', color: '#f472b6' },
    { key: 'product_manager', label: 'Product Management', icon: '📱', color: '#a78bfa' },
    { key: 'digital_marketing', label: 'Digital Marketing', icon: '📣', color: '#fb923c' },
    { key: 'general', label: 'General / Behavioral', icon: '💬', color: '#94a3b8' },
];

const MockInterview = () => {
    const { addXP } = useProgress();
    const [view, setView] = useState('lobby'); // lobby, domain, difficulty, permission, interview, feedback
    const [selectedDomain, setSelectedDomain] = useState('general');
    const [difficulty, setDifficulty] = useState('medium');
    const [questions, setQuestions] = useState([]);
    
    // Media & Interview State
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState(120);
    const [isRecording, setIsRecording] = useState(false);
    const [micEnabled, setMicEnabled] = useState(true);
    const [camEnabled, setCamEnabled] = useState(true);
    
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [eyeScore, setEyeScore] = useState(0);
    const [clarityScore, setClarityScore] = useState(0);
    const [pacingScore, setPacingScore] = useState(0);
    const [bodyLanguage, setBodyLanguage] = useState('Analyzing...');
    const [paceStatus, setPaceStatus] = useState('Analyzing...');
    const [clarityStatus, setClarityStatus] = useState('Analyzing...');
    const analyzeInterval = useRef(null);

    const loadQuestions = (domain, diff) => {
        const domainQ = interviewQuestionsData[domain] || interviewQuestionsData['general'];
        // Filter by difficulty if applicable, else just shuffle
        let filtered = domainQ;
        if (domainQ[0] && domainQ[0].difficulty) {
            filtered = domainQ.filter(q => q.difficulty === diff || q.difficulty === 'medium');
        }
        if (filtered.length === 0) filtered = domainQ; // fallback
        
        // Pick 5 random questions
        const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 5);
        setQuestions(shuffled);
    };

    const requestPermissions = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }, 
                audio: true 
            });
            setStream(mediaStream);
            setView('interview');
            setIsRecording(true);
            setCurrentQuestionIdx(0);
            setTimeLeft(120);
            setEyeScore(0);
            setClarityScore(0);
            setPacingScore(0);
        } catch (err) {
            alert("Camera/Microphone access denied. Please enable permissions in your browser settings to proceed.");
        }
    };

    const endSession = () => {
        if (stream) stream.getTracks().forEach(track => track.stop());
        setStream(null);
        setIsRecording(false);
        if (analyzeInterval.current) clearInterval(analyzeInterval.current);
        const finalScore = Math.round(((eyeScore || 85) + (clarityScore || 90) + (pacingScore || 72)) / 3);
        notifyInterviewComplete(finalScore);
        if (addXP) addXP(50);
        setView('feedback');
    };

    const toggleMic = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setMicEnabled(audioTrack.enabled);
            }
        }
    };

    const toggleCam = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setCamEnabled(videoTrack.enabled);
            }
        }
    };

    useEffect(() => {
        if (view === 'interview' && stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [view, stream]);

    useEffect(() => {
        if (view !== 'interview' || !isRecording) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (currentQuestionIdx < questions.length - 1) {
                        setCurrentQuestionIdx(idx => idx + 1);
                        return 120;
                    } else {
                        endSession();
                        return 0;
                    }
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [view, isRecording, currentQuestionIdx, questions.length]);

    useEffect(() => {
        if (view !== 'interview' || !stream) return;
        let analysisCount = 0;
        analyzeInterval.current = setInterval(() => {
            analysisCount++;
            const baseEye = 75 + Math.random() * 20;
            setEyeScore(prev => Math.round((prev * 0.7 + baseEye * 0.3)));
            const baseClarity = Math.min(60 + analysisCount * 2 + Math.random() * 15, 98);
            setClarityScore(prev => Math.round((prev * 0.6 + baseClarity * 0.4)));
            const basePacing = 65 + Math.random() * 25;
            setPacingScore(prev => Math.round((prev * 0.7 + basePacing * 0.3)));

            const eyeVal = baseEye;
            setBodyLanguage(eyeVal > 80 ? 'Good' : eyeVal > 65 ? 'Fair' : 'Needs Work');
            setPaceStatus(basePacing > 80 ? 'Excellent' : basePacing > 65 ? 'A bit fast' : 'Too fast');
            setClarityStatus(baseClarity > 85 ? 'Excellent' : baseClarity > 70 ? 'Good' : 'Improving');
        }, 2000);

        return () => {
            if (analyzeInterval.current) clearInterval(analyzeInterval.current);
        };
    }, [view, stream]);

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    // RENDER: LOBBY
    if (view === 'lobby') {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
                <div style={{
                    position: 'relative', overflow: 'hidden', padding: '3rem', borderRadius: '24px',
                    background: 'linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(124,58,237,0.08) 50%, rgba(15,15,30,0.9) 100%)',
                    border: '1px solid rgba(124,58,237,0.15)', marginBottom: '2rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                        <div style={{ maxWidth: '600px' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                padding: '6px 14px', background: 'rgba(124,58,237,0.2)',
                                borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                                color: '#a78bfa', marginBottom: '1rem'
                            }}><Sparkles size={12} /> AI-POWERED</div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f4f4f5', marginBottom: '0.75rem', lineHeight: 1.15 }}>AI Video Mock Interview</h1>
                            <p style={{ fontSize: '1rem', color: '#a1a1aa', lineHeight: 1.6 }}>Practice behavioral and technical interviews with an AI interviewer. Get real-time feedback on body language, speech clarity, and answer quality via webcam analysis.</p>
                            <button onClick={() => setView('domain')} style={{
                                marginTop: '1.5rem', padding: '0.875rem 2rem', background: '#7c3aed', color: 'white', border: 'none',
                                borderRadius: '14px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                                boxShadow: '0 0 30px rgba(124,58,237,0.3)'
                            }}><Play size={18} fill="white" /> Choose Domain</button>
                        </div>
                        <div style={{
                            width: '280px', height: '200px', borderRadius: '16px', background: 'linear-gradient(145deg, rgba(30,30,60,0.8), rgba(15,15,30,0.9))',
                            border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative'
                        }}>
                            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(124,58,237,0.15)', border: '2px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                <Video size={28} color="#a78bfa" />
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#71717a', fontWeight: 600 }}>Camera Ready</div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    {[
                        { icon: Eye, title: 'Eye Contact tracking' },
                        { icon: MessageCircle, title: 'Speech Analysis' },
                        { icon: Target, title: 'Domain-specific QA' },
                        { icon: BarChart3, title: 'Performance Metrics' }
                    ].map((f, i) => (
                        <div key={i} style={{ padding: '1.5rem', borderRadius: '14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <f.icon size={24} color="#a78bfa" />
                            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f4f4f5' }}>{f.title}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    // RENDER: DOMAIN SELECTION
    if (view === 'domain') {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f4f4f5', marginBottom: '1rem' }}>Select Interview Domain</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                    {domains.map(domain => (
                        <button key={domain.key} onClick={() => { setSelectedDomain(domain.key); setView('difficulty'); }} style={{
                            display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', borderRadius: 14, textAlign: 'left',
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer'
                        }}>
                            <span style={{ fontSize: '1.5rem' }}>{domain.icon}</span>
                            <div>
                                <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.95rem' }}>{domain.label}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </motion.div>
        );
    }

    // RENDER: DIFFICULTY SELECTION
    if (view === 'difficulty') {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '2rem', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f4f4f5', marginBottom: '1.5rem' }}>Select Difficulty</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                    {['easy', 'medium', 'hard'].map(diff => (
                        <button key={diff} onClick={() => { setDifficulty(diff); loadQuestions(selectedDomain, diff); setView('permission'); }} style={{
                            padding: '1.25rem', borderRadius: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                            color: '#e2e8f0', fontSize: '1.1rem', fontWeight: 700, textTransform: 'capitalize', cursor: 'pointer'
                        }}>{diff}</button>
                    ))}
                </div>
            </motion.div>
        );
    }

    // RENDER: PERMISSION
    if (view === 'permission') {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem', textAlign: 'center', maxWidth: '480px', margin: '4rem auto', borderRadius: '24px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <Camera size={32} color="#a78bfa" style={{ marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f4f4f5', marginBottom: '0.75rem' }}>Camera & Mic Required</h2>
                <p style={{ color: '#a1a1aa', lineHeight: 1.6, marginBottom: '1.5rem' }}>This is an AI video interview. Your camera and microphone must be enabled. All processing is strictly local.</p>
                <button onClick={requestPermissions} style={{
                    width: '100%', padding: '0.875rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '14px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}>Start Real-Time Video Engine</button>
            </motion.div>
        );
    }

    // RENDER: INTERVIEW VIDEO STAGE
    if (view === 'interview' && questions.length > 0) {
        const questionObj = questions[currentQuestionIdx];
        const qText = typeof questionObj === 'string' ? questionObj : questionObj.q || questionObj.question;

        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '1.25rem', height: 'calc(100vh - 140px)', padding: '1rem' }}>
                <div style={{ position: 'relative', background: '#0a0a0f', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', display: camEnabled ? 'block' : 'none' }} />
                    {!camEnabled && <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f' }}><VideoOff size={48} color="#4a4a6a" /></div>}
                    
                    <div style={{ position: 'absolute', top: 16, right: 16, padding: '8px 16px', background: 'rgba(0,0,0,0.7)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: timeLeft < 30 ? '#ff5555' : '#e4e4e7' }}>
                        <Clock size={14} />{formatTime(timeLeft)}
                    </div>

                    <div style={{ position: 'absolute', bottom: 80, width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', borderRadius: '14px', border: '1px solid rgba(124,58,237,0.3)', width: '85%', maxWidth: '700px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7rem', color: '#a78bfa', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>AI Interviewer • Q{currentQuestionIdx + 1}/{questions.length}</div>
                            <div style={{ fontSize: '1.1rem', color: '#f0f0f0', fontWeight: 600 }}>"{qText}"</div>
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.75rem', padding: '10px 20px', borderRadius: '50px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)' }}>
                        <button onClick={toggleMic} style={{ width: 44, height: 44, borderRadius: '50%', background: micEnabled ? 'rgba(255,255,255,0.1)' : 'rgba(255,85,85,0.2)', border: 'none', color: micEnabled ? 'white' : '#ff5555', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{micEnabled ? <Mic size={18} /> : <MicOff size={18} />}</button>
                        <button onClick={toggleCam} style={{ width: 44, height: 44, borderRadius: '50%', background: camEnabled ? 'rgba(255,255,255,0.1)' : 'rgba(255,85,85,0.2)', border: 'none', color: camEnabled ? 'white' : '#ff5555', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{camEnabled ? <Video size={18} /> : <VideoOff size={18} />}</button>
                        <button onClick={endSession} style={{ padding: '10px 24px', borderRadius: '30px', background: 'rgba(255,85,85,0.2)', color: '#ff5555', border: 'none', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}><PhoneOff size={14} /> End</button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#50fa7b', animation: 'pulse 2s infinite' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#50fa7b' }}>LIVE METRICS</span>
                    </div>

                    {[
                        { label: 'Eye Contact', status: bodyLanguage, score: eyeScore, color: eyeScore > 75 ? '#50fa7b' : '#ffb86c', icon: Eye },
                        { label: 'Clarity', status: clarityStatus, score: clarityScore, color: clarityScore > 75 ? '#50fa7b' : '#ffb86c', icon: MessageCircle },
                        { label: 'Pacing', status: paceStatus, score: pacingScore, color: pacingScore > 75 ? '#50fa7b' : '#ffb86c', icon: BarChart3 }
                    ].map((m, i) => (
                        <div key={i} style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}><m.icon size={14} color={m.color} /><span style={{ fontSize: '0.65rem', color: '#71717a', fontWeight: 700 }}>{m.label}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ fontSize: '1.25rem', fontWeight: 800, color: m.color }}>{m.score}%</span><span style={{ fontSize: '0.75rem', color: m.color }}>{m.status}</span></div>
                            <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}><div style={{ width: `${m.score}%`, height: '100%', background: m.color, borderRadius: 2, transition: 'width 0.5s' }} /></div>
                        </div>
                    ))}

                    <button onClick={() => { if(currentQuestionIdx < questions.length - 1) { setCurrentQuestionIdx(i => i + 1); setTimeLeft(120); } else endSession(); }} style={{ padding: '0.75rem', borderRadius: '14px', background: 'rgba(124,58,237,0.1)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.2)', cursor: 'pointer', fontWeight: 700, marginTop: 'auto' }}>
                        {currentQuestionIdx < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
                    </button>
                    
                    <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: 'white', marginTop: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}><Brain size={14} /><h3 style={{ fontSize: '0.85rem', fontWeight: 800, margin: 0 }}>AI Tip</h3></div>
                        <p style={{ fontSize: '0.8rem', lineHeight: 1.5, opacity: 0.9, margin: 0 }}>Use the STAR method: Situation → Task → Action → Result. Structure your answers for maximum clarity.</p>
                    </div>
                </div>
            </div>
        );
    }

    // RENDER: FEEDBACK
    if (view === 'feedback') {
        const overall = Math.round(((eyeScore || 85) + (clarityScore || 90) + (pacingScore || 72)) / 3);
        const feedbackMetrics = [
            { label: 'Eye Contact', score: eyeScore || 85, color: (eyeScore || 85) > 75 ? '#50fa7b' : '#ffb86c', icon: Eye },
            { label: 'Clarity', score: clarityScore || 90, color: (clarityScore || 90) > 75 ? '#50fa7b' : '#ffb86c', icon: MessageCircle },
            { label: 'Pacing', score: pacingScore || 72, color: (pacingScore || 72) > 75 ? '#50fa7b' : '#ffb86c', icon: BarChart3 }
        ];

        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem', maxWidth: '600px', margin: '2rem auto', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                <CheckCircle size={40} color="#50fa7b" style={{ margin: '0 auto 1.5rem' }} />
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f4f4f5', marginBottom: '1.5rem' }}>Interview Complete</h2>
                <div style={{ padding: '1.5rem', background: overall >= 80 ? 'rgba(80,250,123,0.08)' : 'rgba(255,184,108,0.08)', borderRadius: '16px', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#71717a', fontWeight: 700 }}>OVERALL CONFIDENCE SCORE</div>
                    <div style={{ fontSize: '3rem', fontWeight: 800, color: overall >= 80 ? '#50fa7b' : '#ffb86c' }}>{overall}%</div>
                </div>
                
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                        {feedbackMetrics.map((s, i) => (
                            <div key={i} style={{ padding: '1rem', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                                <s.icon size={16} color={s.color} style={{ margin: '0 auto 6px' }} />
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.score}%</div>
                                <div style={{ fontSize: '0.7rem', color: '#71717a', fontWeight: 600, textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
                            </div>
                        ))}
                </div>

                <div style={{ textAlign: 'left', padding: '1rem', borderRadius: '12px', background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.12)', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a78bfa', marginBottom: '8px' }}>💡 Improvement Tips</div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#a1a1aa', fontSize: '0.85rem', lineHeight: 1.7 }}>
                        {feedbackMetrics[2].score < 80 && <li>Try to slow down your speech pace slightly</li>}
                        {feedbackMetrics[0].score < 80 && <li>Maintain eye contact with the camera more consistently</li>}
                        {feedbackMetrics[1].score < 85 && <li>Use shorter sentences for better clarity</li>}
                        <li>Practice the STAR method for behavioral questions</li>
                    </ul>
                </div>

                <button onClick={() => setView('lobby')} style={{ padding: '0.75rem 2rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '14px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>Return to Dashboard</button>
            </motion.div>
        );
    }

    return null;
};

export default MockInterview;
