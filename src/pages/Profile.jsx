import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Award, Edit2, Save, X, Mail, Calendar, MapPin, Briefcase, Camera, Image, Plus, Trophy, Zap, Target, Clock, Code, BookOpen } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

// --- BADGE DEFINITIONS (Requirements + Progress Logic) ---
const BADGE_DEFINITIONS = [
    { 
        id: 'active_7', icon: '📅', title: '7 Active Days', 
        desc: 'Log in for 7 different days', 
        requirement: 7, unit: 'days',
        getProgress: (ctx) => ctx.activeDays.length 
    },
    { 
        id: 'code_warrior', icon: '⚔️', title: 'Code Warrior', 
        desc: 'Run code analysis 25 times', 
        requirement: 25, unit: 'runs',
        getProgress: (ctx) => ctx.codeRuns 
    },
    { 
        id: 'focus_master', icon: '🧠', title: 'Focus Master', 
        desc: 'Accumulate 10 hours of focus time', 
        requirement: 600, unit: 'minutes',
        getProgress: (ctx) => ctx.focusMinutes,
        formatProgress: (val) => `${(val / 60).toFixed(1)}h`,
        formatReq: () => '10h'
    },
    { 
        id: 'halfway_hero', icon: '🏗️', title: 'Halfway Hero', 
        desc: 'Reach 50% in any roadmap', 
        requirement: 50, unit: '%',
        getProgress: (ctx) => {
            try {
                let max = 0;
                const totals = JSON.parse(localStorage.getItem('lc_domain_totals') || '{}');
                Object.keys(totals).forEach(domain => {
                    const stats = ctx.getSkillLevel ? ctx.getSkillLevel(domain) : { percentage: 0 };
                    if (stats && stats.percentage > max) max = stats.percentage;
                });
                return max;
            } catch { return 0; }
        }
    },
    { 
        id: 'advanced_achiever', icon: '🚀', title: 'Advanced Achiever', 
        desc: 'Reach 70% in any roadmap', 
        requirement: 70, unit: '%',
        getProgress: (ctx) => {
            try {
                let max = 0;
                const totals = JSON.parse(localStorage.getItem('lc_domain_totals') || '{}');
                Object.keys(totals).forEach(domain => {
                    const stats = ctx.getSkillLevel ? ctx.getSkillLevel(domain) : { percentage: 0 };
                    if (stats && stats.percentage > max) max = stats.percentage;
                });
                return max;
            } catch { return 0; }
        }
    },
];

const Profile = () => {
    const ctx = useProgress() || {};
    const activeDays = ctx.activeDays || [];
    const focusMinutes = ctx.focusMinutes || 0;
    const codeRuns = ctx.codeRuns || 0;
    const badges = ctx.badges || {};
    const getSkillLevel = ctx.getSkillLevel;
    const generateWeeklyReport = ctx.generateWeeklyReport;

    // --- EDITABLE PROFILE STATE ---
    const [isEditing, setIsEditing] = useState(false);
    const bannerInputRef = useRef(null);
    const avatarInputRef = useRef(null);

    const defaultProfile = {
        name: 'Your Name',
        title: 'Your Role / Title',
        location: 'Your Location',
        email: 'your.email@example.com',
        bio: 'Tell us about yourself...',
        avatarUrl: null,
        bannerUrl: null,
        focusAreas: ['Add your first skill'],
    };

    const [profile, setProfile] = useState(() => {
        try {
            const saved = localStorage.getItem('lc_profile');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Merge with defaults to ensure all fields exist
                return { ...defaultProfile, ...parsed, focusAreas: Array.isArray(parsed.focusAreas) ? parsed.focusAreas : defaultProfile.focusAreas };
            }
        } catch (e) { /* ignore parse errors */ }
        return defaultProfile;
    });

    useEffect(() => {
        localStorage.setItem('lc_profile', JSON.stringify(profile));
    }, [profile]);

    const handleSave = () => setIsEditing(false);

    // --- IMAGE UPLOAD HANDLERS ---
    const handleImageUpload = (e, field) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfile(prev => ({ ...prev, [field]: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    // --- FOCUS AREA MANAGEMENT ---
    const [newFocusArea, setNewFocusArea] = useState('');
    const addFocusArea = () => {
        const areas = profile.focusAreas || [];
        if (newFocusArea.trim() && !areas.includes(newFocusArea.trim())) {
            setProfile(prev => ({ ...prev, focusAreas: [...(prev.focusAreas || []), newFocusArea.trim()] }));
            setNewFocusArea('');
        }
    };
    const removeFocusArea = (tag) => {
        setProfile(prev => ({ ...prev, focusAreas: (prev.focusAreas || []).filter(t => t !== tag) }));
    };

    // --- COGNITIVE PERFORMANCE DATA ---
    const performanceData = [
        { day: 'Mon', score: 65 },
        { day: 'Tue', score: 72 },
        { day: 'Wed', score: 68 },
        { day: 'Thu', score: 85 },
        { day: 'Fri', score: 90 },
        { day: 'Sat', score: 78 },
        { day: 'Sun', score: 88 },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* ====== BANNER + HEADER ====== */}
            <header className="glass-card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                {/* Banner */}
                <div 
                    onClick={() => isEditing && bannerInputRef.current?.click()}
                    style={{ 
                        height: '180px', 
                        background: profile.bannerUrl 
                            ? `url(${profile.bannerUrl}) center/cover no-repeat` 
                            : 'linear-gradient(90deg, #7c3aed 0%, #3b82f6 100%)',
                        position: 'relative',
                        cursor: isEditing ? 'pointer' : 'default'
                    }}
                >
                    {/* Texture overlay */}
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 20%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 25%)' }} />
                    
                    {isEditing && (
                        <div style={{ 
                            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(0,0,0,0.4)', transition: 'opacity 0.2s'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                                <Image size={20} /> Click to change banner
                            </div>
                        </div>
                    )}
                    <input ref={bannerInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'bannerUrl')} />
                </div>

                {/* Profile Info Bar */}
                <div style={{ padding: '0 2.5rem 2rem 2.5rem', marginTop: '-3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end' }}>
                        
                        {/* Avatar */}
                        <div 
                            onClick={() => isEditing && avatarInputRef.current?.click()}
                            style={{ 
                                width: 120, height: 120, borderRadius: '24px', 
                                background: '#1e293b', padding: '4px',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.3)', position: 'relative',
                                cursor: isEditing ? 'pointer' : 'default', overflow: 'hidden'
                            }}
                        >
                            {profile.avatarUrl ? (
                                <img src={profile.avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover' }} />
                            ) : (
                                /* LinkedIn-style default avatar */
                                <div style={{ 
                                    width: '100%', height: '100%', borderRadius: '20px', 
                                    background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <User size={48} color="#64748b" strokeWidth={1.5} />
                                </div>
                            )}
                            
                            {isEditing && (
                                <div style={{ 
                                    position: 'absolute', inset: '4px', borderRadius: '20px',
                                    background: 'rgba(0,0,0,0.5)', display: 'flex', 
                                    alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Camera size={24} color="white" />
                                </div>
                            )}
                            <input ref={avatarInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'avatarUrl')} />
                        </div>

                        {/* Name & Title */}
                        <div style={{ marginBottom: '0.5rem' }}>
                            {isEditing ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})}
                                        placeholder="Your Name"
                                        style={{ fontSize: '1.5rem', fontWeight: 600, background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: 'white', padding: '6px 12px', borderRadius: '8px', outline: 'none', width: '300px' }}
                                    />
                                    <input value={profile.title} onChange={(e) => setProfile({...profile, title: e.target.value})}
                                        placeholder="Your Role"
                                        style={{ fontSize: '0.95rem', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '6px 12px', borderRadius: '8px', outline: 'none', width: '300px' }}
                                    />
                                </div>
                            ) : (
                                <>
                                    <h1 className="h2" style={{ marginBottom: '0.25rem' }}>{profile.name}</h1>
                                    <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Briefcase size={14} /> {profile.title}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Edit / Save Button */}
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <button 
                            onClick={isEditing ? handleSave : () => setIsEditing(true)} 
                            className="btn"
                            style={{ 
                                padding: '0.5rem 1.25rem', borderRadius: '20px',
                                background: isEditing ? 'var(--success)' : 'var(--bg-elevated)',
                                color: isEditing ? 'white' : 'var(--text-primary)',
                                border: isEditing ? 'none' : '1px solid var(--border-color)',
                                display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.85rem'
                            }}
                        >
                            {isEditing ? <><Save size={16} /> Save Profile</> : <><Edit2 size={16} /> Edit Profile</>}
                        </button>
                    </div>
                </div>

                {/* Additional Info Row */}
                <div style={{ padding: '0 2.5rem 1.5rem 2.5rem', display: 'flex', gap: '2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', flexWrap: 'wrap' }}>
                    {isEditing ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <MapPin size={14} />
                                <input value={profile.location} onChange={(e) => setProfile({...profile, location: e.target.value})} 
                                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 8px', borderRadius: '6px', outline: 'none', fontSize: '0.85rem', width: '180px' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Mail size={14} />
                                <input value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})}
                                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 8px', borderRadius: '6px', outline: 'none', fontSize: '0.85rem', width: '220px' }} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={14} /> {profile.location}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14} /> {profile.email}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={14} /> Joined Feb 2024</div>
                        </>
                    )}
                </div>
            </header>

            {/* ====== MAIN CONTENT GRID ====== */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Cognitive Performance Chart */}
                    <div className="glass-card" style={{ padding: '2rem', minHeight: '280px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 className="h3">Cognitive Performance</h3>
                                <p className="body-sm">Weekly focus & logic score</p>
                            </div>
                            <div style={{ color: '#50fa7b', fontWeight: 700, fontSize: '0.9rem' }}>+14.2%</div>
                        </div>
                        <div style={{ height: '200px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="day" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                                    <Area type="monotone" dataKey="score" stroke="#7c3aed" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Focus Areas (Editable) */}
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 className="h3" style={{ marginBottom: '1.5rem' }}>Focus Areas</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                            {(profile.focusAreas || []).map(tag => (
                                <span key={tag} style={{ 
                                    padding: '6px 14px', background: 'var(--bg-elevated)', 
                                    borderRadius: '20px', border: '1px solid var(--border-color)', 
                                    fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500,
                                    display: 'flex', alignItems: 'center', gap: '8px'
                                }}>
                                    {tag}
                                    {isEditing && (
                                        <button onClick={() => removeFocusArea(tag)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', padding: 0 }}>
                                            <X size={14} />
                                        </button>
                                    )}
                                </span>
                            ))}
                            
                            {isEditing && (
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                    <input 
                                        value={newFocusArea}
                                        onChange={(e) => setNewFocusArea(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addFocusArea()}
                                        placeholder="Add skill..."
                                        style={{ 
                                            padding: '6px 14px', background: 'transparent', 
                                            borderRadius: '20px', border: '1px dashed var(--text-secondary)', 
                                            fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none', width: '140px'
                                        }}
                                    />
                                    <button onClick={addFocusArea} style={{ 
                                        width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-color)', 
                                        border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 
                                    }}>
                                        <Plus size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Badges with Progress */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="h3">Badge Progress</h3>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                {BADGE_DEFINITIONS.filter(b => badges[b.id]).length}/{BADGE_DEFINITIONS.length} Earned
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {BADGE_DEFINITIONS.map(badge => {
                                const currentProgress = badge.getProgress(ctx);
                                const isEarned = badges[badge.id] === true;
                                const percentage = Math.min(100, Math.round((currentProgress / badge.requirement) * 100));
                                
                                // Display values
                                const progressDisplay = badge.formatProgress ? badge.formatProgress(currentProgress) : currentProgress;
                                const reqDisplay = badge.formatReq ? badge.formatReq() : badge.requirement;

                                return (
                                    <div key={badge.id} style={{ 
                                        padding: '1rem', background: isEarned ? 'rgba(80, 250, 123, 0.05)' : 'var(--bg-elevated)', 
                                        borderRadius: '12px', border: `1px solid ${isEarned ? 'rgba(80, 250, 123, 0.2)' : 'var(--border-color)'}`,
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                                            <div style={{ 
                                                width: 40, height: 40, borderRadius: '50%', 
                                                background: isEarned ? 'rgba(80, 250, 123, 0.15)' : 'rgba(255,255,255,0.05)', 
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                                fontSize: '1.2rem', flexShrink: 0,
                                                filter: isEarned ? 'none' : 'grayscale(100%)', opacity: isEarned ? 1 : 0.6
                                            }}>
                                                {badge.icon}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: isEarned ? '#50fa7b' : 'var(--text-primary)' }}>{badge.title}</span>
                                                    {isEarned && <span style={{ fontSize: '0.7rem', color: '#50fa7b', fontWeight: 700 }}>✓ EARNED</span>}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{badge.desc}</div>
                                            </div>
                                        </div>
                                        
                                        {/* Progress Bar */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                                    style={{ 
                                                        height: '100%', borderRadius: '3px',
                                                        background: isEarned 
                                                            ? 'linear-gradient(90deg, #50fa7b, #10b981)' 
                                                            : 'linear-gradient(90deg, #7c3aed, #a78bfa)'
                                                    }} 
                                                />
                                            </div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isEarned ? '#50fa7b' : 'var(--text-secondary)', minWidth: '80px', textAlign: 'right' }}>
                                                {progressDisplay} / {reqDisplay}{badge.unit && !badge.formatReq ? ` ${badge.unit}` : ''}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Progress Insights */}
                    <div className="glass-card" style={{ 
                        padding: '2rem', 
                        background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', 
                        border: 'none', color: 'white'
                    }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Progress Insights</h3>
                        <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            You have {activeDays.length} active days and {(focusMinutes / 60).toFixed(1)}h of focused learning. Keep going!
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.12)', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{activeDays.length}</div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Active Days</div>
                            </div>
                            <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.12)', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{codeRuns}</div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Code Runs</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
