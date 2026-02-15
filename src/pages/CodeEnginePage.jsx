import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Code, Terminal, Layers, Loader2, Cpu, AlertCircle, Info, Hash, GitBranch, TerminalSquare, Languages, HelpCircle, BookOpen, Lightbulb, Volume2, Square, Pause, StopCircle } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const CodeEnginePage = () => {
    const { incrementCodeRuns } = useProgress();
    
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

    // Keyboard Shortcuts
    const explanationRef = React.useRef(explanation);
    const outputRef = React.useRef(output);
    const audioStateRef = React.useRef(audioState);

    useEffect(() => {
        explanationRef.current = explanation;
        outputRef.current = output;
        audioStateRef.current = audioState;
    }, [explanation, output, audioState]);

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
                
                // LISTEN OUTPUT (Alt+O)
                else if (code === 'KeyO' || key === 'ø' || (key === 'o' && isCtrl)) {
                    e.preventDefault();
                    triggerOutput();
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

    // Wrapper functions to be called by keys
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

    const triggerOutput = () => {
        const currentAudio = audioStateRef.current;
        if (currentAudio.type === 'output') {
           pauseSpeaking();
           return;
       }

       const textToRead = outputRef.current || "No output to read.";
       const prefix = "Program Output. "; 
       speakText(prefix + textToRead, 'output');
    };

    const speakText = (text, type) => {
        console.log("Attempting to speak:", text.substring(0, 20) + "...");
        window.speechSynthesis.cancel();

        if (!text) {
            console.warn("No text to speak");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => {
            console.log("Speech STARTED");
            setAudioState({ type, isPaused: false });
        };
        
        utterance.onend = () => {
             console.log("Speech ENDED");
             setAudioState({ type: 'idle', isPaused: false });
        };
        
        utterance.onerror = (e) => {
            console.error("Speech ERROR:", e);
            setAudioState({ type: 'idle', isPaused: false });
        };

        window.speechSynthesis.speak(utterance);
        
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
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
    const handleListenOutput = () => triggerOutput();

    const handleRun = async () => {
        incrementCodeRuns(); // Track run for progress
        
        setIsAnalyzing(true);
        setError('');
        setExplanation(null);
        setOutput('');
        
        try {
            const res = await fetch('http://localhost:8000/api/analyze-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, language, explanation_language: explanationLanguage })
            });

            if (!res.ok) {
                throw new Error("Backend connection failed");
            }

            const data = await res.json();
            
            if (!data) {
                throw new Error("Received empty response from server.");
            }

            if (data.error) {
                setError(data.error);
                setExplanation(null);
                setOutput('');
            } else {
                setExplanation(data.explanation || null);
                setOutput(data.output || "");
                setError('');
                
                if (autoVoice) {
                    setTimeout(() => handleListenExplanation(), 500);
                }
                
                setAnnouncement("Analysis complete. Press Alt plus L to listen to explanation, or Alt plus O for output.");
            }
        } catch (e) {
            const errorMsg = "Unable to connect to local AI engine. Ensure server/main.py is running on port 8000.";
            setError(errorMsg);
            setExplanation(null);
            setOutput('');
            setAnnouncement("Analysis failed. Error: " + errorMsg);
        }
        setIsAnalyzing(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', minHeight: 'calc(100vh - 80px)' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Code Engine</h1>
                    <p>High-fidelity logic analysis and execution simulation powered by AMD silicon.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0 1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                        <Languages size={18} opacity={0.5} />
                        <select 
                            value={explanationLanguage}
                            onChange={(e) => setExplanationLanguage(e.target.value)}
                            style={{ padding: '0.75rem 0', background: 'transparent', border: 'none', color: 'white', outline: 'none' }}
                        >
                            {explanationLanguages.map(l => <option key={l} value={l} style={{ background: '#1a1a1a', color: 'white' }}>{l}</option>)}
                        </select>
                    </div>

                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{ padding: '0.75rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'white' }}
                    >
                        {languages.map(l => <option key={l.id} value={l.id} style={{ background: '#1a1a1a', color: 'white' }}>{l.name}</option>)}
                    </select>

                    <button 
                        onClick={handleRun}
                        disabled={isAnalyzing}
                        style={{ 
                            padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '8px', 
                            background: 'var(--accent-color)', color: 'white', border: 'none', 
                            borderRadius: '10px', fontWeight: 600, cursor: 'pointer',
                            opacity: isAnalyzing ? 0.7 : 1
                        }}
                    >
                        {isAnalyzing ? <Loader2 size={18} className="spin" /> : <Play size={18} />}
                        {isAnalyzing ? 'Analyzing...' : 'Analyze & Simulate'}
                    </button>
                </div>
            </header>
            
            <div aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
                {announcement}
            </div>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: '1.5rem', overflow: 'hidden' }}>
                {/* LEFT PANEL: Editor */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)' }}>
                        <Code size={16} color="var(--accent-color)" />
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Source Editor</span>
                    </div>
                    <textarea 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={{ 
                            flex: 1, padding: '1.5rem', background: 'transparent', border: 'none', 
                            color: 'white', fontFamily: 'monospace', fontSize: '1.1rem', outline: 'none', resize: 'none',
                            lineHeight: 1.6
                        }}
                        spellCheck="false"
                    />
                </div>

                {/* RIGHT PANELS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflow: 'hidden' }}>
                    {/* TOP: Logic Breakdown */}
                    <div className="glass-card" style={{ flex: 1.6, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <BookOpen size={16} color="#ffb86c" />
                                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Narrative Explanation</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button 
                                    onClick={() => setAutoVoice(!autoVoice)}
                                    aria-label={`Toggle auto-voice. Currently ${autoVoice ? 'on' : 'off'}`}
                                    title="Auto-read explanation after analysis"
                                    style={{
                                        background: autoVoice ? 'rgba(80, 250, 123, 0.1)' : 'transparent', 
                                        border: '1px solid var(--border-color)', borderRadius: '6px',
                                        color: autoVoice ? '#50fa7b' : 'var(--text-secondary)', cursor: 'pointer', padding: '4px 8px',
                                        display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, marginRight: '8px'
                                    }}
                                >
                                    <Volume2 size={14} /> {autoVoice ? 'Auto: ON' : 'Auto: OFF'}
                                </button>
                                
                                {audioState.type === 'explanation' && (
                                    <button onClick={stopSpeaking} style={{ background: 'transparent', border: 'none', color: '#ff5555', cursor: 'pointer' }} aria-label="Stop explanation (Alt + S)"><StopCircle size={16} /></button>
                                )}
                                <button
                                    onClick={triggerExplanation}
                                    aria-label={audioState.type === 'explanation' && !audioState.isPaused ? "Pause explanation" : "Listen to explanation (Alt + L)"}
                                    style={{
                                        background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '6px',
                                        color: audioState.type === 'explanation' ? 'var(--accent-color)' : 'var(--text-secondary)', cursor: 'pointer', padding: '4px 8px',
                                        display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600
                                    }}
                                >
                                    {audioState.type === 'explanation' && !audioState.isPaused ? <Pause size={14} fill="currentColor" /> : <Volume2 size={14} />}
                                    {audioState.type === 'explanation' ? (audioState.isPaused ? "Resume" : "Pause") : "Listen Explanation"}
                                </button>
                            </div>
                        </div>
                        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                            <AnimatePresence mode="wait">
                            {error ? (
                                <motion.div 
                                    key="error-box"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ background: 'rgba(255, 85, 85, 0.1)', border: '1px solid rgba(255, 85, 85, 0.2)', padding: '1.5rem', borderRadius: '12px', display: 'flex', gap: '12px', color: '#ff5555' }}
                                >
                                    <AlertCircle size={24} />
                                    <div>
                                        <div style={{ fontWeight: 700, marginBottom: '4px', fontSize: '1.1rem' }}>Validation Failed</div>
                                        <div style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>{error}</div>
                                    </div>
                                </motion.div>
                            ) : (explanation && explanation.titles) ? (
                                <motion.div 
                                    key="explanation-box"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                                >
                                    {/* 1. Overview */}
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: '#ffb86c' }}>
                                            <Lightbulb size={18} />
                                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{explanation.titles.overview}</h3>
                                        </div>
                                        <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.6 }}>{explanation.overview}</p>
                                    </div>

                                    {/* 2. Line-by-Line */}
                                    <section>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: 'var(--accent-color)' }}>
                                            <Hash size={18} />
                                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Line-by-Line Breakdown</h3>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            {explanation.lines && explanation.lines.map((line, i) => (
                                                <div key={i} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                                                    {/* Header */}
                                                    <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' }}>
                                                            {explanation.titles.line} {line.line_number}
                                                        </span>
                                                    </div>
                                                    
                                                    {/* Content */}
                                                    <div style={{ padding: '1rem' }}>
                                                        <div style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>
                                                            {line.explanation}
                                                        </div>
                                                        <div style={{ padding: '0.75rem', background: '#000', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', color: '#ff79c6', marginBottom: '1rem' }}>
                                                            {line.content}
                                                        </div>
                                                        <div style={{ padding: '1rem', background: 'rgba(80, 250, 123, 0.1)', borderRadius: '8px', border: '1px solid rgba(80, 250, 123, 0.2)' }}>
                                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px', color: '#50fa7b', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                                                                <Lightbulb size={14} /> {explanation.titles.reasoning}
                                                            </div>
                                                            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{line.reason}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* 3. Logic Flow & Variables */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
                                        <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#bd93f9' }}>
                                                <TerminalSquare size={18} />
                                                <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{explanation.titles.variables}</h3>
                                            </div>
                                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                {explanation.variables && explanation.variables.length > 0 ? explanation.variables.map((v, i) => (
                                                    <span key={i} style={{ padding: '4px 8px', background: 'rgba(189, 147, 249, 0.1)', color: '#bd93f9', borderRadius: '4px', fontSize: '0.8rem' }}>{v}</span>
                                                )) : <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>No variables detected</span>}
                                            </div>
                                        </div>
                                        
                                        <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#8be9fd' }}>
                                                <GitBranch size={18} />
                                                <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{explanation.titles.logic}</h3>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {explanation.logic_flow && explanation.logic_flow.length > 0 ? (
                                                    explanation.logic_flow.map((step, i) => (
                                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', opacity: 0.9 }}>
                                                            <div style={{ width: 6, height: 6, background: '#8be9fd', borderRadius: '50%', flexShrink: 0 }} />
                                                            <span>{step}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div style={{ fontSize: '0.85rem', opacity: 0.5 }}>Sequential Execution</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="placeholder" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.3, textAlign: 'center' }}>
                                    <Cpu size={40} style={{ marginBottom: '1rem' }} />
                                    <p style={{ fontSize: '0.85rem' }}>Trigger local analysis to see a Lovable-style breakdown.<br/>Multi-language explanations powered by AMD AI.</p>
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* BOTTOM: Console */}
                    <div className="glass-card" style={{ flex: 0.5, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#000' }}>
                        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Terminal size={16} color="#50fa7b" />
                                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Execution Output</span>
                            </div>
                             <div style={{ display: 'flex', gap: '8px' }}>
                                {audioState.type === 'output' && (
                                    <button onClick={stopSpeaking} style={{ background: 'transparent', border: 'none', color: '#ff5555', cursor: 'pointer' }} aria-label="Stop output (Alt + S)"><StopCircle size={16} /></button>
                                )}
                                <button
                                    onClick={triggerOutput}
                                    aria-label={audioState.type === 'output' && !audioState.isPaused ? "Pause output" : "Listen output (Alt + O)"}
                                    style={{
                                        background: 'transparent', border: '1px solid #333', borderRadius: '6px',
                                        color: audioState.type === 'output' ? '#50fa7b' : '#888', cursor: 'pointer', padding: '4px 8px',
                                        display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600
                                    }}
                                >
                                    {audioState.type === 'output' && !audioState.isPaused ? <Pause size={14} fill="currentColor" /> : <Volume2 size={14} />}
                                    {audioState.type === 'output' ? (audioState.isPaused ? "Resume" : "Pause") : "Listen Output"}
                                </button>
                            </div>
                        </div>
                        <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto' }}>
                             {output ? (
                                <pre style={{ color: '#50fa7b', fontFamily: 'monospace', fontSize: '1rem', whiteSpace: 'pre-wrap' }}>
                                    {output}
                                </pre>
                             ) : error ? (
                                <pre style={{ color: '#ff5555', fontFamily: 'monospace', fontSize: '0.9rem', opacity: 0.8 }}>
                                    {`[Trace terminated with non-zero exit code]`}
                                </pre>
                             ) : (
                                <span style={{ opacity: 0.4, fontStyle: 'italic', fontSize: '0.8rem' }}>// Waiting for logical trace signals...</span>
                             )}
                        </div>
                    </div>
                </div>
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', opacity: 0.5, fontSize: '0.8rem', paddingBottom: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Volume2 size={12} /> 
                    <span>{isMac ? 'Option' : 'Alt'} + L : Explain</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Terminal size={12} /> 
                    <span>{isMac ? 'Option' : 'Alt'} + O : Output</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <StopCircle size={12} /> 
                    <span>{isMac ? 'Option' : 'Alt'} + S : Stop</span>
                </span>
            </div>

            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default CodeEnginePage;
