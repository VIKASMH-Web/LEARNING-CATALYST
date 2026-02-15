import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Code, Loader2, AlertCircle, Hash, GitBranch, TerminalSquare, Languages, BookOpen, Lightbulb, Volume2, Pause, StopCircle, Cpu } from 'lucide-react';
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
    const explanationRef = React.useRef(explanation);
    const audioStateRef = React.useRef(audioState);
    
    useEffect(() => {
        explanationRef.current = explanation;
        audioStateRef.current = audioState;
    }, [explanation, audioState]);

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

        const handleKeyDown = (e) => {
            const isAlt = e.altKey;
            const isCtrl = e.ctrlKey;
            const code = e.code;
            const key = e.key;

            if (isAlt || isCtrl) {
                // LISTEN EXPLANATION (Alt+L)
                if (code === 'KeyL' || key === '¬' || (key === 'l' && isCtrl)) {
                    e.preventDefault();
                    triggerExplanation();
                }
                // STOP (Alt+S)
                else if (code === 'KeyS' || key === 'ß' || (key === 's' && isCtrl)) {
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
        console.log("Attempting to speak:", text.substring(0, 20) + "...");
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

    const handleListenExplanation = () => triggerExplanation();

    const handleRun = async () => {
        incrementCodeRuns();
        setIsAnalyzing(true);
        setError('');
        setExplanation(null);
        setAnnouncement("Analyzing code logic...");
        
        try {
            // Local Analysis Engine
            const data = await analyzeCodeLocally(code, language, explanationLanguage);

            if (data.error) {
                setError(data.error);
                setExplanation(null);
            } else {
                setExplanation(data.explanation || null);
                setError('');
                if (autoVoice) setTimeout(() => handleListenExplanation(), 500);
                setAnnouncement("Analysis complete. Press Alt plus L to listen to explanation.");
            }
        } catch (e) {
            console.error(e);
            setError("Analysis engine encountered an unexpected error.");
            setExplanation(null);
            setAnnouncement("Analysis failed.");
        }
        setIsAnalyzing(false);
    };

    // --- RENDER ---
    return (
      <ErrorBoundary>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
            {/* Header */}
            <div className="page-header" style={{ marginBottom: '1rem' }}>
                <div>
                    <h1 className="h2" style={{ marginBottom: '0.25rem' }}>Code Engine</h1>
                    <p className="body-sm">High-fidelity logic analysis powered by AMD silicon.</p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* Status Pill */}
                    <div style={{ 
                        padding: '6px 12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', 
                        borderRadius: '20px', fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '6px',
                        fontWeight: 600
                    }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 8px var(--success)' }} />
                        AMD Ryzen™ AI Ready
                    </div>

                    <div style={{ 
                        display: 'flex', alignItems: 'center', gap: '0.5rem', 
                        background: 'var(--bg-secondary)', padding: '0 0.75rem', 
                        borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', height: '40px'
                    }}>
                        <Languages size={16} color="var(--text-tertiary)" />
                        <select 
                            value={explanationLanguage}
                            onChange={(e) => setExplanationLanguage(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '0.875rem' }}
                        >
                            {explanationLanguages.map(l => <option key={l} value={l} style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}>{l}</option>)}
                        </select>
                    </div>

                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{ 
                            padding: '0 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', 
                            borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', height: '40px', outline: 'none', fontSize: '0.875rem'
                        }}
                    >
                        {languages.map(l => <option key={l.id} value={l.id} style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}>{l.name}</option>)}
                    </select>

                    <button 
                        onClick={handleRun}
                        disabled={isAnalyzing}
                        className="btn btn-primary"
                        style={{ height: '40px' }}
                    >
                        {isAnalyzing ? <Loader2 size={16} className="spin" /> : <Play size={16} />}
                        {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>
            </div>
            
            <div aria-live="polite" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>{announcement}</div>

            {/* Main Editor Grid */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', minHeight: 0 }}>
                {/* Editor Panel */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                    <div style={{ 
                        padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', 
                        display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-secondary)' 
                    }}>
                        <Code size={16} color="var(--accent-color)" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Source Editor</span>
                    </div>
                    <textarea 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={{ 
                            flex: 1, padding: '1.5rem', background: 'var(--bg-primary)', border: 'none', 
                            color: 'var(--text-primary)', fontFamily: "'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace", 
                            fontSize: '0.925rem', outline: 'none', resize: 'none',
                            lineHeight: 1.6
                        }}
                        spellCheck="false"
                    />
                </div>

                {/* Explanation Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 0 }}>
                    <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                        <div style={{ 
                            padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', 
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)' 
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <BookOpen size={16} color="var(--warning)" />
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Narrative Explanation</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button 
                                    onClick={() => setAutoVoice(!autoVoice)}
                                    title="Auto-read explanation"
                                    className="btn btn-ghost"
                                    style={{ 
                                        padding: '4px 8px', height: '28px', fontSize: '0.75rem',
                                        color: autoVoice ? 'var(--success)' : 'var(--text-secondary)',
                                        background: autoVoice ? 'rgba(16, 185, 129, 0.1)' : 'transparent'
                                    }}
                                >
                                    <Volume2 size={14} /> {autoVoice ? 'Auto: ON' : 'Auto: OFF'}
                                </button>
                                
                                {audioState.type === 'explanation' && (
                                    <button 
                                        onClick={stopSpeaking} 
                                        className="btn btn-ghost"
                                        style={{ padding: '4px', height: '28px', color: 'var(--danger)' }}
                                    >
                                        <StopCircle size={16} />
                                    </button>
                                )}
                                <button
                                    onClick={triggerExplanation}
                                    className="btn btn-secondary"
                                    style={{ padding: '4px 12px', height: '28px', fontSize: '0.75rem' }}
                                >
                                    {audioState.type === 'explanation' && !audioState.isPaused ? <Pause size={12} /> : <Volume2 size={12} />}
                                    {audioState.type === 'explanation' ? (audioState.isPaused ? "Resume" : "Pause") : "Listen"}
                                </button>
                            </div>
                        </div>

                        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', background: 'var(--bg-primary)' }}>
                            <AnimatePresence mode="wait">
                                {error ? (
                                    <motion.div 
                                        key="error-box"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ 
                                            background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', 
                                            padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '12px', color: 'var(--danger)' 
                                        }}
                                    >
                                        <AlertCircle size={24} />
                                        <div>
                                            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Validation Failed</div>
                                            <div style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>{error}</div>
                                        </div>
                                    </motion.div>
                                ) : (explanation && explanation.titles) ? (
                                    <motion.div 
                                        key="explanation-box"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                                    >
                                        <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: 'var(--warning)' }}>
                                                <Lightbulb size={16} />
                                                <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{explanation.titles.overview}</h3>
                                            </div>
                                            <p className="body-sm" style={{ color: 'var(--text-primary)' }}>{explanation.overview}</p>
                                        </div>

                                        <section>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: 'var(--accent-color)' }}>
                                                <Hash size={16} />
                                                <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Line-by-Line Breakdown</h3>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                {explanation.lines && explanation.lines.map((line, i) => (
                                                    <div key={i} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-card)' }}>
                                                        <div style={{ padding: '0.5rem 1rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ fontSize: '0.7rem', fontWeight: 600, opacity: 0.7, textTransform: 'uppercase' }}>
                                                                {explanation.titles.line} {line.line_number}
                                                            </span>
                                                        </div>
                                                        <div style={{ padding: '1rem' }}>
                                                            <div style={{ marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                                                                {line.explanation}
                                                            </div>
                                                            <div style={{ padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--accent-color)', marginBottom: '0.75rem' }}>
                                                                {line.content}
                                                            </div>
                                                            <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                                                                <div style={{ fontSize: '0.8rem', opacity: 0.9, color: 'var(--text-secondary)' }}>{line.reason}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </motion.div>
                                ) : (
                                    <motion.div key="placeholder" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.4, textAlign: 'center' }}>
                                        <Cpu size={48} style={{ marginBottom: '1rem', color: 'var(--text-tertiary)' }} />
                                        <p className="body-sm">Deep Logic Analysis Ready.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', opacity: 0.5, fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Volume2 size={12} /> <span>{isMac ? 'Option' : 'Alt'} + L : Explain</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <StopCircle size={12} /> <span>{isMac ? 'Option' : 'Alt'} + S : Stop</span>
                </span>
            </div>

            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
      </ErrorBoundary>
    );
};

export default CodeEnginePage;
