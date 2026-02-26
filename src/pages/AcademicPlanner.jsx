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
                background: 'var(--bg-elevated)',
                borderRadius: 24,
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
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
                <span style={{ fontSize: '1.1875rem', fontWeight: 700, flex: 1, textAlign: 'left' }}>{title}</span>
                {badge && (
                    <span style={{
                        fontSize: '0.6875rem', background: 'rgba(99,102,241,0.15)',
                        color: 'var(--accent-color)', padding: '3px 10px', borderRadius: 20,
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
            setError(null); // Clear any previous errors
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
            // Step 1-2: Extract text from all uploaded PDFs
            setAnalysisStep(0);
            await new Promise(r => setTimeout(r, 300));
            setAnalysisStep(1);

            const extractedTexts = await extractAllTexts(uploadedFiles);
            setExtractionStats(extractedTexts);

            // Check if any text was extracted
            const totalText = Object.values(extractedTexts)
                .reduce((sum, e) => sum + (e.text?.length || 0), 0);

            if (totalText === 0) {
                // Even if text extraction fails, try filename-based analysis
                console.warn('No text extracted from PDFs, falling back to filename analysis. The PDFs may be image-based (scanned).');
            }

            // Step 3-4: Analyze the extracted content
            setAnalysisStep(2);
            await new Promise(r => setTimeout(r, 400));
            setAnalysisStep(3);

            const analysis = analyzeDocumentContent(extractedTexts, uploadedFiles);

            // Step 5-6: Finalize
            setAnalysisStep(4);
            await new Promise(r => setTimeout(r, 300));
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
        background: 'rgba(255,255,255,0.02)',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.06)',
    };

    const tagStyle = (color) => ({
        fontSize: '0.6875rem',
        background: `${color}15`,
        color,
        padding: '3px 10px',
        borderRadius: 8,
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
                    <GraduationCap size={14} /> AI Document Analysis
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
                    Academic Planner
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 700 }}>
                    Upload your college PDFs — syllabus, timetable, model papers, or PYQs. The AI will <strong style={{ color: 'var(--accent-color)' }}>read every page</strong>, extract text, detect subjects, identify question patterns, and build a real study plan from your actual documents.
                </p>
            </header>

            {/* ═══ UPLOAD PHASE ═══ */}
            {!result ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-color)',
                        borderRadius: 24, padding: '3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        display: 'flex', flexDirection: 'column', gap: '2.5rem'
                    }}
                >
                    {/* Upload Grid */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                            <Upload size={18} color="var(--accent-color)" />
                            <span style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)' }}>Upload Your Documents</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginLeft: '8px' }}>(PDF recommended, at least 1 required)</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                            {uploadFields.map(field => (
                                <div key={field.id}>
                                    {uploadedFiles[field.id] ? (
                                        <div style={{
                                            padding: '1.25rem', background: 'rgba(52,211,153,0.05)',
                                            border: '1px solid rgba(52,211,153,0.25)',
                                            borderRadius: 16, position: 'relative',
                                        }}>
                                            <button
                                                onClick={() => removeFile(field.id)}
                                                style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-tertiary)' }}
                                            >
                                                <X size={12} />
                                            </button>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                                                <CheckCircle size={18} color="var(--success)" />
                                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--success)' }}>{field.label}</span>
                                            </div>
                                            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '28px' }}>
                                                {uploadedFiles[field.id].name}
                                            </div>
                                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', paddingLeft: '28px', marginTop: 4 }}>
                                                {(uploadedFiles[field.id].size / 1024).toFixed(0)} KB • {uploadedFiles[field.id].type || 'unknown'}
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => document.getElementById(`file-upload-${field.id}`).click()}
                                            style={{
                                                padding: '1.5rem', background: 'rgba(255,255,255,0.02)',
                                                border: '1px dashed var(--border-color)',
                                                borderRadius: 16, cursor: 'pointer', textAlign: 'center',
                                                transition: 'all 0.2s', position: 'relative',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.background = 'rgba(99,102,241,0.03)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                                        >
                                            <input
                                                id={`file-upload-${field.id}`}
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileChange(field.id, e)}
                                                accept=".pdf,.doc,.docx,.txt"
                                            />
                                            <field.icon size={24} color="var(--text-tertiary)" style={{ marginBottom: '0.75rem' }} />
                                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                                                {field.label}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                                                {field.desc}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tip */}
                    {!hasAnyUpload && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '1rem 1.25rem', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 12 }}>
                            <AlertTriangle size={16} color="#f59e0b" style={{ marginTop: 2, flexShrink: 0 }} />
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                                <strong style={{ color: '#f59e0b' }}>Tip:</strong> Upload your PYQs and syllabus PDFs for the best results. The AI reads <strong>every page</strong> of your PDF, extracts the actual text, and identifies subjects, topics, and question patterns from the <strong>real content</strong>.
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '1rem 1.25rem', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12 }}>
                            <AlertTriangle size={16} color="#ef4444" style={{ marginTop: 2, flexShrink: 0 }} />
                            <p style={{ fontSize: '0.8125rem', color: '#ef4444', margin: 0, lineHeight: 1.5 }}>
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Analyzing Progress */}
                    {isAnalyzing ? (
                        <div style={{
                            padding: '2rem', borderRadius: 20,
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(79,70,229,0.04))',
                            border: '1px solid rgba(99,102,241,0.15)',
                        }}>
                            <div style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <RefreshCw size={18} className="animate-spin" color="var(--accent-color)" />
                                Analyzing Your Documents...
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                {ANALYSIS_STEPS.map((step, i) => {
                                    const StepIcon = step.icon;
                                    const isActive = i === analysisStep;
                                    const isDone = i < analysisStep;
                                    return (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'center', gap: 10,
                                            opacity: isDone ? 0.5 : isActive ? 1 : 0.3,
                                            transition: 'opacity 0.3s',
                                        }}>
                                            {isDone ? (
                                                <CheckCircle size={16} color="var(--success)" />
                                            ) : (
                                                <StepIcon size={16} color={isActive ? 'var(--accent-color)' : 'var(--text-tertiary)'} />
                                            )}
                                            <span style={{
                                                fontSize: '0.875rem',
                                                fontWeight: isActive ? 600 : 400,
                                                color: isDone ? 'var(--success)' : isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                                            }}>
                                                {step.label}
                                            </span>
                                            {isActive && (
                                                <motion.div
                                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                                    transition={{ duration: 1.2, repeat: Infinity }}
                                                    style={{
                                                        width: 6, height: 6, borderRadius: '50%',
                                                        background: 'var(--accent-color)',
                                                    }}
                                                />
                                            )}
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
                                width: '100%', padding: '1.25rem', borderRadius: 16, border: 'none',
                                background: hasAnyUpload ? 'linear-gradient(135deg, var(--accent-color) 0%, #4f46e5 100%)' : 'rgba(255,255,255,0.05)',
                                color: hasAnyUpload ? 'white' : 'var(--text-tertiary)', fontWeight: 700, fontSize: '1.125rem',
                                cursor: hasAnyUpload ? 'pointer' : 'not-allowed',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                boxShadow: hasAnyUpload ? '0 8px 24px rgba(99, 102, 241, 0.4)' : 'none',
                                transition: 'all 0.3s',
                            }}
                        >
                            Analyze & Generate Study Plan <ArrowRight size={22} />
                        </button>
                    )}
                </motion.div>
            ) : (
                /* ═══ RESULTS ═══ */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* ── Top Summary Bar ── */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'linear-gradient(135deg, var(--accent-color), #4f46e5)',
                            borderRadius: 24, padding: '2rem', color: 'white',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 6 }}>
                                    Document Analysis Complete
                                </div>
                                <div style={{ fontSize: '1.625rem', fontWeight: 800, marginBottom: 4 }}>
                                    {result.detectedSubjects.length} Subject{result.detectedSubjects.length !== 1 ? 's' : ''} Detected
                                </div>
                                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                                    from {result.totalUploads} file{result.totalUploads !== 1 ? 's' : ''} ({result.uploadTypes.join(', ')})
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '2rem' }}>
                                {[
                                    { label: 'Pages Scanned', value: result.totalPages },
                                    { label: 'Words Extracted', value: result.totalWords > 1000 ? `${(result.totalWords / 1000).toFixed(1)}k` : result.totalWords },
                                    { label: 'Topics Found', value: Object.values(result.detectedTopics).flat().length },
                                    { label: 'Questions', value: result.importantQuestions.length },
                                ].map((stat, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stat.value}</div>
                                        <div style={{ fontSize: '0.6875rem', opacity: 0.7 }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Two Column Layout ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem' }}>
                        {/* LEFT COLUMN */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Detected Subjects with Confidence */}
                            <CollapsibleSection
                                title="Detected Subjects"
                                icon={Target}
                                badge={`${result.detectedSubjects.length} found`}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                                    {result.subjectScores
                                        .filter(s => s.score > 0)
                                        .sort((a, b) => b.score - a.score)
                                        .map((subject, i) => (
                                            <div key={i} style={{
                                                ...cardStyle,
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <div style={{
                                                        width: 36, height: 36, borderRadius: 10,
                                                        background: subject.confidence === 'High' ? 'rgba(52,211,153,0.12)' : subject.confidence === 'Medium' ? 'rgba(245,158,11,0.12)' : 'rgba(99,102,241,0.12)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    }}>
                                                        <BookOpen size={16} color={subject.confidence === 'High' ? '#34d399' : subject.confidence === 'Medium' ? '#f59e0b' : '#6366f1'} />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                                            {subject.name}
                                                        </div>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 2 }}>
                                                            {subject.matchedKeywords.slice(0, 5).join(', ')}
                                                            {subject.matchedKeywords.length > 5 && ` +${subject.matchedKeywords.length - 5} more`}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={tagStyle(
                                                        subject.confidence === 'High' ? '#34d399' : subject.confidence === 'Medium' ? '#f59e0b' : '#6366f1'
                                                    )}>
                                                        {subject.confidence} • Score {subject.score}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </CollapsibleSection>

                            {/* Detected Topics Per Subject */}
                            {Object.keys(result.detectedTopics).length > 0 && (
                                <CollapsibleSection
                                    title="Topics Found in Documents"
                                    icon={Layers}
                                    iconColor="#f59e0b"
                                    badge={`${Object.values(result.detectedTopics).flat().length} topics`}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                        {Object.entries(result.detectedTopics).map(([subject, topics]) => (
                                            topics.length > 0 && (
                                                <div key={subject}>
                                                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent-color)', marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                                                        {subject}
                                                    </div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                        {topics.map((topic, j) => (
                                                            <div key={j} style={{
                                                                padding: '6px 14px', borderRadius: 12,
                                                                background: topic.frequency === 'Very High' ? 'rgba(239,68,68,0.08)' : topic.frequency === 'High' ? 'rgba(245,158,11,0.08)' : 'rgba(99,102,241,0.08)',
                                                                border: `1px solid ${topic.frequency === 'Very High' ? 'rgba(239,68,68,0.15)' : topic.frequency === 'High' ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.15)'}`,
                                                                fontSize: '0.8125rem', fontWeight: 600,
                                                                color: topic.frequency === 'Very High' ? '#ef4444' : topic.frequency === 'High' ? '#f59e0b' : 'var(--accent-color)',
                                                                display: 'flex', alignItems: 'center', gap: 6,
                                                            }}>
                                                                {topic.name}
                                                                <span style={{ fontSize: '0.625rem', opacity: 0.7 }}>×{topic.score}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </CollapsibleSection>
                            )}

                            {/* Extracted Units from Syllabus */}
                            {result.extractedUnits.length > 0 && (
                                <CollapsibleSection
                                    title="Syllabus Units Detected"
                                    icon={Hash}
                                    iconColor="#34d399"
                                    badge={`${result.extractedUnits.length} units`}
                                    defaultOpen={false}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {result.extractedUnits.map((unit, i) => (
                                            <div key={i} style={{
                                                ...cardStyle,
                                                display: 'flex', alignItems: 'center', gap: 12,
                                            }}>
                                                <div style={{
                                                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                                                    background: 'rgba(52,211,153,0.1)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '0.75rem', fontWeight: 800, color: '#34d399',
                                                }}>
                                                    {unit.number}
                                                </div>
                                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                    {unit.title}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CollapsibleSection>
                            )}

                            {/* Important Questions */}
                            <CollapsibleSection
                                title="Important Questions"
                                icon={Sparkles}
                                iconColor="#f59e0b"
                                badge={`${result.importantQuestions.length} questions`}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {result.importantQuestions.length === 0 ? (
                                        <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
                                            No questions could be extracted. Try uploading PYQ or Model Paper PDFs for question analysis.
                                        </div>
                                    ) : (
                                        result.importantQuestions.map((q, i) => (
                                            <div key={i} style={{
                                                ...cardStyle,
                                                display: 'flex', gap: 12, alignItems: 'flex-start',
                                            }}>
                                                <div style={{
                                                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                                                    background: q.type === 'extracted' ? 'rgba(52,211,153,0.1)' : 'rgba(99,102,241,0.1)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '0.6875rem', fontWeight: 800,
                                                    color: q.type === 'extracted' ? '#34d399' : 'var(--accent-color)',
                                                }}>
                                                    {i + 1}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 6 }}>
                                                        {q.text}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                        <span style={tagStyle(q.type === 'extracted' ? '#34d399' : '#6366f1')}>
                                                            {q.source}
                                                        </span>
                                                        {q.marks && (
                                                            <span style={tagStyle('#f59e0b')}>{q.marks} marks</span>
                                                        )}
                                                        {q.frequency && (
                                                            <span style={tagStyle(q.frequency === 'Very High' ? '#ef4444' : '#f59e0b')}>
                                                                {q.frequency}
                                                            </span>
                                                        )}
                                                        {q.subject && (
                                                            <span style={tagStyle('#8b5cf6')}>{q.subject}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CollapsibleSection>

                            {/* Curated Resources */}
                            <CollapsibleSection
                                title="Curated Study Resources"
                                icon={Book}
                                iconColor="#34d399"
                                badge={`${result.bestResources.length} resources`}
                                defaultOpen={false}
                            >
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                                    {result.bestResources.map((res, i) => (
                                        <a key={i} href={res.link} target="_blank" rel="noopener noreferrer"
                                            style={{
                                                textDecoration: 'none',
                                                ...cardStyle,
                                                display: 'flex', alignItems: 'center', gap: '12px',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                        >
                                            <div style={{
                                                width: 40, height: 40, borderRadius: 10,
                                                background: res.type === 'Video' ? 'rgba(239,68,68,0.1)' : res.type === 'Practice' ? 'rgba(99,102,241,0.1)' : 'rgba(52,211,153,0.1)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                            }}>
                                                {res.type === 'Video' ? <BookOpen size={18} color="#ef4444" /> :
                                                    res.type === 'Practice' ? <Target size={18} color="var(--accent-color)" /> :
                                                        <Book size={18} color="var(--success)" />}
                                            </div>
                                            <div style={{ overflow: 'hidden' }}>
                                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{res.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{res.type}</div>
                                            </div>
                                            <ExternalLink size={14} style={{ marginLeft: 'auto', opacity: 0.4, flexShrink: 0 }} color="white" />
                                        </a>
                                    ))}
                                </div>
                            </CollapsibleSection>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Extraction Details */}
                            {extractionStats && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        background: 'var(--bg-elevated)',
                                        borderRadius: 24, padding: '1.75rem',
                                        border: '1px solid var(--border-color)',
                                    }}
                                >
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <FileSearch size={18} color="var(--accent-color)" /> Extraction Report
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                        {Object.entries(extractionStats).map(([key, stats]) => (
                                            <div key={key} style={{
                                                ...cardStyle, padding: '0.875rem 1rem',
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            }}>
                                                <div>
                                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                                                        {key}
                                                    </div>
                                                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>
                                                        {stats.fileName}
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                                                        {stats.pageCount} pg{stats.pageCount !== 1 ? 's' : ''} •{' '}
                                                        {stats.text ? `${stats.text.split(/\s+/).filter(w => w.length > 1).length} words` : 'no text'}
                                                    </div>
                                                    {stats.error ? (
                                                        <span style={tagStyle('#ef4444')}>Error</span>
                                                    ) : stats.text?.length > 0 ? (
                                                        <span style={tagStyle('#34d399')}>✓ Extracted</span>
                                                    ) : (
                                                        <span style={tagStyle('#f59e0b')}>No text</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Study Timetable */}
                            <motion.aside
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                style={{
                                    background: 'var(--bg-elevated)',
                                    borderRadius: 24, padding: '1.75rem',
                                    border: '1px solid var(--border-color)',
                                }}
                            >
                                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <Calendar size={18} color="var(--accent-color)" /> Personalized Study Schedule
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {result.studyTimetable.map((day, i) => (
                                        <div key={i} style={{
                                            ...cardStyle, padding: '0.875rem 1rem',
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        }}>
                                            <div style={{ overflow: 'hidden', flex: 1 }}>
                                                <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                                                    {day.day}
                                                </div>
                                                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                                                    {day.focus}
                                                </div>
                                                {day.topics && (
                                                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                                                        {day.topics}
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                                                    <Clock size={12} /> {day.hours}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.625rem', fontWeight: 600,
                                                    color: day.priority === 'Critical' ? '#ef4444' : day.priority === 'High' ? '#f59e0b' : day.priority === 'Revision' ? '#8b5cf6' : 'var(--text-tertiary)',
                                                }}>
                                                    {day.priority}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.aside>

                            {/* Upload New Documents */}
                            <button
                                onClick={handleReset}
                                style={{
                                    width: '100%', padding: '1rem',
                                    borderRadius: 16, background: 'transparent',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-secondary)', fontSize: '0.9375rem',
                                    cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                }}
                            >
                                <RefreshCw size={16} /> Upload New Documents
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcademicPlanner;
