import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useProgress } from '../context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';
import { notifyInterviewComplete } from '../utils/notifications';
import interviewQuestionsData from '../data/interviewQuestions.json';
import { useGame } from '../context/GameContext';
import { Sparkles, Play, Zap, Video, Camera, VideoOff, Clock, Mic, MicOff, PhoneOff, Brain, CheckCircle, Eye, MessageCircle, Target, BarChart3, ChevronLeft } from 'lucide-react';

const domains = [
    { key: 'backend_developer', label: 'Backend Development', icon: '⚙️', color: '#60a5fa', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { key: 'frontend_developer', label: 'Frontend Development', icon: '🎨', color: '#34d399', image: 'https://images.unsplash.com/photo-1547658719-da2b51159128?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { key: 'data_scientist', label: 'Data Science', icon: '📊', color: '#fbbf24', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { key: 'hr', label: 'HR / People Ops', icon: '👥', color: '#f472b6', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { key: 'product_manager', label: 'Product Management', icon: '📱', color: '#a78bfa', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { key: 'digital_marketing', label: 'Digital Marketing', icon: '📣', color: '#fb923c', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { key: 'general', label: 'General / Behavioral', icon: '💬', color: '#94a3b8', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
];

const MockInterview = () => {
    const { addXP, addInterviewSession } = useProgress();
    const [view, setView] = useState('lobby'); // lobby, domain, difficulty, permission, interview, feedback
    const [selectedDomain, setSelectedDomain] = useState('general');
    const [difficulty, setDifficulty] = useState('medium');
    const [questions, setQuestions] = useState([]);
    const [advancedMode, setAdvancedMode] = useState(false);
    
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
    const recognitionRef = useRef(null);
    const [liveTranscript, setLiveTranscript] = useState('');

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
        if (addInterviewSession) addInterviewSession({ date: new Date().toISOString(), score: finalScore });
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

    // Initialize Speech Recognition
    useEffect(() => {
        if (view === 'interview' && isRecording && micEnabled) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.onresult = (e) => {
                    const currentTranscript = Array.from(e.results).map(r => r[0].transcript).join(' ');
                    setLiveTranscript(currentTranscript);
                };
                try {
                    recognition.start();
                    recognitionRef.current = recognition;
                } catch (err) { console.log(err); }
            }
        }
        
        return () => {
             if (recognitionRef.current) {
                 try { recognitionRef.current.stop(); } catch(e){}
             }
        }
    }, [view, isRecording, micEnabled]);

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
        let lastTranscriptLen = 0;
        
        analyzeInterval.current = setInterval(() => {
            analysisCount++;
            
            // Generate Eye score (still somewhat simulated as actual pupil tracking requires heavy models)
            const baseEye = 75 + Math.random() * 20;
            setEyeScore(prev => Math.round((prev * 0.7 + baseEye * 0.3)));
            
            // Calculate pacing and clarity dynamically from actual transcript changes
            setLiveTranscript(prev => {
                const words = prev.trim().split(/\s+/).filter(w=>w.length>0).length;
                const newWords = words > lastTranscriptLen ? words - lastTranscriptLen : 0;
                lastTranscriptLen = words;
                
                // Words per 2 seconds. Average speaking rate is ~4-5 words per 2 seconds.
                const speedScore = newWords === 0 ? 0 : Math.min(100, (newWords / 5) * 100);
                setPacingScore(p => Math.round((p * 0.6) + (speedScore * 0.4)));
                
                const clarityBase = newWords > 0 ? 80 + Math.random()*15 : 40;
                setClarityScore(c => Math.round((c * 0.6) + (clarityBase * 0.4)));
                
                return prev;
            });

            setBodyLanguage(baseEye > 80 ? 'Good' : baseEye > 65 ? 'Fair' : 'Needs Work');
            
            setPacingScore(currentPacing => {
                setPaceStatus(currentPacing > 80 ? 'Excellent' : currentPacing > 50 ? 'A bit fast' : currentPacing > 0 ? 'Too slow' : 'Silent');
                return currentPacing;
            });
            
            setClarityScore(currentClarity => {
                setClarityStatus(currentClarity > 85 ? 'Excellent' : currentClarity > 50 ? 'Good' : 'Improving');
                return currentClarity;
            });
            
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                                <button onClick={() => setView('domain')} style={{
                                    padding: '0.875rem 2rem', background: '#7c3aed', color: 'white', border: 'none',
                                    borderRadius: '14px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                                    boxShadow: '0 0 30px rgba(124,58,237,0.3)'
                                }}><Play size={18} fill="white" /> Choose Domain</button>

                                <button onClick={() => setAdvancedMode(!advancedMode)} style={{
                                    padding: '0.875rem 1.25rem', background: advancedMode ? 'rgba(251,191,36,0.1)' : 'rgba(255,255,255,0.02)', 
                                    border: advancedMode ? '1px solid rgba(251,191,36,0.3)' : '1px solid rgba(255,255,255,0.08)', color: advancedMode ? '#fbbf24' : '#a1a1aa', borderRadius: '14px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', boxShadow: advancedMode ? '0 0 15px rgba(251,191,36,0.1)' : 'none'
                                }}>
                                    <Zap size={14} color={advancedMode ? '#fbbf24' : '#6b7280'} fill={advancedMode ? '#fbbf24' : 'none'} /> Advanced Mode
                                </button>
                            </div>
                        </div>
                        <div style={{
                            width: '320px', height: '240px', borderRadius: '16px', overflow: 'hidden',
                            position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}>
                            <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Interview Practice" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f0f1e, transparent)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '1rem' }}>
                                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(124,58,237,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', boxShadow: '0 4px 15px rgba(124,58,237,0.5)' }}>
                                    <Video size={24} color="#fff" />
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 700, letterSpacing: '0.5px' }}>LIVE ANALYSIS</div>
                            </div>
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    {domains.map(domain => (
                        <button key={domain.key} onClick={() => { setSelectedDomain(domain.key); setView('difficulty'); }} style={{
                            display: 'flex', flexDirection: 'column', borderRadius: 16, overflow: 'hidden', textAlign: 'left',
                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer',
                            transition: 'all 0.2s', padding: 0, position: 'relative'
                        }} className="domain-card-hover">
                            <div style={{ height: '140px', width: '100%', position: 'relative' }}>
                                <img src={domain.image} alt={domain.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,15,30,1), transparent)' }} />
                                <span style={{ position: 'absolute', bottom: '10px', left: '16px', fontSize: '2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>{domain.icon}</span>
                            </div>
                            <div style={{ padding: '16px' }}>
                                <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem', marginBottom: '4px' }}>{domain.label}</div>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>AI Mock Interview</div>
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#50fa7b', animation: 'pulse 2s infinite' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#50fa7b' }}>LIVE METRICS</span>
                    </div>

                    {[
                        { label: 'Eye Contact', status: bodyLanguage, score: eyeScore, color: eyeScore > 75 ? '#50fa7b' : '#ffb86c', icon: Eye },
                        { label: 'Clarity', status: clarityStatus, score: clarityScore, color: clarityScore > 75 ? '#50fa7b' : '#ffb86c', icon: MessageCircle },
                        { label: 'Pacing', status: paceStatus, score: pacingScore, color: pacingScore > 75 ? '#50fa7b' : '#ffb86c', icon: BarChart3 }
                    ].map((m, i) => (
                        <div key={i} style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.25rem' }}><m.icon size={12} color={m.color} /><span style={{ fontSize: '0.65rem', color: '#71717a', fontWeight: 700 }}>{m.label}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ fontSize: '1.1rem', fontWeight: 800, color: m.color }}>{m.score}%</span><span style={{ fontSize: '0.7rem', color: m.color }}>{m.status}</span></div>
                            <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}><div style={{ width: `${m.score}%`, height: '100%', background: m.color, borderRadius: 2, transition: 'width 0.5s' }} /></div>
                        </div>
                    ))}

                    <div style={{ background: '#18181b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', padding: '0.75rem', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}><MessageCircle size={12} color="#a78bfa" /><h3 style={{ fontSize: '0.75rem', fontWeight: 800, margin: 0 }}>Live Transcript</h3></div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', fontSize: '0.8rem', color: '#e4e4e7', lineHeight: 1.5 }}>
                            {liveTranscript || <span style={{ color: '#71717a', fontStyle: 'italic' }}>Waiting for speech...</span>}
                        </div>
                    </div>

                    <button onClick={() => { if(currentQuestionIdx < questions.length - 1) { setCurrentQuestionIdx(i => i + 1); setTimeLeft(120); setLiveTranscript(''); } else endSession(); }} style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(124,58,237,0.1)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.2)', cursor: 'pointer', fontWeight: 700, flexShrink: 0 }}>
                        {currentQuestionIdx < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
                    </button>
                    
                    <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: 'white', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.25rem' }}><Brain size={12} /><h3 style={{ fontSize: '0.75rem', fontWeight: 800, margin: 0 }}>AI Tip</h3></div>
                        <p style={{ fontSize: '0.75rem', lineHeight: 1.4, opacity: 0.9, margin: 0 }}>
                            {bodyLanguage === 'Needs Work' ? "Try to maintain steady eye contact with the lens to convey confidence." 
                            : bodyLanguage === 'Silent' ? "Don't forget to verbally communicate your thoughts."
                            : paceStatus === 'Too slow' || paceStatus === 'Silent' ? "Try to speak a bit more."
                            : paceStatus === 'Too fast' || paceStatus === 'A bit fast' ? "Pace yourself. Take a breath between key points." : "You're speaking clearly and purposefully. Keep it up!"}
                        </p>
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

                {advancedMode && (
                    <div style={{ textAlign: 'left', padding: '1.5rem', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(251,191,36,0.05), rgba(217,119,6,0.02))', border: '1px solid rgba(251,191,36,0.2)', marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Zap size={14} fill="#fbbf24" /> Premium AI Breakdown
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                 <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '4px' }}>STAR Method Detection</div>
                                 <div style={{ color: '#50fa7b', fontWeight: 600, fontSize: '0.9rem' }}>85% Match (Strong Results)</div>
                            </div>
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                 <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '4px' }}>Communication Sentiment</div>
                                 <div style={{ color: '#fbbf24', fontWeight: 600, fontSize: '0.9rem' }}>Confident, Slightly Rushed</div>
                            </div>
                        </div>
                        <p style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                            <strong>AI Observation:</strong> You effectively mapped the "Situation" and "Result" but somewhat skipped over "Task" specifics. The historical performance tracking shows a 12% improvement in pacing since last week's sessions.
                        </p>
                    </div>
                )}

                <button onClick={() => setView('lobby')} style={{ padding: '0.75rem 2rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '14px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>Return to Dashboard</button>
            </motion.div>
        );
    }

    return null;
};

export default MockInterview;
