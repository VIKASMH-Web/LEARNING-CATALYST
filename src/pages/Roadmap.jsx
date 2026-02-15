import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Bell, AlertCircle, Clock, Zap, Award, Globe, RotateCcw } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { getDomains, enDomains } from '../data/domains';

const Roadmaps = () => {
    // Context
    const { 
        roadmapProgress, updateRoadmapProgress, resetRoadmapProgress, 
        notifications, addNotification, clearNotifications 
    } = useProgress();

    // Local UI State
    const [currentLang, setCurrentLang] = useState('en');
    const [showNotif, setShowNotif] = useState(false);

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'kn', label: 'ಕನ್ನಡ' },
        { code: 'ta', label: 'தமிழ்' },
        { code: 'ml', label: 'മലയാളം' },
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
    const domains = getDomains(currentLang);

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
        const enTitle = enDomains[dIndex].title;

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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {domains.map((domain, i) => {
                    const stats = getDomainStats(domain.title, domain.steps);
                    
                    return (
                        <section key={i} className="glass-card" style={{ padding: '2.5rem' }}>
                            <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>{domain.title}</h2>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Path: {domain.path}</p>
                                </div>
                                <div style={{ textAlign: 'right', fontSize: '0.85rem', opacity: 0.8, display: 'flex', gap: '1rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{width: 6, height: 6, borderRadius: '50%', background: '#50fa7b'}}/> {stats.completed} Done</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{width: 6, height: 6, borderRadius: '50%', background: '#ffb86c'}}/> {stats.near} Near</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{width: 6, height: 6, borderRadius: '50%', background: '#6272a4'}}/> {stats.incomplete} To Do</span>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {domain.steps.map((step, idx) => {
                                    const dIndex = domains.findIndex(d => d.title === domain.title);
                                    const enTitle = enDomains[dIndex].title;
                                    const key = `${enTitle}-${idx}`;
                                    
                                    const item = roadmapProgress[key] || { progress: 0, completed: false };
                                    const status = getItemStatus(item);
                                    
                                    return (
                                        <div key={idx} style={{ 
                                            display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                                            background: item.completed ? 'rgba(80, 250, 123, 0.05)' : 'transparent',
                                            padding: '1rem', borderRadius: '12px', transition: 'all 0.2s',
                                            border: item.completed ? '1px solid rgba(80, 250, 123, 0.1)' : '1px solid transparent'
                                        }}>
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
                                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? 'var(--text-secondary)' : 'white', opacity: item.completed ? 0.7 : 1 }}>
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
                                                    <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                        <li>Month {(idx * 1.5).toFixed(0)}-{(idx * 1.5 + 1.5).toFixed(0)} Intensive study</li>
                                                        <li>Project-based practical validation</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
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
