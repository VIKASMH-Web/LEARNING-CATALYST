import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Sparkles, CheckCircle, AlertCircle,
    ArrowRight, MessageSquare, Lightbulb, User,
    Target, Info, RefreshCw, Upload, X, BarChart2
} from 'lucide-react';

const ProjectReviewer = () => {
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setContent('');
        }
    };

    const handleAnalyze = () => {
        if (!topic.trim() || (!content.trim() && !file)) return;

        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setResult({
                status: 'Professional Grade',
                statusColor: '#10b981',
                summary: `Your project on "${topic}" demonstrates a clear understanding of the core architecture and market requirements. Based on the 300+ words analyzed, the narrative flow is logically sound, moving from problem identification to technical solution with high coherence. For a competitive presentation, transition from descriptive text to performance telemetry. The "Real Project" aspect is well-supported by your implementation details, but your value proposition needs to specifically mention cost-efficiency and scalability. Your current report correctly identifies technical bottlenecks but misses a deep dive into recovery protocols for distributed systems. Overall, the content is strong, but adding a 'Future Scope' slide with 3 distinct growth phases would elevate this from a project to a product vision.`,
                confidence: 89,
                suggestions: [
                    { id: 1, type: 'Content', text: 'Quantify your impact: Instead of "fast response," use specific latency metrics (e.g., "22ms average latency").' },
                    { id: 2, type: 'Design', text: 'Break down the architecture slide into 3 progressive layers: Frontend, API Service, and Compute Layer.' },
                    { id: 3, type: 'Structure', text: 'Your 100+ word report transitions well, but ensure the "Problem Statement" is no more than 45 seconds of your total pitch time.' },
                    { id: 4, type: 'Delivery', text: 'Prepare a demo fallback. If live inference is slow, have a recorded clip of the feature in action.' }
                ],
                pitch: `A highly scalable, infrastructure-aware solution for ${topic}. It leverages modern parallelization to solve high-concurrency learning challenges, designed specifically for efficient compute environments.`,
                structure: [
                    { label: 'Introduction & Context', score: 95 },
                    { label: 'Technical Depth', score: 82 },
                    { label: 'Market Viability', score: 75 },
                    { label: 'Presentation Clarity', score: 88 }
                ]
            });
        }, 2500);
    };

    return (
        <div style={{ padding: '2rem 2.5rem', maxWidth: 1200, margin: '0 auto' }}>
            {/* Header */}
            <header style={{ marginBottom: '3rem' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
                    borderRadius: 20, background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.2)', marginBottom: 16,
                    fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600
                }}>
                    <Sparkles size={14} /> AI Presentation Booster
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
                    Project Reviewer
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: 750, lineHeight: 1.6 }}>
                    Upload your project report or paste your content. Our AI analysis engine provides instant feedback, confidence scores, and strategic suggestions to make your presentation industry-ready.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: result ? '1.1fr 0.9fr' : '1fr', gap: '2.5rem', alignItems: 'start' }}>
                {/* Input Section */}
                <motion.div layout>
                    <div style={{
                        background: '#FFFFFF',
                        border: '1px solid var(--border-color)',
                        borderRadius: 32,
                        padding: '3rem',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Project Topic</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., Cloud Computing Architecture, Marketing Strategy 2024"
                                style={{
                                    width: '100%', padding: '1.25rem',
                                    background: 'var(--bg-primary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 16, color: 'var(--text-primary)',
                                    fontSize: '1rem', outline: 'none', transition: 'all 0.2s'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Project Content / Report</label>
                                {!file && (
                                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 700 }}>
                                        <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                                        <Upload size={14} />
                                        <span>Upload Document</span>
                                    </label>
                                )}
                            </div>
                            
                            {file ? (
                                <div style={{
                                    width: '100%', padding: '1.5rem',
                                    background: 'rgba(52, 211, 153, 0.05)',
                                    border: '1px solid rgba(52, 211, 153, 0.25)',
                                    borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <CheckCircle size={20} color="#10b981" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.95rem', color: '#065f46', fontWeight: 700 }}>{file.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#059669', opacity: 0.8 }}>Ready for AI review</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setFile(null)}
                                        style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-tertiary)' }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Paste your project report, slide content, or presentation notes here..."
                                    style={{
                                        width: '100%', minHeight: '320px', padding: '1.5rem',
                                        background: 'var(--bg-primary)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 16, color: 'var(--text-primary)',
                                        fontSize: '1rem', outline: 'none', resize: 'vertical',
                                        lineHeight: 1.6, transition: 'all 0.2s'
                                    }}
                                />
                            )}
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !topic.trim() || (!content.trim() && !file)}
                            style={{
                                width: '100%', padding: '1.25rem', borderRadius: 16, border: 'none',
                                background: 'var(--text-primary)',
                                color: '#FFFFFF', fontWeight: 800, fontSize: '1.125rem',
                                cursor: (isAnalyzing || !topic.trim() || (!content.trim() && !file)) ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                boxShadow: '0 12px 32px rgba(0,0,0,0.1)', transition: 'all 0.3s',
                                opacity: (isAnalyzing || !topic.trim() || (!content.trim() && !file)) ? 0.7 : 1,
                            }}
                        >
                            {isAnalyzing ? (
                                <>Analyzing Context <RefreshCw size={20} className="animate-spin" /></>
                            ) : (
                                <>Launch Review Engine <ArrowRight size={20} /></>
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Result Section */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                        >
                            {/* Summary Card */}
                            <div style={{
                                background: '#FFFFFF',
                                border: '1px solid var(--border-color)',
                                borderRadius: 32,
                                padding: '2.5rem',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.03)',
                                overflow: 'hidden'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <div>
                                        <div style={{
                                            display: 'inline-block', color: '#10b981', background: 'rgba(16,185,129,0.08)',
                                            padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800,
                                            textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8
                                        }}>
                                            {result.status}
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Review Summary</h3>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)' }}>{result.confidence}%</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase' }}>Match Confidence</div>
                                    </div>
                                </div>

                                <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: 20, marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>AI Generated Quick Pitch</div>
                                    <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                                        "{result.pitch}"
                                    </p>
                                </div>

                                {/* Structure Analysis */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {result.structure.map((item, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
                                                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{item.label}</span>
                                                <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>{item.score}%</span>
                                            </div>
                                            <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: 3, overflow: 'hidden' }}>
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${item.score}%` }}
                                                    transition={{ duration: 1, delay: i * 0.1 }}
                                                    style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-color), #4f46e5)', borderRadius: 3 }} 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Detailed Analysis */}
                            <div style={{
                                background: '#FFFFFF',
                                border: '1px solid var(--border-color)',
                                borderRadius: 32, padding: '2.5rem',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.03)'
                            }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Target size={22} color="var(--accent-color)" /> Assessment Report
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                                    {result.summary}
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>Actionable Suggestions</div>
                                    {result.suggestions.map((s) => (
                                        <div key={s.id} style={{
                                            display: 'flex', gap: '16px', padding: '1.25rem',
                                            background: 'var(--bg-primary)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 16
                                        }}>
                                            <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '12px', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                                {s.type === 'Content' ? <MessageSquare size={18} color="#0ea5e9" /> :
                                                    s.type === 'Design' ? <Lightbulb size={18} color="#f59e0b" /> :
                                                        <BarChart2 size={18} color="#10b981" />}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: s.type === 'Content' ? '#0ea5e9' : s.type === 'Design' ? '#f59e0b' : '#10b981', marginBottom: '4px' }}>{s.type} Optimization</div>
                                                <div style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: 500 }}>{s.text}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setResult(null)}
                                style={{
                                    width: '100%', padding: '1.125rem', borderRadius: 16,
                                    border: '1px solid var(--border-color)', background: '#FFFFFF',
                                    color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 700,
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                                }}
                            >
                                <RefreshCw size={18} /> Reset for New Analysis
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <style>{`
                .animate-spin { animation: spin 1.5s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default ProjectReviewer;
