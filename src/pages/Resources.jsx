import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, X, PlayCircle, Clock, User, AlertCircle, FileText, Download, HelpCircle, Lock, Zap, CheckCircle, XCircle, UserMinus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const resourcesData = {
  "Full Stack Developer": [
    { title: "Full Stack Developer Roadmap 2025", channel: "MindMajix", duration: "25:00", id: "UYSALHs7BYk" },
    { title: "Web Development In 2024", channel: "Traversy Media", duration: "1:07:00", id: "8sXRyHI3bLw" }
  ],
  "LLM Engineer": [
    { title: "Let's build GPT: from scratch", channel: "Andrej Karpathy", duration: "1:56:00", id: "kCc8FmEb1nY" },
    { title: "Intro to Large Language Models", channel: "Andrej Karpathy", duration: "1:00:00", id: "zjkBMFhNj_g" }
  ],
  "AI Engineer": [
    { title: "Machine Learning for Everybody", channel: "freeCodeCamp", duration: "3:53:00", id: "i_LwzRVP7bg" },
    { title: "AI Engineering Roadmap", channel: "Patrick Loeber", duration: "20:15", id: "pHiMN_gy9mk" }
  ],
  "Data Scientist": [
    { title: "Data Science for Beginners", channel: "freeCodeCamp", duration: "2:10:00", id: "ua-CiDNNj30" },
    { title: "Complete Data Science Roadmap", channel: "Krish Naik", duration: "15:20", id: "X3paOmcrTjQ" }
  ],
  "Backend Developer": [
    { title: "Backend Software Engineer Mind Map", channel: "Caleb Curry", duration: "2:00:00", id: "oVfw8Oj-uH8" },
    { title: "System Design for Beginners", channel: "Gaurav Sen", duration: "1:30:00", id: "bUHFg8CZFws" }
  ],
  "Frontend Developer": [
    { title: "Frontend Web Development", channel: "freeCodeCamp", duration: "21:00:00", id: "zJSY8tbf_ys" },
    { title: "CSS Zero to Hero", channel: "freeCodeCamp", duration: "6:18:00", id: "1Rs2ND1ryYc" }
  ],
  "DevOps Engineer": [
    { title: "DevOps Roadmap 2024", channel: "TechWorld with Nana", duration: "45:00", id: "9pZ2xmsSDdo" },
    { title: "Docker Tutorial for Beginners", channel: "Programming with Mosh", duration: "1:00:00", id: "pTFZFxd4hOI" }
  ],
  "Cloud Engineer": [
    { title: "Azure Fundamentals (AZ-900) Exam Cram", channel: "John Savill", duration: "3:30:00", id: "8n-kWJetQRk" },
    { title: "AWS Certified Cloud Practitioner", channel: "freeCodeCamp", duration: "13:00:00", id: "SOTamWNgDKc" }
  ],
  "Cybersecurity Engineer": [
    { title: "Cyber Security Full Course 2026", channel: "Simplilearn", duration: "11:00:00", id: "HZzXbxajz80" },
    { title: "The Hacker's Roadmap 2025", channel: "NetworkChuck", duration: "45:00", id: "5xWnmUEi1Qw" }
  ],
  "Mobile App Developer": [
    { title: "React Native for Beginners", channel: "Programming with Mosh", duration: "2:00:00", id: "0-S5a0eXPoc" },
    { title: "Flutter Course for Beginners", channel: "freeCodeCamp", duration: "37:00:00", id: "VPvVD8t02U8" }
  ],
  "Python": [
    { title: "Python for Beginners - Full Course", channel: "Programming with Mosh", duration: "6:14:07", id: "_uQrJ0TkZlc" }
  ],
  "Java": [
    { title: "Java Full Course", channel: "Programming with Mosh", duration: "2:30:00", id: "eIrMbAQSU34" }
  ],
  "C++": [
    { title: "C++ Tutorial for Beginners", channel: "The Cherno", duration: "25:10", id: "vLnPwxZdW4Y" }
  ]
};

// DYNAMIC NOTE LOADER
// Automatically imports PDF/DOC/TXT files from subfolders in src/assets/notes
const noteModules = import.meta.glob('../assets/notes/**/*.{pdf,doc,docx,txt,md}', { eager: true, import: 'default' });

const notesData = (() => {
  const grouped = {};
  
  Object.entries(noteModules).forEach(([path, url]) => {
    // path is relative, e.g., ../assets/notes/React/Cheatsheet.pdf
    const parts = path.split('/');
    const fileName = parts.pop();
    const folderName = parts[parts.indexOf('notes') + 1]; // Get folder after 'notes'
    
    // If file is directly in 'notes', folderName will be undefined (or the file itself if logic is flawed, but here parts.pop removed filename)
    // Actually if path is ../assets/notes/file.pdf, parts is ['..', 'assets', 'notes']. 
    // parts.indexOf('notes') is 2. parts[3] is undefined. Correct.
    
    const category = folderName ? folderName.replace(/_/g, " ") : "General Notes";
    
    if (!grouped[category]) grouped[category] = [];
    
    const title = fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
    const ext = fileName.split('.').pop().toUpperCase();
    
    grouped[category].push({ title, type: ext, link: url, size: "Download" });
  });
  
  return grouped;
})();

const getTechIcon = (title, category = '') => {
    const t = title.toLowerCase();
    const c = category.toLowerCase();
    
    // Explicit exclusions
    if (c.includes('interview')) return null;

    // C Language Specific (Distinct from C++)
    // Checks for " c ", " c", "c " or "the ultimate c handbook" patterns
    if (t.includes(' c ') || t.endsWith(' c') || t.startsWith('c ') || t.includes('ultimate c handbook')) {
        return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg';
    }

    if (t.includes('cpp') || t.includes('c++')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg';
    if (t.includes('python')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg';
    if (t.includes('java') && !t.includes('script')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg';
    if (t.includes('html')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg';
    if (t.includes('css')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg';
    if (t.includes('javascript') || t.includes('js')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg';
    if (t.includes('react')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg';
    if (t.includes('sql') || t.includes('database') || t.includes('dbms')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg';
    if (t.includes('github')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg';
    if (t.includes('git')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg';
    if (t.includes('swift')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg';
    if (t.includes('csharp') || t.includes('c#')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg';
    if (t.includes('linux')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg';
    if (t.includes('docker')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg';
    if (t.includes('kubernetes') || t.includes('k8s')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg';
    if (t.includes('aws')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg';
    if (t.includes('azure')) return 'https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg';
    return null;
};

const Resources = () => {
    const { user } = useAuth();
    const storageKey = user?.id ? `lc_pro_${user.id}` : 'lc_pro_guest';
    
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    
    // Initialize from localStorage
    const [isPremium, setIsPremium] = useState(() => localStorage.getItem(storageKey) === 'true');
    
    // Listen for changes
    React.useEffect(() => {
        const check = () => setIsPremium(localStorage.getItem(storageKey) === 'true');
        window.addEventListener('storage', check);
        window.addEventListener('pro-status-update', check);
        return () => {
            window.removeEventListener('storage', check);
            window.removeEventListener('pro-status-update', check);
        };
    }, [storageKey]);

    const [requestForm, setRequestForm] = useState({ topic: '', domain: 'Full Stack', difficulty: 'Beginner', language: 'English', email: '' });
    const [generatedContent, setGeneratedContent] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [emailStatus, setEmailStatus] = useState(null); // 'sending', 'sent', 'error'
    const [isSpeaking, setIsSpeaking] = useState(false); // TTS State

    const domains = Object.keys(resourcesData);

    // Language Mapping for TTS
    const langMap = {
        'English': 'en-IN',
        'Hindi': 'hi-IN',
        'Kannada': 'kn-IN',
        'Tamil': 'ta-IN',
        'Telugu': 'te-IN',
        'Malayalam': 'ml-IN',
        'Marathi': 'mr-IN'
    };

    // PAYMENT STATE
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [utrNumber, setUtrNumber] = useState('');
    const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

    // MANUAL PAYMENT VERIFICATION
    const handleVerifyPayment = () => {
        if (!utrNumber || utrNumber.length < 12) {
            alert("Please enter a valid 12-digit UTR Transaction ID.");
            return;
        }

        setIsVerifyingPayment(true);

        // Simulate Verification Delay
        setTimeout(() => {
            setIsVerifyingPayment(false);
            if (utrNumber === '123456789012' || utrNumber.length === 12) { // Allow any 12 digit for demo
                alert("Payment Verified Successfully! You are now a Premium Member. Notes will be sent to your email.");
                localStorage.setItem(storageKey, 'true');
                setIsPremium(true);
                window.dispatchEvent(new Event('pro-status-update'));
                setShowPaymentModal(false);
                // Regenerate full text since we are now premium
                if (generatedContent) {
                   setGeneratedContent(prev => ({
                       ...prev,
                       full: `\n\n1. Core Concepts (UNLOCKED)\nDetailed explanation of ${requestForm.topic} architecture.\n\n2. Implementation\nStep-by-step code examples in ${requestForm.language}.\n\n3. Interview Questions\n- What is ${requestForm.topic}?\n- How does it optimize performance?\n\n4. Summary\nComplete mastery of ${requestForm.domain} requires understanding these patterns.`
                   }));
                }
            } else {
                alert("Invalid UTR Number. Please check and try again.");
            }
        }, 2000);
    };

    // Razorpay Integration


    const handleRequestSubmit = async () => {
        if (!requestForm.topic) return;

        // Validation: If Premium, Email is mandatory for delivery
        if (isPremium && (!requestForm.email || !requestForm.email.includes('@'))) {
            alert("Premium Error: Please enter a valid email address to receive your notes.");
            return;
        }

        setIsGenerating(true);
        setEmailStatus(null);
        
        // 1. Generate Preview (Local Simulation)
        const previewText = `Introduction to ${requestForm.topic}.\n\nThis guide covers the fundamental concepts of ${requestForm.topic} in ${requestForm.domain}. You will learn about core principles, best practices, and implementation strategies suitable for ${requestForm.difficulty} level developers.\n\nKey takeaways include...`;
        
        const fullText = `\n\n1. Core Concepts\nDetailed explanation of ${requestForm.topic} architecture.\n\n2. Implementation\nStep-by-step code examples in ${requestForm.language}.\n\n3. Interview Questions\n- What is ${requestForm.topic}?\n- How does it optimize performance?\n\n4. Summary\nComplete mastery of ${requestForm.domain} requires understanding these patterns.`;

        const content = {
            title: `${requestForm.topic} - ${requestForm.difficulty} Guide`,
            preview: previewText,
            full: isPremium ? fullText : null // Only generate full text object if premium initially, otherwise null
        };

        // 2. If Premium & Email Provided -> Send Email via Server
        if (isPremium && requestForm.email) {
             setEmailStatus('sending');
             try {
                const res = await fetch('http://localhost:8000/api/send-notes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: requestForm.email,
                        topic: requestForm.topic,
                        domain: requestForm.domain,
                        difficulty: requestForm.difficulty,
                        language: requestForm.language,
                        is_premium: isPremium
                    })
                });
                const data = await res.json();
                if (data.status === 'success') {
                    setEmailStatus('sent');
                } else {
                    setEmailStatus('error');
                    console.error("Email failed:", data.message);
                }
             } catch (e) {
                 setEmailStatus('error');
                 console.error("Server error:", e);
             }
        }

        setTimeout(() => {
            setGeneratedContent(content);
            setIsGenerating(false);
        }, 1500);
    };
    
    // Stop speech explicitly when closing modal
    const closeRequestModal = () => {
        setShowRequestModal(false);
        setGeneratedContent(null);
        setRequestForm({ topic: '', domain: 'Full Stack', difficulty: 'Beginner', language: 'English', email: '' });
        setEmailStatus(null);
        handleStopListen();
    };



    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Resource Hub</h1>
                    <p>Verified high-quality technical content curated for all learning paths.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button 
                        onClick={() => setShowRequestModal(true)}
                        style={{ 
                            background: 'linear-gradient(135deg, #bd93f9 0%, #8be9fd 100%)', // Premium gradient
                            border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', 
                            color: '#000', fontWeight: 700, cursor: 'pointer', 
                            display: 'flex', alignItems: 'center', gap: '8px',
                            boxShadow: '0 4px 12px rgba(189, 46, 113, 0.3)'
                        }}
                    >
                        <FileText size={18} fill="black" /> Request Custom Notes
                    </button>
                </div>
            </header>

            {/* Notes Section */}
            {Object.entries(notesData).map(([category, notes]) => (
                <section key={category}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
                        <div style={{ width: 4, height: 24, background: 'var(--accent-color)', borderRadius: 2 }}></div>
                        {category}
                    </h2>
                    <div className="responsive-grid">
                        {notes.map((note) => (
                            <motion.a 
                                key={note.title}
                                href={note.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="glass-card" 
                                style={{ 
                                    textDecoration: 'none', 
                                    color: 'inherit',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    minHeight: '160px'
                                }}
                            >
                                <div>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'flex-start',
                                        marginBottom: '1rem'
                                    }}>
                                        {getTechIcon(note.title, category) ? (
                                            <img 
                                                src={getTechIcon(note.title, category)} 
                                                alt={note.title} 
                                                style={{ 
                                                    width: 40, height: 40, objectFit: 'contain',
                                                    filter: getTechIcon(note.title, category).includes('github') ? 'invert(1)' : 'none'
                                                }} 
                                            />
                                        ) : (
                                            <FileText size={32} color="var(--accent-color)" />
                                        )}
                                        <div style={{ 
                                            background: 'rgba(255,255,255,0.1)', 
                                            padding: '4px 8px', 
                                            borderRadius: '4px', 
                                            fontSize: '0.75rem', 
                                            fontWeight: 700 
                                        }}>
                                            {note.type}
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{note.title}</h3>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 'auto' }}>
                                    <span>{note.size}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-color)' }}>
                                        Download <Download size={14} />
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </section>
            ))}

            <div style={{ width: '100%', height: '1px', background: 'var(--border-color)', margin: '1rem 0', opacity: 0.3 }}></div>

            {Object.entries(resourcesData).map(([lang, videos]) => (
                <section key={lang}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
                        <div style={{ width: 4, height: 24, background: 'var(--accent-color)', borderRadius: 2 }}></div>
                        {lang} Resources
                    </h2>
                    <div className="responsive-grid">
                        {videos.map((video) => (
                            <motion.div 
                                key={video.id + video.title}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="glass-card" 
                                style={{ overflow: 'hidden', cursor: 'pointer' }}
                                onClick={() => setSelectedVideo(video)}
                            >
                                <div style={{ position: 'relative', height: 180 }}>
                                    {/* Using hqdefault.jpg to ensure 100% reliability of thumbnails */}
                                    <img 
                                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                                        alt={video.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ 
                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                                        background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <PlayCircle size={48} color="white" style={{ opacity: 0.8 }} />
                                    </div>
                                    <div style={{ 
                                        position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.8)', 
                                        padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 
                                    }}>
                                        {video.duration}
                                    </div>
                                </div>
                                <div style={{ padding: '1.25rem' }}>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', height: '2.5rem', overflow: 'hidden' }}>{video.title}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <User size={14} /> {video.channel}
                                        </div>
                                        <div style={{ color: '#ff0000', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Youtube size={14} /> Local Mirror
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            ))}

            <AnimatePresence>
                {selectedVideo && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ 
                            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                            background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ width: '90%', maxWidth: 1000, aspectRatio: '16/9', position: 'relative' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedVideo(null)}
                                style={{ 
                                    position: 'absolute', top: -40, right: 0, background: 'none', border: 'none', 
                                    color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                                }}
                            >
                                <X size={24} /> Close
                            </button>
                            <iframe 
                                width="100%" height="100%" 
                                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`} 
                                title="YouTube video player" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowfullscreen
                                style={{ borderRadius: '16px', border: '1px solid var(--border-color)', background: 'black' }}
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Request Modal */}
            <AnimatePresence>
                {showRequestModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ 
                            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                            background: 'rgba(0,0,0,0.85)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backdropFilter: 'blur(5px)'
                        }}
                        onClick={closeRequestModal}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            style={{ 
                                width: '90%', maxWidth: 500, background: '#1a1b26', 
                                border: '1px solid var(--border-color)', borderRadius: '16px', 
                                padding: '2rem', position: 'relative', overflow: 'hidden'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button 
                                onClick={closeRequestModal}
                                style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>

                            {/* Title & Badge */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Request Custom Notes</h2>
                                    {isPremium ? (
                                        <span style={{ background: 'rgba(80, 250, 123, 0.1)', color: '#50fa7b', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(80, 250, 123, 0.2)', fontWeight: 700 }}>PREMIUM ACCESS</span>
                                    ) : (
                                        <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#888', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.2)', fontWeight: 700 }}>FREE USER</span>
                                    )}
                                </div>
                                <p style={{ fontSize: '0.9rem', color: '#888' }}>
                                    Generate AI-powered structured study guides for any topic.
                                </p>
                            </div>

                            {!generatedContent ? (
                                /* INPUT FORM */
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#ccc' }}>Topic</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Redux Toolkit, Kubernetes Pods..." 
                                            value={requestForm.topic}
                                            onChange={e => setRequestForm({...requestForm, topic: e.target.value})}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} 
                                        />
                                    </div>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#ccc' }}>Domain</label>
                                            <select 
                                                value={requestForm.domain}
                                                onChange={e => setRequestForm({...requestForm, domain: e.target.value})}
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#121212', color: 'white' }}
                                            >
                                                {domains.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#ccc' }}>Difficulty</label>
                                            <select 
                                                value={requestForm.difficulty}
                                                onChange={e => setRequestForm({...requestForm, difficulty: e.target.value})}
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#121212', color: 'white' }}
                                            >
                                                <option>Beginner</option>
                                                <option>Intermediate</option>
                                                <option>Advanced</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#ccc' }}>Email Delivery (Premium)</label>
                                        <input 
                                            type="email" 
                                            placeholder="Enter your email to receive notes..." 
                                            value={requestForm.email}
                                            onChange={e => setRequestForm({...requestForm, email: e.target.value})}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} 
                                        />
                                        {!isPremium && <div style={{ fontSize: '0.75rem', color: '#ff5555', marginTop: '4px' }}>Email delivery is only available for Premium members.</div>}
                                    </div>

                                    <button 
                                        onClick={handleRequestSubmit}
                                        disabled={isGenerating || !requestForm.topic}
                                        style={{ 
                                            marginTop: '0.5rem', width: '100%', padding: '1rem', borderRadius: '8px', 
                                            background: 'var(--accent-color)', color: 'white', border: 'none', fontWeight: 700,
                                            cursor: 'pointer', opacity: (!requestForm.topic || isGenerating) ? 0.6 : 1,
                                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
                                        }}
                                    >
                                        {isGenerating ? (
                                            <>Generating & Sending... <Clock className="spin" size={18} /></>
                                        ) : (
                                            <>Generate & Send Notes <Zap size={18} /></>
                                        )}
                                    </button>
                                    
                                    {/* Toggle for Demo */}
                                    <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                                         <button onClick={() => setIsPremium(!isPremium)} style={{ background: 'none', border: 'none', color: '#444', fontSize: '0.7rem', cursor: 'pointer' }}>
                                            [Demo: Toggle Premium Status]
                                         </button>
                                    </div>
                                </div>
                            ) : (
                                /* RESULT VIEW */
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>{generatedContent.title}</h3>
                                            {emailStatus === 'sent' && (
                                                <div style={{ fontSize: '0.8rem', color: '#50fa7b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <CheckCircle size={14} /> Sent to email
                                                </div>
                                            )}
                                        </div>
                                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#ddd' }}>
                                            {generatedContent.preview}
                                        </p>
                                        
                                        {!isPremium && (
                                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 85, 85, 0.1)', border: '1px dashed #ff5555', borderRadius: '8px', color: '#ffaaaa', fontSize: '0.9rem', textAlign: 'center' }}>
                                                <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><Lock size={24} /></div>
                                                <strong style={{ display: 'block', marginBottom: '4px' }}>Premium Content Locked</strong>
                                                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Full structure, code examples, and TTS audio features are locked.</div>
                                            </div>
                                        )}

                                        {isPremium && generatedContent.full && (
                                             <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#ddd', marginTop: '1rem', whiteSpace: 'pre-line' }}>
                                                {generatedContent.full}
                                             </p>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        {!isPremium && (
                                            <button 
                                                onClick={() => setShowPaymentModal(true)}
                                                style={{ 
                                                    flex: 1, padding: '0.75rem', 
                                                    background: 'linear-gradient(90deg, #ff8a00, #e52e71)', color: 'white', 
                                                    border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                                    boxShadow: '0 4px 15px rgba(229, 46, 113, 0.4)'
                                                }}
                                            >
                                                <Zap size={16} fill="white" /> Upgrade to Unlock Full Notes (₹199)
                                            </button>
                                        )}
                                        
                                        {isPremium && (
                                            <div style={{ flex: 1, padding: '1rem', background: 'rgba(80, 250, 123, 0.1)', border: '1px solid #50fa7b', borderRadius: '8px', textAlign: 'center' }}>
                                                <p style={{ color: '#50fa7b', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                    <CheckCircle size={16} /> Payment Verified
                                                </p>
                                                <p style={{ color: '#ccc', fontSize: '0.8rem', marginTop: '4px' }}>
                                                    Full notes will be sent to your email soon.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={() => setGeneratedContent(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.85rem' }}>Start New Request</button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* MANUAL PAYMENT MODAL */}
            <AnimatePresence>
                {showPaymentModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ 
                            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                            background: 'rgba(0,0,0,0.85)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backdropFilter: 'blur(8px)'
                        }}
                        onClick={() => setShowPaymentModal(false)}
                    >
                         <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ 
                                width: '90%', maxWidth: 450, background: '#121212', 
                                border: '1px solid var(--border-color)', borderRadius: '16px', 
                                padding: '2rem', position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setShowPaymentModal(false)}
                                style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>

                            <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'white', textAlign: 'center' }}>Scan & Pay via UPI</h2>
                            
                            <div style={{ background: '#1e1e2d', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #333', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Scan the QR Code using any UPI App</p>
                                
                                <div style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
                                    <img src="/upi_qrcode.png" alt="UPI QR Code" style={{ width: '180px', height: '180px', objectFit: 'contain' }} />
                                </div>

                                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                    <p style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '2px' }}>UPI ID</p>
                                    <strong style={{ color: '#fff', fontSize: '1.1rem', letterSpacing: '0.5px' }}>vikasmh@fam</strong>
                                </div>

                                <hr style={{ width: '100%', border: 'none', borderTop: '1px solid #333', margin: '0.5rem 0' }}/>
                                <div style={{ textAlign: 'left', width: '100%' }}>
                                    <p style={{ color: '#ccc', fontSize: '0.85rem', marginBottom: '4px' }}><strong>Step 1:</strong> Pay <strong style={{color: '#50fa7b'}}>₹199</strong> via UPI.</p>
                                    <p style={{ color: '#ccc', fontSize: '0.85rem' }}><strong>Step 2:</strong> Enter 12-digit UTR below.</p>
                                </div>
                            </div>

                            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#ccc' }}>Enter UTR / Transaction ID</label>
                            <input 
                                type="text" 
                                placeholder="e.g. 123456789012" 
                                value={utrNumber}
                                onChange={e => setUtrNumber(e.target.value.replace(/\D/g,''))} // number only
                                style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#000', color: 'white', outline: 'none', fontSize: '1rem', letterSpacing: '1px' }} 
                                maxLength={12}
                            />
                            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px', textAlign: 'right' }}>{utrNumber.length}/12 digits</p>

                            <button 
                                onClick={handleVerifyPayment}
                                disabled={isVerifyingPayment || utrNumber.length < 12}
                                style={{ 
                                    marginTop: '1.5rem', width: '100%', padding: '1rem', borderRadius: '8px', 
                                    background: (isVerifyingPayment || utrNumber.length < 12) ? '#333' : '#50fa7b', 
                                    color: (isVerifyingPayment || utrNumber.length < 12) ? '#666' : 'black',
                                    border: 'none', fontWeight: 700, cursor: (isVerifyingPayment || utrNumber.length < 12) ? 'not-allowed' : 'pointer',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
                                }}
                            >
                                {isVerifyingPayment ? (
                                    <>Verifying Payment <Clock className="spin" size={18} /></>
                                ) : (
                                    <>Verify Payment & Unlock <CheckCircle size={18} /></>
                                )}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Resources;
