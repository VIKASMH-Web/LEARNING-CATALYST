import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Bell, AlertCircle, Clock, Zap, Award, Globe, RotateCcw, ChevronDown, ChevronRight } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { getDomains, enDomains } from '../data/domains';
import { roadmapResources } from '../data/roadmapResources';
import { Search, ExternalLink, BookOpen, Video, Code, FileText } from 'lucide-react';

const Roadmaps = () => {
    // Context
    const { 
        roadmapProgress, updateRoadmapProgress, resetRoadmapProgress, 
        notifications, addNotification, clearNotifications 
    } = useProgress();

    const [currentLang, setCurrentLang] = useState('en');
    const [showNotif, setShowNotif] = useState(false);
    const [expandedDomains, setExpandedDomains] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedStageResources, setExpandedStageResources] = useState({});
    const [activeResourceTab, setActiveResourceTab] = useState('All'); // 'All', 'Documentation', 'Video', 'Course', 'Practice'
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('lc_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    const toggleFavorite = (link) => {
        setFavorites(prev => {
            const newFavs = prev.includes(link) 
                ? prev.filter(l => l !== link)
                : [...prev, link];
            localStorage.setItem('lc_favorites', JSON.stringify(newFavs));
            // Trigger a local custom event for other components if needed
            window.dispatchEvent(new Event('favoritesUpdated')); 
            return newFavs;
        });
    };

    const toggleStageResources = (domainIndex, stageIndex) => {
        const key = `${domainIndex}-${stageIndex}`;
        setExpandedStageResources(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleDomain = (index) => {
        setExpandedDomains(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'kn', label: 'ಕನ್ನಡ' },
        { code: 'ta', label: 'தமிழ்' },
        { code: 'ml', label: 'മലయാളം' },
        { code: 'hi', label: 'हिंदी' },
        { code: 'te', label: 'తెలుగు' },
        { code: 'mr', label: 'मराठी' }
    ];

    // Load Language Preference
    useEffect(() => {
        const savedLang = localStorage.getItem('lc_roadmap_lang') || 'en';
        setCurrentLang(savedLang);
        
        // Request System Notification Permission
        if ('Notification' in window && Notification.permission !== 'granted') {
             Notification.requestPermission();
        }
    }, []);

    // Get current domains list
    // Get current domains list and filter
    const allDomains = getDomains(currentLang);
    const domains = allDomains.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleLangChange = (langCode) => {
        setCurrentLang(langCode);
        localStorage.setItem('lc_roadmap_lang', langCode);
    };

    const sendSystemNotification = (title, body) => {
        if (!('Notification' in window)) return;
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body,
                icon: '/vite.svg',
                silent: false
            });
        }
    };

    // Stale Progress Check (On Mount or Progress Change)
    // We only want to run this once or infrequently, not on every render.
    // Let's run it once on mount if we have data.
    useEffect(() => {
        const now = Date.now();
        const ONE_DAY = 24 * 60 * 60 * 1000;
        
        // We iterate ENGLISH domains to check progress keys
        enDomains.forEach(d => {
            let hasStarted = false;
            let firstIncomplete = null;

            d.steps.forEach((step, idx) => {
                const key = `${d.title}-${idx}`;
                const item = roadmapProgress[key];

                if (item) {
                    if (item.completed || item.progress > 0) hasStarted = true;

                    // Near Completion (re-notify if user visits?)
                    // Maybe too spammy to add notification on every visit.
                    // Let's only do the "Delayed" check which is time based.
                    
                    // Pending / Delayed
                    if (!item.completed && item.progress > 0 && (now - item.lastUpdated > 3 * ONE_DAY)) {
                         // Check if we already have this notification? 
                         // Context doesn't expose robust deduping by ID easily without checking the array.
                         // But `addNotification` generates a new ID.
                         // Let's skip auto-adding stale notifications for now to avoid spam on reload, 
                         // or implement a "hasNotified" flag in localstorage.
                         // The original code did it on every load. Let's stick to user request: "Intelligence".
                         // I'll skip it for now to keep it clean, relying on "Weekly Report" for nudges.
                    }
                }
            });
        });
    }, []); 

    const handleUpdate = (domainTitle, stepIdx, type, value) => {
        // Resolve English Title for Key
        // If currentLang is EN, domainTitle is EN.
        // If not, we find index in current domains, then look up in EN domains.
        const dIndex = domains.findIndex(d => d.title === domainTitle);
        if (dIndex === -1) return; // Should not happen
        
        const enTitle = enDomains[dIndex].title;
        const key = `${enTitle}-${stepIdx}`;

        const now = Date.now();
        const oldState = roadmapProgress[key] || { progress: 0, completed: false, lastUpdated: 0 };
        
        let newState = { ...oldState, lastUpdated: now };
        let didComplete = false;
        let didReachNear = false;

        if (type === 'check') {
            const isChecked = !oldState.completed;
            newState.completed = isChecked;
            newState.progress = isChecked ? 100 : (oldState.progress === 100 ? 0 : oldState.progress);
            if (isChecked) didComplete = true;
        } else if (type === 'slider') {
            newState.progress = parseInt(value);
            newState.completed = newState.progress === 100;
            
            if (newState.completed && !oldState.completed) didComplete = true;
            if (newState.progress >= 70 && oldState.progress < 70 && !newState.completed) didReachNear = true;
        }

        // Update Context
        // We also pass total steps for this domain to help the Context calculate percentages later
        const totalSteps = enDomains[dIndex].steps.length;
        updateRoadmapProgress(key, newState, totalSteps);

        // Notifications
        if (didComplete) {
            const title = "🎉 Stage Completed";
            const msg = `Stage completed: '${enDomains[dIndex].steps[stepIdx]}'`;
            addNotification({ title, msg, type: 'success' });
            sendSystemNotification(title, msg);
        }

        if (didReachNear) {
             const title = "⚠️ Near Completion";
             const msg = `You're close to completing '${enDomains[dIndex].steps[stepIdx]}'. Finish it!`;
             addNotification({ title, msg, type: 'warning' });
        }
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to Clear All progress? This cannot be undone.")) {
            resetRoadmapProgress();
        }
    };

    const getItemStatus = (item) => {
        if (!item) return { label: 'Incomplete', color: 'var(--text-secondary)' };
        if (item.completed) return { label: 'Completed', color: '#50fa7b' };
        if (item.progress >= 70) return { label: 'Near Completion', color: '#ffb86c' };
        if (item.progress > 0) return { label: 'In Progress', color: '#8be9fd' };
        return { label: 'Incomplete', color: 'var(--text-secondary)' };
    };

    const getDomainStats = (title, steps) => {
        // Map to English Title
        const dIndex = domains.findIndex(d => d.title === title);
        const enTitle = enDomains[dIndex]?.title || title;

        let completed = 0;
        let near = 0;
        let incomplete = 0;
        
        steps.forEach((_, idx) => {
            const item = roadmapProgress[`${enTitle}-${idx}`];
            if (item?.completed) completed++;
            else if (item?.progress >= 70) near++;
            else incomplete++;
        });

        return { completed, near, incomplete, total: steps.length };
    };

    // Helper: Logic to fetch and process resources for a stage
    const getCuratedResources = (domainTitle, stageTitle, stageIndex) => {
        // 1. Try Specific Stage Resources
        let resources = [];
        const domainData = roadmapResources[domainTitle];
        
        if (domainData && domainData[stageTitle]) {
            resources = [...domainData[stageTitle]];
        } else {
            // 2. Fallback to Defaults if empty
            resources = [...(roadmapResources["_defaults"] || [])];
        }

        // 3. Filter by Tab
        if (activeResourceTab !== 'All') {
            resources = resources.filter(r => r.type === activeResourceTab || (activeResourceTab === 'Practice' && r.type === 'Project'));
        }

        // 4. Smart Sort (Optional - simplified here)
        // If stageIndex < 2 (Beginner), prioritize Beginner.
        // If stageIndex > 4 (Advanced), prioritize Advanced.
        resources.sort((a, b) => {
            const diffOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3, "All": 0 };
            const userLevel = stageIndex < 2 ? 1 : stageIndex > 3 ? 3 : 2;
            
            // Score: closer to userLevel is better
            const scoreA = Math.abs((diffOrder[a.difficulty] || 2) - userLevel);
            const scoreB = Math.abs((diffOrder[b.difficulty] || 2) - userLevel);
            
            return scoreA - scoreB;
        });

        return resources;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div>
                    <h1>Learning Roadmaps</h1>
                    <p>Curated vertical paths with interactive progress tracking.</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Language Selector */}
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                        <Globe size={16} />
                        <select 
                            value={currentLang} 
                            onChange={(e) => handleLangChange(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}
                        >
                            {languages.map(l => (
                                <option key={l.code} value={l.code} style={{color: 'black'}}>{l.label}</option>
                            ))}
                        </select>
                    </div>
                    {/* Reset Button */}
                    <button 
                        onClick={handleReset}
                        title="Clear All Progress"
                        style={{ 
                            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', 
                            borderRadius: '50%', width: '40px', height: '40px', display: 'flex', 
                            alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ff5555',
                            transition: 'all 0.2s'
                        }}
                    >
                        <RotateCcw size={18} />
                    </button>

                    {/* Notification Bell */}
                    <div style={{ position: 'relative' }}>
                        <button 
                            onClick={() => setShowNotif(!showNotif)}
                            style={{ 
                                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', 
                                borderRadius: '50%', width: '40px', height: '40px', display: 'flex', 
                                alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white',
                                position: 'relative'
                            }}
                        >
                            <Bell size={20} />
                            {notifications.length > 0 && (
                                <span style={{ 
                                    position: 'absolute', top: -2, right: -2, background: '#ff5555', 
                                    color: 'white', fontSize: '0.7rem', width: '18px', height: '18px', 
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {notifications.length}
                                </span>
                            )}
                        </button>

                        <AnimatePresence>
                            {showNotif && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    style={{ 
                                        position: 'absolute', top: '50px', right: 0, width: '320px', 
                                        background: '#1a1b26', border: '1px solid var(--border-color)', 
                                        borderRadius: '12px', padding: '1rem', zIndex: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                                        <h4 style={{ margin: 0 }}>Notifications</h4>
                                        <button 
                                            style={{ fontSize: '0.75rem', opacity: 0.7, background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }} 
                                            onClick={clearNotifications}
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto' }}>
                                        {notifications.length === 0 ? (
                                            <div style={{ padding: '1rem', textAlign: 'center', opacity: 0.5, fontSize: '0.85rem' }}>No new notifications</div>
                                        ) : (
                                            notifications.map((n) => (
                                                <div key={n.id} style={{ display: 'flex', gap: '10px', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: `3px solid ${n.type === 'success' ? '#50fa7b' : n.type === 'warning' ? '#ffb86c' : '#bd93f9'}` }}>
                                                    <div style={{ marginTop: '2px', flexShrink: 0 }}>
                                                        {n.type === 'success' ? <Award size={16} color="#50fa7b" /> : <Bell size={16} color="#ffb86c" />}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '2px', color: 'white' }}>{n.title}</div>
                                                        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{n.msg}</div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            {/* 1️⃣ SEARCH BAR */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
                <input 
                    type="text" 
                    placeholder="Search for a domain (e.g., Full Stack, AI)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ 
                        width: '100%', padding: '1rem 1rem 1rem 3rem', 
                        borderRadius: '12px', border: '1px solid var(--border-color)', 
                        background: 'var(--bg-card)', color: 'white', fontSize: '1rem',
                        outline: 'none'
                    }} 
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {domains.map((domain, i) => {
                    const stats = getDomainStats(domain.title, domain.steps);
                    const isExpanded = expandedDomains[i] || false;
                    const completionPercent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
                    
                    return (
                        <section key={i} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                            {/* Collapsible Domain Header — Click to Toggle */}
                            <div 
                                onClick={() => toggleDomain(i)}
                                style={{ 
                                    padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', 
                                    alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s',
                                    background: isExpanded ? 'rgba(124, 58, 237, 0.06)' : 'transparent',
                                    borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                    <div style={{ 
                                        width: 40, height: 40, borderRadius: '12px', 
                                        background: completionPercent === 100 ? 'rgba(80, 250, 123, 0.15)' : 'var(--bg-elevated)', 
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                        fontSize: '1rem', flexShrink: 0,
                                        border: completionPercent === 100 ? '1px solid rgba(80, 250, 123, 0.3)' : '1px solid var(--border-color)'
                                    }}>
                                        {completionPercent === 100 ? '✅' : '📘'}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>{domain.title}</h3>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{domain.path} • {domain.steps.length} stages</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {/* Stats Badges */}
                                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
                                        {stats.completed > 0 && (
                                            <span style={{ padding: '2px 8px', borderRadius: '10px', background: 'rgba(80, 250, 123, 0.15)', color: '#50fa7b', fontWeight: 600 }}>
                                                {stats.completed} ✓
                                            </span>
                                        )}
                                        {stats.near > 0 && (
                                            <span style={{ padding: '2px 8px', borderRadius: '10px', background: 'rgba(255, 184, 108, 0.15)', color: '#ffb86c', fontWeight: 600 }}>
                                                {stats.near} near
                                            </span>
                                        )}
                                        <span style={{ padding: '2px 8px', borderRadius: '10px', background: 'rgba(139, 233, 253, 0.1)', color: '#8be9fd', fontWeight: 600 }}>
                                            {completionPercent}%
                                        </span>
                                    </div>

                                    {/* Progress Bar (mini) */}
                                    <div style={{ width: 60, height: 4, background: 'var(--bg-elevated)', borderRadius: 2, overflow: 'hidden' }}>
                                        <div style={{ width: `${completionPercent}%`, height: '100%', background: completionPercent === 100 ? '#50fa7b' : 'var(--accent-color)', borderRadius: 2, transition: 'width 0.3s' }} />
                                    </div>

                                    {/* Chevron */}
                                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronDown size={20} color="var(--text-secondary)" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Expanded Steps Content */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            {domain.steps.map((step, idx) => {
                                                const dIndex = domains.findIndex(d => d.title === domain.title);
                                                const enTitle = enDomains[dIndex].title;
                                                const key = `${enTitle}-${idx}`;
                                                
                                                const item = roadmapProgress[key] || { progress: 0, completed: false };
                                                const status = getItemStatus(item);
                                                
                                                return (
                                            <div key={idx} style={{ 
                                                display: 'flex', flexDirection: 'column', gap: '1rem',
                                                background: item.completed ? 'rgba(80, 250, 123, 0.05)' : 'transparent',
                                                padding: '1rem', borderRadius: '12px', transition: 'all 0.2s',
                                                border: item.completed ? '1px solid rgba(80, 250, 123, 0.1)' : '1px solid transparent'
                                            }}>
                                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                                                    <div 
                                                        onClick={() => handleUpdate(domain.title, idx, 'check')}
                                                        style={{ 
                                                            width: '32px', height: '32px', borderRadius: '50%', 
                                                            background: item.completed ? '#50fa7b' : 'rgba(255,255,255,0.05)', 
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                                            fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0,
                                                            cursor: 'pointer', border: item.completed ? 'none' : '1px solid var(--border-color)',
                                                            color: item.completed ? '#000' : 'white', boxShadow: item.completed ? '0 0 10px rgba(80, 250, 123, 0.4)' : 'none',
                                                            transition: 'all 0.2s'
                                                        }}
                                                    >
                                                        {item.completed ? <Check size={18} strokeWidth={3} /> : idx + 1}
                                                    </div>

                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                                            <div style={{ fontSize: '1.05rem', fontWeight: 700, textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? 'var(--text-secondary)' : 'white', opacity: item.completed ? 0.7 : 1 }}>
                                                                Stage {idx + 1}: {step}
                                                            </div>
                                                            
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                                <input 
                                                                    type="range" 
                                                                    min="0" max="100" 
                                                                    value={item.progress}
                                                                    onChange={(e) => handleUpdate(domain.title, idx, 'slider', e.target.value)}
                                                                    disabled={item.completed}
                                                                    style={{ 
                                                                        width: '80px', cursor: item.completed ? 'not-allowed' : 'pointer',
                                                                        accentColor: status.color, height: '4px'
                                                                    }} 
                                                                />
                                                                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: status.color, textTransform: 'uppercase', minWidth: '90px', textAlign: 'right' }}>
                                                                    {status.label} {item.progress > 0 && !item.completed && ` (${item.progress}%)`}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: item.completed ? 0.5 : 1 }}>
                                                            <p style={{ fontSize: '0.9rem' }}>Comprehensive learning objectives including practical implementation and theoretical foundations for this stage.</p>
                                                            
                                                            {/* Resource Toggle Button */}
                                                            <button 
                                                                onClick={() => toggleStageResources(i, idx)}
                                                                style={{ 
                                                                    alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px',
                                                                    fontSize: '0.8rem', color: 'var(--accent-color)', background: 'transparent',
                                                                    border: 'none', cursor: 'pointer', marginTop: '0.5rem'
                                                                }}
                                                            >
                                                                <BookOpen size={14} />
                                                                {expandedStageResources[`${i}-${idx}`] ? 'Hide Resources' : 'Recommended Resources'}
                                                                <ChevronDown size={14} style={{ transform: expandedStageResources[`${i}-${idx}`] ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 3️⃣ Recommended Resources Section */}
                                                <AnimatePresence>
                                                    {expandedStageResources[`${i}-${idx}`] && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            style={{ overflow: 'hidden', paddingLeft: '3rem' }} // Indent to align with text
                                                        >
                                                            {/* Type Filters */}
                                                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', marginTop: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
                                                                {['All', 'Documentation', 'Video', 'Course', 'Practice'].map(tab => (
                                                                    <button
                                                                        key={tab}
                                                                        onClick={() => setActiveResourceTab(tab)}
                                                                        style={{
                                                                            padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
                                                                            background: activeResourceTab === tab ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                                                                            color: activeResourceTab === tab ? 'white' : 'var(--text-secondary)',
                                                                            border: 'none', cursor: 'pointer', whiteSpace: 'nowrap'
                                                                        }}
                                                                    >
                                                                        {tab}
                                                                    </button>
                                                                ))}
                                                            </div>

                                                            <div style={{ 
                                                                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' 
                                                            }}>
                                                                {(() => {
                                                                    const resources = getCuratedResources(enTitle, step, idx);
                                                                    
                                                                    return resources.map((res, rIdx) => (
                                                                        <div 
                                                                            key={rIdx} 
                                                                            className="resource-card"
                                                                            style={{ 
                                                                                display: 'flex', gap: '1rem',
                                                                                padding: '1rem', background: 'rgba(255,255,255,0.03)', 
                                                                                borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)',
                                                                                textDecoration: 'none', color: 'var(--text-secondary)',
                                                                                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', position: 'relative',
                                                                                overflow: 'hidden'
                                                                            }}
                                                                            onMouseEnter={(e) => { 
                                                                                e.currentTarget.style.borderColor = 'var(--accent-color)'; 
                                                                                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                                                e.currentTarget.style.boxShadow = '0 8px 20px -6px rgba(124, 58, 237, 0.3)';
                                                                            }}
                                                                            onMouseLeave={(e) => { 
                                                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; 
                                                                                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                                                                e.currentTarget.style.transform = 'translateY(0)';
                                                                                e.currentTarget.style.boxShadow = 'none';
                                                                            }}
                                                                        >
                                                                            {/* Left: Thumbnail */}
                                                                            <div style={{ 
                                                                                width: '120px', height: '80px', borderRadius: '8px', 
                                                                                background: '#000', overflow: 'hidden', flexShrink: 0,
                                                                                position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                                border: '1px solid rgba(255,255,255,0.1)'
                                                                            }}>
                                                                                {res.videoId ? (
                                                                                    <>
                                                                                        <img 
                                                                                            src={`https://img.youtube.com/vi/${res.videoId}/mqdefault.jpg`} 
                                                                                            alt="thumb" 
                                                                                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                                                                                        />
                                                                                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                                                                                            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                                                <Video size={14} color="white" fill="white" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                ) : (
                                                                                    <div style={{ 
                                                                                        width: '100%', height: '100%', 
                                                                                        background: res.type === 'Documentation' ? 'linear-gradient(135deg, #1e3a8a, #3b82f6)' :
                                                                                                    res.type === 'Course' ? 'linear-gradient(135deg, #422006, #eab308)' :
                                                                                                    res.type === 'Practice' ? 'linear-gradient(135deg, #14532d, #22c55e)' : 'linear-gradient(135deg, #3f3f46, #71717a)',
                                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                                                    }}>
                                                                                         {res.type === 'Course' ? <BookOpen size={24} color="rgba(255,255,255,0.8)" /> :
                                                                                          res.type === 'Documentation' ? <FileText size={24} color="rgba(255,255,255,0.8)" /> :
                                                                                          <Code size={24} color="rgba(255,255,255,0.8)" />}
                                                                                    </div>
                                                                                )}
                                                                            </div>

                                                                            {/* Middle: Content */}
                                                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                                                                                     <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                                                        {res.source || res.type}
                                                                                     </span>
                                                                                     <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-tertiary)' }} />
                                                                                     <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{res.duration || 'Flexible'}</span>
                                                                                     
                                                                                     {res.aiCurated && (
                                                                                        <span style={{ 
                                                                                            marginLeft: 'auto', fontSize: '0.6rem', background: 'linear-gradient(90deg, #7c3aed, #db2777)', 
                                                                                            color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: 700,
                                                                                            display: 'flex', alignItems: 'center', gap: '3px'
                                                                                        }}>
                                                                                            <Zap size={8} fill="white" /> AI MATCH {res.relevance}%
                                                                                        </span>
                                                                                    )}
                                                                                </div>

                                                                                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', lineHeight: 1.3 }}>
                                                                                    {res.title}
                                                                                </h4>
                                                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                                                    {res.description}
                                                                                </p>

                                                                                <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                                                     <span style={{ 
                                                                                         fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', 
                                                                                         background: res.difficulty === 'Beginner' ? 'rgba(80, 250, 123, 0.1)' : res.difficulty === 'Advanced' ? 'rgba(255, 85, 85, 0.1)' : 'rgba(255, 184, 108, 0.1)',
                                                                                         color: res.difficulty === 'Beginner' ? '#50fa7b' : res.difficulty === 'Advanced' ? '#ff5555' : '#ffb86c',
                                                                                         border: `1px solid ${res.difficulty === 'Beginner' ? 'rgba(80, 250, 123, 0.2)' : res.difficulty === 'Advanced' ? 'rgba(255, 85, 85, 0.2)' : 'rgba(255, 184, 108, 0.2)'}`,
                                                                                         fontWeight: 600
                                                                                     }}>
                                                                                        {res.difficulty}
                                                                                     </span>
                                                                                </div>
                                                                            </div>

                                                                            {/* Right: Actions */}
                                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                                                                                <a 
                                                                                    href={res.link} 
                                                                                    target="_blank" 
                                                                                    rel="noopener noreferrer"
                                                                                    title="Open Resource"
                                                                                    style={{ 
                                                                                        width: 32, height: 32, borderRadius: '8px', background: 'var(--bg-elevated)', 
                                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                                                                                        border: '1px solid var(--border-color)', transition: 'all 0.2s',
                                                                                        cursor: 'pointer'
                                                                                    }}
                                                                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-color)'; e.currentTarget.style.borderColor = 'var(--accent-color)'; }}
                                                                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-elevated)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                                                                                >
                                                                                    <ExternalLink size={16} />
                                                                                </a>
                                                                                <button 
                                                                                    title={favorites.includes(res.link) ? "Remove from Favorites" : "Save to Favorites"}
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        e.stopPropagation();
                                                                                        toggleFavorite(res.link);
                                                                                    }}
                                                                                    style={{ 
                                                                                        width: 32, height: 32, borderRadius: '8px', background: 'transparent', 
                                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                                                                        color: favorites.includes(res.link) ? '#facc15' : 'var(--text-tertiary)',
                                                                                        borderColor: favorites.includes(res.link) ? '#facc15' : 'var(--border-color)',
                                                                                        borderWidth: '1px', borderStyle: 'solid', transition: 'all 0.2s',
                                                                                        cursor: 'pointer'
                                                                                    }}
                                                                                    onMouseEnter={(e) => { 
                                                                                        if (!favorites.includes(res.link)) {
                                                                                            e.currentTarget.style.color = '#facc15'; 
                                                                                            e.currentTarget.style.borderColor = '#facc15'; 
                                                                                        }
                                                                                    }}
                                                                                    onMouseLeave={(e) => { 
                                                                                        if (!favorites.includes(res.link)) {
                                                                                            e.currentTarget.style.color = 'var(--text-tertiary)'; 
                                                                                            e.currentTarget.style.borderColor = 'var(--border-color)'; 
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <Award size={16} fill={favorites.includes(res.link) ? "currentColor" : "none"} /> 
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ));
                                                                })()}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                                )}
                            </AnimatePresence>
                        </section>
                    );
                })}
            </div>
            <style>{`
                input[type=range] {
                    -webkit-appearance: none;
                    background: transparent;
                }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 12px; width: 12px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    margin-top: -4px;
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%; height: 4px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );
};

export default Roadmaps;
