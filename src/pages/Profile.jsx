import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Edit2, LogOut, MapPin, Mail, Briefcase, 
    Award, Code, BookOpen, Trash2, Save, X, 
    CheckCircle, Calendar, Zap, Layout
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';

const BADGE_DEFINITIONS = [
    { id: 'active_7', icon: Calendar, title: '7 Active Days', desc: 'Log in for 7 different days', requirement: 7, unit: 'days', getProgress: (ctx) => (ctx.activeDays || []).length },
    { id: 'code_warrior', icon: Code, title: 'Code Warrior', desc: 'Run code analysis 25 times', requirement: 25, unit: 'runs', getProgress: (ctx) => ctx.codeRuns || 0 },
    { id: 'focus_master', icon: Layout, title: 'Focus Master', desc: 'Accumulate 10 hours of focus time', requirement: 600, unit: 'minutes', getProgress: (ctx) => ctx.focusMinutes || 0, formatProgress: (val) => `${(val / 60).toFixed(1)}h`, formatReq: () => '10h' },
    { id: 'halfway_hero', icon: Award, title: 'Halfway Hero', desc: 'Reach 50% in any roadmap', requirement: 50, unit: '%', getProgress: (ctx) => { try { let max = 0; const t = JSON.parse(localStorage.getItem('lc_domain_totals') || '{}'); Object.keys(t).forEach(d => { const s = ctx.getSkillLevel ? ctx.getSkillLevel(d) : { percentage: 0 }; if (s && s.percentage > max) max = s.percentage; }); return max; } catch { return 0; } } },
    { id: 'advanced_achiever', icon: Zap, title: 'Advanced Achiever', desc: 'Reach 70% in any roadmap', requirement: 70, unit: '%', getProgress: (ctx) => { try { let max = 0; const t = JSON.parse(localStorage.getItem('lc_domain_totals') || '{}'); Object.keys(t).forEach(d => { const s = ctx.getSkillLevel ? ctx.getSkillLevel(d) : { percentage: 0 }; if (s && s.percentage > max) max = s.percentage; }); return max; } catch { return 0; } } },
];

const Profile = () => {
    const ctx = useProgress();
    const { activeDays = [], focusMinutes = 0, codeRuns = 0, badges = {}, dailyFocus = {}, interviewHistory = [] } = ctx || {};
    const authCtx = useAuth() || {};
    const { xp, streak } = useGame() || { xp: 0, streak: 0 };

    const [isEditing, setIsEditing] = useState(false);
    const [showSignOutWarning, setShowSignOutWarning] = useState(false);

    const defaultProfile = {
        name: authCtx.user?.name || 'Guest User',
        title: 'Software Engineer',
        location: 'Bengaluru, India',
        email: authCtx.user?.email || 'your.email@example.com',
        avatarUrl: null,
        focusAreas: ['C', 'Data Structures', 'React'],
        experiences: [],
        certifications: []
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

    const handleSave = () => {
        setIsEditing(false);
    };

    const SectionCard = ({ title, icon: Icon, children }) => (
        <div style={{ 
            background: '#121214', 
            borderRadius: '16px', 
            padding: '2.5rem', 
            border: '1px solid rgba(255,255,255,0.04)',
            marginBottom: '1.5rem'
        }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={18} color="#818cf8" /> {title}
            </h3>
            {children}
        </div>
    );

    const BadgeCard = ({ badge }) => {
        const prog = badge.getProgress(ctx);
        const percent = Math.min(100, (prog / badge.requirement) * 100);
        const Icon = badge.icon;
        
        return (
            <div style={{ 
                background: '#18181b', 
                borderRadius: '12px', 
                padding: '1.25rem', 
                border: '1px solid rgba(255,255,255,0.03)',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
            }}>
                <div style={{ 
                    width: '48px', height: '48px', borderRadius: '50%', 
                    background: 'rgba(255,255,255,0.03)', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center' 
                }}>
                    <Icon size={20} color="rgba(255,255,255,0.3)" />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF' }}>{badge.title}</span>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                            {badge.formatProgress ? badge.formatProgress(prog) : prog} / {badge.formatReq ? badge.formatReq() : badge.requirement} {badge.unit}
                        </span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginBottom: '12px' }}>{badge.desc}</div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 1 }}
                            style={{ height: '100%', background: '#818cf8', borderRadius: '3px' }} 
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem', background: '#0a0a0b', minHeight: '100vh', color: '#FFFFFF' }}>
            
            {/* Header Section */}
            <div style={{ 
                background: '#121214', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                border: '1px solid rgba(255,255,255,0.04)',
                marginBottom: '2.5rem'
            }}>
                <div style={{ height: '120px', background: 'linear-gradient(90deg, #18181b 0%, #121214 100%)' }} />
                
                <div style={{ padding: '0 3rem 2rem', marginTop: '-40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end' }}>
                            <div style={{ 
                                width: '120px', height: '120px', borderRadius: '16px', 
                                background: '#18181b', border: '1px solid rgba(255,255,255,0.1)',
                                padding: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                            }}>
                                <div style={{ 
                                    width: '100%', height: '100%', borderRadius: '12px', 
                                    background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                                }}>
                                    <User size={48} color="rgba(255,255,255,0.1)" />
                                </div>
                            </div>
                            
                            <div style={{ marginBottom: '8px' }}>
                                {isEditing ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <input 
                                            value={profile.name} 
                                            onChange={e => setProfile({...profile, name: e.target.value})}
                                            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1.5rem', fontWeight: 800, padding: '4px 8px', borderRadius: '8px', outline: 'none' }}
                                        />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                                            <Briefcase size={14} />
                                            <input 
                                                value={profile.title} 
                                                onChange={e => setProfile({...profile, title: e.target.value})}
                                                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.9rem', padding: '2px 6px', borderRadius: '6px', outline: 'none' }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>{profile.name}</h1>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', opacity: 0.5, fontSize: '0.9rem', fontWeight: 600 }}>
                                            <Briefcase size={14} /> {profile.title}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button 
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                style={{ 
                                    padding: '10px 24px', borderRadius: '12px', 
                                    background: isEditing ? '#f8fafc' : '#6366f1', 
                                    color: isEditing ? '#0f172a' : '#FFFFFF',
                                    border: 'none', fontWeight: 700, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '8px'
                                }}
                            >
                                {isEditing ? <><Save size={16} /> Save</> : <><Edit2 size={16} /> Edit Profile</>}
                            </button>
                            <button 
                                onClick={() => setShowSignOutWarning(true)}
                                style={{ 
                                    padding: '10px 24px', borderRadius: '12px', 
                                    background: '#1e1e1e', color: '#f87171',
                                    border: 'none', fontWeight: 700, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '8px'
                                }}
                            >
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>
                    </div>

                    <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                            <MapPin size={16} /> 
                            {isEditing ? (
                                <input 
                                    value={profile.location} 
                                    onChange={e => setProfile({...profile, location: e.target.value})}
                                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.85rem', padding: '2px 6px', borderRadius: '6px', outline: 'none' }}
                                />
                            ) : profile.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                            <Mail size={16} /> 
                            {isEditing ? (
                                <input 
                                    value={profile.email} 
                                    onChange={e => setProfile({...profile, email: e.target.value})}
                                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.85rem', padding: '2px 6px', borderRadius: '6px', outline: 'none' }}
                                />
                            ) : profile.email}
                        </div>
                        {/* Date Joined Removed per user request */}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)', gap: '2rem' }}>
                {/* Left Content */}
                <div>
                    <SectionCard title="Experience" icon={Briefcase}>
                        <div style={{ py: '4rem', textAlign: 'center', opacity: 0.3 }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No experiences added yet. Click "Edit Profile" to add.</p>
                        </div>
                    </SectionCard>

                    <SectionCard title="Certifications" icon={Award}>
                        <div style={{ py: '4rem', textAlign: 'center', opacity: 0.3 }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No certifications added yet. Click "Edit Profile" to add.</p>
                        </div>
                    </SectionCard>

                    <SectionCard title="Skills" icon={Code}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {profile.focusAreas.map(skill => (
                                <div key={skill} style={{ 
                                    padding: '10px 24px', 
                                    background: '#1e1e24', 
                                    borderRadius: '100px', 
                                    fontSize: '0.85rem', 
                                    fontWeight: 700,
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    color: 'rgba(255,255,255,0.8)'
                                }}>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>

                {/* Right Sidebar - Badge Progress */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>Badge Progress</h2>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                            {Object.values(badges).filter(v => v).length} / {BADGE_DEFINITIONS.length} Earned
                        </span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {BADGE_DEFINITIONS.map(badge => (
                            <BadgeCard key={badge.id} badge={badge} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Sign Out Modal */}
            <AnimatePresence>
                {showSignOutWarning && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSignOutWarning(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} style={{ background: '#18181b', padding: '3rem', borderRadius: '32px', width: '90%', maxWidth: '440px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <LogOut size={48} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Confirm Sign Out</h3>
                            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '2.5rem' }}>Are you sure you want to end your session? Your progress is synced to your profile.</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button onClick={() => setShowSignOutWarning(false)} style={{ flex: 1, padding: '14px', borderRadius: '16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 800, cursor: 'pointer' }}>Cancel</button>
                                <button onClick={() => authCtx.logout()} style={{ flex: 1, padding: '14px', borderRadius: '16px', background: '#ef4444', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Sign Out</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
