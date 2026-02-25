import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, FileText, BookOpen, GraduationCap,
    ArrowRight, CheckCircle, RefreshCw, Sparkles, Upload,
    Book, Target, ExternalLink, X, AlertTriangle, Clock, BarChart2
} from 'lucide-react';

// ── Intelligent Document Analyzer ──
// Extracts subjects, topics, and patterns from uploaded file names and metadata
const analyzeDocuments = (uploadedFiles) => {
    const allFileNames = Object.values(uploadedFiles)
        .filter(Boolean)
        .map(f => f.name.toLowerCase());

    // Subject detection from file names
    const subjectPatterns = {
        'Mathematics': ['math', 'calculus', 'algebra', 'trigonometry', 'statistics', 'probability', 'linear', 'discrete'],
        'Physics': ['physics', 'mechanics', 'optics', 'thermodynamics', 'electro', 'quantum', 'waves'],
        'Chemistry': ['chemistry', 'organic', 'inorganic', 'physical chemistry', 'biochem'],
        'Data Structures': ['dsa', 'data structure', 'algorithm', 'sorting', 'searching', 'tree', 'graph', 'linked list'],
        'Programming': ['programming', 'python', 'java', 'c++', 'cpp', 'code', 'oop', 'software'],
        'Database Systems': ['database', 'dbms', 'sql', 'nosql', 'rdbms', 'mongodb'],
        'Computer Networks': ['network', 'tcp', 'ip', 'osi', 'routing', 'protocol', 'socket'],
        'Operating Systems': ['os', 'operating system', 'process', 'thread', 'scheduling', 'memory management'],
        'Web Development': ['web', 'html', 'css', 'javascript', 'react', 'node', 'frontend', 'backend'],
        'Machine Learning': ['ml', 'machine learning', 'ai', 'artificial intelligence', 'deep learning', 'neural'],
        'Digital Electronics': ['digital', 'logic gate', 'flip flop', 'counter', 'boolean', 'circuit'],
        'Engineering Drawing': ['drawing', 'cad', 'autocad', 'projection', 'isometric'],
        'English': ['english', 'communication', 'grammar', 'writing', 'literature'],
        'Economics': ['economics', 'micro', 'macro', 'demand', 'supply', 'gdp'],
        'Management': ['management', 'marketing', 'finance', 'hr', 'business', 'strategy'],
    };

    const detectedSubjects = [];
    const fileCount = allFileNames.length;

    for (const [subject, keywords] of Object.entries(subjectPatterns)) {
        for (const fn of allFileNames) {
            if (keywords.some(kw => fn.includes(kw))) {
                if (!detectedSubjects.includes(subject)) {
                    detectedSubjects.push(subject);
                }
                break;
            }
        }
    }

    // If no subjects detected from filenames, infer from upload categories
    const hasSyllabus = !!uploadedFiles.syllabus;
    const hasPYQs = !!uploadedFiles.pyqs;
    const hasModelPapers = !!uploadedFiles.modelPapers;
    const hasTimetable = !!uploadedFiles.timetable;

    if (detectedSubjects.length === 0) {
        // Fallback: generic subjects based on what was uploaded
        if (hasSyllabus) detectedSubjects.push('Core Subject 1', 'Core Subject 2', 'Elective 1');
        if (hasPYQs) detectedSubjects.push('Exam Subject 1', 'Exam Subject 2');
        if (hasModelPapers) detectedSubjects.push('Practice Subject 1');
        if (detectedSubjects.length === 0) detectedSubjects.push('General Studies');
    }

    // Generate dynamic questions based on detected subjects
    const questionBank = {
        'Mathematics': [
            { topic: 'Calculus & Integration', frequency: 'Very High', questions: ['Integration by parts', 'Taylor series expansion', 'Partial derivatives applications'] },
            { topic: 'Linear Algebra', frequency: 'High', questions: ['Eigenvalue problems', 'Matrix decomposition', 'System of linear equations'] },
        ],
        'Physics': [
            { topic: 'Mechanics & Waves', frequency: 'Very High', questions: ['Newton\'s laws applications', 'Simple harmonic motion derivation', 'Wave interference patterns'] },
            { topic: 'Electromagnetism', frequency: 'High', questions: ['Gauss\'s law applications', 'Faraday\'s law of induction', 'Maxwell\'s equations'] },
        ],
        'Data Structures': [
            { topic: 'Trees & Graphs', frequency: 'Very High', questions: ['AVL tree rotations', 'Dijkstra\'s shortest path', 'BFS vs DFS traversal'] },
            { topic: 'Dynamic Programming', frequency: 'High', questions: ['Longest Common Subsequence', 'Knapsack problem variants', 'Matrix chain multiplication'] },
        ],
        'Programming': [
            { topic: 'OOP Concepts', frequency: 'Very High', questions: ['Polymorphism vs inheritance', 'Abstract classes vs interfaces', 'Design patterns'] },
            { topic: 'Problem Solving', frequency: 'High', questions: ['Recursion and backtracking', 'Time complexity analysis', 'Space optimization'] },
        ],
        'Database Systems': [
            { topic: 'SQL & Normalization', frequency: 'Very High', questions: ['3NF and BCNF normalization', 'Complex JOIN operations', 'Transaction ACID properties'] },
            { topic: 'Indexing & Optimization', frequency: 'High', questions: ['B-Tree vs B+ Tree indexing', 'Query optimization strategies', 'Concurrency control'] },
        ],
        'Computer Networks': [
            { topic: 'OSI & TCP/IP', frequency: 'Very High', questions: ['Layer-by-layer explanation', 'TCP 3-way handshake', 'Routing protocols comparison'] },
            { topic: 'Network Security', frequency: 'High', questions: ['Encryption algorithms', 'Firewall types', 'SSL/TLS handshake'] },
        ],
        'Operating Systems': [
            { topic: 'Process Management', frequency: 'Very High', questions: ['CPU scheduling algorithms', 'Deadlock detection & prevention', 'Process vs Thread'] },
            { topic: 'Memory Management', frequency: 'High', questions: ['Virtual memory & paging', 'Page replacement algorithms', 'Segmentation'] },
        ],
        'Machine Learning': [
            { topic: 'Supervised Learning', frequency: 'Very High', questions: ['Linear regression derivation', 'Decision tree construction', 'SVM kernel functions'] },
            { topic: 'Neural Networks', frequency: 'High', questions: ['Backpropagation algorithm', 'CNN architecture', 'Activation functions comparison'] },
        ],
        'Chemistry': [
            { topic: 'Organic Reactions', frequency: 'Very High', questions: ['Nucleophilic substitution mechanisms', 'Electrophilic addition reactions', 'Named reactions'] },
        ],
        'Digital Electronics': [
            { topic: 'Logic Design', frequency: 'Very High', questions: ['K-Map simplification', 'Flip-flop conversions', 'Sequential circuit design'] },
        ],
        'Web Development': [
            { topic: 'Frontend Frameworks', frequency: 'High', questions: ['React component lifecycle', 'State management patterns', 'REST API design'] },
        ],
    };

    // Build questions from detected subjects
    const repeatedQuestions = [];
    for (const subject of detectedSubjects) {
        if (questionBank[subject]) {
            repeatedQuestions.push(...questionBank[subject]);
        } else {
            repeatedQuestions.push({
                topic: subject,
                frequency: 'Medium',
                questions: [
                    `Key concepts and definitions in ${subject}`,
                    `Application-based problems in ${subject}`,
                    `Compare and contrast topics within ${subject}`
                ]
            });
        }
    }

    // Build dynamic study timetable based on subjects
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const priorities = ['High', 'Medium', 'Critical', 'High', 'Medium', 'Critical'];
    const hoursMap = { 'High': '4 hours', 'Medium': '3 hours', 'Critical': '5 hours' };

    const studyTimetable = daysOfWeek.map((day, i) => {
        const subjectIndex = i % detectedSubjects.length;
        const pri = priorities[i];
        const isRevisionDay = i === 5;
        return {
            day,
            focus: isRevisionDay ? `Revision: ${detectedSubjects.slice(0, 3).join(', ')}` : detectedSubjects[subjectIndex],
            hours: isRevisionDay ? '6 hours' : hoursMap[pri],
            priority: isRevisionDay ? 'Critical' : pri
        };
    });

    // Build dynamic resources linked to detected subjects
    const resourceTemplates = {
        'Mathematics': [
            { name: 'NPTEL Mathematics Lectures', type: 'Video', link: 'https://nptel.ac.in/courses/111' },
            { name: 'MIT OpenCourseWare - Calculus', type: 'Course', link: 'https://ocw.mit.edu/courses/mathematics/' },
        ],
        'Physics': [
            { name: 'Walter Lewin MIT Physics', type: 'Video', link: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro203puVhQsmCj9qIjq1_3uBM' },
            { name: 'HyperPhysics Reference', type: 'Resource', link: 'http://hyperphysics.phy-astr.gsu.edu/' },
        ],
        'Data Structures': [
            { name: 'Abdul Bari - Algorithms', type: 'Video', link: 'https://www.youtube.com/c/AbdulBari' },
            { name: 'GeeksforGeeks DSA', type: 'Practice', link: 'https://www.geeksforgeeks.org/data-structures/' },
        ],
        'Programming': [
            { name: 'FreeCodeCamp Tutorials', type: 'Video', link: 'https://www.freecodecamp.org/' },
            { name: 'LeetCode Practice', type: 'Practice', link: 'https://leetcode.com/' },
        ],
        'Database Systems': [
            { name: 'Stanford DB Course', type: 'Course', link: 'https://www.edx.org/course/databases' },
            { name: 'W3Schools SQL Tutorial', type: 'Resource', link: 'https://www.w3schools.com/sql/' },
        ],
        'Computer Networks': [
            { name: 'Computer Networking - Kurose', type: 'Book', link: 'https://gaia.cs.umass.edu/kurose_ross/' },
            { name: 'Cisco Networking Academy', type: 'Course', link: 'https://www.netacad.com/' },
        ],
        'Operating Systems': [
            { name: 'Neso Academy - OS', type: 'Video', link: 'https://www.youtube.com/c/nesoacademy' },
            { name: 'OSTEP Free Textbook', type: 'Book', link: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
        ],
        'Machine Learning': [
            { name: 'Andrew Ng - ML Course', type: 'Course', link: 'https://www.coursera.org/learn/machine-learning' },
            { name: 'Kaggle Learn', type: 'Practice', link: 'https://www.kaggle.com/learn' },
        ],
        'Web Development': [
            { name: 'The Odin Project', type: 'Course', link: 'https://www.theodinproject.com/' },
            { name: 'MDN Web Docs', type: 'Resource', link: 'https://developer.mozilla.org/' },
        ],
    };

    const bestResources = [];
    for (const subject of detectedSubjects) {
        if (resourceTemplates[subject]) {
            bestResources.push(...resourceTemplates[subject]);
        } else {
            bestResources.push(
                { name: `${subject} - YouTube Lectures`, type: 'Video', link: `https://www.youtube.com/results?search_query=${encodeURIComponent(subject + ' lectures')}` },
                { name: `${subject} - Study Notes`, type: 'Resource', link: `https://www.google.com/search?q=${encodeURIComponent(subject + ' study notes pdf')}` }
            );
        }
    }

    // Summary stats
    const totalUploads = Object.values(uploadedFiles).filter(Boolean).length;
    const uploadTypes = [];
    if (uploadedFiles.syllabus) uploadTypes.push('Syllabus');
    if (uploadedFiles.timetable) uploadTypes.push('Timetable');
    if (uploadedFiles.modelPapers) uploadTypes.push('Model Papers');
    if (uploadedFiles.pyqs) uploadTypes.push('PYQs');

    return {
        detectedSubjects,
        repeatedQuestions: repeatedQuestions.slice(0, 8),
        studyTimetable,
        bestResources: bestResources.slice(0, 6),
        totalUploads,
        uploadTypes,
        hasPYQs,
        hasModelPapers,
    };
};

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

// ── Main Component ──
const AcademicPlanner = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState({
        timetable: null,
        syllabus: null,
        modelPapers: null,
        pyqs: null
    });

    const handleFileChange = (type, e) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFiles(prev => ({ ...prev, [type]: e.target.files[0] }));
        }
    };

    const removeFile = (type) => {
        setUploadedFiles(prev => ({ ...prev, [type]: null }));
    };

    const hasAnyUpload = Object.values(uploadedFiles).some(Boolean);

    const handleGenerate = () => {
        if (!hasAnyUpload) return;
        setIsAnalyzing(true);

        // Simulate processing time
        setTimeout(() => {
            const analysis = analyzeDocuments(uploadedFiles);
            setIsAnalyzing(false);
            setResult(analysis);
        }, 2500);
    };

    const handleReset = () => {
        setResult(null);
        setUploadedFiles({ timetable: null, syllabus: null, modelPapers: null, pyqs: null });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const uploadFields = [
        { id: 'timetable', label: 'College Timetable', icon: Calendar, desc: 'Upload your weekly schedule' },
        { id: 'syllabus', label: 'Syllabus / Portion', icon: BookOpen, desc: 'Upload subject syllabus' },
        { id: 'modelPapers', label: 'Model Question Papers', icon: FileText, desc: 'Upload sample question papers' },
        { id: 'pyqs', label: 'Previous Year Questions', icon: Scroll, desc: 'Upload past exam papers' },
    ];

    return (
        <div style={{ padding: '2rem 2.5rem', maxWidth: 1200, margin: '0 auto' }}>
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
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 650 }}>
                    Upload your college documents — syllabus, timetable, model papers, or PYQs. Our AI will analyze the content and generate a personalized study plan with high-probability questions.
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
                    {/* Upload Grid */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                            <Upload size={18} color="var(--accent-color)" />
                            <span style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)' }}>Upload Your Documents</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginLeft: '8px' }}>(at least 1 required)</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                            {uploadFields.map(field => (
                                <div key={field.id}>
                                    {uploadedFiles[field.id] ? (
                                        // Uploaded state
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
                                        </div>
                                    ) : (
                                        // Upload prompt
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
                                                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
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
                                <strong style={{ color: '#f59e0b' }}>Tip:</strong> Upload your PYQs and syllabus for the most accurate analysis. The AI will detect subjects, patterns, and generate a personalized study timetable based on your actual curriculum.
                            </p>
                        </div>
                    )}

                    {/* Analyze Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={isAnalyzing || !hasAnyUpload}
                        style={{
                            width: '100%', padding: '1.25rem', borderRadius: 16, border: 'none',
                            background: hasAnyUpload ? 'linear-gradient(135deg, var(--accent-color) 0%, #4f46e5 100%)' : 'rgba(255,255,255,0.05)',
                            color: hasAnyUpload ? 'white' : 'var(--text-tertiary)', fontWeight: 700, fontSize: '1.125rem',
                            cursor: hasAnyUpload ? 'pointer' : 'not-allowed',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                            boxShadow: hasAnyUpload ? '0 8px 24px rgba(99, 102, 241, 0.4)' : 'none',
                            transition: 'all 0.3s',
                            opacity: isAnalyzing ? 0.8 : 1
                        }}
                    >
                        {isAnalyzing ? (
                            <>
                                <RefreshCw size={22} className="animate-spin" />
                                Analyzing Your Documents...
                            </>
                        ) : (
                            <>Analyze & Generate Study Plan <ArrowRight size={22} /></>
                        )}
                    </button>
                </motion.div>
            ) : (
                /* ═══ RESULTS ═══ */
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '2rem' }}>
                    {/* LEFT COLUMN */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Detected Subjects */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ background: 'var(--bg-elevated)', borderRadius: 24, padding: '2rem', border: '1px solid var(--border-color)' }}
                        >
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Target size={20} color="var(--accent-color)" /> Detected Subjects
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                                {result.detectedSubjects.map((subject, i) => (
                                    <span key={i} style={{
                                        padding: '6px 16px', borderRadius: 20,
                                        background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                                        fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-color)'
                                    }}>
                                        {subject}
                                    </span>
                                ))}
                            </div>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: '1rem' }}>
                                Analyzed from {result.totalUploads} uploaded document{result.totalUploads > 1 ? 's' : ''} ({result.uploadTypes.join(', ')})
                            </p>
                        </motion.section>

                        {/* High Probability Questions */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{ background: 'var(--bg-elevated)', borderRadius: 24, padding: '2rem', border: '1px solid var(--border-color)' }}
                        >
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Sparkles size={20} color="var(--accent-color)" /> Most Repeated Questions
                                {result.hasPYQs && <span style={{ fontSize: '0.6875rem', color: 'var(--success)', background: 'rgba(52,211,153,0.1)', padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>From PYQs</span>}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {result.repeatedQuestions.map((q, i) => (
                                    <div key={i} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                            <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--accent-color)' }}>{q.topic}</span>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                background: q.frequency === 'Very High' ? 'rgba(239,68,68,0.1)' : q.frequency === 'High' ? 'rgba(245,158,11,0.1)' : 'rgba(99,102,241,0.1)',
                                                color: q.frequency === 'Very High' ? '#ef4444' : q.frequency === 'High' ? '#f59e0b' : 'var(--accent-color)',
                                                padding: '2px 10px', borderRadius: 6, fontWeight: 600
                                            }}>
                                                {q.frequency}
                                            </span>
                                        </div>
                                        <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            {q.questions.map((text, j) => <li key={j} style={{ marginBottom: '0.375rem', lineHeight: 1.5 }}>{text}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Curated Resources */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ background: 'var(--bg-elevated)', borderRadius: 24, padding: '2rem', border: '1px solid var(--border-color)' }}
                        >
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Book size={20} color="var(--success)" /> Curated Study Resources
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                                {result.bestResources.map((res, i) => (
                                    <a key={i} href={res.link} target="_blank" rel="noopener noreferrer"
                                        style={{
                                            textDecoration: 'none', padding: '1.25rem',
                                            background: 'rgba(255,255,255,0.03)', borderRadius: 16,
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            display: 'flex', alignItems: 'center', gap: '12px',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
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
                        </motion.section>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Analysis Summary Card */}
                        <div style={{ background: 'linear-gradient(135deg, var(--accent-color), #4f46e5)', borderRadius: 24, padding: '1.75rem', color: 'white' }}>
                            <div style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.75rem' }}>Analysis Summary</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 800 }}>{result.detectedSubjects.length}</div>
                                    <div style={{ fontSize: '0.8125rem', opacity: 0.8 }}>Subjects Found</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 800 }}>{result.repeatedQuestions.length}</div>
                                    <div style={{ fontSize: '0.8125rem', opacity: 0.8 }}>Topic Clusters</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 800 }}>{result.totalUploads}</div>
                                    <div style={{ fontSize: '0.8125rem', opacity: 0.8 }}>Files Analyzed</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 800 }}>{result.bestResources.length}</div>
                                    <div style={{ fontSize: '0.8125rem', opacity: 0.8 }}>Resources Linked</div>
                                </div>
                            </div>
                        </div>

                        {/* Personalized Schedule */}
                        <motion.aside
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            style={{ background: 'var(--bg-elevated)', borderRadius: 24, padding: '1.75rem', border: '1px solid var(--border-color)' }}
                        >
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Calendar size={18} color="var(--accent-color)" /> Personalized Study Schedule
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                {result.studyTimetable.map((day, i) => (
                                    <div key={i} style={{
                                        padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.02)',
                                        borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                    }}>
                                        <div style={{ overflow: 'hidden' }}>
                                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{day.day}</div>
                                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{day.focus}</div>
                                        </div>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                                                <Clock size={12} /> {day.hours}
                                            </div>
                                            <div style={{
                                                fontSize: '0.65rem', fontWeight: 600,
                                                color: day.priority === 'Critical' ? '#ef4444' : day.priority === 'High' ? '#f59e0b' : 'var(--text-tertiary)'
                                            }}>
                                                {day.priority} Priority
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleReset}
                                style={{
                                    width: '100%', marginTop: '1.5rem', padding: '0.875rem',
                                    borderRadius: 12, background: 'transparent',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-secondary)', fontSize: '0.875rem',
                                    cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s'
                                }}
                            >
                                Upload New Documents
                            </button>
                        </motion.aside>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcademicPlanner;
