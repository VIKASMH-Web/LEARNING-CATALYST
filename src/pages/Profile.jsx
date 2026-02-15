import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Award, Edit2, Save, RotateCcw, UserMinus, BarChart2, Download, X, Mail, Calendar, MapPin, Briefcase } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { enDomains } from '../data/domains';

const Profile = () => {
    // Context
    const { 
        activeDays, focusMinutes, codeRuns, badges, 
        getSkillLevel, generateWeeklyReport
    } = useProgress();

    // Local State
    const [isEditing, setIsEditing] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [reportData, setReportData] = useState(null);

    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('lc_profile');
        return saved ? JSON.parse(saved) : {
            name: 'John Doe',
            title: 'Senior Software Engineer @ TechFlow',
            username: 'johndoe_dev',
            location: 'San Francisco, CA',
            email: 'john.doe@example.com',
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

    // Derived Stats
    const streak = activeDays.length;
    const totalHours = (focusMinutes / 60).toFixed(1);
    const logicScore = 85 + (codeRuns > 10 ? 5 : 0) + (streak > 3 ? 5 : 0); // Simulated Logic Score

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
                                <input 
                                    value={profile.name} 
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                                    className="h2" style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'white', marginBottom: '0.25rem' }}
                                />
                             ) : (
                                <h1 className="h2" style={{ marginBottom: '0.25rem' }}>{profile.name}</h1>
                             )}
                             <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Briefcase size={14} /> {profile.title}
                             </p>
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
                         
                         <button onClick={() => setIsEditing(!isEditing)} className="btn btn-secondary" style={{ padding: '0.5rem' }}>
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
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div>
                                <h3 className="h3">Cognitive Performance</h3>
                                <p className="body-sm">Weekly focus & logic score</p>
                            </div>
                            <div style={{ color: '#50fa7b', fontWeight: 700, fontSize: '0.9rem' }}>+14.2%</div>
                        </div>

                        {/* Simulated Spline Chart */}
                        <div style={{ height: '220px', position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
                             <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
                                {/* Grid Lines */}
                                <line x1="0" y1="50" x2="800" y2="50" stroke="var(--border-color)" strokeDasharray="4" />
                                <line x1="0" y1="100" x2="800" y2="100" stroke="var(--border-color)" strokeDasharray="4" />
                                <line x1="0" y1="150" x2="800" y2="150" stroke="var(--border-color)" strokeDasharray="4" />
                                
                                {/* Path */}
                                <path 
                                    d="M0,150 C100,140 150,80 250,90 S400,120 500,60 S650,40 800,80" 
                                    fill="none" stroke="#7c3aed" strokeWidth="3"
                                />
                                {/* Gradient Fill */}
                                <path 
                                    d="M0,150 C100,140 150,80 250,90 S400,120 500,60 S650,40 800,80 V200 H0 Z" 
                                    fill="url(#gradient)" opacity="0.2"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#7c3aed" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </linearGradient>
                                </defs>
                             </svg>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '1rem', padding: '0 1rem' }}>
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>

                     {/* Focus Areas */}
                     <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 className="h3" style={{ marginBottom: '1.5rem' }}>Focus Areas</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {['Fullstack Development', 'System Architecture', 'Performance Optimization', 'TypeScript', 'AI Integration', 'Leadership'].map(tag => (
                                <span key={tag} style={{ 
                                    padding: '6px 14px', background: 'var(--bg-elevated)', 
                                    borderRadius: '20px', border: '1px solid var(--border-color)', 
                                    fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500
                                }}>
                                    {tag}
                                </span>
                            ))}
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

                    {/* Weekly Report CTA */}
                    <div className="glass-card" style={{ 
                        padding: '2rem', 
                        background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', 
                        border: 'none', color: 'white', textAlign: 'center' 
                    }}>
                        <h3 className="h3" style={{ color: 'white', marginBottom: '0.5rem' }}>Catalyst Weekly Report</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.5, marginBottom: '1.5rem' }}>
                            Your weekly summary is ready. You've completed 85% more coding challenges than last month.
                        </p>
                        <button 
                            onClick={handleGenerateReport}
                            style={{ 
                                width: '100%', padding: '0.75rem', background: 'white', 
                                color: '#4f46e5', border: 'none', borderRadius: '8px', 
                                fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' 
                            }}
                        >
                            Download PDF Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Weekly Report Modal (Reused Logic) */}
            <AnimatePresence>
                {showReport && reportData && (
                     <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }} onClick={() => setShowReport(false)}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card" style={{ width: '500px', padding: '2.5rem', position: 'relative', border: '1px solid var(--accent-color)' }} onClick={e => e.stopPropagation()}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-color)', fontWeight: 800 }}>Weekly Pulse Report</h2>
                                <p style={{ opacity: 0.7 }}>{reportData.date}</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{reportData.focusHours}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Focus Hours</div>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{reportData.codeRuns}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Code Executions</div>
                                </div>
                            </div>
                            <button style={{ width: '100%', padding: '1rem', background: 'var(--accent-color)', border: 'none', borderRadius: '20px', color: 'white', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Download size={18} /> Download Full PDF
                            </button>
                        </motion.div>
                     </div>
                )}
            </AnimatePresence>
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
