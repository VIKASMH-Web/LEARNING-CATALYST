import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Edit2, LogOut, MapPin, Mail, Briefcase, 
    Award, Code, BookOpen, Trash2, Save, X, 
    CheckCircle, Calendar, Zap, Layout, Camera, Plus, Trash
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
    const bannerInputRef = useRef(null);
    const avatarInputRef = useRef(null);

    const defaultProfile = {
        name: authCtx.user?.name || 'Guest User',
        title: 'Software Engineer',
        location: 'Bengaluru, India',
        email: authCtx.user?.email || 'your.email@example.com',
        avatarUrl: null,
        bannerUrl: null,
        focusAreas: ['C', 'Data Structures', 'React'],
        experiences: [],
        certifications: []
    };

    const storageKey = authCtx.user?.id ? `lc_profile_${authCtx.user.id}` : 'lc_profile_guest';
    const [profile, setProfile] = useState(defaultProfile);

    // Temp state for new items being added
    const [newItem, setNewItem] = useState({ type: null, text: '' });

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

    const handleImageUpload = (e, field) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setProfile(prev => ({ ...prev, [field]: reader.result }));
        reader.readAsDataURL(file);
    };

    const addObjectItem = (field, value) => {
        if (!value.trim()) return;
        setProfile(prev => ({
            ...prev,
            [field]: [...prev[field], value]
        }));
        setNewItem({ type: null, text: '' });
    };

    const removeObjectItem = (field, index) => {
        setProfile(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const SectionCard = ({ title, icon: Icon, children, field }) => (
        <div style={{ 
            background: '#121214', 
            borderRadius: '16px', 
            padding: '2.5rem', 
            border: '1px solid rgba(255,255,255,0.04)',
            marginBottom: '1.5rem',
            position: 'relative'
        }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={18} color="#818cf8" /> {title}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {children}
                
                {isEditing && field && (
                    <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                        {newItem.type === field ? (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input 
                                    autoFocus
                                    value={newItem.text}
                                    onChange={e => setNewItem({ ...newItem, text: e.target.value })}
                                    onKeyDown={e => e.key === 'Enter' && addObjectItem(field, newItem.text)}
                                    placeholder={`Type your ${title.toLowerCase()}...`}
                                    style={{ flex: 1, background: '#18181b', border: '1px solid #333', borderRadius: '8px', padding: '10px 16px', color: 'white', outline: 'none' }}
                                />
                                <button onClick={() => addObjectItem(field, newItem.text)} style={{ background: '#6366f1', border: 'none', borderRadius: '8px', color: 'white', px: '16px', cursor: 'pointer', fontWeight: 700 }}>Add</button>
                                <button onClick={() => setNewItem({ type: null, text: '' })} style={{ background: '#333', border: 'none', borderRadius: '8px', color: 'white', px: '16px', cursor: 'pointer' }}>Cancel</button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => setNewItem({ type: field, text: '' })}
                                style={{ background: 'transparent', border: '1px dashed #333', borderRadius: '12px', padding: '12px', color: '#6366f1', fontWeight: 700, cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <Plus size={16} /> New {title.slice(0, -1)}
                            </button>
                        )}
                    </div>
                )}
            </div>
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
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem', background: '#0a0a0b', minHeight: '100vh', color: '#FFFFFF', fontFamily: "'Inter', sans-serif" }}>
            
            {/* Header Section */}
            <div style={{ 
                background: '#121214', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                border: '1px solid rgba(255,255,255,0.04)',
                marginBottom: '2.5rem'
            }}>
                {/* Banner Area */}
                <div 
                    onClick={() => isEditing && bannerInputRef.current?.click()}
                    style={{ 
                        height: '160px', 
                        background: profile.bannerUrl ? `url(${profile.bannerUrl}) center/cover` : 'linear-gradient(90deg, #18181b 0%, #121214 100%)',
                        position: 'relative',
                        cursor: isEditing ? 'pointer' : 'default'
                    }}>
                    {isEditing && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem', gap: 8 }}>
                            <Camera size={20} /> Change Banner Photo
                        </div>
                    )}
                    <input ref={bannerInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'bannerUrl')} />
                </div>
                
                <div style={{ padding: '0 3rem 2rem', marginTop: '-50px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end' }}>
                            {/* Avatar Area */}
                            <div style={{ position: 'relative' }}>
                                <div style={{ 
                                    width: '130px', height: '130px', borderRadius: '24px', 
                                    background: '#18181b', border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '6px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                    cursor: isEditing ? 'pointer' : 'default'
                                }} onClick={() => isEditing && avatarInputRef.current?.click()}>
                                    <div style={{ 
                                        width: '100%', height: '100%', borderRadius: '18px', 
                                        background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}>
                                        {profile.avatarUrl ? (
                                            <img src={profile.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <User size={56} color="rgba(255,255,255,0.1)" />
                                        )}
                                    </div>
                                    {isEditing && (
                                        <div style={{ position: 'absolute', bottom: 10, right: 10, background: '#6366f1', color: 'white', width: 32, height: 32, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #121214' }}>
                                            <Camera size={14} />
                                        </div>
                                    )}
                                </div>
                                <input ref={avatarInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'avatarUrl')} />
                            </div>
                            
                            <div style={{ marginBottom: '12px' }}>
                                {isEditing ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <input 
                                            value={profile.name} 
                                            onChange={e => setProfile({...profile, name: e.target.value})}
                                            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1.75rem', fontWeight: 800, padding: '4px 8px', borderRadius: '8px', outline: 'none', width: 300 }}
                                        />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                                            <Briefcase size={14} />
                                            <input 
                                                value={profile.title} 
                                                onChange={e => setProfile({...profile, title: e.target.value})}
                                                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1rem', padding: '2px 6px', borderRadius: '6px', outline: 'none', width: 250 }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: 0, letterSpacing: '-0.03em' }}>{profile.name}</h1>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', opacity: 0.5, fontSize: '0.95rem', fontWeight: 600 }}>
                                            <Briefcase size={16} /> {profile.title}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button 
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                style={{ 
                                    padding: '12px 28px', borderRadius: '14px', 
                                    background: isEditing ? '#f8fafc' : '#6366f1', 
                                    color: isEditing ? '#0f172a' : '#FFFFFF',
                                    border: 'none', fontWeight: 800, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {isEditing ? <><Save size={18} /> Save Changes</> : <><Edit2 size={18} /> Edit Profile</>}
                            </button>
                            <button 
                                onClick={() => setShowSignOutWarning(true)}
                                style={{ 
                                    padding: '12px 28px', borderRadius: '14px', 
                                    background: 'rgba(239, 68, 68, 0.05)', color: '#f87171',
                                    border: '1px solid rgba(239, 68, 68, 0.1)', fontWeight: 800, cursor: 'pointer'
                                }}
                            >
                                <LogOut size={18} /> Sign Out
                            </button>
                        </div>
                    </div>

                    <div style={{ marginTop: '2.5rem', display: 'flex', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                            <MapPin size={18} color="#818cf8" /> 
                            {isEditing ? (
                                <input 
                                    value={profile.location} 
                                    onChange={e => setProfile({...profile, location: e.target.value})}
                                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.9rem', padding: '4px 8px', borderRadius: '8px', outline: 'none' }}
                                />
                            ) : profile.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                            <Mail size={18} color="#818cf8" /> 
                            {isEditing ? (
                                <input 
                                    value={profile.email} 
                                    onChange={e => setProfile({...profile, email: e.target.value})}
                                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.9rem', padding: '4px 8px', borderRadius: '8px', outline: 'none' }}
                                />
                            ) : profile.email}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: '2.5rem' }}>
                {/* Left Content */}
                <div>
                    <SectionCard title="Experience" icon={Briefcase} field="experiences">
                        {profile.experiences.length > 0 ? (
                            profile.experiences.map((exp, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                                    <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{exp}</span>
                                    {isEditing && <Trash size={16} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => removeObjectItem('experiences', i)} />}
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.3 }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No experiences added yet. Click "Edit Profile" to add.</p>
                            </div>
                        )}
                    </SectionCard>

                    <SectionCard title="Certifications" icon={Award} field="certifications">
                        {profile.certifications.length > 0 ? (
                            profile.certifications.map((cert, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                                    <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{cert}</span>
                                    {isEditing && <Trash size={16} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => removeObjectItem('certifications', i)} />}
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.3 }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No certifications added yet. Click "Edit Profile" to add.</p>
                            </div>
                        )}
                    </SectionCard>

                    <SectionCard title="Skills" icon={Code} field="focusAreas">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {profile.focusAreas.map((skill, i) => (
                                <div key={skill} style={{ 
                                    padding: '10px 24px', 
                                    background: '#1e1e24', 
                                    borderRadius: '100px', 
                                    fontSize: '0.85rem', 
                                    fontWeight: 700,
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: 'rgba(255,255,255,0.9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    {skill}
                                    {isEditing && <X size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => removeObjectItem('focusAreas', i)} />}
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>

                {/* Right Sidebar - Badge Progress */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Intelligence Status</h2>
                        <span style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 800 }}>
                            {Object.values(badges).filter(v => v).length} / {BADGE_DEFINITIONS.length} Verified
                        </span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {BADGE_DEFINITIONS.map(badge => (
                            <BadgeCard key={badge.id} badge={badge} />
                        ))}
                    </div>

                    <div style={{ marginTop: '2.5rem', background: 'linear-gradient(135deg, #1e1e2d 0%, #12121e 100%)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(129, 140, 248, 0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Zap size={20} color="#818cf8" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Current XP</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{xp.toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${(xp % 500) / 500 * 100}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)' }}>
                            <span>LVL {Math.floor(xp / 500) + 1}</span>
                            <span>{500 - (xp % 500)} XP TO NEXT LEVEL</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sign Out Modal */}
            <AnimatePresence>
                {showSignOutWarning && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSignOutWarning(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} style={{ background: '#121214', padding: '3.5rem', borderRadius: '32px', width: '90%', maxWidth: '440px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
                            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                <LogOut size={40} color="#ef4444" />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Security Check</h3>
                            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '1rem' }}>Are you sure you want to end your secure session? Your local progress will be preserved.</p>
                            <div style={{ display: 'flex', gap: '1.25rem' }}>
                                <button onClick={() => setShowSignOutWarning(false)} style={{ flex: 1, padding: '16px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}>Stay Active</button>
                                <button onClick={() => authCtx.logout()} style={{ flex: 1, padding: '16px', borderRadius: '16px', background: '#ef4444', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)' }}>Sign Out</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
