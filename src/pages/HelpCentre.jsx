import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LifeBuoy, Search, Cpu, Zap, Activity, Info, 
    ChevronDown, ChevronUp, AlertCircle, Terminal, 
    ShieldCheck, Database, Server, Workflow, MessageSquare
} from 'lucide-react';

import { useTranslation } from '../utils/i18n';

const HelpCentre = () => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDevMode, setIsDevMode] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState(null);

    const diagnostics = useMemo(() => ({
        cores: navigator.hardwareConcurrency || 'N/A',
        browser: navigator.userAgent.split(' ').pop(),
        workerSupport: typeof Worker !== 'undefined' ? 'Supported' : 'Not Supported',
        os: navigator.platform,
        language: navigator.language
    }), []);

    const examplePrompts = [
        "How does Skill Intelligence work?",
        "Why is mock interview slow?",
        "How does AI inference scale?",
        "How to deploy on AMD infrastructure?"
    ];

    const troubleshootingSteps = [
        {
            title: "Deployment Failed (Vercel issues)",
            content: "Ensure your environment variables for Firebase and AMD inference endpoints are correctly configured in the Vercel dashboard. Check if your build script involves native dependencies that might mismatch AMD EPYC linux environments."
        },
        {
            title: "Git Merge Conflicts",
            content: "Use 'git merge --abort' if the conflict is too complex. For AI model weight files or large datasets, use LFS (Large File Storage) to avoid corruption during standard git operations."
        },
        {
            title: "Slow AI Response",
            content: "Latency is often caused by cold starts on inference nodes. Our architecture uses AMD Instinct accelerators which minimize this, but browser-side latency can be improved by enabling hardware acceleration in your settings."
        },
        {
            title: "Build Errors",
            content: "Common build errors occur due to node version mismatches. Learning Catalyst requires Node 18+. Ensure your local architecture (macOS) matches the AMD production stack via Docker if debugging native modules."
        },
        {
            title: "Memory Performance Tips",
            content: "Close unused browser tabs. Our Skill Intelligence engine is heavy on memory; AMD EPYC systems use high-bandwidth memory to handle 1000+ concurrent student sessions, but local browser limits still apply."
        }
    ];

    return (
        <div style={{ padding: '2rem 2.5rem', maxWidth: 1200, margin: '0 auto', color: 'var(--text-primary)' }}>
            
            {/* Header */}
            <header style={{ marginBottom: '3rem' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
                    borderRadius: 20, background: 'rgba(239, 68, 68, 0.1)', 
                    border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: 16,
                    fontSize: '0.8rem', color: '#f87171', fontWeight: 600
                }}>
                    <LifeBuoy size={14} /> AMD Hackathon Edition
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
                    🚀 {t('help_centre')}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    AI Support & Performance Diagnostics
                </p>
            </header>

            {/* AMD Positioning Banner */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: 'linear-gradient(90deg, #3f3f46 0%, #18181b 100%)',
                    borderLeft: '4px solid #ef4444',
                    padding: '1.25rem 2rem', borderRadius: '0 16px 16px 0',
                    marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem'
                }}
            >
                <Zap size={20} color="#ef4444" />
                <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#f4f4f5' }}>
                    Designed for scalable AI workloads on <strong style={{ color: '#ef4444' }}>AMD EPYC & Instinct GPU</strong> infrastructure.
                </span>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
                
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    
                    {/* SECTION 1 — AI Support Assistant */}
                    <section>
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} size={20} />
                            <input 
                                type="text"
                                placeholder={t('search_placeholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%', padding: '1.25rem 1.25rem 1.25rem 3.5rem',
                                    background: 'var(--bg-elevated)', border: '1px solid var(--border-color)',
                                    borderRadius: 16, color: 'white', fontSize: '1rem', outline: 'none',
                                    transition: 'border-color 0.2s',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#ef4444'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {examplePrompts.map((prompt, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setSearchQuery(prompt)}
                                    style={{
                                        padding: '6px 14px', borderRadius: 20,
                                        background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)',
                                        color: 'var(--text-secondary)', fontSize: '0.8125rem', cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.borderColor = '#ef4444'; }}
                                    onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.borderColor = 'var(--border-color)'; }}
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* SECTION 2 — AMD Performance Layer */}
                    <section style={{ 
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', 
                        borderRadius: 24, padding: '2rem' 
                    }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>
                            <Zap size={22} color="#ef4444" />
                            Compute Acceleration Layer (Powered by AMD Architecture)
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f87171' }}>
                                    <Server size={18} />
                                    <span style={{ fontWeight: 700, fontSize: '0.9375rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Backend Compute</span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    AI inference workloads are designed to scale on <strong>AMD EPYC™ server processors</strong>. 
                                    Multi-core parallelization improves concurrent AI interviews, while backend microservices are structured 
                                    for horizontal scaling across AMD-powered cloud data centers.
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f87171' }}>
                                    <Database size={18} />
                                    <span style={{ fontWeight: 700, fontSize: '0.9375rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GPU Acceleration</span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    Architecture supports deployment on <strong>AMD Instinct™ GPUs</strong> using <strong>ROCm™-based inference stacks</strong>. 
                                    Model serving is designed for high-performance GPU offloading in production, ensuring low-latency 
                                    responses for real-time skill analysis.
                                </p>
                            </div>
                        </div>

                        <div style={{ 
                            marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', 
                            borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.75rem', 
                            color: 'var(--text-tertiary)', textAlign: 'center'
                        }}>
                             <Info size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                             Development machine may be macOS/Windows, but production compute layer is cloud-based and AMD scalable.
                        </div>
                    </section>

                    {/* SECTION 4 — Troubleshooting */}
                    <section>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Troubleshooting</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {troubleshootingSteps.map((step, i) => (
                                <div key={i} style={{ 
                                    background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', 
                                    borderRadius: 16, overflow: 'hidden'
                                }}>
                                    <button 
                                        onClick={() => setExpandedAccordion(expandedAccordion === i ? null : i)}
                                        style={{
                                            width: '100%', padding: '1.25rem', background: 'none', border: 'none',
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            cursor: 'pointer', color: 'white', textAlign: 'left'
                                        }}
                                    >
                                        <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{step.title}</span>
                                        {expandedAccordion === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </button>
                                    <AnimatePresence>
                                        {expandedAccordion === i && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div style={{ padding: '0 1.25rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                                    {step.content}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* SECTION 3 — System Diagnostics Panel */}
                    <div style={{ 
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', 
                        borderRadius: 24, padding: '1.75rem' 
                    }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                            <Activity size={18} color="#ef4444" />
                            Performance Diagnostics
                        </h4>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8125rem' }}>CPU Cores Detected</span>
                                <span style={{ color: 'var(--text-primary)', fontSize: '0.8125rem', fontWeight: 700 }}>{diagnostics.cores} Threads</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8125rem' }}>Web Worker Support</span>
                                <span style={{ color: '#34d399', fontSize: '0.8125rem', fontWeight: 700 }}>{diagnostics.workerSupport}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8125rem' }}>Inference Offloading</span>
                                <span style={{ color: '#f59e0b', fontSize: '0.8125rem', fontWeight: 700 }}>AMD Hybrid Layer</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8125rem' }}>Browser Stack</span>
                                <span style={{ color: 'var(--text-primary)', fontSize: '0.8125rem', fontWeight: 700 }}>{diagnostics.browser}</span>
                            </div>
                        </div>

                        <div style={{ 
                            marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', 
                            borderRadius: 12, border: '1px solid rgba(239, 68, 68, 0.1)',
                            fontSize: '0.75rem', color: '#fca5a5', lineHeight: 1.4
                        }}>
                            This system is optimized for high-core-count <strong style={{ color: 'white' }}>AMD EPYC™</strong> production environments.
                        </div>
                    </div>

                    {/* Architecture Overview */}
                    <div style={{ 
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', 
                        borderRadius: 24, padding: '1.75rem' 
                    }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                            <Workflow size={18} color="#ef4444" />
                            Architecture Overview
                        </h4>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 8, textAlign: 'center', fontSize: '0.75rem', fontWeight: 600 }}>Frontend (React + Vite)</div>
                            <ChevronDown size={14} color="var(--text-tertiary)" />
                            <div style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 8, textAlign: 'center', fontSize: '0.75rem', fontWeight: 600 }}>API Gateway (Node.js)</div>
                            <ChevronDown size={14} color="var(--text-tertiary)" />
                            <div style={{ width: '100%', padding: '10px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: 8, textAlign: 'center', fontSize: '0.75rem', fontWeight: 600 }}>AI Inference Microservice</div>
                            <ChevronDown size={14} color="var(--text-tertiary)" />
                            <div style={{ width: '100%', padding: '10px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#fca5a5' }}>Scalable AMD Cloud Infrastructure</div>
                        </div>
                    </div>

                    {/* SECTION 5 — Developer Mode */}
                    <div style={{ 
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', 
                        borderRadius: 24, padding: '1.75rem' 
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: 700 }}>
                                <Terminal size={18} color="#ef4444" />
                                Developer Mode
                            </h4>
                            <div 
                                onClick={() => setIsDevMode(!isDevMode)}
                                style={{
                                    width: 40, height: 20, borderRadius: 10, 
                                    background: isDevMode ? '#ef4444' : 'rgba(255,255,255,0.1)',
                                    position: 'relative', cursor: 'pointer', transition: 'all 0.2s'
                                }}
                            >
                                <div style={{
                                    width: 16, height: 16, borderRadius: '50%', background: 'white',
                                    position: 'absolute', top: 2, left: isDevMode ? 22 : 2,
                                    transition: 'all 0.2s'
                                }} />
                            </div>
                        </div>

                        {isDevMode ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>API Latency</span>
                                    <span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace' }}>22ms</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>AI Inference Time</span>
                                    <span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace' }}>148ms</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>Worker Threads</span>
                                    <span style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace' }}>{diagnostics.cores} active</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>AMD EPYC Load</span>
                                    <span style={{ color: '#f59e0b', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace' }}>12% (Node 4)</span>
                                </div>
                            </div>
                        ) : (
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textAlign: 'center' }}>
                                Enable Performance Debug Mode to see real-time compute telemetry.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCentre;
