import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Award, Edit2, Save, RotateCcw, UserMinus, BarChart2, Download, X } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { enDomains } from '../data/domains'; // Use English domains for consistent data keys

const Profile = () => {
    // Context
    const { 
        activeDays, focusMinutes, codeRuns, badges, 
        getSkillLevel, generateWeeklyReport,
        roadmapProgress 
    } = useProgress();

    // Local State
    const [isEditing, setIsEditing] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [reportData, setReportData] = useState(null);

    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('lc_profile');
        return saved ? JSON.parse(saved) : {
            name: 'AMD Developer',
            username: 'guest_user_5173',
            bio: 'Local learning environment active on Ryzen™ AI hardware.'
        };
    });

    useEffect(() => {
        localStorage.setItem('lc_profile', JSON.stringify(profile));
    }, [profile]);

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to decouple your Premium Status from this device?")) {
            alert("Premium Session Ended. You have been logged out.");
            window.location.reload(); 
        }
    };

    const handleGenerateReport = () => {
        const report = generateWeeklyReport();
        setReportData(report);
        setShowReport(true);
    };

    // Calculate derived stats
    const streak = activeDays.length;
    const totalFocusHours = (focusMinutes / 60).toFixed(1);
    
    // Calculate total skills mastered (100% complete domains or >70%?)
    // Let's say "Masters" are domains with 100% progress.
    const skillsMastered = enDomains.filter(d => getSkillLevel(d.title).percentage === 100).length;

    // Badge Definitions (Could be shared, but simple mapping here)
    const badgeDetails = {
        'active_7': { label: '7 Day Streak', icon: '🔥', color: '#ff5555' },
        'code_warrior': { label: 'Code Warrior', icon: '💻', color: '#50fa7b' },
        'focus_master': { label: 'Focus Master', icon: '🧠', color: '#bd93f9' },
        'halfway_hero': { label: 'Halfway Hero', icon: '🏃', color: '#ffb86c' },
        'advanced_achiever': { label: 'Advanced Achiever', icon: '🚀', color: '#8be9fd' },
        'beginner_badge': { label: 'Beginner', icon: '🌱', color: '#f1fa8c' } // Example
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative' }}
        >
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1>User Profile</h1>
                    <p>Manage your identity, view progress, and access reports.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                     <button 
                        onClick={handleGenerateReport}
                        style={{ 
                            padding: '0.75rem 1rem', background: 'rgba(130, 87, 229, 0.2)', border: '1px solid var(--accent-color)', 
                            borderRadius: '10px', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', 
                            gap: '8px', cursor: 'pointer', fontWeight: 600
                        }}
                    >
                        <BarChart2 size={16} /> Weekly Report
                    </button>

                    {!isEditing ? (
                        <>
                            <button 
                                onClick={handleLogout}
                                style={{ 
                                    padding: '0.75rem', background: 'transparent', border: '1px solid #ff5555', 
                                    borderRadius: '10px', color: '#ff5555', display: 'flex', alignItems: 'center', 
                                    gap: '8px', cursor: 'pointer', fontWeight: 600
                                }}
                                title="Logout"
                            >
                                <UserMinus size={16} />
                            </button>
                            <button 
                                onClick={() => setIsEditing(true)}
                                style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                            >
                                <Edit2 size={16} /> Edit
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={handleSave}
                            style={{ padding: '0.75rem 1.5rem', background: 'var(--accent-color)', border: 'none', borderRadius: '10px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700 }}
                        >
                            <Save size={16} /> Save Changes
                        </button>
                    )}
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {/* User Card */}
                    <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                         <div style={{ 
                            width: 100, height: 100, borderRadius: '50%', background: 'rgba(130, 87, 229, 0.1)', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                            border: '2px solid var(--accent-color)', position: 'relative'
                         }}>
                            <User size={48} color="var(--accent-color)" />
                         </div>
                         
                         {isEditing ? (
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                 <input 
                                    value={profile.name} 
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                                    style={{ background: 'rgba(0,10,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', color: 'white', textAlign: 'center', fontWeight: 700, fontSize: '1.2rem' }}
                                 />
                                 <input 
                                    value={profile.username} 
                                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                                    style={{ background: 'rgba(0,10,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '6px', color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.85rem' }}
                                 />
                                 <textarea 
                                    value={profile.bio} 
                                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                    style={{ background: 'rgba(0,10,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.85rem', resize: 'none', height: '80px' }}
                                 />
                             </div>
                         ) : (
                             <>
                                <h2 style={{ marginBottom: '0.25rem' }}>{profile.name}</h2>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>@{profile.username}</p>
                                <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.5 }}>{profile.bio}</p>
                             </>
                         )}
                         
                         <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(50, 250, 123, 0.1)', color: '#50fa7b', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                            <Shield size={14} /> LOCAL ACCESS ONLY
                         </div>
                    </div>

                    {/* Badge System (Gamification) */}
                    <div className="glass-card" style={{ padding: '2rem' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Award size={18} color="var(--accent-color)" /> Badges & Achievements
                            </h3>
                         </div>
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                             <AnimatePresence>
                             {Object.keys(badges).length > 0 ? Object.keys(badges).map((badgeId) => {
                                const info = badgeDetails[badgeId] || { label: badgeId, icon: '🏅', color: 'white' };
                                return (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={badgeId} 
                                        style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', borderLeft: `3px solid ${info.color}` }}
                                    >
                                        <div style={{ width: 32, height: 32, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', background: 'rgba(255,255,255,0.1)' }}>
                                            {info.icon}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{info.label}</div>
                                    </motion.div>
                                );
                             }) : (
                                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '0.85rem', opacity: 0.3, fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
                                     Complete activities to unlock badges!
                                 </motion.div>
                             )}
                             </AnimatePresence>
                         </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {/* Metrics Dashboard */}
                    <div className="glass-card" style={{ padding: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2>Learning Metrics</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1.5rem' }}>
                            {[
                                { label: 'Day Streak', value: streak, unit: 'Days' },
                                { label: 'Focus Time', value: totalFocusHours, unit: 'Hours' },
                                { label: 'Code Runs', value: codeRuns, unit: 'Executions' },
                                { label: 'Skills Mastered', value: skillsMastered, unit: 'Domains' }
                            ].map((stat, i) => (
                                <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{stat.label}</div>
                                    <div style={{ fontSize: '2rem', fontWeight: 900, display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                        {stat.value} <span style={{ fontSize: '0.85rem', fontWeight: 500, opacity: 0.5 }}>{stat.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skill Intelligence (New Feature) */}
                    <div className="glass-card" style={{ padding: '2.5rem' }}>
                        <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <BarChart2 size={24} color="var(--accent-color)" /> Skill Intelligence
                        </h2>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                            {enDomains.map((domain, i) => {
                                const skill = getSkillLevel(domain.title);
                                // Only show skills that have at least some progress to avoid clutter?
                                // Or show all. Let's show all top 5 or just ones with progress > 0 for cleanliness.
                                if (skill.percentage === 0) return null;

                                return (
                                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600 }}>
                                            <span>{domain.title}</span>
                                            <span style={{ color: skill.levelColor }}>{skill.level} ({skill.percentage}%)</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.percentage}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                style={{ height: '100%', background: skill.levelColor, borderRadius: '4px' }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            {/* Fallback if no skills started */}
                            {enDomains.every(d => getSkillLevel(d.title).percentage === 0) && (
                                <div style={{ textAlign: 'center', opacity: 0.5, fontStyle: 'italic', padding: '2rem' }}>
                                    Start learning in the Roadmap to see your skill intelligence stats populate here.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Weekly Report Modal */}
            <AnimatePresence>
                {showReport && reportData && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ 
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                            background: 'rgba(0,0,0,0.8)', zIndex: 1000, 
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backdropFilter: 'blur(5px)'
                        }}
                        onClick={() => setShowReport(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card"
                            style={{ 
                                width: '90%', maxWidth: '600px', padding: '2.5rem', 
                                position: 'relative', border: '1px solid var(--accent-color)',
                                boxShadow: '0 0 30px rgba(130, 87, 229, 0.3)'
                            }}
                        >
                            <button 
                                onClick={() => setShowReport(false)}
                                style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                            >
                                <X size={24} />
                            </button>

                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '2rem', color: 'var(--accent-color)' }}>Weekly Pulse Report</h2>
                                <p style={{ opacity: 0.7 }}>{reportData.date}</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 800 }}>{reportData.focusHours}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Focus Hours</div>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 800 }}>{reportData.codeRuns}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Code Executions</div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#50fa7b' }}>Strongest Areas</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {reportData.strongDomains.length > 0 ? reportData.strongDomains.map(d => (
                                        <span key={d} style={{ padding: '4px 12px', background: 'rgba(80, 250, 123, 0.1)', color: '#50fa7b', borderRadius: '20px', fontSize: '0.85rem' }}>{d}</span>
                                    )) : <span style={{ opacity: 0.5, fontStyle: 'italic' }}>Keep working to master a domain!</span>}
                                </div>
                            </div>

                             <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#ffb86c' }}>Focus Areas</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {reportData.weakDomains.slice(0, 3).map(d => (
                                        <span key={d} style={{ padding: '4px 12px', background: 'rgba(255, 184, 108, 0.1)', color: '#ffb86c', borderRadius: '20px', fontSize: '0.85rem' }}>{d}</span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ padding: '1rem', background: 'rgba(130, 87, 229, 0.1)', borderRadius: '12px', borderLeft: '3px solid var(--accent-color)' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>AI Insights</h4>
                                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>{reportData.nextSteps}</p>
                            </div>

                            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                <button style={{ padding: '0.75rem 2rem', background: 'var(--accent-color)', border: 'none', borderRadius: '20px', color: 'white', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                    <Download size={16} /> Download PDF
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Profile;
