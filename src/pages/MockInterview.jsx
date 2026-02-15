import React, { useState, useEffect, useRef } from 'react';
import { useProgress } from '../context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Video, Camera, Clock, CheckCircle, Play, Share, HelpCircle, AlertTriangle, Monitor, Volume2, X } from 'lucide-react';

const MockInterview = () => {
    const { interviewHistory, addInterviewSession, careerProfile } = useProgress();
    const [view, setView] = useState('lobby'); // lobby, permission, interview, feedback
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState(45); // Set shorter time for demo
    const [isRecording, setIsRecording] = useState(false);
    const [activeMessage, setActiveMessage] = useState(null);

    // Mock Real-Time Feedback Data
    const feedbackMetrics = [
        { label: 'Body Language', status: 'Good', color: '#50fa7b', sub: 'Maintain Eye Contact' },
        { label: 'Speaking Pace', status: 'A bit fast', color: '#ffb86c', sub: '160 wpm' },
        { label: 'Clarity', status: 'Excellent', color: '#50fa7b', sub: 'Articulation' }
    ];

    const currentQuestion = "How would you handle a situation where a critical production bug is found 10 minutes before a major feature launch? Walk me through your decision-making process.";

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

    // --- RENDER ---
    if (view === 'lobby') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '2rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 className="h2">AI Interview Coach</h1>
                        <p className="body-sm">Behavioral and Technical practice with real-time feedback.</p>
                    </div>
                     <button onClick={startSession} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '20px' }}>
                        Start Mock Interview
                    </button>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', height: '100%' }}>
                     {/* Empty State / Previous Sessions */}
                     <div className="glass-card" style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', border: '2px dashed var(--border-color)', background: 'transparent' }}>
                        <div style={{ width: 80, height: 80, background: 'var(--bg-elevated)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <Video size={40} color="var(--accent-color)" />
                        </div>
                        <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Ready to Practice?</h3>
                        <p className="body-sm" style={{ maxWidth: '400px', textAlign: 'center', marginBottom: '2rem' }}>
                            Our AI analyzes your facial expressions, voice tonality, and answer quality in real-time.
                        </p>
                     </div>
                </div>
            </div>
        );
    }

    if (view === 'permission') {
         return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '480px' }}>
                    <div style={{ width: 64, height: 64, background: 'var(--bg-elevated)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <Camera size={32} color="var(--accent-color)" />
                    </div>
                    <h2 className="h2" style={{ marginBottom: '1rem' }}>Camera Access Required</h2>
                    <p className="body-sm" style={{ marginBottom: '2rem' }}>
                        To provide real-time body language analysis, we need access to your webcam and microphone. Data is processed locally.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button onClick={requestPermissions} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            Enable Camera & Start
                        </button>
                        <button onClick={() => setView('lobby')} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
         );
    }

    if (view === 'interview') {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '1.5rem', height: '100%' }}>
                
                {/* Main Video Stage */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                    <div className="glass-card" style={{ flex: 1, padding: 0, overflow: 'hidden', position: 'relative', background: 'black', border: 'none' }}>
                        
                        {/* Video Feed */}
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            muted 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
                        />
                        
                        {/* Status Overlay */}
                        <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', backdropFilter: 'blur(4px)' }}>
                            <div style={{ width: 8, height: 8, background: '#50fa7b', borderRadius: '50%', boxShadow: '0 0 10px #50fa7b' }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px' }}>AI ACTIVE</span>
                        </div>

                         <div style={{ position: 'absolute', top: 20, left: 120, display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', backdropFilter: 'blur(4px)' }}>
                             <div style={{ display: 'flex', gap: '2px', height: '10px', alignItems: 'flex-end' }}>
                                 {[1,2,3,4,3,2,1].map((h, i) => (
                                     <motion.div 
                                        key={i} 
                                        animate={{ height: [4, 10, 4] }} 
                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                        style={{ width: 2, background: 'white', borderRadius: 1 }} 
                                     />
                                 ))}
                             </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px' }}>LISTENING</span>
                        </div>

                        {/* Controls Overlay */}
                        <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-secondary" style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, justifyContent: 'center', background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                <Mic size={20} />
                            </button>
                            <button className="btn btn-secondary" style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, justifyContent: 'center', background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                <Video size={20} />
                            </button>
                            <button onClick={endSession} className="btn btn-primary" style={{ borderRadius: '30px', padding: '0 2rem', background: '#ff5555', border: 'none' }}>
                                End Interview
                            </button>
                             <button className="btn btn-secondary" style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, justifyContent: 'center', background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                <Share size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'start', gap: '1rem', background: 'var(--bg-elevated)', borderLeft: '4px solid var(--accent-color)' }}>
                        <div style={{ width: 32, height: 32, background: 'var(--accent-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <HelpCircle size={18} color="white" />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Interviewer Question:</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.4 }}>"{currentQuestion}"</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontStyle: 'italic' }}>Thinking time suggestions: Take 15-30 seconds to structure your answer.</div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Live Feedback */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    {/* Live Metrics */}
                    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AlertTriangle size={16} color="#ffb86c" />
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase' }}>Live Feedback</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {feedbackMetrics.map((m, i) => (
                                <div key={i} style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>{m.label}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{m.sub}</span>
                                        <span style={{ fontSize: '0.8rem', color: m.color, fontWeight: 700 }}>{m.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommended Prep */}
                    <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', border: 'none', color: 'white' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                            <Monitor size={16} />
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase' }}>Recommended Prep</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.5, opacity: 0.9, marginBottom: '1rem' }}>
                            Based on your previous sessions, you should review the "STAR Method" for behavioral questions.
                        </p>
                        <button style={{ width: '100%', padding: '0.5rem', background: 'white', color: '#4f46e5', border: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            Open Resource <Share size={12} />
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    if (view === 'feedback') {
        return (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', maxWidth: '500px' }}>
                    <div style={{ width: 80, height: 80, background: '#50fa7b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 20px rgba(80, 250, 123, 0.4)' }}>
                        <CheckCircle size={40} color="#000" />
                    </div>
                    <h2 className="h2" style={{ marginBottom: '0.5rem' }}>Interview Complete</h2>
                    <p className="body-sm" style={{ marginBottom: '2rem' }}>
                        Your session has been recorded. AI is generating a detailed analysis of your performance.
                    </p>
                    <button onClick={() => setView('lobby')} className="btn btn-secondary">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default MockInterview;
