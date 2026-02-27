import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HelpCircle, BookOpen, AlertTriangle, Mail, Activity, 
    Lightbulb, ChevronDown, ChevronUp, Upload, User, 
    ThumbsUp, X, CheckCircle, Search, ArrowRight,
    MessageSquare, ShieldCheck, Gauge
} from 'lucide-react';
import { useTranslation } from '../utils/i18n';

const HelpCentre = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('faq');
    const [expandedAccordion, setExpandedAccordion] = useState(null);
    const [bugSubject, setBugSubject] = useState('');
    const [bugDesc, setBugDesc] = useState('');
    const [showBugToast, setShowBugToast] = useState(false);
    
    // Contact state
    const [selectedEmail, setSelectedEmail] = useState('bankadamanig@gmail.com');

    // Feature request state
    const [featureInput, setFeatureInput] = useState('');
    const [features, setFeatures] = useState([
        { id: 1, text: "Dark mode integration for PDF Viewer", votes: 42 },
        { id: 2, text: "More sample projects in Learning Hub", votes: 28 },
        { id: 3, text: "Export mock interview feedback to PDF", votes: 15 }
    ]);

    const tabs = [
        { id: 'faq', label: 'FAQ', icon: HelpCircle },
        { id: 'guides', label: 'Guides', icon: BookOpen },
        { id: 'bug', label: 'Report a Bug', icon: AlertTriangle },
        { id: 'contact', label: 'Contact Support', icon: Mail },
        { id: 'status', label: 'System Status', icon: Activity },
        { id: 'features', label: 'Feature Requests', icon: Lightbulb }
    ];

    const faqs = [
        { q: "How does Skill Intelligence work?", a: "Skill Intelligence analyzes your learning modules, code submissions, and mock interview performance, combining them to provide a comprehensive, real-time assessment of your overall skill level." },
        { q: "How is Cognitive Score calculated?", a: "Cognitive Score is calculated using a proprietary algorithm that weights your consistency, active focus time, and difficulty of tasks completed over a 7-day rolling window." },
        { q: "How does AI Mock Interview analyze performance?", a: "The AI evaluates your verbal clarity, usage of key domain terminology, answer structure (like the STAR method), and overall confidence based on speech patterns." },
        { q: "Why do I need to enable camera?", a: "The camera is used purely in the browser to analyze body language and eye contact during mock interviews. We do not store or transmit video data to any external servers." },
        { q: "How does Code Engine generate explanations?", a: "The Code Engine parses your submitted code through an abstract syntax tree and uses contextual rules to break down the logic, step-by-step, helping you understand complex blocks." },
        { q: "How is Weekly Report generated?", a: "The Weekly Report aggregates your focus hours, acquired skills, and roadmap progress, then identifies your strongest growth areas and suggests targeted next steps." }
    ];

    const guides = [
        { title: "Getting Started Guide", desc: "Learn how to set up your profile, choose a roadmap, and track progress.", action: "Start Learning" },
        { title: "How to use Code Engine", desc: "Paste/write code → Get explanation → Simulated output. A complete walkthrough.", action: "View Guide" },
        { title: "How Roadmaps Work", desc: "Stage completion → Skill growth → Badge unlock. Understanding your path.", action: "Explore Paths" },
        { title: "Improve Interview Score", desc: "Eye contact, STAR method, speaking clarity, and AI feedback strategies.", action: "Read Tips" }
    ];

    const [selectedGuide, setSelectedGuide] = useState(null);

    const handleVote = (id) => {
        setFeatures(features.map(f => f.id === id ? { ...f, votes: f.votes + 1 } : f));
    };

    const [bugSending, setBugSending] = useState(false);

    const handleBugSubmit = async (e) => {
        e.preventDefault();
        setBugSending(true);
        setTimeout(() => {
            setShowBugToast(true);
            setBugSubject('');
            setBugDesc('');
            setBugSending(false);
            setTimeout(() => setShowBugToast(false), 4000);
        }, 1500);
    };

    return (
        <div style={{ padding: '2rem 2.5rem', maxWidth: 1300, margin: '0 auto' }}>
            {/* Header */}
            <header style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em', marginBottom: '1rem' }}>
                    How can we help?
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
                    Find answers, explore deep-dive guides, or reach out to our team for personalized support.
                </p>
                <div style={{
                    maxWidth: 600, margin: '2.5rem auto 0', position: 'relative'
                }}>
                    <Search style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} size={20} />
                    <input 
                        type="text"
                        placeholder="Search for articles, guides, or keywords..."
                        style={{
                            width: '100%', padding: '1.25rem 1.25rem 1.25rem 3.5rem',
                            borderRadius: '20px', border: '1px solid var(--border-color)',
                            background: '#FFFFFF', fontSize: '1.0625rem', outline: 'none',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'all 0.2s'
                        }}
                    />
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '4rem' }}>
                {/* Sidebar */}
                <aside>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'sticky', top: '2rem' }}>
                        {tabs.map(tab => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '14px',
                                        padding: '1rem 1.5rem', borderRadius: 16,
                                        background: isActive ? 'var(--bg-primary)' : 'transparent',
                                        color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
                                        border: 'none',
                                        fontSize: '0.95rem', fontWeight: isActive ? 700 : 500,
                                        cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s'
                                    }}
                                >
                                    <tab.icon size={20} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Content */}
                <main>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'faq' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
                                    {faqs.map((faq, i) => (
                                        <div key={i} style={{ 
                                            background: '#FFFFFF', border: '1px solid var(--border-color)', 
                                            borderRadius: 24, overflow: 'hidden'
                                        }}>
                                            <button 
                                                onClick={() => setExpandedAccordion(expandedAccordion === i ? null : i)}
                                                style={{
                                                    width: '100%', padding: '1.5rem 2rem', background: 'none', border: 'none',
                                                    display: 'flex', alignItems: 'center', gap: 16,
                                                    cursor: 'pointer', color: 'var(--text-primary)', textAlign: 'left'
                                                }}
                                            >
                                                <div style={{
                                                    width: 32, height: 32, borderRadius: 10, background: 'var(--bg-primary)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                                }}>
                                                    <MessageSquare size={16} color="var(--accent-color)" />
                                                </div>
                                                <span style={{ fontSize: '1.0625rem', fontWeight: 700, flex: 1 }}>{faq.q}</span>
                                                {expandedAccordion === i ? <ChevronUp size={20} color="var(--text-tertiary)" /> : <ChevronDown size={20} color="var(--text-tertiary)" />}
                                            </button>
                                            <AnimatePresence>
                                                {expandedAccordion === i && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                        style={{ overflow: 'hidden' }}
                                                    >
                                                        <div style={{ padding: '0 2rem 2rem 5rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'guides' && (
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-primary)' }}>Guides & Tutorials</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                        {guides.map((guide, i) => (
                                            <div key={i} style={{
                                                background: '#FFFFFF', border: '1px solid var(--border-color)',
                                                borderRadius: 24, padding: '2rem', display: 'flex', flexDirection: 'column'
                                            }}>
                                                <div style={{ 
                                                    width: 48, height: 48, borderRadius: 16, background: 'rgba(99,102,241,0.08)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' 
                                                }}>
                                                    <BookOpen size={24} color="var(--accent-color)" />
                                                </div>
                                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{guide.title}</h3>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>{guide.desc}</p>
                                                <button 
                                                    onClick={() => setSelectedGuide(guide)}
                                                    style={{
                                                        padding: '10px 20px', borderRadius: 12, border: '1px solid var(--border-color)',
                                                        background: '#FFFFFF', color: 'var(--text-primary)', fontSize: '0.9rem',
                                                        fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start',
                                                        display: 'flex', alignItems: 'center', gap: 8
                                                    }}
                                                >
                                                    View Guide <ArrowRight size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'bug' && (
                                <div style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 32, padding: '3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                                        <AlertTriangle size={24} color="#f59e0b" />
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Report a Bug</h2>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2.5rem' }}>Experiencing technical friction? Let our engineers know.</p>
                                    
                                    <form onSubmit={handleBugSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Issue Subject</label>
                                                <input 
                                                    type="text" required value={bugSubject} onChange={e => setBugSubject(e.target.value)}
                                                    style={{ width: '100%', padding: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 12, color: 'var(--text-primary)', outline: 'none', fontSize: '1rem' }} 
                                                    placeholder="e.g., Code Engine freezing on long files"
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Detailed Description</label>
                                                <textarea 
                                                    required value={bugDesc} onChange={e => setBugDesc(e.target.value)}
                                                    style={{ width: '100%', padding: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 12, color: 'var(--text-primary)', minHeight: '150px', resize: 'vertical', outline: 'none', fontSize: '1rem', lineHeight: 1.6 }} 
                                                    placeholder="Steps to reproduce..."
                                                />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <button 
                                                type="submit" 
                                                disabled={bugSending} 
                                                style={{ 
                                                    padding: '1rem 2.5rem', borderRadius: 16, border: 'none',
                                                    background: 'var(--text-primary)', color: '#FFFFFF', fontWeight: 800,
                                                    fontSize: '1rem', cursor: bugSending ? 'not-allowed' : 'pointer',
                                                    opacity: bugSending ? 0.7 : 1, transition: 'all 0.2s', boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                                }}
                                            >
                                                {bugSending ? 'Processing...' : 'Submit Bug Report'}
                                            </button>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-tertiary)', fontSize: '0.9rem', fontWeight: 500 }}>
                                                <ShieldCheck size={16} /> Privacy Guard Active
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'contact' && (
                                <div style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 32, padding: '3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}>
                                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Mail size={28} color="var(--accent-color)" /> Human Support
                                    </h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>Need human assistance? Our engineering support team is available <strong style={{ color: 'var(--text-primary)' }}>24/7</strong> for critical issues.</p>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                                        {['bankadamanig@gmail.com', 'dhirajkadam964@gmail.com'].map((email, i) => (
                                            <label key={i} style={{ 
                                                display: 'flex', alignItems: 'center', gap: '16px', padding: '1.5rem', 
                                                background: selectedEmail === email ? 'rgba(99, 102, 241, 0.05)' : '#FFFFFF', 
                                                border: `1px solid ${selectedEmail === email ? 'var(--accent-color)' : 'var(--border-color)'}`, 
                                                borderRadius: 20, cursor: 'pointer', transition: 'all 0.2s'
                                            }}>
                                                <input 
                                                    type="radio" name="supportEmail" value={email} 
                                                    checked={selectedEmail === email} onChange={() => setSelectedEmail(email)}
                                                    style={{ width: 22, height: 22, accentColor: 'var(--accent-color)' }}
                                                />
                                                <div>
                                                    <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>{email}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>Primary Support Channel</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>

                                    <button 
                                        onClick={() => window.location.href = `mailto:${selectedEmail}`}
                                        style={{ 
                                            width: '100%', padding: '1.25rem', borderRadius: 20, border: 'none',
                                            background: 'var(--text-primary)', color: '#FFFFFF', fontWeight: 800,
                                            fontSize: '1.125rem', cursor: 'pointer', transition: 'all 0.2s',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        Start Email Conversation <ArrowRight size={22} />
                                    </button>
                                </div>
                            )}

                            {activeTab === 'status' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                    <div>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Global Service Matrix</h2>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>Real-time telemetry from all core learning sub-systems.</p>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                                            {[
                                                { name: "Context Engine", status: "Operational", uptime: "99.98%" },
                                                { name: "Logic Parser", status: "Operational", uptime: "99.95%" },
                                                { name: "Speech Analysis", status: "Operational", uptime: "100%" },
                                                { name: "Data Persistence", status: "Operational", uptime: "99.99%" }
                                            ].map((service, i) => (
                                                <div key={i} style={{ 
                                                    padding: '2rem', background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 24,
                                                    display: 'flex', flexDirection: 'column', gap: '1rem'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{service.name}</span>
                                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px rgba(16,185,129,0.5)' }} />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Uptime</div>
                                                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{service.uptime}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div style={{ padding: '2rem', background: 'rgba(52,211,153,0.05)', borderRadius: 24, border: '1px solid rgba(52,211,153,0.1)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <Gauge size={32} color="#10b981" />
                                        <div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065f46' }}>All Systems Nominal</div>
                                            <div style={{ fontSize: '0.9rem', color: '#059669', marginTop: 4 }}>Last checked: Just now • Global latency: 34ms</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'features' && (
                                <div style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 32, padding: '3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}>
                                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Feature Roadmap</h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2.5rem' }}>Vote on existing proposals or suggest your own architectural improvements.</p>

                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                                        <input 
                                            type="text" value={featureInput} onChange={e => setFeatureInput(e.target.value)}
                                            placeholder="What feature would you like to see next?"
                                            style={{ flex: 1, padding: '1.125rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 16, color: 'var(--text-primary)', outline: 'none', fontSize: '1rem' }}
                                        />
                                        <button 
                                            style={{ padding: '0 2rem', borderRadius: 16, border: 'none', background: 'var(--text-primary)', color: '#FFFFFF', fontWeight: 800, cursor: 'pointer' }}
                                        >
                                            Submit
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                        {features.sort((a,b) => b.votes - a.votes).map(feature => (
                                            <div key={feature.id} style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem',
                                                padding: '1.5rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 20
                                            }}>
                                                <span style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)' }}>{feature.text}</span>
                                                <button 
                                                    onClick={() => handleVote(feature.id)}
                                                    style={{ 
                                                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px',
                                                        background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 12,
                                                        color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
                                                        fontWeight: 800
                                                    }}
                                                >
                                                    <ThumbsUp size={16} /> {feature.votes}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Guide Modal */}
            <AnimatePresence>
                {selectedGuide && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedGuide(null)}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
                    >
                        <motion.div 
                            initial={{ y: 40, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0, scale: 0.95 }}
                            onClick={e => e.stopPropagation()}
                            style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 32, padding: '3.5rem', width: '100%', maxWidth: '600px', position: 'relative', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}
                        >
                            <button onClick={() => setSelectedGuide(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'var(--bg-primary)', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <X size={20} />
                            </button>
                            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                                <BookOpen size={32} color="var(--accent-color)" />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>{selectedGuide.title}</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                                {selectedGuide.desc}. This comprehensive guide covers all tactical steps required for mastery within the Learning Catalyst ecosystem.
                            </p>
                            <button 
                                onClick={() => setSelectedGuide(null)} 
                                style={{ width: '100%', padding: '1.25rem', borderRadius: 20, border: 'none', background: 'var(--text-primary)', color: '#FFFFFF', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer' }}
                            >
                                Got it
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bug Toast */}
            <AnimatePresence>
                {showBugToast && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 20, x: '-50%' }}
                        style={{ position: 'fixed', bottom: 40, left: '50%', background: 'var(--text-primary)', color: 'white', padding: '16px 32px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 700, boxShadow: '0 12px 32px rgba(0,0,0,0.2)', zIndex: 1000 }}
                    >
                        <CheckCircle size={20} color="#10b981" /> Report Successfully Transmitted
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default HelpCentre;
