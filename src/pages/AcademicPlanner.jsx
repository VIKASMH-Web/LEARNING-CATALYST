import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, FileText, BookOpen, GraduationCap, Search,
    ArrowRight, CheckCircle, RefreshCw, Sparkles, Upload,
    ChevronRight, Book, Target, ExternalLink
} from 'lucide-react';

const AcademicPlanner = () => {
    const [college, setCollege] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [step, setStep] = useState(1);
    const [result, setResult] = useState(null);
    const [uploadStatus, setUploadStatus] = useState({
        timetable: false,
        syllabus: false,
        modelPapers: false,
        pyqs: false
    });

    const handleUpload = (type) => {
        setUploadStatus(prev => ({ ...prev, [type]: true }));
    };

    const handleGenerate = () => {
        if (!college.trim()) return;
        setIsAnalyzing(true);

        // Mock heavy analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            setResult({
                collegeName: college,
                collegeUrl: `https://www.${college.toLowerCase().replace(/\s+/g, '')}.edu`,
                repeatedQuestions: [
                    { topic: 'Quantum Mechanics', frequency: 'High', questions: ['Schrodinger Equation derivation', 'Quantum tunneling effects'] },
                    { topic: 'Data Structures', frequency: 'Very High', questions: ['B-Tree operations', 'Dijkstra Algorithm'] },
                    { topic: 'Thermodynamics', frequency: 'Medium', questions: ['Second law applications', 'Carnot cycle efficiency'] }
                ],
                studyTimetable: [
                    { day: 'Monday', focus: 'Math & Physics', hours: '4 hours', priority: 'High' },
                    { day: 'Tuesday', focus: 'Programming', hours: '3 hours', priority: 'Medium' },
                    { day: 'Wednesday', focus: 'Electronic Circuits', hours: '4 hours', priority: 'High' },
                    { day: 'Thursday', focus: 'Database Systems', hours: '3 hours', priority: 'Medium' },
                    { day: 'Friday', focus: 'Revision & PYQs', hours: '5 hours', priority: 'Critical' }
                ],
                bestResources: [
                    { name: 'NPTEL Course on DS', type: 'Video', link: '#' },
                    { name: 'Standard Textbook: Griffith\'s', type: 'Book', link: '#' },
                    { name: 'College Library Archives', type: 'Resource', link: '#' }
                ]
            });
        }, 2500);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
    };

        const handleFileChange = (type, e) => {
            if (e.target.files && e.target.files.length > 0) {
                setUploadStatus(prev => ({ ...prev, [type]: true }));
            }
        };

        return (
            <div style={{ padding: '2rem 2.5rem', maxWidth: 1200, margin: '0 auto' }}>
                <header style={{ marginBottom: '3rem' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
                        borderRadius: 20, background: 'rgba(99,102,241,0.1)',
                        border: '1px solid rgba(99,102,241,0.2)', marginBottom: 16,
                        fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600
                    }}>
                        <GraduationCap size={14} /> Comprehensive Study Planner
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
                        Academic Excellence AI
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 600 }}>
                        Upload your materials and your college name. We'll crawl your college database and personalize your study path.
                    </p>
                </header>

                {!result ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                            background: 'var(--bg-elevated)', border: '1px solid var(--border-color)',
                            borderRadius: 24, padding: '3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                            display: 'flex', flexDirection: 'column', gap: '2.5rem'
                        }}
                    >
                        {/* College Input */}
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Your College / University Name
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                                <input
                                    type="text"
                                    value={college}
                                    onChange={(e) => setCollege(e.target.value)}
                                    placeholder="e.g., Stanford University, IIT Bombay..."
                                    style={{
                                        width: '100%', padding: '1.25rem 1rem 1.25rem 3rem', background: 'var(--bg-primary)',
                                        border: '1px solid var(--border-color)', borderRadius: 12,
                                        color: 'var(--text-primary)', fontSize: '1.0625rem', outline: 'none',
                                        transition: 'border-color 0.2s', focus: { borderColor: 'var(--accent-color)' }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Upload Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                            {[
                                { id: 'timetable', label: 'College Timetable', icon: Calendar },
                                { id: 'syllabus', label: 'Portion / Syllabus', icon: BookOpen },
                                { id: 'modelPapers', label: 'Model Papers', icon: FileText },
                                { id: 'pyqs', label: 'Previous Year Questions', icon: Scroll }
                            ].map(field => (
                                <div
                                    key={field.id}
                                    onClick={() => document.getElementById(`file-upload-${field.id}`).click()}
                                    style={{
                                        padding: '1.5rem', background: 'var(--bg-primary)',
                                        border: `1px dashed ${uploadStatus[field.id] ? 'var(--success)' : 'var(--border-color)'}`,
                                        borderRadius: 16, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                                        position: 'relative'
                                    }}
                                >
                                    <input 
                                        id={`file-upload-${field.id}`}
                                        type="file" 
                                        style={{ display: 'none' }} 
                                        onChange={(e) => handleFileChange(field.id, e)} 
                                    />
                                    <field.icon size={24} color={uploadStatus[field.id] ? "var(--success)" : "var(--text-tertiary)"} style={{ marginBottom: '0.75rem' }} />
                                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: uploadStatus[field.id] ? 'var(--success)' : 'var(--text-primary)' }}>
                                        {field.label}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                                        {uploadStatus[field.id] ? 'Uploaded' : 'Click or Drag to Upload'}
                                    </div>
                                    {uploadStatus[field.id] && <CheckCircle size={14} style={{ position: 'absolute', top: 12, right: 12, color: 'var(--success)' }} />}
                                </div>
                            ))}

                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isAnalyzing || !college.trim()}
                        style={{
                            width: '100%', padding: '1.25rem', borderRadius: 16, border: 'none',
                            background: 'linear-gradient(135deg, var(--accent-color) 0%, #4f46e5 100%)',
                            color: 'white', fontWeight: 700, fontSize: '1.125rem', cursor: college.trim() ? 'pointer' : 'not-allowed',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)', transition: 'all 0.3s',
                            opacity: (isAnalyzing || !college.trim()) ? 0.7 : 1
                        }}
                    >
                        {isAnalyzing ? (
                            <>
                                <RefreshCw size={22} className="animate-spin" />
                                Analyzing College Website & Data...
                            </>
                        ) : (
                            <>Generate My Academic Plan <ArrowRight size={22} /></>
                        )}
                    </button>
                </motion.div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Repeated Questions */}
                        <motion.section
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ background: 'var(--bg-elevated)', borderRadius: 24, padding: '2rem', border: '1px solid var(--border-color)' }}
                        >
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Sparkles size={20} color="var(--accent-color)" /> High Probability Questions
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {result.repeatedQuestions.map((q, i) => (
                                    <div key={i} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-color)' }}>{q.topic}</span>
                                            <span style={{ fontSize: '0.75rem', background: q.frequency === 'Very High' ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)', color: q.frequency === 'Very High' ? '#ef4444' : 'var(--accent-color)', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
                                                {q.frequency} Frequency
                                            </span>
                                        </div>
                                        <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                                            {q.questions.map((text, j) => <li key={j} style={{ marginBottom: '0.5rem' }}>{text}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Best Resources */}
                        <motion.section
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{ background: 'var(--bg-elevated)', borderRadius: 24, padding: '2rem', border: '1px solid var(--border-color)' }}
                        >
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Book size={20} color="var(--success)" /> Curated Study Material
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                {result.bestResources.map((res, i) => (
                                    <a key={i} href={res.link} style={{ textDecoration: 'none', padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                                    >
                                        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(52,211,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {res.type === 'Video' ? <RefreshCw size={18} color="var(--success)" /> : <BookOpen size={18} color="var(--success)" />}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{res.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{res.type} Resource</div>
                                        </div>
                                        <ExternalLink size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} color="white" />
                                    </a>
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Summary Info */}
                        <div style={{ background: 'linear-gradient(135deg, var(--accent-color), #4f46e5)', borderRadius: 24, padding: '1.75rem', color: 'white' }}>
                            <div style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.5rem' }}>College Profile</div>
                            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, marginBottom: '1rem' }}>{result.collegeName}</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }}>
                                <ExternalLink size={16} />
                                <a href={result.collegeUrl} style={{ color: 'inherit' }}>College Website</a>
                            </div>
                        </div>

                        {/* Timetable */}
                        <motion.aside
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ background: 'var(--bg-elevated)', borderRadius: 24, padding: '1.75rem', border: '1px solid var(--border-color)' }}
                        >
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Calendar size={18} color="var(--accent-color)" /> Personalized Schedule
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {result.studyTimetable.map((day, i) => (
                                    <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>{day.day}</div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{day.focus}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600 }}>{day.hours}</div>
                                            <div style={{ fontSize: '0.65rem', color: day.priority === 'Critical' ? '#ef4444' : 'var(--text-tertiary)' }}>{day.priority} Priority</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => setResult(null)}
                                style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', borderRadius: 12, background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}
                            >
                                Start New Plan
                            </button>
                        </motion.aside>
                    </div>
                </div>
            )}
        </div>
    );
};

// Mock Scroll Icon
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

export default AcademicPlanner;
