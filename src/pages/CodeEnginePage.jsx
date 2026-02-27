import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, Code, Loader2, AlertCircle, Hash, GitBranch, 
    TerminalSquare, Languages, BookOpen, Lightbulb, 
    Volume2, Pause, StopCircle, Cpu,
    Sparkles, Brain, Code2, ChevronDown, Monitor, Zap
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { analyzeCodeLocally } from '../utils/codeAnalysis';

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
        
        try {
            const data = await analyzeCodeLocally(code, language, explanationLanguage);
            if (data.error) {
                setError(data.error);
            } else {
                setExplanation(data.explanation || null);
                setOutput(data.output || '');
                if (autoVoice) setTimeout(() => triggerExplanation(), 500);
            }
        } catch (e) {
            setError("Analysis engine encountered an error.");
        }
        setIsAnalyzing(false);
    };

    const Card = ({ children, title, icon: Icon, rightContent, style }) => (
        <div style={{ 
            background: '#12121e', 
            borderRadius: '16px', 
            border: '1px solid rgba(255,255,255,0.06)', 
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            ...style
        }}>
            <div style={{ 
                padding: '12px 20px', 
                borderBottom: '1px solid rgba(255,255,255,0.04)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'rgba(255,255,255,0.01)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon size={14} color="#a5b4fc" style={{ opacity: 0.8 }} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)' }}>{title}</span>
                </div>
                {rightContent}
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
                {children}
            </div>
        </div>
    );

    return (
        <div style={{ 
            padding: '2rem 1.5rem', 
            background: '#0a0a0f', 
            minHeight: '100vh', 
            color: '#e2e8f0',
            fontFamily: "'Inter', sans-serif"
        }}>
            
            {/* Header / Control Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#FFFFFF' }}>Code Engine</h1>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '4px' }}>
                        High-fidelity logic analysis powered by AMD silicon.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* AMD Badge */}
                    <div style={{ 
                        padding: '8px 16px', 
                        background: '#0f172a', 
                        borderRadius: '20px', 
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.9)'
                    }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                        AMD Ryzen™ AI Ready
                    </div>

                    {/* Translation Dropdown */}
                    <div style={{ 
                        padding: '8px 12px', 
                        background: '#0f172a', 
                        borderRadius: '12px', 
                        border: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px'
                    }}>
                        <Languages size={14} color="rgba(255,255,255,0.5)" />
                        <select 
                            value={explanationLanguage}
                            onChange={(e) => setExplanationLanguage(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: '#FFFFFF', fontSize: '0.8rem', outline: 'none', cursor: 'pointer' }}
                        >
                            {explanationLanguages.map(l => <option key={l} value={l} style={{ background: '#0f172a' }}>{l}</option>)}
                        </select>
                        <ChevronDown size={12} color="rgba(255,255,255,0.3)" />
                    </div>

                    {/* Language Dropdown */}
                    <div style={{ 
                        padding: '8px 12px', 
                        background: '#0f172a', 
                        borderRadius: '12px', 
                        border: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px'
                    }}>
                        <select 
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: '#FFFFFF', fontSize: '0.8rem', outline: 'none', cursor: 'pointer', minWidth: '40px' }}
                        >
                            {languages.map(l => <option key={l.id} value={l.id} style={{ background: '#0f172a' }}>{l.name}</option>)}
                        </select>
                        <ChevronDown size={12} color="rgba(255,255,255,0.3)" />
                    </div>

                    {/* Analyze Button */}
                    <button 
                        onClick={handleRun}
                        disabled={isAnalyzing}
                        style={{
                            padding: '10px 24px', 
                            borderRadius: '12px', 
                            border: 'none',
                            background: '#f8fafc', 
                            color: '#0f172a',
                            fontWeight: 700, 
                            fontSize: '0.85rem', 
                            cursor: 'pointer',
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 12px rgba(255,255,255,0.05)'
                        }}
                    >
                        {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Play size={14} fill="#0f172a" />}
                        Analyze
                    </button>
                </div>
            </div>

            {/* Main Application Interface */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '1.5rem', height: 'calc(100vh - 200px)' }}>
                
                {/* 1. Source Editor Panel */}
                <Card title="Source Editor" icon={Code2}>
                    <div style={{ display: 'flex', height: '100%', background: '#0c0c14' }}>
                        {/* Line Numbers Simulation */}
                        <div style={{ padding: '20px 12px', background: '#09090f', color: 'rgba(255,255,255,0.1)', fontSize: '0.8rem', fontFamily: "'SF Mono', monospace", textAlign: 'right', borderRight: '1px solid rgba(255,255,255,0.03)', userSelect: 'none' }}>
                            {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                        </div>
                        <textarea 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{ 
                                flex: 1, padding: '20px', background: 'transparent', border: 'none', 
                                color: '#cbd5e1', fontFamily: "'SF Mono', 'Menlo', 'Monaco', monospace", 
                                fontSize: '0.9rem', outline: 'none', resize: 'none', lineHeight: 1.6
                            }}
                            spellCheck="false"
                        />
                    </div>
                </Card>

                {/* 2. Side Panel Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Narrative Explanation Panel */}
                    <Card 
                        title="Narrative Explanation" 
                        icon={BookOpen}
                        rightContent={
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)' }}>
                                    <Volume2 size={12} /> AUTO: {autoVoice ? 'ON' : 'OFF'}
                                </div>
                                <button 
                                    onClick={triggerExplanation}
                                    style={{ 
                                        padding: '4px 12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', 
                                        borderRadius: '8px', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '6px'
                                    }}
                                >
                                    <Volume2 size={12} /> {audioState.type === 'explanation' ? (audioState.isPaused ? "Listen" : "Pause") : "Listen"}
                                </button>
                            </div>
                        }
                        style={{ flex: 1.5 }}
                    >
                        <div style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
                            <AnimatePresence mode="wait">
                                {explanation ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="content">
                                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#a5b4fc', marginBottom: '1rem' }}>
                                            {explanation.titles?.overview || 'Logic Overview'}
                                        </h3>
                                        <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
                                            {explanation.overview}
                                        </p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {explanation.lines?.map((line, idx) => (
                                                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                                                   <div style={{ fontSize: '0.6rem', color: '#6366f1', fontWeight: 900, marginBottom: '4px' }}>LINE {line.line_number}</div>
                                                   <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{line.explanation}</div>
                                                   <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{line.reason}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.15 }}>
                                        <Monitor size={48} style={{ marginBottom: '1rem' }} />
                                        <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Deep Logic Analysis Ready.</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Card>

                    {/* Execution Result Panel */}
                    <Card title="Execution Result" icon={TerminalSquare} style={{ flex: 1 }}>
                        <div style={{ padding: '1.5rem', background: '#09090f', height: '100%', fontFamily: "'SF Mono', monospace", fontSize: '0.85rem' }}>
                            <div style={{ color: '#22c55e', opacity: 0.8 }}>
                                {output || (isAnalyzing ? 'Processing logic kernels...' : 'Terminal idle...')}
                            </div>
                            {error && <div style={{ color: '#ef4444', marginTop: '10px' }}>{error}</div>}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Shortcuts Legend */}
            <div style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '2rem', opacity: 0.3, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <kbd style={{ background: '#1e1e2d', padding: '2px 6px', borderRadius: '4px' }}>{isMac ? 'Option' : 'Alt'} + L</kbd> <span>Explain</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <kbd style={{ background: '#1e1e2d', padding: '2px 6px', borderRadius: '4px' }}>{isMac ? 'Option' : 'Alt'} + S</kbd> <span>Stop</span>
                </div>
            </div>

            <style>{`
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                select option { background: #12121e; color: white; }
            `}</style>
        </div>
    );
};

export default CodeEnginePage;
