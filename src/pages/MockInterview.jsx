import React, { useState, useEffect, useRef } from 'react';
import { useProgress } from '../context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Video, Camera, Clock, CheckCircle, XCircle, Play, Save, RotateCcw, AlertTriangle } from 'lucide-react';

const MockInterview = () => {
  const { interviewHistory, addInterviewSession, careerProfile } = useProgress();
  const [view, setView] = useState('lobby'); // lobby, permission, interview, feedback
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  
  // Interview State
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question
  const [isRecording, setIsRecording] = useState(false);
  const [userAnswer, setUserAnswer] = useState(''); // Simulated voice input
  const [timerActive, setTimerActive] = useState(false);

  // Initialize questions
  useEffect(() => {
    const role = careerProfile?.targetRole || "Software Engineer";
    setQuestions([
        { id: 1, type: "Technical", text: `What are the key differences between SQL and NoSQL databases?` },
        { id: 2, type: "Behavioral", text: "Tell me about a time you failed and how you handled it." },
        { id: 3, type: "Problem Solving", text: "How would you design a scalable URL shortening service?" },
        { id: 4, type: "Role Specific", text: `Why do you want to work as a ${role}?` }
    ]);
  }, [careerProfile]);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      setIsRecording(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startSession = () => {
    setView('permission');
  };

  const requestPermissions = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setView('interview');
      startQuestion();
    } catch (err) {
      alert("Camera and Microphone permissions are mandatory for the Mock Interview.");
      console.error(err);
    }
  };

  const startQuestion = () => {
    setTimeLeft(60);
    setTimerActive(true);
    setIsRecording(true);
    setUserAnswer('');
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      startQuestion();
    } else {
      endInterview();
    }
  };

  const endInterview = () => {
    // Stop camera
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    // Generate Report
    const score = {
      technical: Math.floor(Math.random() * 30) + 70, // Mock 70-100
      communication: Math.floor(Math.random() * 20) + 80,
      confidence: Math.floor(Math.random() * 20) + 75
    };
    
    const feedback = {
      strengths: ["Clear articulation", "Good eye contact", "Structured answers"],
      weaknesses: ["Technical depth in database design", "Pacing was a bit fast"],
      suggestion: "Focus on System Design concepts and take more pauses."
    };

    const sessionData = {
      date: new Date().toISOString(),
      role: careerProfile?.targetRole || "Software Engineer",
      score,
      feedback
    };

    addInterviewSession(sessionData);
    setView('feedback');
  };

  // Re-attach video stream when view changes to 'interview'
  useEffect(() => {
    if (view === 'interview' && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [view, stream]);

  // --- RENDERERS ---

  if (view === 'lobby') {
    return (
      <div className="page-container" style={{ padding: '2rem' }}>
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>AI Mock Interview</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Practice with real-time AI feedback.</p>
            </div>
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startSession}
                className="primary-button"
                style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '8px' }}
            >
                <Video size={20} /> Start New Session
            </motion.button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '0' }}>
                 <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <h3 style={{ margin: 0 }}>Recent Sessions</h3>
                 </div>
                 <div style={{ padding: '1rem' }}>
                    {interviewHistory.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>
                            <Mic size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>No interviews recorded yet.</p>
                        </div>
                    ) : (
                        interviewHistory.map((session, i) => (
                            <div key={i} style={{ 
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                                padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' 
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{session.role} Interview</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        {new Date(session.date).toLocaleDateString()} • Score: {Math.round((session.score.technical + session.score.communication + session.score.confidence)/3)}%
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Badge value={session.score.technical} label="Tech" />
                                    <Badge value={session.score.communication} label="Comm" />
                                </div>
                            </div>
                        ))
                    )}
                 </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', height: 'fit-content' }}>
                <h3>Preparation Tips</h3>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    <li>Ensure good lighting.</li>
                    <li>Check your microphone clarity.</li>
                    <li>Speak clearly and confidently.</li>
                    <li>Structure your answers (STAR method).</li>
                </ul>
            </div>
        </div>
      </div>
    );
  }

  if (view === 'permission') {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card" 
            style={{ maxWidth: '400px', textAlign: 'center', padding: '3rem' }}
        >
            <Camera size={48} color="var(--accent-color)" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ marginBottom: '1rem' }}>Camera Access Required</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                To simulate a real interview environment and analyze your body language, we need access to your camera and microphone.
            </p>
            <button onClick={requestPermissions} className="primary-button" style={{ width: '100%', justifyContent: 'center' }}>
                Enable Camera & Start
            </button>
            <button 
                onClick={() => setView('lobby')} 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', marginTop: '1rem', cursor: 'pointer' }}
            >
                Cancel
            </button>
        </motion.div>
      </div>
    );
  }

  if (view === 'interview') {
    return (
        <div className="page-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                {/* Background Pattern or Blur */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(130, 87, 229, 0.1) 0%, rgba(0,0,0,0.8) 100%)' }}></div>
                
                {/* Webcam Preview */}
                <div style={{ 
                    position: 'absolute', top: '20px', right: '20px', 
                    width: '200px', height: '150px', 
                    background: '#000', borderRadius: '12px', overflow: 'hidden', 
                    border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>
                    <video ref={videoRef} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: 8, left: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 8, height: 8, background: '#ff5555', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                        <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>REC</span>
                    </div>
                </div>

                {/* Question Area */}
                <div style={{ 
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '80%', maxWidth: '800px', textAlign: 'center'
                }}>
                    <motion.div
                        key={currentQuestion}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                    >
                        <div style={{ 
                            textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-color)', 
                            fontWeight: 'bold', marginBottom: '1rem' 
                        }}>
                            Question {currentQuestion + 1} of {questions.length}
                        </div>
                        <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '2rem', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
                            {questions[currentQuestion].text}
                        </h1>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={24} color={timeLeft < 10 ? '#ff5555' : 'white'} />
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{timeLeft}s</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Controls */}
                <div style={{ 
                    position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', gap: '1rem'
                }}>
                    <button onClick={nextQuestion} className="primary-button" style={{ padding: '0.8rem 2rem' }}>
                        {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Interview"} <Play size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
  }

  if (view === 'feedback') {
    const lastSession = interviewHistory[0];
    return (
        <div className="page-container" style={{ padding: '2rem', overflowY: 'auto' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ 
                        width: 80, height: 80, margin: '0 auto 1.5rem', 
                        background: 'var(--accent-color)', borderRadius: '50%', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px var(--accent-glow)'
                    }}>
                        <CheckCircle size={40} color="white" />
                    </div>
                    <h1>Interview Complete</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Analysis Report Ready</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    <ScoreCard title="Technical" score={lastSession.score.technical} />
                    <ScoreCard title="Communication" score={lastSession.score.communication} />
                    <ScoreCard title="Confidence" score={lastSession.score.confidence} />
                </div>

                <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>AI Feedback</h3>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ color: '#50fa7b', marginBottom: '0.5rem' }}>Strengths</h4>
                        <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                            {lastSession.feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ color: '#ff5555', marginBottom: '0.5rem' }}>Areas for Improvement</h4>
                        <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                            {lastSession.feedback.weaknesses.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>

                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                        <strong>💡 Suggestion:</strong> {lastSession.feedback.suggestion}
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button onClick={() => setView('lobby')} className="secondary-button">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
  }

  return null;
};

// Helper Components
const Badge = ({ value, label }) => {
    let color = '#ff5555';
    if (value > 75) color = '#50fa7b';
    else if (value > 50) color = '#ffb86c';

    return (
        <div style={{ 
            fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', 
            background: `${color}20`, color: color, border: `1px solid ${color}40`
        }}>
            {label}: {value}%
        </div>
    );
};

const ScoreCard = ({ title, score }) => (
    <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{title}</div>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{score}%</div>
    </div>
);

export default MockInterview;
