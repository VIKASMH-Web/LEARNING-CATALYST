import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Award, Edit2, Save, X, Mail, Calendar, MapPin, 
    Briefcase, Camera, Image, Plus, Trophy, Zap, Target, 
    Clock, Code, BookOpen, Trash2, LogOut, Star, Linkedin, 
    ExternalLink, ShieldCheck, CheckCircle, ChevronRight,
    PieChart, Activity, Sparkles, Layout
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, YAxis } from 'recharts';

const BADGE_DEFINITIONS = [
    { id: 'active_7', icon: Calendar, title: '7 Active Days', desc: 'Consistency is key to mastery.', requirement: 7, unit: 'days', color: '#818cf8', getProgress: (ctx) => (ctx.activeDays || []).length },
    { id: 'code_warrior', icon: Code, title: 'Code Warrior', desc: 'Engineered high-fidelity logic.', requirement: 25, unit: 'runs', color: '#10b981', getProgress: (ctx) => ctx.codeRuns || 0 },
    { id: 'focus_master', icon: Layout, title: 'Focus Master', desc: 'Deep work sessions completed.', requirement: 600, unit: 'mins', color: '#f59e0b', getProgress: (ctx) => ctx.focusMinutes || 0, formatProgress: (val) => `${(val / 60).toFixed(1)}h`, formatReq: () => '10h' },
    { id: 'achiever', icon: Trophy, title: 'Elite Achiever', desc: 'Dominating growth roadmaps.', requirement: 100, unit: 'pts', color: '#ec4899', getProgress: (ctx) => { try { let max = 0; const t = JSON.parse(localStorage.getItem('lc_domain_totals') || '{}'); Object.keys(t).forEach(d => { const s = ctx.getSkillLevel ? ctx.getSkillLevel(d) : { percentage: 0 }; if (s && s.percentage > max) max = s.percentage; }); return max; } catch { return 0; } } },
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
        name: authCtx.user?.name || 'Academic Pioneer',
        title: 'Software Development Specialist',
        location: 'Bengaluru, India',
        email: authCtx.user?.email || 'pioneer@learningcatalyst.ai',
        avatarUrl: null,
        bannerUrl: null,
        focusAreas: ['C', 'Data Structures', 'React Architecture'],
        experiences: [],
        certifications: []
    };

    const storageKey = authCtx.user?.id ? `lc_profile_${authCtx.user.id}` : 'lc_profile_guest';
    const [profile, setProfile] = useState(defaultProfile);
    const [addItemType, setAddItemType] = useState(null);
    const [itemInput, setItemInput] = useState('');

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
            const trendBoost = (6 - i) * 12; // Mandatory trend boost for increasing graph
            const val = Math.max(30, Math.round((dailyFocus?.[dateStr] || 0) / 2 + 35 + trendBoost));
            data.push({ 
                day: days[d.getDay()], 
                score: val,
                fullDate: dateStr
            });
        }
        return data;
    }, [dailyFocus]);

    const handleAddItem = (type) => {
        if (!itemInput.trim()) return;
        setProfile(prev => ({
            ...prev,
            [type]: [...(prev[type] || []), itemInput]
        }));
        setItemInput('');
        setAddItemType(null);
    };

    const handleRemoveItem = (type, index) => {
        setProfile(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index)
        }));
    };

    const GlassCard = ({ children, style = {}, noPadding = false }) => (
        <motion.div 
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
            style={{ 
                background: 'rgba(18, 18, 22, 0.7)', 
                backdropFilter: 'blur(20px)',
                borderRadius: '32px', 
                border: '1px solid rgba(255,255,255,0.06)',
                padding: noPadding ? 0 : '2.5rem',
                overflow: 'hidden',
                ...style 
            }}
        >
            {children}
        </motion.div>
    );

    const StatItem = ({ icon: Icon, label, value, color }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ 
                width: '56px', height: '56px', borderRadius: '18px', 
                background: `${color}15`, border: `1px solid ${color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Icon size={24} color={color} />
            </div>
            <div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFFFFF' }}>{value}</div>
            </div>
        </div>
    );

    return (
        <div style={{ 
            maxWidth: 1300, margin: '0 auto', padding: '2rem 1rem 6rem', 
            background: '#07070a', color: '#FFFFFF', minHeight: '100vh', 
            fontFamily: "'Inter', sans-serif" 
        }}>
            
            {/* 1. Cinematic Header & Identity Section */}
            <section style={{ marginBottom: '3rem', position: 'relative' }}>
                <div style={{ 
                    height: '280px', borderRadius: '40px', overflow: 'hidden', 
                    position: 'relative', border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
                }}>
                    <div 
                        onClick={() => isEditing && bannerInputRef.current?.click()}
                        style={{ 
                            width: '100%', height: '100%', 
                            background: profile.bannerUrl ? `url(${profile.bannerUrl}) center/cover` : 'linear-gradient(135deg, #1e1e2d 0%, #0a0a0b 100%)',
                            cursor: isEditing ? 'pointer' : 'default',
                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        {!profile.bannerUrl && (
                            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'radial-gradient(circle, #6366f1 0%, transparent 80%)' }} />
                        )}
                        {isEditing && (
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 24px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <Camera size={18} /> Update Cover Art
                                </div>
                            </div>
                        )}
                    </div>
                    <input ref={bannerInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'bannerUrl')} />
                </div>

                <div style={{ padding: '0 4rem', marginTop: '-80px', position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-end' }}>
                            <div style={{ position: 'relative' }}>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    style={{ 
                                        width: '160px', height: '160px', borderRadius: '45px', 
                                        background: '#121214', border: '6px solid #07070a',
                                        padding: '5px', boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
                                        cursor: isEditing ? 'pointer' : 'default',
                                        overflow: 'hidden'
                                    }}
                                    onClick={() => isEditing && avatarInputRef.current?.click()}
                                >
                                    <div style={{ width: '100%', height: '100%', borderRadius: '38px', background: '#1a1a1f', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                        {profile.avatarUrl ? (
                                            <img src={profile.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <User size={64} color="rgba(255,255,255,0.1)" />
                                        )}
                                    </div>
                                    {isEditing && (
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Camera size={24} color="#FFF" />
                                        </div>
                                    )}
                                </motion.div>
                                <input ref={avatarInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e, 'avatarUrl')} />
                                
                                <div style={{ position: 'absolute', bottom: 10, right: -10, background: '#10b981', width: 28, height: 28, borderRadius: '50%', border: '4px solid #07070a', boxShadow: '0 0 15px #10b98160' }} />
                            </div>

                            <div style={{ paddingBottom: '10px' }}>
                                {isEditing ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <input 
                                            value={profile.name} 
                                            onChange={e => setProfile({...profile, name: e.target.value})}
                                            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '2.5rem', fontWeight: 900, outline: 'none', padding: '0 8px', width: '400px' }}
                                        />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#818cf8', fontWeight: 700 }}>
                                            <Sparkles size={16} />
                                            <input 
                                                value={profile.title} 
                                                onChange={e => setProfile({...profile, title: e.target.value})}
                                                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#818cf8', fontSize: '1rem', outline: 'none', padding: '2px 8px', width: '300px' }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h1 style={{ fontSize: '3rem', fontWeight: 900, margin: 0, letterSpacing: '-0.04em', lineHeight: 1 }}>{profile.name}</h1>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: '12px', color: '#818cf8', fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            <Activity size={18} /> {profile.title}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '10px' }}>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                                style={{ 
                                    padding: '14px 36px', borderRadius: '18px', 
                                    background: isEditing ? '#FFFFFF' : '#6366f1', 
                                    color: isEditing ? '#000000' : '#FFFFFF',
                                    border: 'none', fontWeight: 900, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    boxShadow: isEditing ? '0 10px 30px rgba(255,255,255,0.1)' : '0 15px 40px rgba(99, 102, 241, 0.4)'
                                }}
                            >
                                {isEditing ? <><Save size={20} /> Deploy Changes</> : <><Edit2 size={20} /> Refine Profile</>}
                            </motion.button>
                            <motion.button 
                                whileHover={{ background: 'rgba(239, 68, 68, 0.1)' }}
                                onClick={() => setShowSignOutWarning(true)}
                                style={{ 
                                    padding: '14px 24px', borderRadius: '18px', 
                                    background: 'rgba(255,255,255,0.03)', color: '#ef4444',
                                    border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: 800, cursor: 'pointer'
                                }}
                            >
                                <LogOut size={20} />
                            </motion.button>
                        </div>
                    </div>

                    <div style={{ marginTop: '3.5rem', display: 'flex', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, fontSize: '0.95rem' }}>
                            <MapPin size={20} color="#818cf8" /> 
                            {isEditing ? (
                                <input value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '4px 10px', borderRadius: '8px' }} />
                            ) : profile.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, fontSize: '0.95rem' }}>
                            <Mail size={20} color="#818cf8" /> 
                            {isEditing ? (
                                <input value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '4px 10px', borderRadius: '8px' }} />
                            ) : profile.email}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Intelligence Metrics Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                <GlassCard>
                    <StatItem icon={Zap} label="Growth Momentum" value={xp.toLocaleString()} color="#818cf8" />
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: '1.5rem', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(xp % 500)/5}%` }} style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #c084fc)' }} />
                    </div>
                </GlassCard>
                <GlassCard>
                    <StatItem icon={Clock} label="Focus Density" value={`${(focusMinutes/60).toFixed(1)}h`} color="#10b981" />
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', marginTop: '1.25rem', fontWeight: 600 }}>Consistent peak state maintainance</div>
                </GlassCard>
                <GlassCard>
                    <StatItem icon={Trophy} label="Active Streak" value={`${streak} Days`} color="#f59e0b" />
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', marginTop: '1.25rem', fontWeight: 600 }}>Unbreakable learning continuity</div>
                </GlassCard>
            </div>

            {/* 3. Detailed Data Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {/* Intelligence Graph Card */}
                    <GlassCard style={{ padding: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <Activity size={24} color="#818cf8" /> Focus Intelligence Matrix
                            </h3>
                            <span style={{ fontSize: '0.8rem', color: 'rgba(16, 185, 129, 0.8)', fontWeight: 800, background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                +14.2% Growth Vector
                            </span>
                        </div>
                        <div style={{ height: 320, width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="intelColor" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontWeight: 800, fontSize: 13 }} dy={10} />
                                    <YAxis hide domain={[0, 110]} />
                                    <Tooltip contentStyle={{ background: '#121214', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 15px 30px rgba(0,0,0,0.4)', padding: '12px 16px' }} />
                                    <Area 
                                        type="monotone" 
                                        dataKey="score" 
                                        stroke="#818cf8" 
                                        strokeWidth={5} 
                                        fill="url(#intelColor)" 
                                        animationDuration={2000}
                                        strokeLinecap="round"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </GlassCard>

                    {/* Portfolio Sections */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <GlassCard>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 12, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                <Briefcase size={20} color="#818cf8" /> Experience
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {profile.experiences.map((exp, i) => (
                                    <div key={i} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>{exp}</span>
                                        {isEditing && <Trash2 size={16} color="#ef4444" style={{ cursor: 'pointer', position: 'absolute', top: 12, right: 12 }} onClick={() => handleRemoveItem('experiences', i)} />}
                                    </div>
                                ))}
                                {isEditing && (
                                    addItemType === 'experiences' ? (
                                        <div style={{ display: 'flex', gap: 10 }}>
                                            <input autoFocus value={itemInput} onChange={e => setItemInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddItem('experiences')} style={{ background: '#1a1a1f', border: '1px solid #333', borderRadius: '12px', padding: '10px 16px', color: 'white', outline: 'none', flex: 1 }} placeholder="Role details..." />
                                            <button onClick={() => handleAddItem('experiences')} style={{ background: '#6366f1', border: 'none', borderRadius: '12px', color: 'white', px: 16, cursor: 'pointer', fontWeight: 900 }}>Add</button>
                                        </div>
                                    ) : <button onClick={() => setAddItemType('experiences')} style={{ padding: '1.25rem', background: 'rgba(99,102,241,0.05)', border: '1px dashed #6366f140', borderRadius: '20px', color: '#818cf8', fontWeight: 800, cursor: 'pointer' }}>+ Add Experience</button>
                                )}
                            </div>
                        </GlassCard>

                        <GlassCard>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 12, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                <Award size={20} color="#818cf8" /> Certifications
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {profile.certifications.map((cert, i) => (
                                    <div key={i} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>{cert}</span>
                                        {isEditing && <Trash2 size={16} color="#ef4444" style={{ cursor: 'pointer', position: 'absolute', top: 12, right: 12 }} onClick={() => handleRemoveItem('certifications', i)} />}
                                    </div>
                                ))}
                                {isEditing && (
                                    addItemType === 'certifications' ? (
                                        <div style={{ display: 'flex', gap: 10 }}>
                                            <input autoFocus value={itemInput} onChange={e => setItemInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddItem('certifications')} style={{ background: '#1a1a1f', border: '1px solid #333', borderRadius: '12px', padding: '10px 16px', color: 'white', outline: 'none', flex: 1 }} placeholder="Cert name..." />
                                            <button onClick={() => handleAddItem('certifications')} style={{ background: '#6366f1', border: 'none', borderRadius: '12px', color: 'white', px: 16, cursor: 'pointer', fontWeight: 900 }}>Add</button>
                                        </div>
                                    ) : <button onClick={() => setAddItemType('certifications')} style={{ padding: '1.25rem', background: 'rgba(99,102,241,0.05)', border: '1px dashed #6366f140', borderRadius: '20px', color: '#818cf8', fontWeight: 800, cursor: 'pointer' }}>+ Add Certification</button>
                                )}
                            </div>
                        </GlassCard>
                    </div>

                    <GlassCard>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Core Specializations</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {profile.focusAreas.map((skill, i) => (
                                <motion.div whileHover={{ scale: 1.05 }} key={skill} style={{ 
                                    padding: '12px 24px', background: 'rgba(99, 102, 241, 0.1)', 
                                    borderRadius: '100px', fontSize: '0.9rem', fontWeight: 800,
                                    border: '1px solid rgba(99, 102, 241, 0.2)', color: '#a5b4fc',
                                    display: 'flex', alignItems: 'center', gap: 10
                                }}>
                                    {skill}
                                    {isEditing && <X size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => handleRemoveItem('focusAreas', i)} />}
                                </motion.div>
                            ))}
                            {isEditing && (
                                addItemType === 'focusAreas' ? (
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <input autoFocus value={itemInput} onChange={e => setItemInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddItem('focusAreas')} style={{ background: '#1a1a1f', border: '1px solid #333', borderRadius: '100px', padding: '8px 20px', color: 'white', outline: 'none', width: '160px' }} placeholder="Skill name..." />
                                        <button onClick={() => handleAddItem('focusAreas')} style={{ background: '#6366f1', border: 'none', borderRadius: '100px', color: 'white', px: 16, cursor: 'pointer', fontWeight: 900 }}>OK</button>
                                    </div>
                                ) : <button onClick={() => setAddItemType('focusAreas')} style={{ padding: '10px 24px', borderRadius: '100px', border: '1px dashed rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)', background: 'transparent', cursor: 'pointer', fontWeight: 700 }}>+ Expansion</button>
                            )}
                        </div>
                    </GlassCard>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <GlassCard>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Intelligence Status</h3>
                            <ChevronRight size={20} color="rgba(255,255,255,0.2)" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {BADGE_DEFINITIONS.map(badge => {
                                const prog = badge.getProgress(ctx);
                                const isDone = prog >= badge.requirement;
                                return (
                                    <motion.div key={badge.id} whileHover={{ x: 8 }} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ 
                                            width: '64px', height: '64px', borderRadius: '24px', 
                                            background: isDone ? `${badge.color}20` : 'rgba(255,255,255,0.03)', 
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: `1px solid ${isDone ? badge.color + '40' : 'rgba(255,255,255,0.06)'}`,
                                            filter: isDone ? 'none' : 'grayscale(1)',
                                            boxShadow: isDone ? `0 10px 25px ${badge.color}20` : 'none'
                                        }}>
                                            <badge.icon size={28} color={isDone ? badge.color : 'rgba(255,255,255,0.2)'} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                <span style={{ fontWeight: 800, color: isDone ? '#FFFFFF' : 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>{badge.title}</span>
                                                <span style={{ fontSize: '0.75rem', color: badge.color, fontWeight: 900 }}>{Math.round(Math.min(100, (prog/badge.requirement)*100))}%</span>
                                            </div>
                                            <div style={{ height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                                <motion.div 
                                                    initial={{ width: 0 }} 
                                                    animate={{ width: `${Math.min(100, (prog/badge.requirement)*100)}%` }} 
                                                    style={{ height: '100%', background: badge.color, borderRadius: '10px' }} 
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </GlassCard>

                    <GlassCard style={{ background: 'linear-gradient(135deg, #1e1e2d 0%, #12121e 100%)', textAlign: 'center' }}>
                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                            <Activity size={40} color="#818cf8" />
                        </div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Rank: Academic Elite</h4>
                        <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontSize: '1rem' }}>
                            You are in the top 3% of global learners for this month. Maintain your momentum.
                        </p>
                        <motion.button whileHover={{ y: -2 }} style={{ marginTop: '2.5rem', width: '100%', padding: '18px', borderRadius: '18px', background: '#FFFFFF', color: '#000000', border: 'none', fontWeight: 900, cursor: 'pointer', fontSize: '1.05rem' }}>
                            Share Success Matrix
                        </motion.button>
                    </GlassCard>
                </div>
            </div>

            {/* Sign Out Modal */}
            <AnimatePresence>
                {showSignOutWarning && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSignOutWarning(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} style={{ background: '#121214', padding: '4rem', borderRadius: '40px', width: '90%', maxWidth: '480px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                            <LogOut size={60} color="#ef4444" style={{ marginBottom: '2rem' }} />
                            <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Confirm Sign Out</h3>
                            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '3rem', fontSize: '1.1rem' }}>Are you sure you want to end your secure session? Your growth progress is preserved.</p>
                            <div style={{ display: 'flex', gap: '1.25rem' }}>
                                <button onClick={() => setShowSignOutWarning(false)} style={{ flex: 1, padding: '18px', borderRadius: '20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 800, cursor: 'pointer' }}>Stay Active</button>
                                <button onClick={() => authCtx.logout()} style={{ flex: 1, padding: '18px', borderRadius: '20px', background: '#ef4444', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Sign Out</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                * { font-family: 'Inter', sans-serif; }
            `}</style>
        </div>
    );
};

export default Profile;
