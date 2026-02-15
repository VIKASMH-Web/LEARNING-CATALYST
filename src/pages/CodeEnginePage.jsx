import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Code, AlertTriangle, Monitor, RotateCcw, MessageSquare, Terminal, RefreshCw, Cpu } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { analyzeCodeLocally } from '../utils/codeAnalysis';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const CodeEnginePage = () => {
    // State
    const [code, setCode] = useState(`// Local AI Analysis Engine
function calculateImpact(skills, intensity) {
    // AI-powered calculation logic
    const baseRate = skills.length * 1.5;
    const multiplier = Math.log2(intensity + 1);
    
    return (baseRate * multiplier).toFixed(2);
}

// Example usage
const impact = calculateImpact(['React', 'Node'], 10);
console.log(\`Projected growth: \${impact}%\`);`);
    
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [explanation, setExplanation] = useState(null);
    const [error, setError] = useState(null);
    const { incrementCodeRuns } = useProgress();
    
    // --- ACTIONS ---
    const handleRun = async () => {
        setIsAnalyzing(true);
        setError(null);
        setExplanation(null);
        incrementCodeRuns();
        
        try {
            // Simulated delay for "AI thinking"
            await new Promise(r => setTimeout(r, 800));
            
            // Local Execution (Unsafe eval for demo, but sandboxed in logic)
            // In reality, this would be `analyzeCodeLocally` or a WebWorker.
            // We use the util but also simulate output.
            const result = await analyzeCodeLocally(code, 'javascript');
            
            if (result.error) throw new Error(result.error);
            
            setExplanation({
                summary: "This function simulates a career growth algorithm using logarithmic scaling.",
                concepts: [
                    { title: "Logarithmic Growth", desc: "Math.log2 ensures returns diminish as intensity increases." },
                    { title: "Array Aggregation", desc: "skills.length acts as a linear base weight." }
                ],
                suggestion: "Try adding a 'experience' parameter to see how the AI explanation updates in real-time."
            });

        } catch (e) {
            setError(e.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <ErrorBoundary>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr', gap: '1.5rem', height: 'calc(100vh - 100px)' }}>
                
                {/* LEFT: Editor Panel */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    {/* Toolbar */}
                    <div style={{ 
                        padding: '0.75rem 1rem', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-color)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', gap: '1px' }}>
                            <Tab label="index.js" active />
                            <Tab label="styles.css" />
                        </div>
                        
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                <Cpu size={14} /> Local AI Active
                            </div>
                            <button 
                                onClick={handleRun}
                                disabled={isAnalyzing}
                                className="btn btn-primary"
                                style={{ 
                                    background: '#50fa7b', color: '#000', padding: '0.4rem 1.2rem', 
                                    display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem'
                                }}
                            >
                                {isAnalyzing ? <RefreshCw className="spin" size={14} /> : <Play size={14} fill="black" />}
                                Run
                            </button>
                        </div>
                    </div>

                    {/* Code Area */}
                    <div style={{ flex: 1, position: 'relative', background: '#0d1117' }}>
                        <textarea 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="console-font"
                            style={{ 
                                width: '100%', height: '100%', padding: '1.5rem', 
                                background: 'transparent', color: '#c9d1d9', border: 'none', 
                                resize: 'none', fontSize: '14px', lineHeight: '1.6', outline: 'none'
                            }}
                            spellCheck="false"
                        />
                    </div>
                </div>

                {/* RIGHT: AI Explainer Panel */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                    
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: 32, height: 32, background: 'var(--accent-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Monitor size={18} color="white" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>AI Explainer</h3>
                            <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Context-aware logic breakdown</p>
                        </div>
                    </div>

                    <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
                        {explanation ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ fontSize: '0.75rem', color: '#8be9fd', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ w: 6, h: 6, bg: '#8be9fd', r: '50%' }} /> What This Does
                                    </h4>
                                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                                        {explanation.summary}
                                    </p>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ fontSize: '0.75rem', color: '#ffb86c', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                        Key Concepts
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {explanation.concepts.map((c, i) => (
                                            <div key={i} style={{ padding: '1rem', background: 'var(--bg-elevated)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>{c.title}</div>
                                                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{c.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', marginTop: '2rem' }}>
                                    <p style={{ fontSize: '0.75rem', fontStyle: 'italic', opacity: 0.6, marginBottom: '1rem', textAlign: 'center' }}>
                                        "{explanation.suggestion}"
                                    </p>
                                    <button style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        Ask AI Follow-up <MessageSquare size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ) : error ? (
                             <div style={{ textAlign: 'center', padding: '2rem', color: '#ff5555' }}>
                                <AlertTriangle size={32} style={{ marginBottom: '1rem' }} />
                                <p>{error}</p>
                             </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem 1rem', opacity: 0.5 }}>
                                <Terminal size={40} style={{ marginBottom: '1rem' }} />
                                <p>Run code to generate AI explanation.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </ErrorBoundary>
    );
};

const Tab = ({ label, active }) => (
    <div style={{ 
        padding: '0.5rem 1rem', 
        background: active ? '#0d1117' : 'transparent', 
        color: active ? '#fff' : 'var(--text-secondary)',
        fontSize: '0.8rem', 
        borderTopLeftRadius: '6px', 
        borderTopRightRadius: '6px',
        cursor: 'pointer',
        borderTop: active ? '2px solid var(--accent-color)' : '2px solid transparent'
    }}>
        {label}
    </div>
);

export default CodeEnginePage;
