import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, FileText, BookOpen, GraduationCap,
    ArrowRight, CheckCircle, RefreshCw, Sparkles, Upload,
    Book, Target, ExternalLink, X, AlertTriangle, Clock, BarChart2,
    Zap, FileSearch, Hash, Layers, ChevronDown, ChevronUp,
    Brain, HelpCircle, ListChecks
} from 'lucide-react';
import { extractAllTexts } from '../utils/pdfParser';
import { analyzeDocumentContent } from '../utils/documentAnalyzer';

// ── Scroll Icon ──
const Scroll = ({ size, color, style }) => (
    <svg
        width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={style}
    >
        <path d="M12 21c-3.3 0-6-2.7-6-6V5c0-1.7 1.3-3 3-3s3 1.3 3 3v10c0 .6-.4 1-1 1s-1-.4-1-1V5" />
        <path d="M18 21c-3.3 0-6-2.7-6-6v-1" />
        <path d="M6 15c0 3.3 2.7 6 6 6s6-2.7 6-6V5c0-1.7-1.3-3-3-3s-3 1.3-3 3v1" />
    </svg>
);

// ── Progress Steps ──
const ANALYSIS_STEPS = [
    { label: 'Reading PDF pages...', icon: FileSearch },
    { label: 'Extracting text content...', icon: FileText },
    { label: 'Detecting subjects & topics...', icon: Brain },
    { label: 'Analyzing question patterns...', icon: HelpCircle },
    { label: 'Building study plan...', icon: ListChecks },
    { label: 'Finalizing results...', icon: Sparkles },
];

// ── Collapsible Section ──
const CollapsibleSection = ({ title, icon: Icon, iconColor, children, defaultOpen = true, badge }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: '#FFFFFF',
                borderRadius: 24,
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}
        >
            <button
                onClick={() => setIsOpen(o => !o)}
                style={{
                    width: '100%', padding: '1.5rem 2rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 10,
                    color: 'var(--text-primary)',
                }}
            >
                <Icon size={20} color={iconColor || 'var(--accent-color)'} />
                <span style={{ fontSize: '1.1rem', fontWeight: 700, flex: 1, textAlign: 'left' }}>{title}</span>
                {badge && (
                    <span style={{
                        fontSize: '0.75rem', background: 'rgba(99,102,241,0.08)',
                        color: 'var(--accent-color)', padding: '4px 12px', borderRadius: 20,
                        fontWeight: 700,
                    }}>
                        {badge}
                    </span>
                )}
                {isOpen ? <ChevronUp size={18} color="var(--text-tertiary)" /> : <ChevronDown size={18} color="var(--text-tertiary)" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ padding: '0 2rem 1.75rem' }}>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

// ── Main Component ──
const AcademicPlanner = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState(0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [extractionStats, setExtractionStats] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState({
        timetable: null,
        syllabus: null,
        modelPapers: null,
        pyqs: null
    });

    const handleFileChange = (type, e) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFiles(prev => ({ ...prev, [type]: e.target.files[0] }));
            setError(null);
        }
    };

    const removeFile = (type) => {
        setUploadedFiles(prev => ({ ...prev, [type]: null }));
    };

    const hasAnyUpload = Object.values(uploadedFiles).some(Boolean);

    const handleGenerate = async () => {
        if (!hasAnyUpload) return;
        setIsAnalyzing(true);
        setAnalysisStep(0);
        setError(null);

        try {
            setAnalysisStep(0);
            await new Promise(r => setTimeout(r, 600));
            setAnalysisStep(1);

            const extractedTexts = await extractAllTexts(uploadedFiles);
            setExtractionStats(extractedTexts);

            const totalText = Object.values(extractedTexts)
                .reduce((sum, e) => sum + (e.text?.length || 0), 0);

            if (totalText === 0) {
                console.warn('No text extracted from PDFs');
            }

            setAnalysisStep(2);
            await new Promise(r => setTimeout(r, 800));
            setAnalysisStep(3);

            const analysis = analyzeDocumentContent(extractedTexts, uploadedFiles);

            setAnalysisStep(4);
            await new Promise(r => setTimeout(r, 600));
            setAnalysisStep(5);
            await new Promise(r => setTimeout(r, 200));

            setResult(analysis);
            setIsAnalyzing(false);
        } catch (err) {
            console.error('Analysis error:', err);
            setError(err.message || 'Failed to analyze documents. Please try again.');
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setError(null);
        setExtractionStats(null);
        setUploadedFiles({ timetable: null, syllabus: null, modelPapers: null, pyqs: null });
    };

    const uploadFields = [
        { id: 'timetable', label: 'College Timetable', icon: Calendar, desc: 'Upload your weekly schedule' },
        { id: 'syllabus', label: 'Syllabus / Portion', icon: BookOpen, desc: 'Upload subject syllabus' },
        { id: 'modelPapers', label: 'Model Question Papers', icon: FileText, desc: 'Upload sample question papers' },
        { id: 'pyqs', label: 'Previous Year Questions', icon: Scroll, desc: 'Upload past exam papers' },
    ];

    // ═══ STYLES ═══
    const cardStyle = {
        padding: '1.25rem',
        background: 'var(--bg-primary)',
        borderRadius: 16,
        border: '1px solid var(--border-color)',
    };

    const tagStyle = (color) => ({
        fontSize: '0.75rem',
        background: `${color}10`,
        color,
        padding: '4px 12px',
        borderRadius: 10,
        fontWeight: 700,
        display: 'inline-block',
    });

    return (
        <div style={{ padding: '2rem 2.5rem', maxWidth: 1300, margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
                    borderRadius: 20, background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.2)', marginBottom: 16,
                    fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600
                }}>
                    <GraduationCap size={14} /> AI Context Engine
                </div>
                <h1 style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
                    Academic Planner
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: 750, lineHeight: 1.6 }}>
                    Upload your institutional PDFs — syllabus, timetable, or past papers. The AI will <strong style={{ color: 'var(--accent-color)' }}>analyze every byte</strong>, identifying subject core, question patterns, and building a structured roadmap from your actual curriculum.
                </p>
            </header>

            {!result ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: '#FFFFFF', border: '1px solid var(--border-color)',
                        borderRadius: 32, padding: '3.5rem', boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
                        display: 'flex', flexDirection: 'column', gap: '3rem'
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                            <Upload size={20} color="var(--accent-color)" />
                            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Source Document Repository</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginLeft: '8px' }}>(PDF, DOCX supported)</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {uploadFields.map(field => (
                                <div key={field.id}>
                                    {uploadedFiles[field.id] ? (
                                        <div style={{
                                            padding: '1.5rem', background: 'rgba(52,211,153,0.05)',
                                            border: '1px solid rgba(52,211,153,0.25)',
                                            borderRadius: 20, position: 'relative',
                                        }}>
                                            <button
                                                onClick={() => removeFile(field.id)}
                                                style={{ position: 'absolute', top: 12, right: 12, background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-tertiary)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                                            >
                                                <X size={14} />
                                            </button>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
                                                <div style={{ width: 32, height: 32, borderRadius: 10, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <CheckCircle size={18} color="var(--success)" />
                                                </div>
                                                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--success)' }}>{field.label}</span>
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '44px' }}>
                                                {uploadedFiles[field.id].name}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', paddingLeft: '44px', marginTop: 4, fontWeight: 500 }}>
                                                {(uploadedFiles[field.id].size / 1024).toFixed(0)} KB • Ready for Analysis
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => document.getElementById(`file-upload-${field.id}`).click()}
                                            style={{
                                                padding: '2rem', background: '#FFFFFF',
                                                border: '2px dashed var(--border-color)',
                                                borderRadius: 20, cursor: 'pointer', textAlign: 'center',
                                                transition: 'all 0.2s', position: 'relative',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.background = 'rgba(99,102,241,0.02)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = '#FFFFFF'; }}
                                        >
                                            <input
                                                id={`file-upload-${field.id}`}
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileChange(field.id, e)}
                                                accept=".pdf,.doc,.docx,.txt"
                                            />
                                            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                                                <field.icon size={24} color="var(--text-tertiary)" />
                                            </div>
                                            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                                {field.label}
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                                                {field.desc}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {!hasAnyUpload && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '1.25rem', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 16 }}>
                            <AlertTriangle size={18} color="#f59e0b" style={{ marginTop: 2, flexShrink: 0 }} />
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                                <strong style={{ color: '#d97706' }}>Analysis Tip:</strong> For high-fidelity roadmaps, we recommend uploading both the <strong style={{color: 'var(--text-primary)'}}>Syllabus</strong> and <strong style={{color: 'var(--text-primary)'}}>Previous Questions</strong>. The AI cross-references these to weight topics based on examination frequency.
                            </p>
                        </div>
                    )}

                    {error && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '1.25rem', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16 }}>
                            <AlertTriangle size={18} color="#ef4444" style={{ marginTop: 2, flexShrink: 0 }} />
                            <p style={{ fontSize: '0.875rem', color: '#dc2626', margin: 0, lineHeight: 1.6, fontWeight: 600 }}>
                                {error}
                            </p>
                        </div>
                    )}

                    {isAnalyzing ? (
                        <div style={{
                            padding: '3rem', borderRadius: 24,
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--border-color)',
                        }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <RefreshCw size={22} className="animate-spin" color="var(--accent-color)" />
                                Parsing Multi-Page Context...
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                {ANALYSIS_STEPS.map((step, i) => {
                                    const StepIcon = step.icon;
                                    const isActive = i === analysisStep;
                                    const isDone = i < analysisStep;
                                    return (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'center', gap: 12,
                                            opacity: isDone ? 1 : isActive ? 1 : 0.3,
                                            transition: 'all 0.4s',
                                        }}>
                                            <div style={{
                                                width: 32, height: 32, borderRadius: '50%',
                                                background: isDone ? 'rgba(52,211,153,0.1)' : isActive ? 'rgba(99,102,241,0.1)' : 'var(--bg-elevated)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                {isDone ? (
                                                    <CheckCircle size={16} color="var(--success)" />
                                                ) : (
                                                    <StepIcon size={16} color={isActive ? 'var(--accent-color)' : 'var(--text-tertiary)'} />
                                                )}
                                            </div>
                                            <span style={{
                                                fontSize: '0.875rem',
                                                fontWeight: isActive || isDone ? 700 : 500,
                                                color: isDone ? 'var(--success)' : isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                                            }}>
                                                {step.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleGenerate}
                            disabled={!hasAnyUpload}
                            style={{
                                width: '100%', padding: '1.5rem', borderRadius: 20, border: 'none',
                                background: hasAnyUpload ? 'var(--text-primary)' : 'var(--bg-elevated)',
                                color: hasAnyUpload ? '#FFFFFF' : 'var(--text-tertiary)', fontWeight: 800, fontSize: '1.125rem',
                                cursor: hasAnyUpload ? 'pointer' : 'not-allowed',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                boxShadow: hasAnyUpload ? '0 12px 32px rgba(0,0,0,0.1)' : 'none',
                                transition: 'all 0.3s',
                            }}
                        >
                            Execute Document Analysis <ArrowRight size={22} />
                        </button>
                    )}
                </motion.div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'linear-gradient(135deg, var(--text-primary) 0%, #1e1e2e 100%)',
                            borderRadius: 32, padding: '3rem', color: '#FFFFFF',
                            boxShadow: '0 24px 64px rgba(0,0,0,0.15)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                            <div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: 12 }}>
                                    Knowledge Graph Finalized
                                </div>
                                <div style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: 8 }}>
                                    {result.detectedSubjects.length} Core Domains Identified
                                </div>
                                <div style={{ fontSize: '1rem', opacity: 0.8, fontWeight: 500 }}>
                                    Cross-referenced across {result.totalUploads} institutional sources
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '3rem' }}>
                                {[
                                    { label: 'Pages Scanned', value: result.totalPages },
                                    { label: 'Word Vector Size', value: result.totalWords > 1000 ? `${(result.totalWords / 1000).toFixed(1)}k` : result.totalWords },
                                    { label: 'Key Topics', value: Object.values(result.detectedTopics).flat().length },
                                    { label: 'Critical Qs', value: result.importantQuestions.length },
                                ].map((stat, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stat.value}</div>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <CollapsibleSection
                                title="Academic Domains Identified"
                                icon={Target}
                                badge={`${result.detectedSubjects.length} Domains`}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {result.subjectScores
                                        .filter(s => s.score > 0)
                                        .sort((a, b) => b.score - a.score)
                                        .map((subject, i) => (
                                            <div key={i} style={{
                                                ...cardStyle,
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                                    <div style={{
                                                        width: 44, height: 44, borderRadius: 14,
                                                        background: subject.confidence === 'High' ? 'rgba(52,211,153,0.08)' : subject.confidence === 'Medium' ? 'rgba(245,158,11,0.08)' : 'rgba(99,102,241,0.08)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    }}>
                                                        <BookOpen size={20} color={subject.confidence === 'High' ? '#10b981' : subject.confidence === 'Medium' ? '#d97706' : '#4f46e5'} />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                                                            {subject.name}
                                                        </div>
                                                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: 4, fontWeight: 500 }}>
                                                            Key Identifiers: {subject.matchedKeywords.slice(0, 5).join(', ')}...
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={tagStyle(
                                                        subject.confidence === 'High' ? '#10b981' : subject.confidence === 'Medium' ? '#d97706' : '#4f46e5'
                                                    )}>
                                                        {subject.confidence} Confidence
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </CollapsibleSection>

                            {Object.keys(result.detectedTopics).length > 0 && (
                                <CollapsibleSection
                                    title="Strategic Topic Heatmap"
                                    icon={Layers}
                                    iconColor="#f59e0b"
                                    badge={`${Object.values(result.detectedTopics).flat().length} topics`}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {Object.entries(result.detectedTopics).map(([subject, topics]) => (
                                            topics.length > 0 && (
                                                <div key={subject}>
                                                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--accent-color)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                        {subject}
                                                    </div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                                        {topics.map((topic, j) => (
                                                            <div key={j} style={{
                                                                padding: '8px 16px', borderRadius: 14,
                                                                background: '#FFFFFF',
                                                                border: `1px solid ${topic.frequency === 'Very High' ? '#fecaca' : topic.frequency === 'High' ? '#fde68a' : 'var(--border-color)'}`,
                                                                fontSize: '0.875rem', fontWeight: 700,
                                                                color: topic.frequency === 'Very High' ? '#dc2626' : topic.frequency === 'High' ? '#d97706' : 'var(--text-primary)',
                                                                display: 'flex', alignItems: 'center', gap: 8,
                                                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                                            }}>
                                                                {topic.name}
                                                                <span style={{ fontSize: '0.75rem', opacity: 0.5, fontWeight: 500 }}>{topic.score}pts</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </CollapsibleSection>
                            )}

                            <CollapsibleSection
                                title="Pattern-Based Questions"
                                icon={Sparkles}
                                iconColor="#f59e0b"
                                badge={`${result.importantQuestions.length} Identified`}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {result.importantQuestions.length === 0 ? (
                                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.9375rem', background: 'var(--bg-primary)', borderRadius: 16 }}>
                                            No questions detected. Upload PYQ documents for pattern analysis.
                                        </div>
                                    ) : (
                                        result.importantQuestions.map((q, i) => (
                                            <div key={i} style={{
                                                ...cardStyle,
                                                display: 'flex', gap: 16, alignItems: 'flex-start',
                                            }}>
                                                <div style={{
                                                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                                                    background: 'var(--bg-elevated)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '0.8rem', fontWeight: 900, color: 'var(--accent-color)',
                                                }}>
                                                    {i + 1}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 12 }}>
                                                        {q.text}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                        <span style={tagStyle('#6366f1')}>
                                                            {q.source} Source
                                                        </span>
                                                        {q.marks && (
                                                            <span style={tagStyle('#f59e0b')}>{q.marks} Marks Value</span>
                                                        )}
                                                        {q.frequency && (
                                                            <span style={tagStyle(q.frequency === 'Very High' ? '#ef4444' : '#f59e0b')}>
                                                                {q.frequency} Probability
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CollapsibleSection>

                            <CollapsibleSection
                                title="External Knowledge Base"
                                icon={Book}
                                iconColor="#10b981"
                                badge={`${result.bestResources.length} Mentors`}
                                defaultOpen={false}
                            >
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                                    {result.bestResources.map((res, i) => (
                                        <a key={i} href={res.link} target="_blank" rel="noopener noreferrer"
                                            style={{
                                                textDecoration: 'none',
                                                ...cardStyle,
                                                display: 'flex', alignItems: 'center', gap: '16px',
                                                transition: 'all 0.2s', background: '#FFFFFF'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                        >
                                            <div style={{
                                                width: 44, height: 44, borderRadius: 12,
                                                background: res.type === 'Video' ? 'rgba(239,68,68,0.08)' : res.type === 'Practice' ? 'rgba(99,102,241,0.08)' : 'rgba(16,185,129,0.08)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                            }}>
                                                {res.type === 'Video' ? <BookOpen size={20} color="#dc2626" /> :
                                                    res.type === 'Practice' ? <Target size={20} color="#4f46e5" /> :
                                                        <Book size={20} color="#059669" />}
                                            </div>
                                            <div style={{ overflow: 'hidden', flex: 1 }}>
                                                <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{res.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>{res.type} Content</div>
                                            </div>
                                            <ExternalLink size={14} color="var(--text-tertiary)" />
                                        </a>
                                    ))}
                                </div>
                            </CollapsibleSection>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <motion.aside
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: 32, padding: '2.5rem',
                                    border: '1px solid var(--border-color)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.03)'
                                }}
                            >
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <Calendar size={22} color="var(--accent-color)" /> Study Roadmap
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {result.studyTimetable.map((day, i) => (
                                        <div key={i} style={{
                                            ...cardStyle, padding: '1.25rem',
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        }}>
                                            <div style={{ overflow: 'hidden', flex: 1 }}>
                                                <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                    {day.day}
                                                </div>
                                                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {day.focus}
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: 16 }}>
                                                <div style={{ fontSize: '0.875rem', color: 'var(--accent-color)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                                                    <Clock size={14} /> {day.hours}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase',
                                                    color: day.priority === 'Critical' ? '#ef4444' : day.priority === 'High' ? '#f59e0b' : '#8b5cf6',
                                                    marginTop: 4
                                                }}>
                                                    {day.priority}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.aside>

                            <button
                                onClick={handleReset}
                                style={{
                                    width: '100%', padding: '1.25rem',
                                    borderRadius: 20, background: '#FFFFFF',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-secondary)', fontSize: '1rem',
                                    cursor: 'pointer', fontWeight: 700, transition: 'all 0.2s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                                }}
                            >
                                <RefreshCw size={18} /> New Analysis Session
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .animate-spin { animation: spin 1.5s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default AcademicPlanner;
