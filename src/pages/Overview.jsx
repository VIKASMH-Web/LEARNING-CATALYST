import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Zap, Trophy, Target, Star,
  TrendingUp, BarChart2, MoreHorizontal, ArrowRight, Activity,
  Lock, CheckCircle, AlertTriangle, FileText, Sparkles, Flame,
  Brain, Rocket, Briefcase, GraduationCap, ArrowUpRight
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useTranslation } from '../utils/i18n';

const Overview = () => {
    const { t } = useTranslation();
    const { focusMinutes, roadmapProgress, activeDays, getSkillLevel, interviewHistory, dailyFocus } = useProgress();
    const { user } = useAuth();
    const { xp, streak } = useGame();
    const displayName = user?.name || user?.email?.split('@')[0] || 'Learner';
    
    const userLevel = useMemo(() => {
        if (xp > 10000) return { name: 'Expert', salary: '$150k+', color: '#10B981', badge: '💎' };
        if (xp > 5000) return { name: 'Advanced', salary: '$80k - $150k', color: '#3B82F6', badge: '🚀' };
        if (xp > 1000) return { name: 'Intermediate', salary: '$40k - $80k', color: '#F59E0B', badge: '🌟' };
        return { name: 'Beginner', salary: '$0 - $40k', color: '#9CA3AF', badge: '🌱' };
    }, [xp]);

    const activityData = useMemo(() => {
        const data = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(); d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const mins = dailyFocus?.[dateStr] || 0;
            data.push({ day: days[d.getDay()], hours: parseFloat((mins / 60).toFixed(1)) });
        }
        return data;
    }, [dailyFocus]);

    const processedSkills = [
        { name: 'Frontend', score: getSkillLevel('Full Stack Developer').percentage || 0, icon: <Layout size={16} /> },
        { name: 'Architecture', score: getSkillLevel('System Design').percentage || 0, icon: <Brain size={16} /> },
        { name: 'Algorithms', score: getSkillLevel('DSA').percentage || 0, icon: <Zap size={16} /> },
    ];

    const masteryConcepts = [
        { name: 'React Hooks', status: 'Mastered', type: 'success' },
        { name: 'SQL Indexing', status: 'Learning', type: 'warning' },
        { name: 'System Scaling', status: 'Planned', type: 'info' },
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* 1. Hero Welcome Section */}
            <section style={{
                background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem',
                border: '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(0,0,0,0.02)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'radial-gradient(circle at top right, rgba(99,102,241,0.04), transparent 70%)' }} />
                
                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                        <div style={{ padding: '6px 16px', background: `${userLevel.color}10`, color: userLevel.color, borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, border: `1px solid ${userLevel.color}30` }}>
                            {userLevel.badge} {userLevel.name} Level
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Active potential: <span style={{ color: 'var(--text-primary)' }}>{userLevel.salary}</span></div>
                    </div>
                    
                    <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em', margin: 0, lineHeight: 1.1 }}>
                        {getGreeting()}, <span style={{ color: 'var(--accent-color)' }}>{displayName}</span>
                    </h1>
                    
                    <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginTop: '1.5rem', lineHeight: 1.6, maxWidth: 650 }}>
                        Your momentum is high with a <strong>{streak} day streak</strong>. You're currently performing in the top 5% of active engineering minds.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                        <Link to="/practice" style={{ padding: '14px 28px', background: 'var(--text-primary)', color: '#FFFFFF', borderRadius: '18px', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                            Resume Practice <ArrowRight size={18} />
                        </Link>
                        <Link to="/roadmap" style={{ padding: '14px 28px', background: '#FFFFFF', color: 'var(--text-primary)', borderRadius: '18px', fontWeight: 800, textDecoration: 'none', border: '1px solid var(--border-color)' }}>
                            View Schedule
                        </Link>
                    </div>
                </div>

                <div style={{ display: 'flex', flexShrink: 0, gap: '2rem' }}>
                    <div style={{ textAlign: 'center', width: 140 }}>
                        <div style={{ width: 110, height: 110, borderRadius: '40px', background: 'var(--bg-primary)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', boxShadow: '0 8px 24px rgba(0,0,0,0.03)', position: 'relative' }}>
                            <Flame size={48} color={streak > 0 ? "#f97316" : "var(--text-tertiary)"} />
                            {streak > 0 && <div style={{ position: 'absolute', inset: -6, border: '2px solid #f97316', borderRadius: '44px', opacity: 0.2 }} />}
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{streak} Days</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Streak</div>
                    </div>
                </div>
            </section>

            {/* 2. Core Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {[
                    { label: 'Total Experience', val: xp.toLocaleString(), icon: <Star size={20} color="#f59e0b" />, sub: 'XP Points' },
                    { label: 'Cognitive Score', val: '862', icon: <Brain size={20} color="var(--accent-color)" />, sub: '+12% this week' },
                    { label: 'Efficiency', val: '94%', icon: <Activity size={20} color="#10b981" />, sub: 'Steady growth' },
                    { label: 'Rank', val: '#84', icon: <Trophy size={20} color="#6366f1" />, sub: 'Top 0.1%' },
                ].map((m, i) => (
                    <div key={i} style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '24px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>{m.label}</span>
                            {m.icon}
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>{m.val}</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{m.sub}</div>
                    </div>
                ))}
            </div>

            {/* 3. Mastery & Insights */}
            {/* 3. Velocity Chart (Middle) */}
            <section style={{ background: '#FFFFFF', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Learning Velocity</h3>
                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', fontWeight: 600 }}>Active development hours over the last 7 days</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>18.4h</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>+2.1h vs last week</div>
                    </div>
                </div>
                <div style={{ height: 300, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={activityData}>
                            <defs>
                                <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.15}/>
                                    <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: 'var(--text-tertiary)', fontWeight: 700 }} dy={15} />
                            <Tooltip contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="hours" stroke="var(--accent-color)" strokeWidth={4} fill="url(#velocityGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* 4. Mastery & Insights */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem' }}>
                <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <Sparkles size={22} color="var(--accent-color)" /> Concept Mastery Board
                        </h3>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>Real-time Intelligence Status</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                        {masteryConcepts.map((c, i) => (
                            <div key={i} style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{c.name}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.type === 'success' ? '#10b981' : c.type === 'warning' ? '#f59e0b' : '#3b82f6' }} />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ background: 'var(--text-primary)', borderRadius: '32px', padding: '2.5rem', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, padding: '2rem', opacity: 0.1 }}><Brain size={120} /></div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800, display: 'inline-block', marginBottom: '1.5rem' }}>AI recommendation</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Focused Growth Vector</h3>
                        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem' }}>
                            Your system design logic is currently at 42%. Completing two distributed systems modules this week will increase your career potential by 14%.
                        </p>
                        <Link to="/practice" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#FFFFFF', textDecoration: 'none', fontWeight: 800, fontSize: '1rem' }}>
                            Execute Plan <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Placeholder icons if missing from lucide-react in local env
const Layout = ({ size }) => <div style={{ width: size, height: size, border: '2px solid currentColor', borderRadius: 4 }} />;

export default Overview;
