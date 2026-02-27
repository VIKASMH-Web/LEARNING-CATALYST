import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, Code, Loader2, AlertCircle, Hash, GitBranch, 
    TerminalSquare, Languages, BookOpen, Lightbulb, 
    Volume2, Pause, StopCircle, Cpu, ChevronRight,
    Sparkles, Brain, Code2
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { analyzeCodeLocally } from '../utils/codeAnalysis';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const CodeEnginePage = () => {
    const { incrementCodeRuns } = useProgress();
    
    // Default Code Template
    const [code, setCode] = useState('// Write or paste your code here...\n\n#include <stdio.h>\n\nint main() {\n    printf("Hello from Learning Catalyst!\\n");\n    return 0;\n}');
    const [language, setLanguage] = useState('c');
    const [explanationLanguage, setExplanationLanguage] = useState('English');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [explanation, setExplanation] = useState(null);
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const languages = [
        { id: 'c', name: 'C' },
        { id: 'cpp', name: 'C++' },
        { id: 'python', name: 'Python' },
        { id: 'java', name: 'Java'},
        { id: 'javascript', name: 'JavaScript' }
    ];

    const explanationLanguages = [
        'English', 'Kannada', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Marathi'
    ];

    const [audioState, setAudioState] = useState({ type: 'idle', isPaused: false });
    const [autoVoice, setAutoVoice] = useState(false);
    const [announcement, setAnnouncement] = useState('');
    const [isMac, setIsMac] = useState(false);

    // Refs for safe access in event listeners
    const explanationRef = useRef(explanation);
    const audioStateRef = useRef(audioState);
    
    useEffect(() => {
        explanationRef.current = explanation;
        audioStateRef.current = audioState;
    }, [explanation, audioState]);

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

        const handleKeyDown = (e) => {
            const isAlt = e.altKey;
            const isCtrl = e.ctrlKey;
            const key = e.key.toLowerCase();

            if (isAlt || isCtrl) {
                if (key === 'l') {
                    e.preventDefault();
                    triggerExplanation();
                }
                else if (key === 's') {
                    e.preventDefault();
                    stopSpeaking();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const triggerExplanation = () => {
         const currentAudio = audioStateRef.current;
         const currentExpl = explanationRef.current;
         
         if (currentAudio.type === 'explanation') {
            pauseSpeaking();
            return;
         }

         if (!currentExpl) return;

         const t = currentExpl.titles || {};
         const overview = t.overview || "Overview";
         let fullText = `${overview}. ${currentExpl.overview}. `;
            
         if (currentExpl.lines) {
             fullText += "Line by line breakdown. ";
             currentExpl.lines.forEach(line => {
                 fullText += `Line ${line.line_number}. ${line.explanation}. ${line.reason}. `;
             });
         }
         speakText(fullText, 'explanation');
    };

    const speakText = (text, type) => {
        window.speechSynthesis.cancel();
        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => setAudioState({ type, isPaused: false });
        utterance.onend = () => setAudioState({ type: 'idle', isPaused: false });
        utterance.onerror = (e) => {
            console.error("Speech ERROR:", e);
            setAudioState({ type: 'idle', isPaused: false });
        };

        window.speechSynthesis.speak(utterance);
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    };
    
    useEffect(() => {
        return () => window.speechSynthesis.cancel();
    }, []);

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setAudioState({ type: 'idle', isPaused: false });
    };

    const pauseSpeaking = () => {
        if (window.speechSynthesis.speaking) {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
                setAudioState(prev => ({ ...prev, isPaused: false }));
            } else {
                window.speechSynthesis.pause();
                setAudioState(prev => ({ ...prev, isPaused: true }));
            }
        }
    };

    const handleRun = async () => {
        incrementCodeRuns();
        setIsAnalyzing(true);
        setError('');
        setExplanation(null);
        setOutput('');
        setAnnouncement("Analyzing code logic...");
        
        try {
            const data = await analyzeCodeLocally(code, language, explanationLanguage);
            if (data.error) {
                setError(data.error);
                setExplanation(null);
                setOutput('');
            } else {
                setExplanation(data.explanation || null);
                setOutput(data.output || '');
                setError('');
                if (autoVoice) setTimeout(() => triggerExplanation(), 500);
                setAnnouncement("Analysis complete.");
            }
        } catch (e) {
            setError("Analysis engine encountered an error.");
            setIsAnalyzing(false);
        }
        setIsAnalyzing(false);
    };

    return (
      <ErrorBoundary>
        <div style={{ padding: '0', display: 'flex', flexDirection: 'column', gap: '2rem', height: 'calc(100vh - 120px)' }}>
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
                        borderRadius: 20, background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.2)', marginBottom: 16,
                        fontSize: '0.8rem', color: '#059669', fontWeight: 600
                    }}>
                        <Cpu size={14} /> AMD Ryzen™ AI Accelerated
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', margin: 0 }}>
                        Code Engine
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                        High-fidelity logic analysis for competitive programming.
                    </p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ 
                        display: 'flex', alignItems: 'center', gap: '12px', background: '#FFFFFF', 
                        padding: '10px 20px', borderRadius: '16px', border: '1px solid var(--border-color)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Languages size={16} color="var(--text-tertiary)" />
                            <select 
                                value={explanationLanguage}
                                onChange={(e) => setExplanationLanguage(e.target.value)}
                                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', fontWeight: 600 }}
                            >
                                {explanationLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                        <div style={{ width: 1, height: 20, background: 'var(--border-color)' }} />
                        <select 
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', fontWeight: 600 }}
                        >
                            {languages.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                    </div>

                    <button 
                        onClick={handleRun}
                        disabled={isAnalyzing}
                        style={{
                            padding: '12px 28px', borderRadius: '16px', border: 'none',
                            background: 'var(--text-primary)', color: '#FFFFFF',
                            fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '10px',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)', transition: 'all 0.2s'
                        }}
                    >
                        {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
                        {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
                    </button>
                </div>
            </header>
            
            <div aria-live="polite" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>{announcement}</div>

            {/* Main Editor Grid */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '2rem', minHeight: 0 }}>
                {/* Editor Panel */}
                <div style={{ 
                    display: 'flex', flexDirection: 'column', background: '#FFFFFF', 
                    border: '1px solid var(--border-color)', borderRadius: '32px', overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                }}>
                    <div style={{ 
                        padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', 
                        display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(99,102,241,0.03)' 
                    }}>
                        <Code2 size={18} color="var(--accent-color)" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Source Editor</span>
                    </div>
                    <textarea 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={{ 
                            flex: 1, padding: '2rem', background: 'transparent', border: 'none', 
                            color: 'var(--text-primary)', fontFamily: "'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace", 
                            fontSize: '0.95rem', outline: 'none', resize: 'none', lineHeight: 1.7
                        }}
                        spellCheck="false"
                    />
                </div>

                {/* Info Side */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: 0 }}>
                    {/* Explanation Panel */}
                    <div style={{ 
                        flex: 1, display: 'flex', flexDirection: 'column', background: '#FFFFFF', 
                        border: '1px solid var(--border-color)', borderRadius: '32px', overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{ 
                            padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', 
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                            background: 'rgba(245,158,11,0.03)' 
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <BookOpen size={18} color="#d97706" />
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Narrative Explanation</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button 
                                    onClick={() => setAutoVoice(!autoVoice)}
                                    style={{ 
                                        padding: '4px 12px', borderRadius: 12, border: '1px solid',
                                        background: autoVoice ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                                        borderColor: autoVoice ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-color)',
                                        color: autoVoice ? '#059669' : 'var(--text-tertiary)',
                                        fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer'
                                    }}
                                >
                                    AUTO: {autoVoice ? 'ON' : 'OFF'}
                                </button>
                                
                                {audioState.type === 'explanation' && (
                                    <button 
                                        onClick={stopSpeaking} 
                                        style={{ border: 'none', background: 'rgba(239,68,68,0.1)', color: '#dc2626', width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <StopCircle size={14} />
                                    </button>
                                )}
                                <button
                                    onClick={triggerExplanation}
                                    style={{ 
                                        padding: '4px 16px', borderRadius: 12, border: 'none',
                                        background: 'var(--accent-muted)', color: 'var(--accent-color)',
                                        fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: 6
                                    }}
                                >
                                    {audioState.type === 'explanation' && !audioState.isPaused ? <Pause size={12} /> : <Volume2 size={12} />}
                                    {audioState.type === 'explanation' ? (audioState.isPaused ? "RESUME" : "PAUSE") : "LISTEN"}
                                </button>
                            </div>
                        </div>

                        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                            <AnimatePresence mode="wait">
                                {error ? (
                                    <motion.div 
                                        key="error-box"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ 
                                            background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', 
                                            padding: '1.5rem', borderRadius: '20px', display: 'flex', gap: '16px', color: '#dc2626' 
                                        }}
                                    >
                                        <AlertCircle size={24} />
                                        <div>
                                            <div style={{ fontWeight: 800, marginBottom: '4px' }}>Validation Failed</div>
                                            <div style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{error}</div>
                                        </div>
                                    </motion.div>
                                ) : explanation ? (
                                    <motion.div 
                                        key="explanation-box"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                                    >
                                        <div style={{ background: 'rgba(245,158,11,0.03)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(245,158,11,0.1)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', color: '#d97706' }}>
                                                <Lightbulb size={20} />
                                                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>{explanation.titles?.overview || 'Logic Overview'}</h3>
                                            </div>
                                            <p style={{ color: 'var(--text-primary)', fontSize: '0.975rem', lineHeight: 1.7, margin: 0 }}>{explanation.overview}</p>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            {explanation.lines && explanation.lines.map((line, i) => (
                                                <div key={i} style={{ border: '1px solid var(--border-color)', borderRadius: '20px', overflow: 'hidden' }}>
                                                    <div style={{ padding: '0.75rem 1.25rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                            Line {line.line_number}
                                                        </span>
                                                    </div>
                                                    <div style={{ padding: '1.25rem' }}>
                                                        <div style={{ marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                                            {line.explanation}
                                                        </div>
                                                        <div style={{ padding: '1rem', background: 'rgba(99,102,241,0.03)', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.05)', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--accent-color)', marginBottom: '1rem' }}>
                                                            {line.content}
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                            <Sparkles size={14} color="#10b981" style={{ marginTop: 2 }} />
                                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{line.reason}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.3, textAlign: 'center' }}>
                                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                            <Brain size={40} color="var(--text-tertiary)" />
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Awaiting Analysis</h3>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Click "Analyze Code" to generate <br/>deep logic insights.</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Output Panel */}
                    <div style={{ 
                        height: '240px', display: 'flex', flexDirection: 'column', 
                        background: '#1a1a2e', borderRadius: '32px', overflow: 'hidden',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
                    }}>
                        <div style={{ 
                            padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', 
                            display: 'flex', alignItems: 'center', gap: '0.75rem' 
                        }}>
                            <TerminalSquare size={16} color="#10b981" />
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)' }}>System Output</span>
                        </div>
                        <div style={{ 
                            flex: 1, padding: '1.5rem', background: 'transparent',
                            color: '#10b981', fontFamily: "'SF Mono', monospace", fontSize: '0.9rem', overflowY: 'auto'
                        }}>
                            {output ? (
                                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{output}</pre>
                            ) : (
                                <span style={{ opacity: 0.3, fontStyle: 'italic' }}>Terminal idle — Waiting for execution...</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', background: '#FFFFFF', borderRadius: '20px', border: '1px solid var(--border-color)', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600 }}>
                    <kbd style={{ padding: '4px 8px', borderRadius: 6, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', fontSize: '0.7rem' }}>{isMac ? '⌥' : 'Alt'} + L</kbd>
                    <span>Explain Logic</span>
                </div>
                <div style={{ width: 1, height: 16, background: 'var(--border-color)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600 }}>
                    <kbd style={{ padding: '4px 8px', borderRadius: 6, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', fontSize: '0.7rem' }}>{isMac ? '⌥' : 'Alt'} + S</kbd>
                    <span>Stop Speech</span>
                </div>
            </div>

            <style>{`
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                &::selection { background: var(--accent-muted); color: var(--accent-color); }
            `}</style>
        </div>
      </ErrorBoundary>
    );
};

export default CodeEnginePage;
