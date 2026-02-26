import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User, Award, Edit2, Save, X, Mail, Calendar, MapPin, Briefcase, Camera, Image, Plus, Trophy, Zap, Target, Clock, Code, BookOpen, Trash2, LogOut, Star, Linkedin, ExternalLink, ShieldCheck } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

// --- BADGE DEFINITIONS ---
const BADGE_DEFINITIONS = [
    { id: 'active_7', icon: '📅', title: '7 Active Days', desc: 'Log in for 7 different days', requirement: 7, unit: 'days', getProgress: (ctx) => (ctx.activeDays || []).length },
    { id: 'code_warrior', icon: '⚔️', title: 'Code Warrior', desc: 'Run code analysis 25 times', requirement: 25, unit: 'runs', getProgress: (ctx) => ctx.codeRuns || 0 },
    { id: 'focus_master', icon: '🧠', title: 'Focus Master', desc: 'Accumulate 10 hours of focus time', requirement: 600, unit: 'minutes', getProgress: (ctx) => ctx.focusMinutes || 0, formatProgress: (val) => `${(val / 60).toFixed(1)}h`, formatReq: () => '10h' },
    { id: 'halfway_hero', icon: '🏗️', title: 'Halfway Hero', desc: 'Reach 50% in any roadmap', requirement: 50, unit: '%', getProgress: (ctx) => { try { let max = 0; const t = JSON.parse(localStorage.getItem('lc_domain_totals') || '{}'); Object.keys(t).forEach(d => { const s = ctx.getSkillLevel ? ctx.getSkillLevel(d) : { percentage: 0 }; if (s && s.percentage > max) max = s.percentage; }); return max; } catch { return 0; } } },
    { id: 'advanced_achiever', icon: '🚀', title: 'Advanced Achiever', desc: 'Reach 70% in any roadmap', requirement: 70, unit: '%', getProgress: (ctx) => { try { let max = 0; const t = JSON.parse(localStorage.getItem('lc_domain_totals') || '{}'); Object.keys(t).forEach(d => { const s = ctx.getSkillLevel ? ctx.getSkillLevel(d) : { percentage: 0 }; if (s && s.percentage > max) max = s.percentage; }); return max; } catch { return 0; } } },
];

const Profile = () => {
    const ctx = useProgress();
    const { activeDays = [], focusMinutes = 0, codeRuns = 0, badges = {}, dailyFocus = {}, interviewHistory = [] } = ctx || {};
    const authCtx = useAuth() || {};
    const { xp, streak } = useGame() || { xp: 0, streak: 0 };

    // --- EDITABLE PROFILE STATE ---
    const [isEditing, setIsEditing] = useState(false);
    const bannerInputRef = useRef(null);
    const avatarInputRef = useRef(null);

    const defaultProfile = {
        name: authCtx.user?.name || 'Your Name',
        title: 'Your Role / Title',
        location: 'Your Location',
        email: authCtx.user?.email || 'your.email@example.com',
        joinedDate: '2024-02',
        avatarUrl: null,
        bannerUrl: null,
        focusAreas: ['C', 'Data Structures', 'React'],
        experiences: [],
        certifications: [],
        linkedin: '',
        lastSyncedUser: null 
    };

    // Scoped storage key
    const storageKey = authCtx.user?.id ? `lc_profile_${authCtx.user.id}` : 'lc_profile_guest';

    const [profile, setProfile] = useState(defaultProfile);

    // Load profile on mount or user change
    useEffect(() => {
        try {
            let saved = localStorage.getItem(storageKey);
            
            // Migration Logic: If logged in user has no profile data, but guest exists, migrate it once
            if (!saved && authCtx.user?.id) {
                const guestData = localStorage.getItem('lc_profile_guest');
                if (guestData) {
                    saved = guestData;
                    localStorage.setItem(storageKey, guestData);
                    // We keep guest data just in case, or we could remove it. Let's keep it for now.
                }
            }

            if (saved) {
                const parsed = JSON.parse(saved);
                setProfile({
                    ...defaultProfile,
                    ...parsed,
                    // Ensure we sync the user's current identity from Auth
                    name: (parsed.name === 'Your Name' || parsed.name === 'Guest Learner') && authCtx.user?.name ? authCtx.user.name : parsed.name,
                    email: (parsed.email === 'your.email@example.com' || !parsed.email) && authCtx.user?.email ? authCtx.user.email : parsed.email,
                    focusAreas: Array.isArray(parsed.focusAreas) ? parsed.focusAreas : defaultProfile.focusAreas,
                    experiences: Array.isArray(parsed.experiences) ? parsed.experiences : [],
                    certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
                });
            } else {
                setProfile({
                    ...defaultProfile,
                    name: authCtx.user?.name || 'Your Name',
                    email: authCtx.user?.email || 'your.email@example.com',
                });
            }
        } catch (err) { 
            console.error("Profile load error:", err);
            setProfile(defaultProfile);
        }
    }, [storageKey, authCtx.user?.name, authCtx.user?.email]);

    // Save profile on change
    useEffect(() => {
        if (profile.name) { // Simple check to avoid saving empty state
             localStorage.setItem(storageKey, JSON.stringify(profile));
        }
    }, [profile, storageKey]);

    const handleSave = () => setIsEditing(false);

    // --- IMAGE UPLOAD ---
    const handleImageUpload = (e, field) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setProfile(prev => ({ ...prev, [field]: reader.result }));
        reader.readAsDataURL(file);
    };

    const removeAvatar = () => setProfile(prev => ({ ...prev, avatarUrl: null }));

    // --- FOCUS AREA / SKILLS MANAGEMENT ---
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

    // --- EXPERIENCE MANAGEMENT ---
    const [showExpForm, setShowExpForm] = useState(false);
    const [newExp, setNewExp] = useState({ title: '', company: '', duration: '', description: '' });
    const addExperience = () => {
        if (newExp.title.trim() && newExp.company.trim()) {
            setProfile(prev => ({ ...prev, experiences: [...(prev.experiences || []), { ...newExp, id: Date.now() }] }));
            setNewExp({ title: '', company: '', duration: '', description: '' });
            setShowExpForm(false);
        }
    };
    const removeExperience = (id) => {
        setProfile(prev => ({ ...prev, experiences: (prev.experiences || []).filter(e => e.id !== id) }));
    };

    // --- CERTIFICATION MANAGEMENT ---
    const [showCertForm, setShowCertForm] = useState(false);
    const [newCert, setNewCert] = useState({ name: '', issuer: '', date: '', link: '' });
    const addCertification = () => {
        if (newCert.name.trim() && newCert.issuer.trim()) {
            setProfile(prev => ({ ...prev, certifications: [...(prev.certifications || []), { ...newCert, id: Date.now() }] }));
            setNewCert({ name: '', issuer: '', date: '', link: '' });
            setShowCertForm(false);
        }
    };
    const removeCertification = (id) => {
        setProfile(prev => ({ ...prev, certifications: (prev.certifications || []).filter(c => c.id !== id) }));
    };

    // --- CHART DATA (DYNAMIC) ---
    const performanceData = useMemo(() => {
        const data = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayName = days[d.getDay()];
            
            // Score based on focus + interview
            const focusMins = dailyFocus?.[dateStr] || 0;
            const dailyInterview = (interviewHistory || []).find(h => h.date === dateStr);
            const interviewScore = dailyInterview ? (dailyInterview.score?.technical || dailyInterview.score || 0) : 0;
            
            const combinedScore = Math.min(100, (focusMins / 2) + (interviewScore / 2));
            
            data.push({ 
                day: dayName, 
                score: Math.max(30, Math.round(combinedScore)) // Base floor of 30 for visual
            });
        }
        return data;
    }, [dailyFocus, interviewHistory]);

    // Helpers
    const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '8px 12px', borderRadius: '8px', outline: 'none', fontSize: '0.85rem', width: '100%', boxSizing: 'border-box' };

    const formatJoinDate = (dateStr) => {
        try {
            const [y, m] = dateStr.split('-');
            return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        } catch { return dateStr; }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>

            {/* ====== BANNER + HEADER ====== */}
            <header className="glass-card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                {/* Banner */}
                <div
                    onClick={() => isEditing && bannerInputRef.current?.click()}
                    style={{
                        height: '120px',
                        background: profile.bannerUrl
                            ? `url(${profile.bannerUrl}) center/cover no-repeat`
                            : 'var(--bg-elevated)',
                        position: 'relative', cursor: isEditing ? 'pointer' : 'default',
                        borderBottom: '1px solid var(--border-color)'
                    }}
                >
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 20%)' }} />
                    {isEditing && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                                <Image size={20} /> Click to change banner
                            </div>
                        </div>
                    )}
                    <input ref={bannerInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'bannerUrl')} />
                </div>

                {/* Profile Info */}
                <div style={{ padding: '0 2.5rem 2rem', marginTop: '-3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end' }}>
                        {/* Avatar with options */}
                        <div style={{ position: 'relative' }}>
                            <div
                                style={{
                                    width: 90, height: 90, borderRadius: 12,
                                    background: 'var(--bg-elevated)', padding: '3px',
                                    border: '1px solid var(--border-color)', overflow: 'hidden'
                                }}
                            >
                                {profile.avatarUrl ? (
                                    <img src={profile.avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{
                                        width: '100%', height: '100%', borderRadius: 10,
                                        background: 'var(--bg-surface)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <User size={36} color="var(--text-tertiary)" strokeWidth={1.5} />
                                    </div>
                                )}
                            </div>

                            {/* Avatar action buttons */}
                            {isEditing && (
                                <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>
                                    <button
                                        onClick={() => avatarInputRef.current?.click()}
                                        title="Change photo"
                                        style={{
                                            width: 32, height: 32, borderRadius: '50%',
                                            background: 'var(--accent-color)', border: '2px solid var(--bg-card)',
                                            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        <Camera size={14} />
                                    </button>
                                    {profile.avatarUrl && (
                                        <button
                                            onClick={removeAvatar}
                                            title="Remove photo"
                                            style={{
                                                width: 32, height: 32, borderRadius: '50%',
                                                background: '#ef4444', border: '2px solid var(--bg-card)',
                                                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                            }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                            )}
                            <input ref={avatarInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'avatarUrl')} />
                        </div>

                        {/* Name & Title */}
                        <div style={{ marginBottom: '0.5rem' }}>
                            {isEditing ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <input 
                                        autoFocus
                                        value={profile.name} 
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        placeholder="Enter your full name"
                                        style={{ ...inputStyle, fontSize: '1.5rem', fontWeight: 600, width: '300px', background: 'var(--bg-secondary)' }} />
                                    <input 
                                        value={profile.title} 
                                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                                        placeholder="Your Role (e.g. Software Engineer)"
                                        style={{ ...inputStyle, width: '300px', background: 'var(--bg-secondary)' }} />
                                    <input 
                                        value={profile.linkedin} 
                                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                                        placeholder="LinkedIn Profile URL"
                                        style={{ ...inputStyle, width: '300px', background: 'var(--bg-secondary)' }} />
                                </div>
                            ) : (
                                <>
                                    <h1 className="h2" style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.75rem' }}>
                                        {profile.name || 'Set Your Name'}
                                        {authCtx.user?.method === 'google' && !isEditing && (
                                            <span title="Verified Google Account" style={{ color: '#60a5fa' }}><ShieldCheck size={18} /></span>
                                        )}
                                    </h1>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                                            <Briefcase size={14} /> {profile.title || 'Add your title'}
                                        </p>
                                        {profile.linkedin && (
                                            <a 
                                                href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                style={{ 
                                                    display: 'flex', alignItems: 'center', gap: '8px', 
                                                    color: '#60a5fa', fontSize: '0.85rem', textDecoration: 'none',
                                                    fontWeight: 500, width: 'fit-content'
                                                }}
                                            >
                                                <Linkedin size={14} /> View LinkedIn Profile <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Edit / Save */}
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                            onClick={isEditing ? handleSave : () => setIsEditing(true)}
                            className="btn"
                            style={{
                                padding: '0.625rem 1.5rem', borderRadius: '10px',
                                background: isEditing ? 'var(--success)' : 'var(--accent-color)',
                                color: 'white',
                                border: 'none',
                                display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.875rem',
                                boxShadow: isEditing ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.2)'
                            }}
                        >
                            {isEditing ? <><Save size={16} /> Save Changes</> : <><Edit2 size={16} /> Edit Profile</>}
                        </button>
                        <button
                            onClick={authCtx.logout}
                            className="btn"
                            style={{
                                padding: '0.625rem 1.5rem', borderRadius: '10px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.875rem',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                </div>

                {/* Info Row */}
                <div style={{ padding: '0 2.5rem 1.5rem', display: 'flex', gap: '2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', flexWrap: 'wrap' }}>
                    {isEditing ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <MapPin size={14} />
                                <input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                    style={{ ...inputStyle, width: '180px' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Mail size={14} />
                                <input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    style={{ ...inputStyle, width: '220px' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Calendar size={14} />
                                <input type="month" value={profile.joinedDate || ''} onChange={(e) => setProfile({ ...profile, joinedDate: e.target.value })}
                                    style={{ ...inputStyle, width: '180px' }} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={14} /> {profile.location}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14} /> {profile.email}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={14} /> Joined {formatJoinDate(profile.joinedDate || '2024-02')}</div>
                        </>
                    )}
                </div>
            </header>

            {/* ====== MAIN GRID ====== */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                {/* LEFT COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>


                    {/* Experience Section */}
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="h3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={20} color="var(--accent-color)" /> Experience</h3>
                            {isEditing && (
                                <button onClick={() => setShowExpForm(!showExpForm)} className="btn" style={{ padding: '4px 12px', borderRadius: '20px', background: 'var(--accent-color)', color: 'white', border: 'none', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                    <Plus size={14} /> Add
                                </button>
                            )}
                        </div>

                        {/* Add Experience Form */}
                        {isEditing && showExpForm && (
                            <div style={{ padding: '1.25rem', background: 'var(--bg-elevated)', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <input placeholder="Job Title *" value={newExp.title} onChange={(e) => setNewExp({ ...newExp, title: e.target.value })} style={inputStyle} />
                                <input placeholder="Company *" value={newExp.company} onChange={(e) => setNewExp({ ...newExp, company: e.target.value })} style={inputStyle} />
                                <input placeholder="Duration (e.g., Jan 2023 – Present)" value={newExp.duration} onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })} style={inputStyle} />
                                <textarea placeholder="Description (optional)" value={newExp.description} onChange={(e) => setNewExp({ ...newExp, description: e.target.value })} style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button onClick={addExperience} style={{ padding: '8px 16px', background: 'var(--success)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Save</button>
                                    <button onClick={() => setShowExpForm(false)} style={{ padding: '8px 16px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>Cancel</button>
                                </div>
                            </div>
                        )}

                        {/* Experience List */}
                        {(profile.experiences || []).length === 0 ? (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                                No experiences added yet. {isEditing ? 'Click "Add" to get started.' : 'Click "Edit Profile" to add.'}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {(profile.experiences || []).map((exp) => (
                                    <div key={exp.id} style={{ padding: '1rem 1.25rem', background: 'var(--bg-elevated)', borderRadius: '12px', border: '1px solid var(--border-color)', position: 'relative' }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{exp.title}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-color)', marginBottom: '2px' }}>{exp.company}</div>
                                        {exp.duration && <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{exp.duration}</div>}
                                        {exp.description && <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5 }}>{exp.description}</div>}
                                        {isEditing && (
                                            <button onClick={() => removeExperience(exp.id)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', padding: 0 }}>
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Certifications Section */}
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="h3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={20} color="#f59e0b" /> Certifications</h3>
                            {isEditing && (
                                <button onClick={() => setShowCertForm(!showCertForm)} className="btn" style={{ padding: '4px 12px', borderRadius: '20px', background: '#f59e0b', color: '#000', border: 'none', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                    <Plus size={14} /> Add
                                </button>
                            )}
                        </div>

                        {/* Add Certification Form */}
                        {isEditing && showCertForm && (
                            <div style={{ padding: '1.25rem', background: 'var(--bg-elevated)', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <input placeholder="Certification Name *" value={newCert.name} onChange={(e) => setNewCert({ ...newCert, name: e.target.value })} style={inputStyle} />
                                <input placeholder="Issuing Organization *" value={newCert.issuer} onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })} style={inputStyle} />
                                <input placeholder="Date Issued (e.g., March 2024)" value={newCert.date} onChange={(e) => setNewCert({ ...newCert, date: e.target.value })} style={inputStyle} />
                                <input placeholder="Credential URL (optional)" value={newCert.link} onChange={(e) => setNewCert({ ...newCert, link: e.target.value })} style={inputStyle} />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button onClick={addCertification} style={{ padding: '8px 16px', background: 'var(--success)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Save</button>
                                    <button onClick={() => setShowCertForm(false)} style={{ padding: '8px 16px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>Cancel</button>
                                </div>
                            </div>
                        )}

                        {/* Certification List */}
                        {(profile.certifications || []).length === 0 ? (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                                No certifications added yet. {isEditing ? 'Click "Add" to get started.' : 'Click "Edit Profile" to add.'}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {(profile.certifications || []).map((cert) => (
                                    <div key={cert.id} style={{ padding: '1rem 1.25rem', background: 'var(--bg-elevated)', borderRadius: '12px', border: '1px solid var(--border-color)', position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Award size={20} color="#f59e0b" />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{cert.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{cert.issuer} {cert.date && `· ${cert.date}`}</div>
                                            {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--accent-color)', textDecoration: 'none' }}>View Credential →</a>}
                                        </div>
                                        {isEditing && (
                                            <button onClick={() => removeCertification(cert.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', padding: 0 }}>
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Skills (Editable) */}
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 className="h3" style={{ marginBottom: '1.5rem' }}>Skills</h3>
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
                            {(profile.focusAreas || []).length === 0 && !isEditing && (
                                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>No skills added yet</span>
                            )}
                        </div>
                    </div>

                    {/* Cognitive Performance */}
                    <div className="glass-card" style={{ padding: '2rem', minHeight: '280px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div><h3 className="h3">Cognitive Performance</h3><p className="body-sm">Weekly focus & logic score</p></div>
                            <div style={{ color: '#50fa7b', fontWeight: 700, fontSize: '0.9rem' }}>+14.2%</div>
                        </div>
                        <div style={{ height: '200px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs><linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} /><stop offset="95%" stopColor="#7c3aed" stopOpacity={0} /></linearGradient></defs>
                                    <XAxis dataKey="day" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                                    <Area type="monotone" dataKey="score" stroke="#7c3aed" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Badge Progress */}
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
                                const progressDisplay = badge.formatProgress ? badge.formatProgress(currentProgress) : currentProgress;
                                const reqDisplay = badge.formatReq ? badge.formatReq() : badge.requirement;
                                return (
                                    <div key={badge.id} style={{
                                        padding: '1rem', background: isEarned ? 'rgba(80,250,123,0.05)' : 'var(--bg-elevated)',
                                        borderRadius: '12px', border: `1px solid ${isEarned ? 'rgba(80,250,123,0.2)' : 'var(--border-color)'}`
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                                            <div style={{
                                                width: 40, height: 40, borderRadius: '50%',
                                                background: isEarned ? 'rgba(80,250,123,0.15)' : 'rgba(255,255,255,0.05)',
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
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ flex: 1, height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden' }}>
                                                <motion.div
                                                    initial={{ width: 0 }} animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                                    style={{ height: '100%', borderRadius: '5px', background: isEarned ? 'linear-gradient(90deg,#50fa7b,#10b981)' : 'linear-gradient(90deg,#7c3aed,#a78bfa)' }}
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
                    <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.375rem' }}>Progress Insights</h3>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                            You have {activeDays.length} active days and {(focusMinutes / 60).toFixed(1)}h of focused learning.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <div style={{ flex: 1, padding: '0.625rem', border: '1px solid var(--border-color)', borderRadius: 6, textAlign: 'center' }}>
                                <div style={{ fontWeight: 600, fontSize: '1rem' }}>{activeDays.length}</div>
                                <div className="body-xs">Active Days</div>
                            </div>
                            <div style={{ flex: 1, padding: '0.625rem', border: '1px solid var(--border-color)', borderRadius: 6, textAlign: 'center' }}>
                                <div style={{ fontWeight: 600, fontSize: '1rem' }}>{codeRuns}</div>
                                <div className="body-xs">Code Runs</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
