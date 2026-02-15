import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Award, Edit2, Save, RotateCcw, UserMinus, BarChart2, Download, X, Mail, Calendar, MapPin, Briefcase } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

const Profile = () => {
    // Context
    const { 
        activeDays, focusMinutes, codeRuns, badges, 
        getSkillLevel, generateWeeklyReport, careerProfile, updateCareerProfile
    } = useProgress();

    // Local State
    const [isEditing, setIsEditing] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [reportData, setReportData] = useState(null);

    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('lc_profile');
        return saved ? JSON.parse(saved) : {
            name: 'John Doe',
            title: 'Senior Software Engineer',
            username: 'johndoe_dev',
            location: 'San Francisco, CA',
            email: 'john.doe@techflow.com',
            bio: 'Building scalable systems and exploring AI integration patterns.',
            xp: '12.4k',
            tier: 'Elite Tier'
        };
    });

    useEffect(() => {
        localStorage.setItem('lc_profile', JSON.stringify(profile));
    }, [profile]);

    const handleSave = () => setIsEditing(false);

    const handleGenerateReport = () => {
        const report = generateWeeklyReport();
        setReportData(report);
        setShowReport(true);
    };

    // Derived Stats for "Cognitive Performance" Chart
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
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
            {/* Banner & Header Section */}
            <header className="glass-card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                {/* Gradient Banner */}
                <div style={{ 
                    height: '180px', 
                    background: 'linear-gradient(90deg, #7c3aed 0%, #3b82f6 100%)', // Purple to Blue
                    position: 'relative'
                }}>
                    {/* Floating Patterns / Texture */}
                    <div style={{ 
                        position: 'absolute', inset: 0, opacity: 0.2, 
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 20%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 25%)' 
                    }} />
                </div>

                {/* Profile Info Bar */}
                <div style={{ padding: '0 2.5rem 2rem 2.5rem', marginTop: '-3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end' }}>
                        {/* Avatar */}
                        <div style={{ 
                            width: 120, height: 120, borderRadius: '24px', 
                            background: '#1e293b', padding: '4px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.3)', position: 'relative'
                        }}>
                             <img 
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200" 
                                alt="Profile" 
                                style={{ width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover' }}
                             />
                             <div style={{ 
                                 position: 'absolute', bottom: -5, right: -5, 
                                 background: '#50fa7b', width: 24, height: 24, borderRadius: '50%', 
                                 border: '3px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center'
                             }}>
                                 <CheckIcon size={12} color="#1e293b" strokeWidth={4} />
                             </div>
                        </div>

                        {/* Name & Title */}
                        <div style={{ marginBottom: '0.5rem' }}>
                             {isEditing ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <input 
                                        value={profile.name} 
                                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                                        className="h2" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border-color)', color: 'white', padding: '4px 8px', borderRadius: '4px' }}
                                    />
                                    <input 
                                        value={profile.title} 
                                        onChange={(e) => setProfile({...profile, title: e.target.value})}
                                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 8px', borderRadius: '4px' }}
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

                    {/* Actions & Badges */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                         <div style={{ 
                             padding: '0.5rem 1rem', background: 'rgba(255, 184, 108, 0.1)', color: '#ffb86c', 
                             border: '1px solid rgba(255, 184, 108, 0.2)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700,
                             display: 'flex', alignItems: 'center', gap: '6px'
                         }}>
                             <Award size={14} /> {profile.tier}
                         </div>
                         <div style={{ 
                             padding: '0.5rem 1rem', background: 'rgba(130, 87, 229, 0.1)', color: '#bd93f9', 
                             border: '1px solid rgba(130, 87, 229, 0.2)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700 
                         }}>
                             ✨ {profile.xp} XP
                         </div>
                         
                         <button onClick={isEditing ? handleSave : () => setIsEditing(true)} className="btn btn-secondary" style={{ padding: '0.5rem' }}>
                            {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
                         </button>
                    </div>
                </div>

                {/* Additional Info Grid (Email, Location) */}
                <div style={{ padding: '0 2.5rem 1.5rem 2.5rem', display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> {profile.location}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> {profile.email}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} /> Joined Feb 2024</div>
                </div>
            </header>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                
                {/* Left Column: Cognitive Performance & Focus Areas */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Cognitive Performance Chart */}
                    <div className="glass-card" style={{ padding: '2rem', minHeight: '300px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div>
                                <h3 className="h3">Cognitive Performance</h3>
                                <p className="body-sm">Weekly focus & logic score</p>
                            </div>
                            <div style={{ color: '#50fa7b', fontWeight: 700, fontSize: '0.9rem' }}>+14.2%</div>
                        </div>

                        {/* Recharts Area Chart */}
                        <div style={{ height: '220px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                                    <Area type="monotone" dataKey="score" stroke="#7c3aed" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                     {/* Focus Areas (Editable) */}
                     <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 className="h3" style={{ marginBottom: '1.5rem' }}>Focus Areas</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {['Fullstack Development', 'System Architecture', 'Performance Optimization', 'TypeScript', 'AI Integration', 'Leadership'].map(tag => (
                                <span key={tag} style={{ 
                                    padding: '6px 14px', background: 'var(--bg-elevated)', 
                                    borderRadius: '20px', border: '1px solid var(--border-color)', 
                                    fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500,
                                    cursor: isEditing ? 'pointer' : 'default'
                                }}>
                                    {tag} {isEditing && <X size={12} style={{ marginLeft: 4 }} />}
                                </span>
                            ))}
                            {isEditing && (
                                <button style={{ 
                                    padding: '6px 14px', background: 'transparent', 
                                    borderRadius: '20px', border: '1px dashed var(--text-secondary)', 
                                    fontSize: '0.85rem', color: 'var(--text-secondary)'
                                }}>+ Add</button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Badges & Weekly Report */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Recent Badges */}
                    <div className="glass-card" style={{ padding: '2rem' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="h3">Recent Badges</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <BadgeItem icon="🏆" title="Code Sprint Champion" date="Earned Feb 12" color="#ffb86c" />
                            <BadgeItem icon="🔥" title="Deep Focus Master" date="Earned Feb 10" color="#ff5555" />
                            <BadgeItem icon="🏗️" title="React Architect" date="Earned Feb 05" color="#8be9fd" />
                            <BadgeItem icon="📅" title="Consistent Learner" date="Earned Jan 28" color="#50fa7b" />
                        </div>

                        <button style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer' }}>
                            View All 24 Badges
                        </button>
                    </div>

                    {/* Progress Insights (Replaced Download PDF) */}
                    <div className="glass-card" style={{ 
                        padding: '2rem', 
                        background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', 
                        border: 'none', color: 'white'
                    }}>
                        <h3 className="h3" style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Progress Insights</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.5, marginBottom: '1.5rem' }}>
                            You're in the top 5% of learners this week. Your consistency score is up by 15%.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>Top 5%</div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Rank</div>
                            </div>
                            <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>+15%</div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Consistency</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- Sub Components ---

const BadgeItem = ({ icon, title, date, color }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ 
            width: 40, height: 40, borderRadius: '50%', 
            background: `${color}20`, display: 'flex', 
            alignItems: 'center', justifyContent: 'center', 
            fontSize: '1.2rem', color: color, flexShrink: 0
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{date}</div>
        </div>
    </div>
);

const CheckIcon = ({size, color, strokeWidth}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export default Profile;
