import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Award, Edit2, Save, X, Mail, Calendar, MapPin, 
    Briefcase, Camera, Image, Plus, Trophy, Zap, Target, 
    Clock, Code, BookOpen, Trash2, LogOut, Star, Linkedin, 
    ExternalLink, ShieldCheck, CheckCircle
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

const BADGE_DEFINITIONS = [
    { id: 'active_7', icon: '📅', title: '7 Active Days', desc: 'Log in for 7 different days', requirement: 7, unit: 'days', getProgress: (ctx) => (ctx.activeDays || []).length },
    { id: 'code_warrior', icon: '⚔️', title: 'Code Warrior', desc: 'Run code analysis 25 times', requirement: 25, unit: 'runs', getProgress: (ctx) => ctx.codeRuns || 0 },
    { id: 'focus_master', icon: '🧠', title: 'Focus Master', desc: 'Accumulate 10 hours of focus time', requirement: 600, unit: 'minutes', getProgress: (ctx) => ctx.focusMinutes || 0, formatProgress: (val) => `${(val / 60).toFixed(1)}h`, formatReq: () => '10h' },
    { id: 'halfway_hero', icon: '🏗️', title: 'Halfway Hero', desc: 'Reach 50% in any roadmap', requirement: 50, unit: '%', getProgress: (ctx) => { try { let max = 0; const t = JSON.parse(localStorage.getItem('lc_domain_totals') || '{}'); Object.keys(t).forEach(d => { const s = ctx.getSkillLevel ? ctx.getSkillLevel(d) : { percentage: 0 }; if (s && s.percentage > max) max = s.percentage; }); return max; } catch { return 0; } } },
];

const Profile = () => {
    const ctx = useProgress();
    const { activeDays = [], focusMinutes = 0, codeRuns = 0, badges = {}, dailyFocus = {}, interviewHistory = [] } = ctx || {};
    const authCtx = useAuth() || {};
    const { xp, streak } = useGame() || { xp: 0, streak: 0 };

    const [isEditing, setIsEditing] = useState(false);
    const [showSignOutWarning, setShowSignOutWarning] = useState(false);
    const bannerInputRef = useRef(null);
    const avatarInputRef = useRef(null);

    const defaultProfile = {
        name: authCtx.user?.name || 'Guest User',
        title: 'Learning Catalyst Explorer',
        location: 'Global',
        email: authCtx.user?.email || 'guest@learningcatalyst.ai',
        joinedDate: '2024-02',
        avatarUrl: null,
        bannerUrl: null,
        focusAreas: ['C', 'Mathematics', 'Logic'],
        experiences: [],
        certifications: [],
        linkedin: ''
    };

    const storageKey = authCtx.user?.id ? `lc_profile_${authCtx.user.id}` : 'lc_profile_guest';
    const [profile, setProfile] = useState(defaultProfile);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                setProfile({ ...defaultProfile, ...parsed });
            }
        } catch (err) { console.error(err); }
    }, [storageKey]);

    useEffect(() => {
        if (profile.name) {
            localStorage.setItem(storageKey, JSON.stringify(profile));
        }
    }, [profile, storageKey]);

    const handleImageUpload = (e, field) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setProfile(prev => ({ ...prev, [field]: reader.result }));
        reader.readAsDataURL(file);
    };

    const performanceData = useMemo(() => {
        const data = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(); d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const trendBoost = (6 - i) * 15;
            const val = Math.max(30, Math.round((dailyFocus?.[dateStr] || 0) / 2 + 25 + trendBoost));
            data.push({ day: days[d.getDay()], score: val });
        }
        return data;
    }, [dailyFocus]);

    const inputStyle = {
        width: '100%', padding: '12px 16px', background: 'var(--bg-primary)',
        border: '1px solid var(--border-color)', borderRadius: '12px',
        color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none'
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 0.5rem' }}>
            {/* Header Section */}
            <header style={{
                background: '#FFFFFF', borderRadius: '32px', overflow: 'hidden',
                border: '1px solid var(--border-color)', boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
                marginBottom: '2.5rem'
            }}>
                <div 
                    onClick={() => isEditing && bannerInputRef.current?.click()}
                    style={{
                        height: '180px', position: 'relative', cursor: isEditing ? 'pointer' : 'default',
                        background: profile.bannerUrl ? `url(${profile.bannerUrl}) center/cover` : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                    }}
                >
                    {isEditing && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
                            <Camera size={20} style={{ marginRight: 8 }} /> Click to change banner
                        </div>
                    )}
                    <input ref={bannerInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'bannerUrl')} />
                </div>

                <div style={{ padding: '0 3rem 2.5rem', marginTop: '-45px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end' }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: 130, height: 130, borderRadius: '32px', background: '#FFFFFF',
                                padding: '6px', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
                            }}>
                                {profile.avatarUrl ? (
                                    <img src={profile.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '26px', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', borderRadius: '26px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <User size={48} color="var(--text-tertiary)" />
                                    </div>
                                )}
                            </div>
                            {isEditing && (
                                <button 
                                    onClick={() => avatarInputRef.current?.click()}
                                    style={{ position: 'absolute', bottom: 5, right: 5, background: 'var(--text-primary)', color: 'white', width: 36, height: 36, borderRadius: '50%', border: '4px solid #FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Camera size={16} />
                                </button>
                            )}
                            <input ref={avatarInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'avatarUrl')} />
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                            {isEditing ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} placeholder="Full Name" style={{...inputStyle, fontSize: '1.5rem', fontWeight: 800, width: 300}} />
                                    <input value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} placeholder="Title" style={{...inputStyle, width: 300}} />
                                </div>
                            ) : (
                                <>
                                    <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em', margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                                        {profile.name}
                                        {authCtx.user?.method === 'google' && <ShieldCheck size={24} color="var(--accent-color)" />}
                                    </h1>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Briefcase size={16} /> {profile.title}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            style={{
                                padding: '12px 24px', borderRadius: '16px', border: '1px solid var(--border-color)',
                                background: isEditing ? 'var(--text-primary)' : '#FFFFFF', color: isEditing ? '#FFFFFF' : 'var(--text-primary)',
                                fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s'
                            }}
                        >
                            {isEditing ? <><Save size={18} /> Save Settings</> : <><Edit2 size={18} /> Edit Profile</>}
                        </button>
                        <button 
                            onClick={() => setShowSignOutWarning(true)}
                            style={{ padding: '12px 24px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.1)', fontWeight: 700, cursor: 'pointer' }}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                <div style={{ padding: '1.5rem 3rem', background: 'rgba(99,102,241,0.03)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}><MapPin size={16} /> {profile.location}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}><Mail size={16} /> {profile.email}</div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem' }}>
                {/* Left Side */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <section style={{ background: '#FFFFFF', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <Zap size={20} color="var(--accent-color)" /> Focus Intelligence
                        </h3>
                        <div style={{ height: 260, width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs><linearGradient id="pColor" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.15} /><stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0} /></linearGradient></defs>
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontWeight: 700, fontSize: 12 }} />
                                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} />
                                    <Area type="monotone" dataKey="score" stroke="var(--accent-color)" strokeWidth={4} fill="url(#pColor)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    <section style={{ background: '#FFFFFF', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Core Specializations</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {profile.focusAreas.map(tag => (
                                <div key={tag} style={{ padding: '8px 20px', background: 'var(--bg-primary)', borderRadius: '14px', border: '1px solid var(--border-color)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    {tag} {isEditing && <X size={14} color="#ef4444" style={{ cursor: 'pointer' }} />}
                                </div>
                            ))}
                            {isEditing && <div style={{ padding: '8px 20px', borderRadius: '14px', border: '1px dashed var(--accent-color)', color: 'var(--accent-color)', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' }}>+ Add Skill</div>}
                        </div>
                    </section>
                </div>

                {/* Right Side */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <section style={{ background: '#FFFFFF', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2rem' }}>Learning Badges</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {BADGE_DEFINITIONS.map(badge => {
                                const prog = badge.getProgress(ctx);
                                const isDone = prog >= badge.requirement;
                                return (
                                    <div key={badge.id} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                                        <div style={{ width: 56, height: 56, borderRadius: '50%', background: isDone ? 'rgba(16,185,129,0.1)' : 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', filter: isDone ? 'none' : 'grayscale(1)' }}>
                                            {badge.icon}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{badge.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{badge.desc}</div>
                                            <div style={{ height: 6, background: 'var(--bg-primary)', borderRadius: 3, marginTop: 10, overflow: 'hidden' }}>
                                                <div style={{ width: `${Math.min(100, (prog/badge.requirement)*100)}%`, height: '100%', background: isDone ? '#10b981' : 'var(--accent-color)', borderRadius: 3 }} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>

            {/* Sign Out Modal */}
            <AnimatePresence>
                {showSignOutWarning && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSignOutWarning(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} style={{ background: '#FFFFFF', padding: '3rem', borderRadius: '32px', width: '90%', maxWidth: '440px', textAlign: 'center', boxShadow: '0 24px 64px rgba(0,0,0,0.1)' }}>
                            <LogOut size={48} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Confirm Sign Out</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>Are you sure you want to end your session? Your learning progress is always saved locally.</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button onClick={() => setShowSignOutWarning(false)} style={{ flex: 1, padding: '14px', borderRadius: '16px', border: '1px solid var(--border-color)', background: '#FFFFFF', fontWeight: 800 }}>Cancel</button>
                                <button onClick={() => authCtx.logout()} style={{ flex: 1, padding: '14px', borderRadius: '16px', background: '#ef4444', color: 'white', border: 'none', fontWeight: 800 }}>Sign Out</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
