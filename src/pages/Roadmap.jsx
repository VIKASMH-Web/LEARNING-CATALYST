import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Bell, AlertCircle, Clock, Zap, Award, Globe, RotateCcw, ChevronDown, ChevronRight, Sparkles, Filter, BookOpen, Code, FileText, ExternalLink, Search, Download } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { getDomains, enDomains } from '../data/domains';
import { roadmapResources } from '../data/roadmapResources';

const categoryConfig = {
    all:      { label: 'All Paths',      icon: '🌐', color: '#a78bfa' },
    career:   { label: 'Career Paths',   icon: '🚀', color: '#60a5fa' },
    language: { label: 'Languages',      icon: '💻', color: '#34d399' },
    tool:     { label: 'Tools',          icon: '🔧', color: '#fbbf24' },
};

const Roadmaps = () => {
    const { 
        roadmapProgress, updateRoadmapProgress, resetRoadmapProgress, 
        notifications, addNotification, clearNotifications 
    } = useProgress();

    const [currentLang, setCurrentLang] = useState('en');
    const [showNotif, setShowNotif] = useState(false);
    const [expandedDomains, setExpandedDomains] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedStageResources, setExpandedStageResources] = useState({});
    const [activeCategory, setActiveCategory] = useState('all');
    const [stageResourceTabs, setStageResourceTabs] = useState({});
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
        { code: 'ml', label: 'മലയാളം' },
        { code: 'hi', label: 'हिंदी' },
        { code: 'te', label: 'తెలుగు' },
        { code: 'mr', label: 'मराठी' }
    ];

    useEffect(() => {
        const savedLang = localStorage.getItem('lc_roadmap_lang') || 'en';
        setCurrentLang(savedLang);
        if ('Notification' in window && Notification.permission !== 'granted') {
             Notification.requestPermission();
        }
    }, []);

    const allDomains = getDomains(currentLang);
    
    // Filter by category and search
    const domains = allDomains.filter(d => {
        const matchesCategory = activeCategory === 'all' || d.category === activeCategory;
        const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleLangChange = (langCode) => {
        setCurrentLang(langCode);
        localStorage.setItem('lc_roadmap_lang', langCode);
    };

    const sendSystemNotification = (title, body) => {
        if (!('Notification' in window)) return;
        if (Notification.permission === 'granted') {
            new Notification(title, { body, icon: '/vite.svg', silent: false });
        }
    };

    useEffect(() => {
        const now = Date.now();
        const ONE_DAY = 24 * 60 * 60 * 1000;
        enDomains.forEach(d => {
            d.steps.forEach((step, idx) => {
                const key = `${d.title}-${idx}`;
                const item = roadmapProgress[key];
                if (item && !item.completed && item.progress > 0 && (now - item.lastUpdated > 3 * ONE_DAY)) {
                    // Stale progress — could add notification
                }
            });
        });
    }, []); 

    const handleUpdate = (domainTitle, stepIdx, type, value) => {
        const dIndex = domains.findIndex(d => d.title === domainTitle);
        if (dIndex === -1) return;
        const enTitle = enDomains.find(d => d.title === domainTitle)?.title || domainTitle;
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

        const enDomain = enDomains.find(d => d.title === enTitle);
        const totalSteps = enDomain ? enDomain.steps.length : 6;
        updateRoadmapProgress(key, newState, totalSteps);

        if (didComplete) {
            const title = "🎉 Stage Completed";
            const enSteps = enDomain?.steps || domains[dIndex].steps;
            const msg = `Stage completed: '${enSteps[stepIdx]}'`;
            addNotification({ title, msg, type: 'success' });
            sendSystemNotification(title, msg);
        }
        if (didReachNear) {
            const title = "⚠️ Near Completion";
            const enSteps = enDomain?.steps || domains[dIndex].steps;
            const msg = `You're close to completing '${enSteps[stepIdx]}'. Finish it!`;
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
        const enTitle = enDomains.find(d => d.title === title)?.title || title;
        let completed = 0, near = 0, incomplete = 0;
        steps.forEach((_, idx) => {
            const item = roadmapProgress[`${enTitle}-${idx}`];
            if (item?.completed) completed++;
            else if (item?.progress >= 70) near++;
            else incomplete++;
        });
        return { completed, near, incomplete, total: steps.length };
    };

    // Resources helper — filters out YouTube videos for language/tool domains  
    const getCuratedResources = (domainTitle, stageTitle, stageIndex, activeTab = 'All') => {
        let resources = [];
        const domainData = roadmapResources[domainTitle];
        
        if (domainData && domainData[stageTitle]) {
            resources = [...domainData[stageTitle]];
        } else {
            resources = [...(roadmapResources["_defaults"] || [])];
        }

        // Filter out YouTube videos — keep only docs, practice, projects, courses
        resources = resources.filter(r => r.type !== 'Video');

        if (activeTab !== 'All') {
            resources = resources.filter(r => r.type === activeTab || (activeTab === 'Practice' && r.type === 'Project'));
        }

        resources.sort((a, b) => {
            const diffOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3, "All": 0 };
            const userLevel = stageIndex < 2 ? 1 : stageIndex > 3 ? 3 : 2;
            const scoreA = Math.abs((diffOrder[a.difficulty] || 2) - userLevel);
            const scoreB = Math.abs((diffOrder[b.difficulty] || 2) - userLevel);
            return scoreA - scoreB;
        });

        return resources;
    };

    // Count stats for overview
    const categoryStats = {
        career: allDomains.filter(d => d.category === 'career').length,
        language: allDomains.filter(d => d.category === 'language').length,
        tool: allDomains.filter(d => d.category === 'tool').length,
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* === HERO SECTION === */}
            <header style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ 
                    position: 'absolute', inset: 0, 
                    background: 'radial-gradient(ellipse at top left, rgba(124, 58, 237, 0.12), transparent 60%), radial-gradient(ellipse at bottom right, rgba(59, 130, 246, 0.08), transparent 60%)',
                    pointerEvents: 'none'
                }} />
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <Sparkles size={24} color="#a78bfa" />
                            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #e2e8f0, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Learning Hub
                            </h1>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', maxWidth: '500px', lineHeight: 1.6 }}>
                            Your structured learning journey — career paths, languages, and tools. All with curated resources, progress tracking, and downloadable notes.
                        </p>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {/* Language Selector */}
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.04)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                            <Globe size={16} />
                            <select 
                                value={currentLang} 
                                onChange={(e) => handleLangChange(e.target.value)}
                                style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', outline: 'none', fontSize: '0.85rem' }}
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
                                background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', 
                                borderRadius: '12px', width: '40px', height: '40px', display: 'flex', 
                                alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ff5555',
                                transition: 'all 0.2s'
                            }}
                        >
                            <RotateCcw size={16} />
                        </button>

                        {/* Notification Bell */}
                        <div style={{ position: 'relative' }}>
                            <button 
                                onClick={() => setShowNotif(!showNotif)}
                                style={{ 
                                    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', 
                                    borderRadius: '12px', width: '40px', height: '40px', display: 'flex', 
                                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white',
                                    position: 'relative'
                                }}
                            >
                                <Bell size={18} />
                                {notifications.length > 0 && (
                                    <span style={{ 
                                        position: 'absolute', top: -2, right: -2, background: '#ff5555', 
                                        color: 'white', fontSize: '0.65rem', width: '18px', height: '18px', 
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
                </div>
            </header>

            {/* === CATEGORY FILTER TABS === */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {Object.entries(categoryConfig).map(([key, cfg]) => (
                    <button
                        key={key}
                        onClick={() => { setActiveCategory(key); setSearchQuery(''); }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.6rem 1.1rem', borderRadius: '12px', fontSize: '0.85rem',
                            fontWeight: activeCategory === key ? 700 : 500,
                            background: activeCategory === key 
                                ? `linear-gradient(135deg, ${cfg.color}22, ${cfg.color}11)` 
                                : 'rgba(255,255,255,0.03)',
                            color: activeCategory === key ? cfg.color : 'var(--text-secondary)',
                            border: activeCategory === key 
                                ? `1px solid ${cfg.color}44` 
                                : '1px solid var(--border-color)',
                            cursor: 'pointer', transition: 'all 0.2s',
                            backdropFilter: 'blur(8px)'
                        }}
                    >
                        <span>{cfg.icon}</span>
                        {cfg.label}
                        {key !== 'all' && (
                            <span style={{ 
                                fontSize: '0.7rem', fontWeight: 700, color: cfg.color, 
                                background: `${cfg.color}15`, padding: '1px 6px', borderRadius: '6px' 
                            }}>
                                {categoryStats[key]}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* === SEARCH BAR === */}
            <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
                <input 
                    type="text" 
                    placeholder={`Search ${activeCategory === 'all' ? 'all paths' : categoryConfig[activeCategory].label.toLowerCase()}...`} 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ 
                        width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', 
                        borderRadius: '12px', border: '1px solid var(--border-color)', 
                        background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: '0.9rem',
                        outline: 'none', backdropFilter: 'blur(8px)'
                    }} 
                />
            </div>

            {/* === DOMAIN CARDS === */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {domains.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                        No paths found for "{searchQuery}". Try a different search.
                    </div>
                )}

                {domains.map((domain, i) => {
                    const stats = getDomainStats(domain.title, domain.steps);
                    const isExpanded = expandedDomains[i] || false;
                    const completionPercent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
                    const catCfg = categoryConfig[domain.category] || categoryConfig.career;
                    
                    return (
                        <section key={i} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                            {/* Domain Header */}
                            <div 
                                onClick={() => toggleDomain(i)}
                                style={{ 
                                    padding: '1.15rem 1.5rem', display: 'flex', justifyContent: 'space-between', 
                                    alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s',
                                    background: isExpanded ? 'rgba(124, 58, 237, 0.04)' : 'transparent',
                                    borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1 }}>
                                    <div style={{ 
                                        width: 38, height: 38, borderRadius: '10px', 
                                        background: completionPercent === 100 ? 'rgba(80, 250, 123, 0.12)' : `${catCfg.color}12`, 
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                        fontSize: '1rem', flexShrink: 0,
                                        border: completionPercent === 100 ? '1px solid rgba(80, 250, 123, 0.25)' : `1px solid ${catCfg.color}30`
                                    }}>
                                        {completionPercent === 100 ? '✅' : catCfg.icon}
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0' }}>{domain.title}</h3>
                                            <span style={{ 
                                                fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
                                                color: catCfg.color, background: `${catCfg.color}15`, 
                                                padding: '2px 6px', borderRadius: '4px'
                                            }}>
                                                {domain.category}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>{domain.path} • {domain.steps.length} stages</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ display: 'flex', gap: '0.4rem', fontSize: '0.7rem' }}>
                                        {stats.completed > 0 && (
                                            <span style={{ padding: '2px 7px', borderRadius: '8px', background: 'rgba(80, 250, 123, 0.12)', color: '#50fa7b', fontWeight: 600 }}>
                                                {stats.completed} ✓
                                            </span>
                                        )}
                                        {stats.near > 0 && (
                                            <span style={{ padding: '2px 7px', borderRadius: '8px', background: 'rgba(255, 184, 108, 0.12)', color: '#ffb86c', fontWeight: 600 }}>
                                                {stats.near} near
                                            </span>
                                        )}
                                        <span style={{ padding: '2px 7px', borderRadius: '8px', background: 'rgba(139, 233, 253, 0.08)', color: '#8be9fd', fontWeight: 600 }}>
                                            {completionPercent}%
                                        </span>
                                    </div>

                                    <div style={{ width: 50, height: 3, background: 'var(--bg-elevated)', borderRadius: 2, overflow: 'hidden' }}>
                                        <div style={{ width: `${completionPercent}%`, height: '100%', background: completionPercent === 100 ? '#50fa7b' : 'var(--accent-color)', borderRadius: 2, transition: 'width 0.3s' }} />
                                    </div>

                                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronDown size={18} color="var(--text-secondary)" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Expanded Steps */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {domain.steps.map((step, idx) => {
                                                const enTitle = domain.title;
                                                const key = `${enTitle}-${idx}`;
                                                const item = roadmapProgress[key] || { progress: 0, completed: false };
                                                const status = getItemStatus(item);
                                                
                                                return (
                                            <div key={idx} style={{ 
                                                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                                                background: item.completed ? 'rgba(80, 250, 123, 0.03)' : 'transparent',
                                                padding: '0.85rem', borderRadius: '12px', transition: 'all 0.2s',
                                                border: item.completed ? '1px solid rgba(80, 250, 123, 0.08)' : '1px solid transparent'
                                            }}>
                                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                                    <div 
                                                        onClick={() => handleUpdate(domain.title, idx, 'check')}
                                                        style={{ 
                                                            width: '30px', height: '30px', borderRadius: '50%', 
                                                            background: item.completed ? '#50fa7b' : 'rgba(255,255,255,0.04)', 
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                                            fontWeight: 'bold', fontSize: '0.75rem', flexShrink: 0,
                                                            cursor: 'pointer', border: item.completed ? 'none' : '1px solid var(--border-color)',
                                                            color: item.completed ? '#000' : 'white', 
                                                            boxShadow: item.completed ? '0 0 8px rgba(80, 250, 123, 0.3)' : 'none',
                                                            transition: 'all 0.2s'
                                                        }}
                                                    >
                                                        {item.completed ? <Check size={16} strokeWidth={3} /> : idx + 1}
                                                    </div>

                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                                                            <div style={{ fontSize: '0.95rem', fontWeight: 700, textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? 'var(--text-secondary)' : 'white', opacity: item.completed ? 0.7 : 1 }}>
                                                                Stage {idx + 1}: {step}
                                                            </div>
                                                            
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(0,0,0,0.15)', padding: '3px 10px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                                                                <input 
                                                                    type="range" 
                                                                    min="0" max="100" 
                                                                    value={item.progress}
                                                                    onChange={(e) => handleUpdate(domain.title, idx, 'slider', e.target.value)}
                                                                    disabled={item.completed}
                                                                    style={{ width: '70px', cursor: item.completed ? 'not-allowed' : 'pointer', accentColor: status.color, height: '3px' }} 
                                                                />
                                                                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: status.color, textTransform: 'uppercase', minWidth: '80px', textAlign: 'right' }}>
                                                                    {status.label} {item.progress > 0 && !item.completed && ` (${item.progress}%)`}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', opacity: item.completed ? 0.5 : 1 }}>
                                                            <button 
                                                                onClick={() => toggleStageResources(i, idx)}
                                                                style={{ 
                                                                    alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px',
                                                                    fontSize: '0.78rem', color: 'var(--accent-color)', background: 'transparent',
                                                                    border: 'none', cursor: 'pointer', marginTop: '0.25rem', padding: 0
                                                                }}
                                                            >
                                                                <BookOpen size={13} />
                                                                {expandedStageResources[`${i}-${idx}`] ? 'Hide Resources' : 'Resources & Notes'}
                                                                <ChevronDown size={13} style={{ transform: expandedStageResources[`${i}-${idx}`] ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Resources Section — Glass Cards, No YouTube */}
                                                <AnimatePresence>
                                                    {expandedStageResources[`${i}-${idx}`] && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            style={{ overflow: 'hidden', paddingLeft: '2.75rem' }}
                                                        >
                                                            {/* Type Filters */}
                                                            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.85rem', marginTop: '0.35rem', overflowX: 'auto', paddingBottom: '4px' }}>
                                                                {['All', 'Documentation', 'Course', 'Practice'].map(tab => {
                                                                    const currentTab = stageResourceTabs[`${i}-${idx}`] || 'All';
                                                                    return (
                                                                        <button
                                                                            key={tab}
                                                                            onClick={() => setStageResourceTabs(prev => ({ ...prev, [`${i}-${idx}`]: tab }))}
                                                                            style={{
                                                                                padding: '3px 9px', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 600,
                                                                                background: currentTab === tab ? 'var(--accent-color)' : 'rgba(255,255,255,0.04)',
                                                                                color: currentTab === tab ? 'white' : 'var(--text-secondary)',
                                                                                border: 'none', cursor: 'pointer', whiteSpace: 'nowrap'
                                                                            }}
                                                                        >
                                                                            {tab}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>

                                                            <div style={{ 
                                                                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' 
                                                            }}>
                                                                {(() => {
                                                                    const currentTab = stageResourceTabs[`${i}-${idx}`] || 'All';
                                                                    const resources = getCuratedResources(enTitle, step, idx, currentTab);
                                                                    
                                                                    if (resources.length === 0) {
                                                                        return (
                                                                            <div style={{ gridColumn: '1 / -1', padding: '1.5rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.06)' }}>
                                                                                No resources available for this filter. Try "All".
                                                                            </div>
                                                                        );
                                                                    }

                                                                    return resources.map((res, rIdx) => (
                                                                        <a
                                                                            key={rIdx} 
                                                                            href={res.link.startsWith('#') ? undefined : res.link}
                                                                            target={res.link.startsWith('#') ? undefined : "_blank"}
                                                                            rel="noopener noreferrer"
                                                                            onClick={res.link.startsWith('#') ? (e) => e.preventDefault() : undefined}
                                                                            className="resource-card"
                                                                            style={{ 
                                                                                display: 'flex', flexDirection: 'column', gap: '0.6rem',
                                                                                padding: '1rem', 
                                                                                background: 'rgba(255,255,255,0.02)', 
                                                                                borderRadius: '14px', 
                                                                                border: '1px solid rgba(255,255,255,0.06)',
                                                                                textDecoration: 'none', 
                                                                                color: 'var(--text-secondary)',
                                                                                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', 
                                                                                position: 'relative',
                                                                                backdropFilter: 'blur(8px)',
                                                                                cursor: res.link.startsWith('#') ? 'default' : 'pointer'
                                                                            }}
                                                                            onMouseEnter={(e) => { 
                                                                                e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.25)'; 
                                                                                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                                                e.currentTarget.style.boxShadow = '0 8px 24px -8px rgba(0, 0, 0, 0.3)';
                                                                            }}
                                                                            onMouseLeave={(e) => { 
                                                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; 
                                                                                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                                                                e.currentTarget.style.transform = 'translateY(0)';
                                                                                e.currentTarget.style.boxShadow = 'none';
                                                                            }}
                                                                        >
                                                                            {/* AI Badge */}
                                                                            {res.aiCurated && (
                                                                                <div style={{ 
                                                                                    position: 'absolute', top: '8px', right: '8px',
                                                                                    background: 'rgba(124, 58, 237, 0.85)', backdropFilter: 'blur(4px)',
                                                                                    color: 'white', padding: '2px 6px',
                                                                                    borderRadius: '6px',
                                                                                    fontSize: '0.58rem', fontWeight: 800,
                                                                                    display: 'flex', alignItems: 'center', gap: '3px'
                                                                                }}>
                                                                                    <Zap size={8} fill="white" /> {res.relevance}%
                                                                                </div>
                                                                            )}

                                                                            {/* Header Metas */}
                                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                                                                <span style={{ 
                                                                                    fontSize: '0.62rem', fontWeight: 700, 
                                                                                    color: res.type === 'Documentation' ? '#60a5fa' : res.type === 'Practice' || res.type === 'Project' ? '#4ade80' : '#facc15', 
                                                                                    textTransform: 'uppercase', letterSpacing: '0.5px',
                                                                                    background: res.type === 'Documentation' ? 'rgba(96, 165, 250, 0.1)' : res.type === 'Practice' || res.type === 'Project' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(250, 204, 21, 0.1)',
                                                                                    padding: '2px 6px', borderRadius: '4px'
                                                                                }}>
                                                                                    {res.source || res.type}
                                                                                </span>
                                                                                <span style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)' }}>•</span>
                                                                                <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                                                    <Clock size={9} /> {res.duration || 'Flexible'}
                                                                                </span>
                                                                                {res.source === 'Notes' && (
                                                                                    <>
                                                                                        <span style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)' }}>•</span>
                                                                                        <span style={{ fontSize: '0.62rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                                                            <Download size={9} /> PDF
                                                                                        </span>
                                                                                    </>
                                                                                )}
                                                                            </div>

                                                                            {/* Title */}
                                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                                {res.type === 'Documentation' ? <FileText size={14} color="#60a5fa" /> : 
                                                                                 res.type === 'Practice' || res.type === 'Project' ? <Code size={14} color="#4ade80" /> : 
                                                                                 <BookOpen size={14} color="#facc15" />}
                                                                                <h4 style={{ 
                                                                                    fontSize: '0.88rem', fontWeight: 600, color: 'white', lineHeight: 1.4,
                                                                                    flex: 1
                                                                                }}>
                                                                                    {res.title}
                                                                                </h4>
                                                                                {!res.link.startsWith('#') && <ExternalLink size={11} color="var(--text-tertiary)" />}
                                                                            </div>

                                                                            {/* Description */}
                                                                            <p style={{ 
                                                                                fontSize: '0.76rem', color: 'var(--text-tertiary)', lineHeight: 1.5
                                                                            }}>
                                                                                {res.description}
                                                                            </p>

                                                                            {/* Footer */}
                                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                                                                                <span style={{ 
                                                                                    fontSize: '0.6rem', padding: '2px 7px', borderRadius: '10px', 
                                                                                    background: res.difficulty === 'Beginner' ? 'rgba(34, 197, 94, 0.08)' : res.difficulty === 'Advanced' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                                                                                    color: res.difficulty === 'Beginner' ? '#4ade80' : res.difficulty === 'Advanced' ? '#f87171' : '#fbbf24',
                                                                                    border: `1px solid ${res.difficulty === 'Beginner' ? 'rgba(34, 197, 94, 0.15)' : res.difficulty === 'Advanced' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`,
                                                                                    fontWeight: 600
                                                                                }}>
                                                                                    {res.difficulty}
                                                                                </span>

                                                                                {/* Favorite */}
                                                                                <button 
                                                                                    title={favorites.includes(res.link) ? "Remove from Favorites" : "Save to Favorites"}
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        e.stopPropagation();
                                                                                        toggleFavorite(res.link);
                                                                                    }}
                                                                                    style={{ 
                                                                                        width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,0.3)', 
                                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                                                                        color: favorites.includes(res.link) ? '#fbbf24' : 'rgba(255,255,255,0.3)',
                                                                                        border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.2s',
                                                                                        cursor: 'pointer', fontSize: '0.7rem'
                                                                                    }}
                                                                                >
                                                                                    <Award size={12} fill={favorites.includes(res.link) ? "currentColor" : "none"} /> 
                                                                                </button>
                                                                            </div>
                                                                        </a>
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
                    height: 10px; width: 10px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    margin-top: -3px;
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%; height: 3px;
                    background: rgba(255,255,255,0.15);
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );
};

export default Roadmaps;
