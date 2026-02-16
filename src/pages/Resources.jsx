import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, X, PlayCircle, Clock, User, AlertCircle, FileText, Download, HelpCircle, Lock, Zap, CheckCircle, XCircle, UserMinus, Code } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DomainSearch from '../components/domain/DomainSearch';
import DomainResults from '../components/domain/DomainResults';

const toolsData = [
    {
        id: 'git',
        name: 'Git',
        description: 'Version control system for tracking code changes.',
        difficulty: 'Beginner',
        color: '#f14e32',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
        iconInvert: false,
        whatIs: 'Git is a distributed version control system that tracks changes in source code during software development. It allows multiple developers to work on the same codebase simultaneously without conflicts, maintaining a complete history of every change ever made.',
        whyMatters: 'Every modern development workflow depends on Git. It enables collaboration, code review, rollback to previous versions, and branching strategies. Without Git, managing codebases beyond a few files becomes nearly impossible. It is the foundation of CI/CD pipelines.',
        coreConcepts: [
            'Repositories (local & remote)',
            'Staging area and commits',
            'Branching and merging strategies',
            'Resolving merge conflicts',
            'Git log, diff, and blame',
            'Rebasing vs merging',
            '.gitignore and configuration'
        ],
        exercises: [
            'Initialize a new repository and make your first commit',
            'Create a feature branch, make changes, and merge it back to main',
            'Simulate and resolve a merge conflict between two branches',
            'Use git stash to save and restore work in progress',
            'Practice interactive rebase to squash commits'
        ],
        mastery: [
            'Can initialize and clone repositories',
            'Understands the staging area workflow',
            'Can create, switch, and merge branches',
            'Can resolve merge conflicts confidently',
            'Knows when to rebase vs merge',
            'Can use git log and git diff effectively',
            'Understands .gitignore patterns'
        ],
        resources: [
            { title: 'Pro Git Book', desc: 'The definitive free Git book by Scott Chacon.', type: 'Documentation', source: 'Git', link: 'https://git-scm.com/book/en/v2' },
            { title: 'Learn Git Branching', desc: 'Interactive visual Git tutorial with challenges.', type: 'Practice', source: 'LGBI', link: 'https://learngitbranching.js.org/' },
            { title: 'Git Exercises', desc: 'Hands-on exercises to build Git muscle memory.', type: 'Practice', source: 'Exercism', link: 'https://gitexercises.fracz.com/' },
            { title: 'Atlassian Git Tutorials', desc: 'Beginner to advanced Git workflows.', type: 'Documentation', source: 'Atlassian', link: 'https://www.atlassian.com/git/tutorials' }
        ]
    },
    {
        id: 'docker',
        name: 'Docker',
        description: 'Platform for building and running containerized applications.',
        difficulty: 'Intermediate',
        color: '#2496ed',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
        iconInvert: false,
        whatIs: 'Docker is a platform that uses OS-level virtualization to package applications and their dependencies into lightweight, portable containers. Containers ensure your app runs the same way in every environment — development, staging, and production.',
        whyMatters: 'Docker eliminates "it works on my machine" problems. It simplifies deployment, enables microservices architecture, and is the backbone of modern cloud infrastructure. Knowledge of Docker is essential for DevOps, backend, and full-stack roles.',
        coreConcepts: [
            'Images and containers',
            'Dockerfile syntax and best practices',
            'Docker Compose for multi-container apps',
            'Volumes and persistent storage',
            'Networking between containers',
            'Docker Hub and registries',
            'Container lifecycle management'
        ],
        exercises: [
            'Build a Docker image for a simple Node.js or Python app',
            'Write a docker-compose.yml for a web app + database setup',
            'Create a multi-stage Dockerfile to optimize image size',
            'Mount a volume and persist data across container restarts',
            'Push your custom image to Docker Hub'
        ],
        mastery: [
            'Can write a Dockerfile from scratch',
            'Understands image layers and caching',
            'Can use Docker Compose for multi-service apps',
            'Knows how docker networking works',
            'Can manage volumes for data persistence',
            'Can push/pull images from registries',
            'Understands container vs VM differences'
        ],
        resources: [
            { title: 'Docker Official Docs', desc: 'Comprehensive getting started guide.', type: 'Documentation', source: 'Docker', link: 'https://docs.docker.com/get-started/' },
            { title: 'Docker Curriculum', desc: 'Step-by-step Docker tutorial for beginners.', type: 'Course', source: 'Prakhar', link: 'https://docker-curriculum.com/' },
            { title: 'Play with Docker', desc: 'Free Docker playground in your browser.', type: 'Practice', source: 'PWD', link: 'https://labs.play-with-docker.com/' },
            { title: 'Docker Cheat Sheet', desc: 'Quick reference for Docker commands.', type: 'Documentation', source: 'GitHub', link: 'https://github.com/wsargent/docker-cheat-sheet' }
        ]
    },
    {
        id: 'postman',
        name: 'Postman',
        description: 'API development and testing platform for building reliable APIs.',
        difficulty: 'Beginner',
        color: '#ff6c37',
        icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
        iconInvert: false,
        whatIs: 'Postman is an API platform for designing, building, testing, and documenting APIs. It provides a user-friendly GUI to send HTTP requests, inspect responses, automate testing workflows, and collaborate with teams on API development.',
        whyMatters: 'APIs are the backbone of modern software. Postman lets you test endpoints instantly without writing code, debug API issues, create automated test suites, and generate API documentation. It is used by over 30 million developers worldwide.',
        coreConcepts: [
            'HTTP methods (GET, POST, PUT, DELETE, PATCH)',
            'Request headers, body, and parameters',
            'Environment and global variables',
            'Collections and folder organization',
            'Pre-request scripts and test scripts',
            'Authentication (Bearer, OAuth, API Key)',
            'Mock servers and monitoring'
        ],
        exercises: [
            'Send GET/POST requests to a public API (e.g., JSONPlaceholder)',
            'Set up environment variables for dev/staging/production URLs',
            'Write test scripts to validate response status and body',
            'Create a collection with 5+ endpoints and share it',
            'Use Postman Runner to execute automated test sequences'
        ],
        mastery: [
            'Can send all HTTP method types',
            'Understands request headers and auth tokens',
            'Can use environment variables effectively',
            'Can write basic test assertions',
            'Can organize APIs into collections',
            'Can export/import collections for team sharing',
            'Understands mock servers for frontend development'
        ],
        resources: [
            { title: 'Postman Learning Center', desc: 'Official tutorials and guides.', type: 'Documentation', source: 'Postman', link: 'https://learning.postman.com/' },
            { title: 'Postman Quickstart', desc: 'Send your first API request in minutes.', type: 'Course', source: 'Postman', link: 'https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/' },
            { title: '15 Days of Postman', desc: 'Structured challenge to learn Postman.', type: 'Practice', source: 'Postman', link: 'https://www.postman.com/postman/workspace/15-days-of-postman---for-testers/' }
        ]
    },
    {
        id: 'vscode',
        name: 'VS Code',
        description: 'Lightweight, powerful code editor with rich extension ecosystem.',
        difficulty: 'Beginner',
        color: '#007acc',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg',
        iconInvert: false,
        whatIs: 'Visual Studio Code (VS Code) is a free, open-source code editor by Microsoft. It supports syntax highlighting, IntelliSense (code completion), debugging, Git integration, and thousands of extensions for virtually every programming language and framework.',
        whyMatters: 'VS Code is the most popular code editor in the world. Mastering it directly impacts your coding speed and productivity. Features like multi-cursor editing, integrated terminal, live share, and extension-driven workflows make it indispensable for modern developers.',
        coreConcepts: [
            'Editor layout and workspace settings',
            'Keyboard shortcuts and command palette (Cmd/Ctrl+Shift+P)',
            'IntelliSense and code completion',
            'Integrated terminal and debugging',
            'Extensions marketplace',
            'Git integration and source control panel',
            'Settings sync and custom snippets'
        ],
        exercises: [
            'Customize your VS Code theme, font, and key bindings',
            'Install and configure 5 essential extensions for your stack',
            'Use multi-cursor editing to refactor a block of code',
            'Set up a launch.json debug configuration for your project',
            'Create a custom code snippet for common boilerplate'
        ],
        mastery: [
            'Knows 10+ keyboard shortcuts by heart',
            'Can use Command Palette for quick actions',
            'Has a productive extension setup',
            'Can debug with breakpoints & watch variables',
            'Uses integrated Git panel effectively',
            'Can configure workspace settings per project',
            'Understands multi-cursor and Zen mode'
        ],
        resources: [
            { title: 'VS Code Official Docs', desc: 'Complete feature documentation.', type: 'Documentation', source: 'Microsoft', link: 'https://code.visualstudio.com/docs' },
            { title: 'VS Code Tips & Tricks', desc: 'Boost your productivity with these tips.', type: 'Documentation', source: 'Microsoft', link: 'https://code.visualstudio.com/docs/getstarted/tips-and-tricks' },
            { title: 'VS Code Keyboard Shortcuts (PDF)', desc: 'Printable shortcut reference.', type: 'Documentation', source: 'Microsoft', link: 'https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf' },
            { title: 'VS Code Can Do That?!', desc: 'Hidden features most developers miss.', type: 'Course', source: 'Burke', link: 'https://vscodecandothat.com/' }
        ]
    },
    {
        id: 'aws',
        name: 'AWS (Cloud Basics)',
        description: 'Amazon Web Services — the leading cloud computing platform.',
        difficulty: 'Intermediate',
        color: '#ff9900',
        icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        iconInvert: false,
        whatIs: 'Amazon Web Services (AWS) is the world\'s most widely adopted cloud platform, offering 200+ fully featured services. It provides compute power (EC2), storage (S3), databases (RDS/DynamoDB), serverless (Lambda), networking, machine learning, and much more — all on a pay-as-you-go basis.',
        whyMatters: 'Cloud computing is the standard for modern applications. AWS holds ~32% of the global cloud market share. Understanding AWS basics (S3, EC2, Lambda, IAM) is essential for deployment, scalability, and passing cloud certification exams required by many employers.',
        coreConcepts: [
            'AWS Console and CLI basics',
            'IAM (Identity & Access Management)',
            'EC2 instances and security groups',
            'S3 buckets and static website hosting',
            'Lambda functions (serverless)',
            'RDS and DynamoDB (managed databases)',
            'CloudFront CDN and Route 53 DNS'
        ],
        exercises: [
            'Create a free-tier AWS account and explore the console',
            'Launch an EC2 instance and SSH into it',
            'Create an S3 bucket and host a static website',
            'Write and deploy a simple Lambda function',
            'Set up IAM users, groups, and policies'
        ],
        mastery: [
            'Can navigate the AWS Console confidently',
            'Understands IAM roles and permissions',
            'Can launch and manage EC2 instances',
            'Can create and configure S3 buckets',
            'Understands serverless with Lambda',
            'Knows the difference between RDS and DynamoDB',
            'Can explain the AWS shared responsibility model'
        ],
        resources: [
            { title: 'AWS Getting Started', desc: 'Official AWS resource center for beginners.', type: 'Documentation', source: 'AWS', link: 'https://aws.amazon.com/getting-started/' },
            { title: 'AWS Cloud Practitioner Essentials', desc: 'Free foundational cloud training.', type: 'Course', source: 'AWS', link: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials' },
            { title: 'AWS Free Tier', desc: 'Practice with free compute, storage, and databases.', type: 'Practice', source: 'AWS', link: 'https://aws.amazon.com/free/' },
            { title: 'AWS Well-Architected Framework', desc: 'Best practices for cloud architecture.', type: 'Documentation', source: 'AWS', link: 'https://aws.amazon.com/architecture/well-architected/' }
        ]
    }
];

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
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [expandedTool, setExpandedTool] = useState(null);
    
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

            <DomainSearch onDomainSelect={setSelectedDomain} />

            {selectedDomain && (
                <div className="fade-in">
                    <button 
                        onClick={() => setSelectedDomain(null)} 
                        style={{ 
                            background: 'transparent', border: 'none', color: '#9ca3af', 
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                            marginBottom: '1rem', fontSize: '0.9rem'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                        Back to All Resources
                    </button>
                    <DomainResults domainData={selectedDomain} isPremium={isPremium} />
                </div>
            )}

            {/* Notes Section */}
            {!selectedDomain && Object.entries(notesData).map(([category, notes]) => (
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

            {/* 🛠 TOOLS SECTION */}
            {!selectedDomain && (
                <section>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
                        <div style={{ width: 4, height: 24, background: 'var(--accent-color)', borderRadius: 2 }}></div>
                        🛠 Tools
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', marginTop: '-0.75rem' }}>
                        Master the essential developer tools used across every tech role.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1rem' }}>
                        {toolsData.map((tool) => {
                            const isExpanded = expandedTool === tool.id;
                            return (
                                <motion.div
                                    key={tool.id}
                                    layout
                                    className="glass-card"
                                    style={{ 
                                        padding: 0, overflow: 'hidden',
                                        gridColumn: isExpanded ? '1 / -1' : 'auto',
                                        transition: 'box-shadow 0.3s',
                                        boxShadow: isExpanded ? '0 8px 32px rgba(124, 58, 237, 0.12)' : 'none'
                                    }}
                                >
                                    {/* Card Header */}
                                    <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ 
                                            width: 48, height: 48, borderRadius: '12px', 
                                            background: `${tool.color}12`, 
                                            border: `1px solid ${tool.color}30`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                            flexShrink: 0
                                        }}>
                                            <img src={tool.icon} alt={tool.name} style={{ width: 28, height: 28, objectFit: 'contain', filter: tool.iconInvert ? 'invert(1)' : 'none' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '3px', color: 'var(--text-primary)' }}>{tool.name}</h3>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{tool.description}</p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                                            <span style={{ 
                                                fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px',
                                                background: tool.difficulty === 'Beginner' ? 'rgba(34, 197, 94, 0.1)' : tool.difficulty === 'Intermediate' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: tool.difficulty === 'Beginner' ? '#4ade80' : tool.difficulty === 'Intermediate' ? '#fbbf24' : '#f87171',
                                                border: `1px solid ${tool.difficulty === 'Beginner' ? 'rgba(34, 197, 94, 0.2)' : tool.difficulty === 'Intermediate' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                                                textTransform: 'uppercase', letterSpacing: '0.5px'
                                            }}>
                                                {tool.difficulty}
                                            </span>
                                            <button
                                                onClick={() => setExpandedTool(isExpanded ? null : tool.id)}
                                                style={{
                                                    padding: '6px 16px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600,
                                                    background: isExpanded ? 'rgba(255,255,255,0.08)' : 'var(--accent-color)',
                                                    color: 'white', border: 'none', cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {isExpanded ? 'Hide Details' : 'View Details'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded Details Panel */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-color)' }}>
                                                    {/* Info Grid */}
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1.25rem' }}>
                                                        {/* What is this tool */}
                                                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: tool.color, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <HelpCircle size={14} /> What is {tool.name}?
                                                            </h4>
                                                            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{tool.whatIs}</p>
                                                        </div>

                                                        {/* Why it matters */}
                                                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <Zap size={14} /> Why It Matters
                                                            </h4>
                                                            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{tool.whyMatters}</p>
                                                        </div>

                                                        {/* Core Concepts */}
                                                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <FileText size={14} /> Core Concepts
                                                            </h4>
                                                            <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.25rem', margin: 0 }}>
                                                                {tool.coreConcepts.map((concept, ci) => (
                                                                    <li key={ci}>{concept}</li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Practical Exercises */}
                                                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <Code size={14} /> Practical Exercises
                                                            </h4>
                                                            <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.25rem', margin: 0 }}>
                                                                {tool.exercises.map((ex, ei) => (
                                                                    <li key={ei}>{ex}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    {/* Mastery Checklist */}
                                                    <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(80, 250, 123, 0.03)', borderRadius: '12px', border: '1px solid rgba(80, 250, 123, 0.08)' }}>
                                                        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#50fa7b', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <CheckCircle size={14} /> Mastery Checklist
                                                        </h4>
                                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.5rem' }}>
                                                            {tool.mastery.map((item, mi) => (
                                                                <label key={mi} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px 0' }}>
                                                                    <input type="checkbox" style={{ accentColor: '#50fa7b', cursor: 'pointer' }} />
                                                                    {item}
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Curated Resources (3+ per tool) */}
                                                    <div style={{ marginTop: '1.25rem' }}>
                                                        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-color)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <Download size={14} /> Curated Resources
                                                        </h4>
                                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
                                                            {tool.resources.map((res, ri) => (
                                                                <a
                                                                    key={ri}
                                                                    href={res.link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{
                                                                        display: 'flex', flexDirection: 'column', gap: '0.4rem',
                                                                        padding: '0.85rem', borderRadius: '10px',
                                                                        background: 'rgba(255,255,255,0.02)',
                                                                        border: '1px solid rgba(255,255,255,0.06)',
                                                                        textDecoration: 'none', color: 'inherit',
                                                                        transition: 'all 0.2s'
                                                                    }}
                                                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                                                >
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <span style={{ 
                                                                            fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase',
                                                                            color: res.type === 'Documentation' ? '#60a5fa' : res.type === 'Practice' ? '#4ade80' : '#facc15',
                                                                            background: res.type === 'Documentation' ? 'rgba(96,165,250,0.1)' : res.type === 'Practice' ? 'rgba(74,222,128,0.1)' : 'rgba(250,204,21,0.1)',
                                                                            padding: '2px 6px', borderRadius: '4px'
                                                                        }}>
                                                                            {res.type}
                                                                        </span>
                                                                        <span style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)' }}>{res.source}</span>
                                                                    </div>
                                                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{res.title}</span>
                                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{res.desc}</span>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            {!selectedDomain && <div style={{ width: '100%', height: '1px', background: 'var(--border-color)', margin: '1rem 0', opacity: 0.3 }}></div>}

            {!selectedDomain && Object.entries(resourcesData).map(([lang, videos]) => (
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
