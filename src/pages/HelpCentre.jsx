import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HelpCircle, BookOpen, AlertTriangle, Mail, Activity, 
    Lightbulb, ChevronDown, ChevronUp, Upload, User, 
    ThumbsUp, X, CheckCircle
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

    // UI Data
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

    const handleFeatureSubmit = () => {
        if (!featureInput.trim()) return;
        setFeatures([{ id: Date.now(), text: featureInput, votes: 1 }, ...features]);
        setFeatureInput('');
    };

    const handleVote = (id) => {
        setFeatures(features.map(f => f.id === id ? { ...f, votes: f.votes + 1 } : f));
    };

    const handleBugSubmit = (e) => {
        e.preventDefault();
        setShowBugToast(true);
        setBugSubject('');
        setBugDesc('');
        setTimeout(() => setShowBugToast(false), 3000);
    };

    const handleContact = () => {
        window.location.href = `mailto:${selectedEmail}`;
    };

    return (
        <div style={{ padding: '2rem 2.5rem', maxWidth: 1200, margin: '0 auto', color: 'var(--text-primary)', display: 'flex', gap: '3rem' }}>
            
            {/* Left Navigation Panel */}
            <div style={{ width: '260px', flexShrink: 0 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    🆘 Help Centre
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '2.5rem' }}>
                    Find answers, guides, and support for your learning journey.
                </p>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {tabs.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    padding: '0.875rem 1.25rem', borderRadius: 12,
                                    background: isActive ? 'var(--bg-elevated)' : 'transparent',
                                    color: isActive ? 'white' : 'var(--text-secondary)',
                                    border: `1px solid ${isActive ? 'var(--border-hover)' : 'transparent'}`,
                                    fontSize: '0.9375rem', fontWeight: isActive ? 600 : 500,
                                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                                    boxShadow: isActive ? '0 4px 15px rgba(0,0,0,0.1)' : 'none'
                                }}
                            >
                                <tab.icon size={18} color={isActive ? "var(--accent-color)" : "currentColor"} />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >

                        {/* --- FAQ SECTION --- */}
                        {activeTab === 'faq' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {faqs.map((faq, i) => (
                                        <div key={i} style={{ 
                                            background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', 
                                            borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                                        }}>
                                            <button 
                                                onClick={() => setExpandedAccordion(expandedAccordion === i ? null : i)}
                                                style={{
                                                    width: '100%', padding: '1.25rem', background: 'none', border: 'none',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                    cursor: 'pointer', color: 'white', textAlign: 'left'
                                                }}
                                            >
                                                <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{faq.q}</span>
                                                {expandedAccordion === i ? <ChevronUp size={18} color="var(--text-tertiary)" /> : <ChevronDown size={18} color="var(--text-tertiary)" />}
                                            </button>
                                            <AnimatePresence>
                                                {expandedAccordion === i && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                        style={{ overflow: 'hidden' }}
                                                    >
                                                        <div style={{ padding: '0 1.25rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- GUIDES SECTION --- */}
                        {activeTab === 'guides' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Guides & Tutorials</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                                    {guides.map((guide, i) => (
                                        <div key={i} style={{
                                            background: 'var(--bg-elevated)', border: '1px solid var(--border-color)',
                                            borderRadius: 16, padding: '1.5rem', display: 'flex', flexDirection: 'column'
                                        }}>
                                            <div style={{ 
                                                width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.05)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' 
                                            }}>
                                                <BookOpen size={20} color="var(--accent-color)" />
                                            </div>
                                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{guide.title}</h3>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>{guide.desc}</p>
                                            <button 
                                                onClick={() => setSelectedGuide(guide)}
                                                className="btn btn-secondary" style={{ alignSelf: 'flex-start', fontSize: '0.8125rem', padding: '0.5rem 1rem' }}
                                            >
                                                Read More
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- REPORT A BUG SECTION --- */}
                        {activeTab === 'bug' && (
                            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Report a Bug</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>Experience an issue? Let us know so we can fix it.</p>
                                
                                <form onSubmit={handleBugSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Subject</label>
                                        <input 
                                            type="text" required value={bugSubject} onChange={e => setBugSubject(e.target.value)}
                                            style={{ width: '100%', padding: '0.875rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'white', outline: 'none' }} 
                                            placeholder="What went wrong?"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Description</label>
                                        <textarea 
                                            required value={bugDesc} onChange={e => setBugDesc(e.target.value)}
                                            style={{ width: '100%', padding: '0.875rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'white', minHeight: '120px', resize: 'vertical', outline: 'none' }} 
                                            placeholder="Steps to reproduce the bug..."
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Attach Screenshot (Optional)</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px dashed var(--border-hover)', borderRadius: 8, background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
                                            <Upload size={18} color="var(--text-tertiary)" />
                                            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Click to upload or drag and drop file</span>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: 'fit-content' }}>
                                        Submit Report
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* --- CONTACT SUPPORT SECTION --- */}
                        {activeTab === 'contact' && (
                            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    📩 Contact Support
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>Need human assistance? Reach out to our dedicated support team directly.</p>
                                
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>Select Support Channel</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {['bankadamanig@gmail.com', 'dhirajkadam964@gmail.com'].map((email, i) => (
                                            <label key={i} style={{ 
                                                display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', 
                                                background: selectedEmail === email ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.03)', 
                                                border: `1px solid ${selectedEmail === email ? 'var(--accent-color)' : 'var(--border-color)'}`, 
                                                borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s'
                                            }}>
                                                <input 
                                                    type="radio" name="supportEmail" value={email} 
                                                    checked={selectedEmail === email} onChange={() => setSelectedEmail(email)}
                                                    style={{ width: 16, height: 16, accentColor: 'var(--accent-color)' }}
                                                />
                                                <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{email}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={handleContact} className="btn btn-primary">
                                    Send Email
                                </button>

                                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                                    <em>Note: Live chat & community support coming soon.</em>
                                </div>
                            </div>
                        )}

                        {/* --- SYSTEM STATUS SECTION --- */}
                        {activeTab === 'status' && (
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>System Status</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>Real-time monitoring of all core learning services.</p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { name: "AI Engine", status: "Operational" },
                                        { name: "Code Engine", status: "Operational" },
                                        { name: "Interview Engine", status: "Operational" },
                                        { name: "Analytics Engine", status: "Operational" }
                                    ].map((service, i) => (
                                        <div key={i} style={{ 
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '1.25rem 1.5rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 12
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ position: 'relative', width: 10, height: 10 }}>
                                                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }} />
                                                    <div style={{ position: 'absolute', inset: 2, borderRadius: '50%', background: '#10b981' }} />
                                                </div>
                                                <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{service.name}</span>
                                            </div>
                                            <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#34d399', border: '1px solid rgba(52,211,153,0.2)', background: 'rgba(52,211,153,0.1)', padding: '4px 10px', borderRadius: 20 }}>
                                                {service.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- FEATURE REQUESTS SECTION --- */}
                        {activeTab === 'features' && (
                            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Feature Request Board</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>Help shape the future of Learning Catalyst. Suggest and vote on features.</p>

                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
                                    <input 
                                        type="text" value={featureInput} onChange={e => setFeatureInput(e.target.value)}
                                        placeholder="Suggest a feature..."
                                        style={{ flex: 1, padding: '0.875rem 1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'white', outline: 'none' }}
                                        onKeyDown={(e) => e.key === 'Enter' && handleFeatureSubmit()}
                                    />
                                    <button onClick={handleFeatureSubmit} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                                        Submit
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {features.sort((a,b) => b.votes - a.votes).map(feature => (
                                        <div key={feature.id} style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                                            padding: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: 12
                                        }}>
                                            <span style={{ fontSize: '0.9375rem', lineHeight: 1.5 }}>{feature.text}</span>
                                            <button 
                                                onClick={() => handleVote(feature.id)}
                                                style={{ 
                                                    display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px',
                                                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-hover)', borderRadius: 8,
                                                    color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.color = 'var(--accent-color)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                            >
                                                <ThumbsUp size={14} /> <span style={{ fontWeight: 600 }}>{feature.votes}</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* View Guide Modal */}
            <AnimatePresence>
                {selectedGuide && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedGuide(null)}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <motion.div 
                            initial={{ y: 20, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.95 }}
                            onClick={e => e.stopPropagation()}
                            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '2rem', width: '90%', maxWidth: '500px', position: 'relative' }}
                        >
                            <button onClick={() => setSelectedGuide(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
                                <X size={20} />
                            </button>
                            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                <BookOpen size={24} color="var(--accent-color)" />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{selectedGuide.title}</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                                This is a placeholder for the full guide content. The user will be able to read detailed step-by-step instructions for {selectedGuide.title.toLowerCase()} here in future updates. The primary description is: {selectedGuide.desc}
                            </p>
                            <button onClick={() => setSelectedGuide(null)} className="btn btn-primary" style={{ width: '100%' }}>Understood</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bug Toast Notification */}
            <AnimatePresence>
                {showBugToast && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 20, x: '-50%' }}
                        style={{ position: 'fixed', bottom: 40, left: '50%', background: '#10b981', color: 'white', padding: '12px 24px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 500, boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)', zIndex: 1000 }}
                    >
                        <CheckCircle size={18} /> Bug report submitted successfully.
                    </motion.div>
                )}
            </AnimatePresence>

            <style>
                {`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 0; }
                }
                `}
            </style>
        </div>
    );
};

export default HelpCentre;
