import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Sparkles, CheckCircle, AlertCircle,
    ArrowRight, MessageSquare, Lightbulb, User,
    Target, Info, RefreshCw
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ProjectReviewer = () => {
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = () => {
        if (!topic.trim() || !content.trim()) return;

        setIsAnalyzing(true);
        // Mock analysis delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setResult({
                status: 'Needs Polish',
                statusColor: '#fbbf24',
                summary: `This project on "${topic}" explores key concepts but could benefit from more specific data points. The core narrative is strong, focusing on implementation strategies, but the conclusion needs a clearer call to action for a presentation setting.`,
                confidence: 78,
                suggestions: [
                    { id: 1, type: 'Content', text: 'Add 2-3 specific case studies or examples to back up your main claims.' },
                    { id: 2, type: 'Design', text: 'Use more high-contrast visuals for the technical architecture slides.' },
                    { id: 3, type: 'Delivery', text: 'Prepare for questions specifically on scalability and integration costs.' }
                ],
                pitch: `A comprehensive overview of ${topic} with a focus on practical application and future trends. Perfect for technical stakeholders who need both high-level vision and tactical details.`
            });
        }, 2000);
    };

    return (
        <div style={{ padding: '2rem 2.5rem', maxWidth: 1000, margin: '0 auto' }}>
            {/* Header */}
            <header style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: 16, fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600 }}>
                    <Sparkles size={14} /> AI Presentation Booster
                </div>
                <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
                    Perfect Your Presentation
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 600 }}>
                    Upload your project or paste your content. Get instant AI reviews, summaries, and confidence-boosting tips.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '2rem' }}>
                {/* Input Section */}
                <motion.div layout>
                    <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '2.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem', letterSpacing: '0.02em' }}>Project Topic</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., Cloud Computing Architecture, Marketing Strategy 2024"
                                style={{ width: '100%', padding: '1rem 1.25rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'var(--text-primary)', fontSize: '0.9375rem', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', focus: { borderColor: 'var(--accent-color)' } }}
                            />
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem', letterSpacing: '0.02em' }}>Project Content / Report</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Paste your project report, slide content, or presentation notes here..."
                                style={{ width: '100%', minHeight: '260px', padding: '1.25rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'var(--text-primary)', fontSize: '0.9375rem', outline: 'none', resize: 'vertical', lineHeight: 1.6, transition: 'border-color 0.2s' }}
                            />
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !topic.trim() || !content.trim()}
                            style={{
                                width: '100%', padding: '1.125rem', borderRadius: 14, border: 'none',
                                background: 'linear-gradient(135deg, var(--accent-color) 0%, #4f46e5 100%)',
                                color: 'white', fontWeight: 700, fontSize: '1.0625rem', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)', transition: 'all 0.3s',
                                opacity: (isAnalyzing || !topic.trim() || !content.trim()) ? 0.7 : 1,
                                letterSpacing: '0.03em'
                            }}
                        >
                            {isAnalyzing ? (
                                <RefreshCw size={20} className="animate-spin" />
                            ) : (
                                <>Analyze Project <ArrowRight size={20} /></>
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
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}
                        >
                            {/* Summary Card */}
                            <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, width: 150, height: 150, background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
                                    <div className="label" style={{ color: result.statusColor, background: 'rgba(251,191,36,0.1)', padding: '6px 14px', borderRadius: 14, letterSpacing: '0.05em' }}>{result.status}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: 14, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                        {result.confidence}% Match
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Quick Pitch</h3>
                                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    {result.pitch}
                                </p>
                            </div>

                            {/* Detailed Analysis */}
                            <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: '2rem', flex: 1 }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Target size={20} color="var(--accent-color)" /> Assessment Summary
                                </h3>
                                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                                    {result.summary}
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {result.suggestions.map((s) => (
                                        <div key={s.id} style={{ display: 'flex', gap: '14px', padding: '1.25rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14, transition: 'transform 0.2s', ':hover': { transform: 'translateX(4px)' } }}>
                                            <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {s.type === 'Content' ? <MessageSquare size={16} color="#60a5fa" /> :
                                                    s.type === 'Design' ? <Lightbulb size={16} color="#fbbf24" /> :
                                                        <User size={16} color="#34d399" />}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', marginBottom: '4px' }}>{s.type} Improvement</div>
                                                <div style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.text}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setResult(null)}
                                style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', padding: '1.125rem', borderRadius: 14, cursor: 'pointer', fontSize: '0.9375rem', fontWeight: 600, transition: 'all 0.2s', ':hover': { background: 'rgba(255,255,255,0.03)' } }}
                            >
                                Start New Analysis
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProjectReviewer;
