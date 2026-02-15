import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HelpCircle, ChevronDown, ChevronUp, BookOpen, Bug, Mail, 
    Activity, Lightbulb, ThumbsUp, Send, Image, MessageCircle, 
    CheckCircle, Clock, ArrowRight, ExternalLink, X, Bookmark, BookMarked
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
// GUIDES DATA — Full content
// ============================================
const guidesData = [
    { 
        title: 'Getting Started Guide', 
        desc: 'Learn how to set up your profile, choose your first roadmap, and make the most of your learning journey.', 
        icon: '🚀',
        readTime: '4 min read',
        content: [
            { heading: '🚀 Step 1: Complete Your Profile', body: [
                'Add your name and professional title',
                'Upload a profile image',
                'Select your primary domain (Frontend, AI, Backend, etc.)',
                'Define your learning goal (Job switch / Skill upgrade / Interview prep)',
            ], note: 'Your profile helps Catalyst personalize recommendations and track your growth.' },
            { heading: '🗺️ Step 2: Choose Your First Roadmap', body: [
                'Navigate to Roadmaps from the sidebar.',
                'Each roadmap includes:',
                '• Structured learning stages',
                '• Skill milestones',
                '• Progress tracking',
                '• XP rewards',
            ], note: 'Start with Beginner if unsure. You can switch anytime.' },
            { heading: '📊 Step 3: Track Your Progress', body: [
                'Your Dashboard shows:',
                '• Study time',
                '• Courses completed',
                '• Skill intelligence level',
                '• Performance trends',
            ], note: 'Stay consistent to build streaks and earn badges.' },
            { heading: '🎯 Pro Tip', body: [
                'Use Focus Mode daily for structured deep work sessions. Consistency is the #1 predictor of learning success on Catalyst.'
            ] },
        ]
    },
    { 
        title: 'How to use Code Engine', 
        desc: 'Paste or write code, get AI-powered analysis with logic explanations and simulated output across multiple languages.', 
        icon: '⚙️',
        readTime: '3 min read',
        content: [
            { heading: '💻 Writing Code', body: [
                'Choose a language (JavaScript, Python, C, C++, HTML/CSS)',
                'Paste or write your code in the editor',
                'Click Run to execute',
            ] },
            { heading: '🧠 AI Explanation Panel', body: [
                'After execution, you get:',
                '• What the code does — high-level summary',
                '• Key concepts explained — language features used',
                '• Logic breakdown — step-by-step flow',
                '• Suggestions for improvement — best practices',
            ] },
            { heading: '🧪 Simulated Output', body: [
                'The engine shows:',
                '• Console output — stdout simulation',
                '• Error analysis — type, line, reason',
                '• Debug suggestions — how to fix issues',
            ] },
            { heading: '🎯 Best Practices', body: [
                'Test small code blocks first',
                'Review AI explanations carefully',
                'Try modifying inputs to understand behavior',
                'Use the engine to learn new languages by example',
            ] },
        ]
    },
    { 
        title: 'How Roadmaps work', 
        desc: 'Understand roadmap steps, progress tracking, domain skills, and how completing roadmaps earns you badges.', 
        icon: '🗺️',
        readTime: '3 min read',
        content: [
            { heading: '📌 What is a Roadmap?', body: [
                'A roadmap is a curated path designed to take you from Beginner → Advanced in a domain.',
                'Each roadmap contains:',
                '• Stages — ordered learning phases',
                '• Modules — topic-specific lessons',
                '• Challenges — hands-on coding tasks',
                '• Mock interview checkpoints — practice sessions',
            ] },
            { heading: '📊 Progress Tracking', body: [
                'Each completed stage updates your skill graph',
                'Progress is visible in your Dashboard',
                'Completion earns XP & contributes to badges',
            ] },
            { heading: '🏆 Badges & XP', body: [
                'You earn:',
                '• Domain badges — mastery in specific tech areas',
                '• Streak badges — consistency rewards',
                '• Mastery levels — Beginner → Intermediate → Advanced',
            ], note: 'Badges reflect real progress — no resets.' },
            { heading: '🔔 Notifications', body: [
                'You receive notifications when:',
                '• A stage is completed',
                '• A new AI challenge unlocks',
                '• You are close to mastery level',
            ] },
        ]
    },
    { 
        title: 'How to improve interview score', 
        desc: 'Tips on eye contact, speech pace, STAR method answers, and using the AI feedback to level up your interview skills.', 
        icon: '🎤',
        readTime: '5 min read',
        content: [
            { heading: '👁️ Eye Contact', body: [
                'Maintain steady eye contact with camera',
                'Avoid looking down frequently',
                'Position camera at eye level for natural gaze',
                'Practice looking at the lens, not the screen',
            ] },
            { heading: '🗣️ Speech Pace', body: [
                'Avoid speaking too fast — target 130–150 wpm',
                'Use short, clear sentences',
                'Pause naturally between points for emphasis',
                'Take a breath before answering complex questions',
            ] },
            { heading: '⭐ Use STAR Method', body: [
                'Structure behavioral answers as:',
                'S — Situation: Set the context',
                'T — Task: Describe your responsibility',
                'A — Action: Explain what you did',
                'R — Result: Share the outcome with metrics',
            ], note: 'This increases clarity and confidence. Interviewers love structured answers.' },
            { heading: '📈 Use AI Feedback', body: [
                'After every session, review:',
                '• Body language rating',
                '• Speech clarity score',
                '• Confidence level',
                '• Recommended improvements',
            ] },
            { heading: '🎯 Improve Weekly', body: [
                'Consistent practice raises:',
                '• Confidence score — builds over sessions',
                '• Cognitive performance — better recall under pressure',
                '• Interview readiness level — tracked on Dashboard',
            ] },
        ]
    },
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
    
    // Guide panel state
    const [openGuide, setOpenGuide] = useState(null); // index or null
    const [bookmarkedGuides, setBookmarkedGuides] = useState(() => {
        const saved = localStorage.getItem('lc_bookmarked_guides');
        return saved ? JSON.parse(saved) : [];
    });
    const [completedGuides, setCompletedGuides] = useState(() => {
        const saved = localStorage.getItem('lc_completed_guides');
        return saved ? JSON.parse(saved) : [];
    });
    
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

    const toggleBookmark = (idx) => {
        const updated = bookmarkedGuides.includes(idx) 
            ? bookmarkedGuides.filter(i => i !== idx)
            : [...bookmarkedGuides, idx];
        setBookmarkedGuides(updated);
        localStorage.setItem('lc_bookmarked_guides', JSON.stringify(updated));
    };

    const toggleComplete = (idx) => {
        const updated = completedGuides.includes(idx)
            ? completedGuides.filter(i => i !== idx)
            : [...completedGuides, idx];
        setCompletedGuides(updated);
        localStorage.setItem('lc_completed_guides', JSON.stringify(updated));
    };

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
                                    onClick={() => setOpenGuide(i)}
                                    style={{
                                        padding: '1.5rem', borderRadius: '18px',
                                        background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                                        cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Completed badge */}
                                    {completedGuides.includes(i) && (
                                        <div style={{
                                            position: 'absolute', top: 12, right: 12,
                                            padding: '3px 10px', borderRadius: '20px',
                                            background: 'rgba(80,250,123,0.12)', color: '#50fa7b',
                                            fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px'
                                        }}>
                                            <CheckCircle size={10} /> Done
                                        </div>
                                    )}
                                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{g.icon}</div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{g.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0, marginBottom: '0.75rem' }}>{g.desc}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            Read Guide <ArrowRight size={14} />
                                        </span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={12} /> {g.readTime}
                                        </span>
                                    </div>
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
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                            {/* Email Support */}
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
                                <a href="mailto:bankadamanig@gmail.com" style={{
                                    fontSize: '0.9rem', color: '#a78bfa', fontWeight: 700,
                                    display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none',
                                    padding: '0.6rem 1rem', borderRadius: '10px',
                                    background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)',
                                    transition: 'all 0.2s', width: 'fit-content'
                                }}>
                                    <Mail size={14} /> bankadamanig@gmail.com <ExternalLink size={12} />
                                </a>
                            </div>

                            {/* Live Chat */}
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
                                    Real-time chat support for urgent issues. Our team is working on bringing this feature to you.
                                </p>
                                <span style={{ 
                                    fontSize: '0.8rem', color: '#ffb86c', fontWeight: 700, 
                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                    padding: '0.4rem 0.85rem', borderRadius: '20px',
                                    background: 'rgba(255,184,108,0.08)', border: '1px solid rgba(255,184,108,0.15)'
                                }}>
                                    <Clock size={14} /> Coming Soon
                                </span>
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

                            {features.sort((a, b) => b.votes - a.votes).map(f => (
                                <div key={f.id} style={{
                                    padding: '1.25rem 1.5rem', borderRadius: '16px',
                                    background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                                    display: 'flex', alignItems: 'center', gap: '1rem'
                                }}>
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
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{f.title}</div>
                                    </div>
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

            {/* ============ GUIDE SLIDE-OVER PANEL ============ */}
            <AnimatePresence>
                {openGuide !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpenGuide(null)}
                        style={{
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
                            zIndex: 9999, display: 'flex', justifyContent: 'flex-end',
                            backdropFilter: 'blur(4px)'
                        }}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            onClick={e => e.stopPropagation()}
                            style={{
                                width: '100%', maxWidth: '560px', height: '100vh',
                                background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)',
                                overflowY: 'auto', display: 'flex', flexDirection: 'column'
                            }}
                        >
                            {/* Panel Header */}
                            <div style={{
                                padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', 
                                justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)',
                                position: 'sticky', top: 0, background: 'var(--bg-secondary)', zIndex: 1
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '1.75rem' }}>{guidesData[openGuide].icon}</span>
                                    <div>
                                        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                                            {guidesData[openGuide].title}
                                        </h2>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                            <Clock size={11} /> {guidesData[openGuide].readTime}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {/* Bookmark */}
                                    <button 
                                        onClick={() => toggleBookmark(openGuide)}
                                        style={{
                                            padding: '8px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                                            background: bookmarkedGuides.includes(openGuide) ? 'rgba(255,184,108,0.15)' : 'var(--bg-card)',
                                            color: bookmarkedGuides.includes(openGuide) ? '#ffb86c' : 'var(--text-tertiary)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}
                                        title={bookmarkedGuides.includes(openGuide) ? 'Remove bookmark' : 'Bookmark this guide'}
                                    >
                                        {bookmarkedGuides.includes(openGuide) ? <BookMarked size={18} /> : <Bookmark size={18} />}
                                    </button>
                                    {/* Close */}
                                    <button 
                                        onClick={() => setOpenGuide(null)}
                                        style={{
                                            padding: '8px', borderRadius: '10px', border: 'none',
                                            background: 'var(--bg-card)', color: 'var(--text-tertiary)',
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Panel Content */}
                            <div style={{ padding: '2rem', flex: 1 }}>
                                {guidesData[openGuide].content.map((section, si) => (
                                    <div key={si} style={{ marginBottom: '2rem' }}>
                                        <h3 style={{ 
                                            fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', 
                                            marginBottom: '1rem', paddingBottom: '0.5rem',
                                            borderBottom: '1px solid var(--border-color)'
                                        }}>
                                            {section.heading}
                                        </h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {section.body.map((line, li) => (
                                                <p key={li} style={{
                                                    fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0,
                                                    paddingLeft: line.startsWith('•') || line.startsWith('S —') || line.startsWith('T —') || line.startsWith('A —') || line.startsWith('R —') ? '0.75rem' : 0,
                                                    borderLeft: line.startsWith('•') ? '2px solid rgba(124,58,237,0.3)' : 'none',
                                                    paddingTop: line.startsWith('•') ? '0.15rem' : 0,
                                                    paddingBottom: line.startsWith('•') ? '0.15rem' : 0,
                                                }}>
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                        {section.note && (
                                            <div style={{
                                                marginTop: '0.75rem', padding: '0.75rem 1rem', borderRadius: '12px',
                                                background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.12)',
                                                fontSize: '0.85rem', color: '#a78bfa', lineHeight: 1.5,
                                                display: 'flex', alignItems: 'flex-start', gap: '8px'
                                            }}>
                                                <Lightbulb size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                                                {section.note}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Panel Footer */}
                            <div style={{
                                padding: '1.5rem 2rem', borderTop: '1px solid var(--border-color)',
                                position: 'sticky', bottom: 0, background: 'var(--bg-secondary)'
                            }}>
                                <button
                                    onClick={() => toggleComplete(openGuide)}
                                    style={{
                                        width: '100%', padding: '0.875rem', borderRadius: '14px',
                                        background: completedGuides.includes(openGuide) ? 'rgba(80,250,123,0.12)' : '#7c3aed',
                                        color: completedGuides.includes(openGuide) ? '#50fa7b' : 'white',
                                        border: completedGuides.includes(openGuide) ? '1px solid rgba(80,250,123,0.2)' : 'none',
                                        fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <CheckCircle size={18} />
                                    {completedGuides.includes(openGuide) ? 'Completed ✓' : 'Mark as Completed'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default HelpCenter;
