import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HelpCircle, ChevronDown, ChevronUp, BookOpen, Bug, Mail, 
    Activity, Lightbulb, ThumbsUp, Send, Image, MessageCircle, 
    CheckCircle, Clock, ArrowRight, Zap, ExternalLink
} from 'lucide-react';

// ============================================
// FAQ DATA
// ============================================
const faqData = [
    { q: 'How does Skill Intelligence work?', a: 'Skill Intelligence uses AI to evaluate your proficiency across different technology domains based on your learning activity, code analysis results, and roadmap progress. It builds a dynamic radar chart showing your strengths.' },
    { q: 'How is Cognitive Score calculated?', a: 'Your Cognitive Score is a weighted average of multiple factors: roadmap completion (30%), code analysis accuracy (25%), focus session consistency (20%), and interview performance (25%). It updates in real-time as you engage with the platform.' },
    { q: 'How does AI Mock Interview analyze me?', a: 'The AI uses your webcam to track eye contact, posture, and facial expressions. It simultaneously analyzes your speech for pace, filler words, clarity, and STAR method structure. All processing happens in real-time with no data stored externally.' },
    { q: 'Why do I need to enable camera?', a: 'Camera access is required only for Mock Interview sessions to provide body language feedback. It is never recorded or stored — all analysis is performed locally in your browser. You can revoke access at any time.' },
    { q: 'What is Focus Engine?', a: 'Focus Engine is a Pomodoro-based deep work timer with lo-fi audio support. It tracks your study hours, which contribute to badges and your overall learning score. Use Deep Work (25 min) and Short Break (5 min) modes.' },
    { q: 'How do Roadmaps work?', a: 'Roadmaps are structured learning paths for specific technology domains. Each roadmap has ordered steps with resources. Your progress is tracked as you complete steps, contributing to badges like Halfway Hero and Advanced Achiever.' },
];

// ============================================
// GUIDES DATA
// ============================================
const guidesData = [
    { title: 'Getting Started Guide', desc: 'Learn how to set up your profile, choose your first roadmap, and make the most of your learning journey.', icon: '🚀' },
    { title: 'How to use Code Engine', desc: 'Paste or write code, get AI-powered analysis with logic explanations and simulated output across multiple languages.', icon: '⚙️' },
    { title: 'How Roadmaps work', desc: 'Understand roadmap steps, progress tracking, domain skills, and how completing roadmaps earns you badges.', icon: '🗺️' },
    { title: 'How to improve interview score', desc: 'Tips on eye contact, speech pace, STAR method answers, and using the AI feedback to level up your interview skills.', icon: '🎤' },
];

// ============================================
// FEATURE REQUESTS
// ============================================
const initialFeatures = [
    { id: 1, title: 'Dark/Light theme toggle', votes: 24, status: 'planned' },
    { id: 2, title: 'Export progress as PDF report', votes: 18, status: 'under-review' },
    { id: 3, title: 'Collaborative study rooms', votes: 31, status: 'planned' },
    { id: 4, title: 'Mobile app version', votes: 42, status: 'under-review' },
    { id: 5, title: 'Integration with GitHub', votes: 15, status: 'planned' },
];

const HelpCenter = () => {
    const [activeTab, setActiveTab] = useState('faq');
    const [openFaq, setOpenFaq] = useState(null);
    
    // Bug report state
    const [bugReport, setBugReport] = useState({ subject: '', description: '', screenshot: null });
    const [bugSubmitted, setBugSubmitted] = useState(false);
    
    // Feature state
    const [features, setFeatures] = useState(() => {
        const saved = localStorage.getItem('lc_feature_requests');
        return saved ? JSON.parse(saved) : initialFeatures;
    });
    const [votedIds, setVotedIds] = useState(() => {
        const saved = localStorage.getItem('lc_voted_features');
        return saved ? JSON.parse(saved) : [];
    });
    const [newFeature, setNewFeature] = useState('');
    const [showFeatureInput, setShowFeatureInput] = useState(false);

    const upvoteFeature = (id) => {
        if (votedIds.includes(id)) return;
        const updated = features.map(f => f.id === id ? { ...f, votes: f.votes + 1 } : f);
        setFeatures(updated);
        const newVoted = [...votedIds, id];
        setVotedIds(newVoted);
        localStorage.setItem('lc_feature_requests', JSON.stringify(updated));
        localStorage.setItem('lc_voted_features', JSON.stringify(newVoted));
    };

    const submitFeature = () => {
        if (!newFeature.trim()) return;
        const feature = { id: Date.now(), title: newFeature.trim(), votes: 1, status: 'new' };
        const updated = [feature, ...features];
        setFeatures(updated);
        setVotedIds([...votedIds, feature.id]);
        localStorage.setItem('lc_feature_requests', JSON.stringify(updated));
        localStorage.setItem('lc_voted_features', JSON.stringify([...votedIds, feature.id]));
        setNewFeature('');
        setShowFeatureInput(false);
    };

    const handleBugSubmit = () => {
        setBugSubmitted(true);
        setTimeout(() => { setBugSubmitted(false); setBugReport({ subject: '', description: '', screenshot: null }); }, 3000);
    };

    const tabs = [
        { key: 'faq', label: 'FAQ', icon: HelpCircle },
        { key: 'guides', label: 'Guides', icon: BookOpen },
        { key: 'bug', label: 'Report Bug', icon: Bug },
        { key: 'contact', label: 'Contact', icon: Mail },
        { key: 'status', label: 'Status', icon: Activity },
        { key: 'features', label: 'Features', icon: Lightbulb },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header */}
            <div>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
                    Help Center
                </h1>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    Find answers, report issues, and help shape the future of Learning Catalyst.
                </p>
            </div>

            {/* Tab Bar */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {tabs.map(t => (
                    <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        style={{
                            padding: '0.6rem 1.25rem', borderRadius: '12px',
                            background: activeTab === t.key ? 'rgba(124,58,237,0.15)' : 'var(--bg-card)',
                            border: activeTab === t.key ? '1px solid rgba(124,58,237,0.3)' : '1px solid var(--border-color)',
                            color: activeTab === t.key ? '#a78bfa' : 'var(--text-secondary)',
                            fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <t.icon size={16} />
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeTab} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                >
                    {/* ============ FAQ ============ */}
                    {activeTab === 'faq' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {faqData.map((item, i) => (
                                <div key={i} style={{
                                    borderRadius: '16px', background: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)', overflow: 'hidden'
                                }}>
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        style={{
                                            width: '100%', padding: '1.25rem 1.5rem',
                                            background: 'none', border: 'none', cursor: 'pointer',
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            color: openFaq === i ? '#a78bfa' : 'var(--text-primary)',
                                            fontSize: '0.95rem', fontWeight: 600, textAlign: 'left'
                                        }}
                                    >
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <HelpCircle size={16} color={openFaq === i ? '#a78bfa' : '#71717a'} />
                                            {item.q}
                                        </span>
                                        {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', paddingLeft: '3rem' }}>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                                        {item.a}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ============ GUIDES ============ */}
                    {activeTab === 'guides' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                            {guidesData.map((g, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    style={{
                                        padding: '1.5rem', borderRadius: '18px',
                                        background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                                        cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s'
                                    }}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{g.icon}</div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{g.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0, marginBottom: '1rem' }}>{g.desc}</p>
                                    <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        Read Guide <ArrowRight size={14} />
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* ============ REPORT BUG ============ */}
                    {activeTab === 'bug' && (
                        <div style={{
                            maxWidth: '600px', padding: '2rem', borderRadius: '20px',
                            background: 'var(--bg-card)', border: '1px solid var(--border-color)'
                        }}>
                            {bugSubmitted ? (
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <CheckCircle size={48} color="#50fa7b" style={{ marginBottom: '1rem' }} />
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Bug Report Submitted</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Thank you! Our team will investigate and get back to you.</p>
                                </div>
                            ) : (
                                <>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Bug size={20} color="#a78bfa" /> Report a Bug
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px', display: 'block' }}>Subject</label>
                                            <input
                                                value={bugReport.subject}
                                                onChange={e => setBugReport({ ...bugReport, subject: e.target.value })}
                                                placeholder="Brief description of the bug"
                                                style={{
                                                    width: '100%', padding: '0.75rem 1rem', borderRadius: '12px',
                                                    background: 'var(--bg-primary)', border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none'
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px', display: 'block' }}>Description</label>
                                            <textarea
                                                value={bugReport.description}
                                                onChange={e => setBugReport({ ...bugReport, description: e.target.value })}
                                                placeholder="Steps to reproduce, expected vs actual behavior..."
                                                rows={5}
                                                style={{
                                                    width: '100%', padding: '0.75rem 1rem', borderRadius: '12px',
                                                    background: 'var(--bg-primary)', border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none',
                                                    resize: 'vertical', fontFamily: 'inherit'
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px', display: 'block' }}>Attach Screenshot (optional)</label>
                                            <label style={{
                                                display: 'flex', alignItems: 'center', gap: '8px',
                                                padding: '0.75rem 1rem', borderRadius: '12px',
                                                border: '1px dashed var(--border-hover)', cursor: 'pointer',
                                                color: 'var(--text-secondary)', fontSize: '0.85rem'
                                            }}>
                                                <Image size={18} />
                                                {bugReport.screenshot ? bugReport.screenshot.name : 'Click to upload screenshot'}
                                                <input
                                                    type="file" accept="image/*" style={{ display: 'none' }}
                                                    onChange={e => setBugReport({ ...bugReport, screenshot: e.target.files[0] })}
                                                />
                                            </label>
                                        </div>
                                        <button
                                            onClick={handleBugSubmit}
                                            disabled={!bugReport.subject.trim() || !bugReport.description.trim()}
                                            style={{
                                                padding: '0.875rem', borderRadius: '14px',
                                                background: (!bugReport.subject.trim() || !bugReport.description.trim()) ? '#1e1e3e' : '#7c3aed',
                                                color: (!bugReport.subject.trim() || !bugReport.description.trim()) ? '#4e4e6e' : 'white',
                                                border: 'none', fontSize: '0.95rem', fontWeight: 700,
                                                cursor: (!bugReport.subject.trim() || !bugReport.description.trim()) ? 'not-allowed' : 'pointer',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                                marginTop: '0.5rem'
                                            }}
                                        >
                                            <Send size={16} /> Submit Bug Report
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* ============ CONTACT SUPPORT ============ */}
                    {activeTab === 'contact' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                            <div style={{
                                padding: '2rem', borderRadius: '18px',
                                background: 'var(--bg-card)', border: '1px solid var(--border-color)'
                            }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: '14px',
                                    background: 'rgba(124,58,237,0.12)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'
                                }}>
                                    <Mail size={22} color="#a78bfa" />
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Email Support</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                                    Send us a detailed email and we'll respond within 24 hours.
                                </p>
                                <a href="mailto:support@learningcatalyst.ai" style={{
                                    fontSize: '0.85rem', color: '#a78bfa', fontWeight: 700,
                                    display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none'
                                }}>
                                    support@learningcatalyst.ai <ExternalLink size={14} />
                                </a>
                            </div>

                            <div style={{
                                padding: '2rem', borderRadius: '18px',
                                background: 'var(--bg-card)', border: '1px solid var(--border-color)'
                            }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: '14px',
                                    background: 'rgba(80,250,123,0.08)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'
                                }}>
                                    <MessageCircle size={22} color="#50fa7b" />
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Live Chat</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                                    Real-time chat support for urgent issues.
                                </p>
                                <span style={{ fontSize: '0.8rem', color: '#ffb86c', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Clock size={14} /> Coming Soon
                                </span>
                            </div>

                            <div style={{
                                padding: '2rem', borderRadius: '18px',
                                background: 'var(--bg-card)', border: '1px solid var(--border-color)'
                            }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: '14px',
                                    background: 'rgba(88,101,242,0.12)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'
                                }}>
                                    <Zap size={22} color="#5865f2" />
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>Discord Community</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                                    Join our community to connect with other learners and get peer support.
                                </p>
                                <a href="#" style={{
                                    fontSize: '0.85rem', color: '#5865f2', fontWeight: 700,
                                    display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none'
                                }}>
                                    Join Discord <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    )}

                    {/* ============ SYSTEM STATUS ============ */}
                    {activeTab === 'status' && (
                        <div style={{
                            maxWidth: '600px', padding: '2rem', borderRadius: '20px',
                            background: 'var(--bg-card)', border: '1px solid var(--border-color)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                <Activity size={20} color="#50fa7b" />
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>System Status</h3>
                                <span style={{
                                    marginLeft: 'auto', padding: '4px 12px', borderRadius: '20px',
                                    background: 'rgba(80,250,123,0.1)', color: '#50fa7b',
                                    fontSize: '0.75rem', fontWeight: 700
                                }}>
                                    All Operational
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {[
                                    { name: 'AI Engine', status: 'Operational', uptime: '99.9%' },
                                    { name: 'Code Engine', status: 'Operational', uptime: '99.8%' },
                                    { name: 'Interview Engine', status: 'Operational', uptime: '99.7%' },
                                    { name: 'Focus Engine', status: 'Operational', uptime: '100%' },
                                    { name: 'Authentication', status: 'Operational', uptime: '100%' },
                                ].map((s, i) => (
                                    <div key={i} style={{
                                        padding: '1rem 1.25rem', borderRadius: '14px',
                                        background: 'var(--bg-primary)', border: '1px solid var(--border-color)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{
                                                width: 10, height: 10, borderRadius: '50%',
                                                background: '#50fa7b', boxShadow: '0 0 8px rgba(80,250,123,0.4)'
                                            }} />
                                            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{s.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Uptime: {s.uptime}</span>
                                            <span style={{ fontSize: '0.8rem', color: '#50fa7b', fontWeight: 700 }}>{s.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ============ FEATURE REQUESTS ============ */}
                    {activeTab === 'features' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Header + Suggest button */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Feature Requests</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Suggest and upvote features to shape the roadmap.</p>
                                </div>
                                <button 
                                    onClick={() => setShowFeatureInput(!showFeatureInput)}
                                    style={{
                                        padding: '0.6rem 1.25rem', borderRadius: '12px',
                                        background: '#7c3aed', color: 'white', border: 'none',
                                        fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '6px'
                                    }}
                                >
                                    <Lightbulb size={16} /> Suggest Feature
                                </button>
                            </div>

                            {/* New Feature Input */}
                            <AnimatePresence>
                                {showFeatureInput && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{
                                            display: 'flex', gap: '0.75rem', padding: '1.25rem',
                                            borderRadius: '16px', background: 'var(--bg-card)',
                                            border: '1px solid rgba(124,58,237,0.2)'
                                        }}>
                                            <input
                                                value={newFeature}
                                                onChange={e => setNewFeature(e.target.value)}
                                                onKeyDown={e => e.key === 'Enter' && submitFeature()}
                                                placeholder="Describe your feature idea..."
                                                style={{
                                                    flex: 1, padding: '0.75rem 1rem', borderRadius: '12px',
                                                    background: 'var(--bg-primary)', border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none'
                                                }}
                                            />
                                            <button onClick={submitFeature} style={{
                                                padding: '0.75rem 1.5rem', borderRadius: '12px',
                                                background: '#7c3aed', color: 'white', border: 'none',
                                                fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: '6px'
                                            }}>
                                                <Send size={14} /> Submit
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Feature List */}
                            {features.sort((a, b) => b.votes - a.votes).map(f => (
                                <div key={f.id} style={{
                                    padding: '1.25rem 1.5rem', borderRadius: '16px',
                                    background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                                    display: 'flex', alignItems: 'center', gap: '1rem'
                                }}>
                                    {/* Upvote */}
                                    <button
                                        onClick={() => upvoteFeature(f.id)}
                                        style={{
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                                            padding: '0.5rem 0.75rem', borderRadius: '12px',
                                            background: votedIds.includes(f.id) ? 'rgba(124,58,237,0.15)' : 'var(--bg-primary)',
                                            border: votedIds.includes(f.id) ? '1px solid rgba(124,58,237,0.3)' : '1px solid var(--border-color)',
                                            color: votedIds.includes(f.id) ? '#a78bfa' : 'var(--text-secondary)',
                                            cursor: votedIds.includes(f.id) ? 'default' : 'pointer',
                                            minWidth: '50px', transition: 'all 0.2s'
                                        }}
                                    >
                                        <ThumbsUp size={16} />
                                        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{f.votes}</span>
                                    </button>

                                    {/* Content */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{f.title}</div>
                                    </div>

                                    {/* Status Badge */}
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700,
                                        textTransform: 'uppercase', letterSpacing: '0.05em',
                                        background: f.status === 'planned' ? 'rgba(124,58,237,0.12)' : f.status === 'under-review' ? 'rgba(255,184,108,0.12)' : 'rgba(80,250,123,0.12)',
                                        color: f.status === 'planned' ? '#a78bfa' : f.status === 'under-review' ? '#ffb86c' : '#50fa7b'
                                    }}>
                                        {f.status.replace('-', ' ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default HelpCenter;
