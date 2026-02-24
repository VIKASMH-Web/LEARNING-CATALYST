import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Zap, Trophy, Target, Star,
  TrendingUp, BarChart2, MoreHorizontal, ArrowRight, Activity,
  Lock, CheckCircle, AlertTriangle, FileText
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import PremiumModal from '../components/Shared/PremiumModal';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Overview = () => {
    const { focusMinutes, roadmapProgress, activeDays, getSkillLevel, interviewHistory } = useProgress();
    const { user } = useAuth();
    const { isPremium, lvsScore, xp, streak } = useGame();
    const displayName = user?.name || user?.email?.split('@')[0] || 'Learner';
    const [selectedPeriod, setSelectedPeriod] = useState('Last 7 days');
    const [showReport, setShowReport] = useState(false);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    // --- 1. REAL DATA CALCULATION ---
    const totalHours = (focusMinutes / 60).toFixed(1);
    const completedStages = Object.values(roadmapProgress).filter(item => item.completed).length;
    const avgScore = interviewHistory && interviewHistory.length > 0 
        ? Math.round(interviewHistory.reduce((acc, curr) => acc + curr.score, 0) / interviewHistory.length) 
        : (lvsScore || 0);
    const rank = "#42";

    // --- 2. ACTIVITY CHART DATA ---
    const activityData = [
        { day: 'Mon', hours: 2.5 },
        { day: 'Tue', hours: 3.8 },
        { day: 'Wed', hours: 1.5 },
        { day: 'Thu', hours: 4.2 },
        { day: 'Fri', hours: 5.0 },
        { day: 'Sat', hours: 2.0 },
        { day: 'Sun', hours: 3.5 },
    ];

    // --- 3. SKILL INTELLIGENCE 2.0 LOGIC ---
    
    // Helper to calculate score
    const calculateSkillScore = (clusterName, roadmapKey, weights) => {
        // Mocked inputs where real data represents 1.0 scale
        const roadmapVal = (getSkillLevel(roadmapKey).percentage || 0) / 100;
        const codeAccuracy = 0.85; // Mock: 85% correct runs
        const interviewScore = 0.75; // Mock: 75% interview performance
        const focusConsistency = Math.min(activeDays.length / 5, 1); // Mock based on streak

        const rawScore = (
            (weights.roadmap * roadmapVal) +
            (weights.code * codeAccuracy) +
            (weights.interview * interviewScore) +
            (weights.focus * focusConsistency)
        ) * 100;

        return Math.min(100, Math.round(rawScore));
    };

    // Helper for momentum
    const getMomentum = (growth) => {
        if (growth > 3) return { status: 'Strong Growth', color: '#50fa7b', icon: '🚀' }; // Green
        if (growth >= -2) return { status: 'Stable', color: '#f1fa8c', icon: '⚖️' }; // Yellow
        return { status: 'Declining', color: '#ff5555', icon: '🔻' }; // Red
    };

    const clusters = [
        { 
            name: 'Frontend Engineering', 
            roadmapKey: 'Full Stack Developer',
            weights: { roadmap: 0.4, code: 0.3, interview: 0.1, focus: 0.2 },
            weakest: 'State Management',
            nextAction: 'Build a Redux toolkit project',
            growth: 4.2 
        },
        { 
            name: 'Backend Engineering', 
            roadmapKey: 'Backend Developer',
            weights: { roadmap: 0.4, code: 0.4, interview: 0.1, focus: 0.1 },
            weakest: 'Database Indexing',
            nextAction: 'Optimize SQL queries in Code Engine',
            growth: 1.5 
        },
        { 
            name: 'Problem Solving', 
            roadmapKey: 'DSA', // Assuming DSA roadmap exists or maps to something
            weights: { roadmap: 0.2, code: 0.6, interview: 0.1, focus: 0.1 },
            weakest: 'Dynamic Programming',
            nextAction: 'Solve 3 DP problems',
            growth: 5.8 
        },
        { 
            name: 'System Design', 
            roadmapKey: 'System Design',
            weights: { roadmap: 0.3, code: 0.1, interview: 0.4, focus: 0.2 },
            weakest: 'Load Balancing',
            nextAction: 'Design a scalable chat app',
            growth: -0.5 
        },
        { 
            name: 'AI / ML', 
            roadmapKey: 'AI Engineer',
            weights: { roadmap: 0.5, code: 0.2, interview: 0.1, focus: 0.2 },
            weakest: 'Neural Networks',
            nextAction: 'Complete PyTorch basics',
            growth: 2.1 
        }
    ];

    const processedSkills = clusters.map(c => {
        const score = calculateSkillScore(c.name, c.roadmapKey, c.weights);
        const momentum = getMomentum(c.growth);
        return {
            ...c,
            score,
            momentum
        };
    });

    // --- 4. WEEKLY GROWTH REPORT DATA ---
    // Learning Velocity Score
    const consistencyScore = 85; 
    const skillImprovement = 4.2; 
    const difficultyMultiplier = 1.2;
    const lvs = lvsScore; // Pulled dynamically from premium context module

    const activeRoadmaps = Array.from(new Set(
        Object.keys(roadmapProgress).map(k => k.split('-')[0])
    )).map(title => {
        const stats = getSkillLevel(title);
        return { title, ...stats };
    }).sort((a,b) => b.percentage - a.percentage).slice(0, 3);

    if (activeRoadmaps.length === 0) {
        activeRoadmaps.push({ title: "Full Stack Developer", percentage: 0, levelColor: "#bd93f9" });
    }

    const recommendedRoadmap = activeRoadmaps.find(r => r.percentage < 100) || activeRoadmaps[0];

    const heatmapData = [{
        name: 'Skills',
        children: processedSkills.map(s => ({
            name: s.name,
            size: Math.max(s.score, 20), // Prevent invisible boxes if score is 0
            score: s.score,
            weakness: s.weakest,
            action: s.nextAction
        }))
    }];

    const weakestSkill = [...processedSkills].sort((a, b) => a.score - b.score)[0];

    // --- 5. AI INSIGHT GENERATION ---
    const strongestSkill = [...processedSkills].sort((a, b) => b.score - a.score)[0];
    const growingSkills = processedSkills.filter(s => s.growth > 3);
    const decliningSkills = processedSkills.filter(s => s.growth < -2);
    
    const aiInsightText = decliningSkills.length > 0
        ? `Your ${decliningSkills[0].name} skills are declining. Prioritize ${decliningSkills[0].weakest} to reverse the trend. Meanwhile, ${strongestSkill.name} is your strongest area at ${strongestSkill.score}%.`
        : `You're showing strong momentum in ${growingSkills.length > 0 ? growingSkills[0].name : strongestSkill.name}. Your weakest cluster is ${weakestSkill.name} — focus on ${weakestSkill.weakest} to balance your profile.`;

    const primaryRoadmap = activeRoadmaps[0];
    const currentStageIndex = Math.floor((primaryRoadmap.percentage / 100) * 6) + 1;
    const estimatedWeeksLeft = primaryRoadmap.percentage > 0 ? Math.max(1, Math.round((100 - primaryRoadmap.percentage) / 8)) : 12;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}
        >
            {/* Header Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 className="h1" style={{ marginBottom: '0.25rem' }}>
                        Overview
                    </h1>
                    <p className="body-sm">Welcome back, {displayName}</p>
                </div>
                <button 
                    onClick={() => setShowReport(true)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.8125rem' }}
                >
                    <FileText size={14} />
                    Weekly Report
                    {!isPremium && <Lock size={11} style={{ opacity: 0.4 }} />}
                </button>
            </div>

            {/* AI Insight Hero Card */}
            <div style={{ 
                border: '1px solid var(--border-color)', borderRadius: 8, 
                padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem',
                background: 'rgba(99, 102, 241, 0.03)'
            }}>
                <div style={{ 
                    width: 28, height: 28, borderRadius: 6, flexShrink: 0, marginTop: 2,
                    background: 'var(--accent-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Zap size={14} color="var(--accent-color)" />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)' }}>AI Insight</span>
                        <span style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', fontWeight: 500, padding: '1px 6px', background: 'rgba(255,255,255,0.04)', borderRadius: 3 }}>Updated today</span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>{aiInsightText}</p>
                </div>
                <Link to="/learning-hub" style={{ 
                    flexShrink: 0, fontSize: '0.75rem', color: 'var(--accent-color)', textDecoration: 'none',
                    fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', marginTop: 4
                }}>
                    Act on this <ArrowRight size={12} />
                </Link>
            </div>

            {/* Dense Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                {[
                    { label: 'XP', value: xp.toLocaleString(), change: '+120', changeColor: 'var(--success)' },
                    { label: 'Streak', value: `${streak}d`, change: null },
                    { label: 'Velocity', value: lvsScore, change: '+12%', changeColor: 'var(--success)' },
                    { label: 'Focus', value: `${totalHours}h`, change: null },
                    { label: 'Stages Done', value: completedStages, change: null },
                    { label: 'Avg Score', value: `${avgScore}%`, change: null },
                ].map((m, i) => (
                    <div key={i} style={{ 
                        padding: '0.875rem 1rem', 
                        borderRight: i < 5 ? '1px solid var(--border-color)' : 'none',
                    }}>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem', fontWeight: 500 }}>{m.label}</div>
                        <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            {m.value}
                            {m.change && <span style={{ fontSize: '0.625rem', fontWeight: 500, color: m.changeColor }}>{m.change}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content: Chart (70%) + Skills (30%) */}
            <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '1.5rem' }}>
                {/* Learning Activity Chart - 70% */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <h3 className="h3">Learning Activity</h3>
                        <span className="body-xs">{selectedPeriod}</span>
                    </div>
                    <div style={{ height: '260px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorMeasure" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.15}/>
                                        <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" tick={{fill: 'var(--text-tertiary)', fontSize: 11}} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 6, fontSize: '0.8125rem' }} 
                                    itemStyle={{ color: 'var(--text-primary)' }} 
                                    labelStyle={{ color: 'var(--text-secondary)' }}
                                />
                                <Area type="monotone" dataKey="hours" stroke="var(--accent-color)" strokeWidth={2} fillOpacity={1} fill="url(#colorMeasure)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Skill Breakdown List - 30% */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <h3 className="h3">Skills</h3>
                        <span className="body-xs">Momentum</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {processedSkills.map((skill, i) => (
                            <div key={i} style={{ 
                                display: 'flex', alignItems: 'center', gap: '0.625rem',
                                padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)',
                            }}>
                                {/* Score Circle */}
                                <div style={{ 
                                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                                    border: `2px solid ${skill.score >= 70 ? 'var(--success)' : skill.score >= 40 ? 'var(--warning)' : 'var(--text-tertiary)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)',
                                    fontVariantNumeric: 'tabular-nums'
                                }}>
                                    {skill.score}
                                </div>
                                {/* Name + Weakness */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {skill.name}
                                    </div>
                                    <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        Gap: {skill.weakest}
                                    </div>
                                </div>
                                {/* Momentum Arrow */}
                                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '2px' }}>
                                    <TrendingUp size={12} color={skill.momentum.color} style={{ transform: skill.growth < 0 ? 'rotate(180deg)' : 'none' }} />
                                    <span style={{ fontSize: '0.625rem', fontWeight: 600, color: skill.momentum.color, fontVariantNumeric: 'tabular-nums' }}>
                                        {skill.growth > 0 ? '+' : ''}{skill.growth.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row: Roadmap Progress + Next Best Action */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Active Roadmap - Prominent Progress Card */}
                <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 className="h3">Active Roadmap</h3>
                        <Link to="/learning-hub" style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            All roadmaps <ArrowRight size={11} />
                        </Link>
                    </div>
                    
                    {/* Primary Roadmap */}
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.375rem' }}>
                            <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-primary)' }}>{primaryRoadmap.title}</span>
                            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-color)', fontVariantNumeric: 'tabular-nums' }}>{primaryRoadmap.percentage}%</span>
                        </div>
                        <div style={{ width: '100%', height: '4px', background: 'var(--border-color)', borderRadius: 2, overflow: 'hidden', marginBottom: '0.625rem' }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${primaryRoadmap.percentage}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ height: '100%', background: 'var(--accent-color)', borderRadius: 2 }} />
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
                            <span>Stage {currentStageIndex} of 6</span>
                            <span>·</span>
                            <span>~{estimatedWeeksLeft} weeks remaining</span>
                        </div>
                    </div>

                    {/* Secondary roadmaps */}
                    {activeRoadmaps.slice(1).map((map, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4375rem 0', borderTop: '1px solid var(--border-subtle)' }}>
                            <span style={{ flex: 1, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{map.title}</span>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>{map.percentage}%</span>
                            <div style={{ width: 60, height: 2, background: 'var(--border-color)', borderRadius: 1, overflow: 'hidden' }}>
                                <div style={{ width: `${map.percentage}%`, height: '100%', background: 'var(--text-tertiary)', borderRadius: 1 }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Next Best Action Card */}
                <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                        <h3 className="h3">Next Best Action</h3>
                        <span style={{ fontSize: '0.5625rem', fontWeight: 600, color: 'var(--warning)', background: 'rgba(251,191,36,0.1)', padding: '2px 6px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Priority</span>
                    </div>
                    
                    {/* Primary Action */}
                    <div style={{ 
                        padding: '0.75rem', borderRadius: 6, border: '1px solid var(--border-color)',
                        marginBottom: '0.75rem', background: 'rgba(255,255,255,0.015)'
                    }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            {weakestSkill.nextAction}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Target size={10} /> {weakestSkill.name} · Weakness: {weakestSkill.weakest}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                        {processedSkills.filter(s => s.name !== weakestSkill.name).slice(0, 2).map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.375rem 0' }}>
                                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-tertiary)', flexShrink: 0 }} />
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.nextAction}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link to="/learning-hub" className="btn btn-primary" style={{ 
                        alignSelf: 'flex-start', marginTop: '0.75rem', textDecoration: 'none',
                        padding: '0.4375rem 1rem', fontSize: '0.8125rem'
                    }}>
                        Start now →
                    </Link>
                </div>
            </div>

            {/* WEEKLY REPORT MODAL */}
            <AnimatePresence>
                {showReport && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowReport(false)}
                        style={{
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)', zIndex: 1000,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            onClick={e => e.stopPropagation()}
                            style={{
                                width: '90%', maxWidth: '720px', maxHeight: '85vh', overflowY: 'auto',
                                background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 12,
                                padding: '2rem', position: 'relative'
                            }}
                        >
                            <button onClick={() => setShowReport(false)} style={{ position: 'absolute', top: 16, right: 16, border: 'none', background: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>

                            <div style={{ marginBottom: '2rem' }}>
                                <div className="label" style={{ marginBottom: '0.5rem' }}>Weekly Report</div>
                                <h2 className="h1">Growth Summary</h2>
                                <p className="body-xs" style={{ marginTop: '4px' }}>Feb 17 – Feb 24 · Week 8</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem', paddingBottom: '1.5rem' }}>
                                {[
                                    { label: 'Study Time', value: '12.5h' },
                                    { label: 'Sessions', value: '8' },
                                    { label: 'Skill Change', value: '+2.4%', color: 'var(--success)' },
                                ].map((m, i) => (
                                    <div key={i} style={{ padding: '0 1rem', borderRight: i < 2 ? '1px solid var(--border-color)' : 'none' }}>
                                        <div className="body-xs" style={{ marginBottom: '0.25rem' }}>{m.label}</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: m.color || 'var(--text-primary)' }}>{m.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ position: 'relative' }}>
                                <div style={{ filter: isPremium ? 'none' : 'blur(6px)', opacity: isPremium ? 1 : 0.4, pointerEvents: isPremium ? 'auto' : 'none' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                                        <div style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: 8 }}>
                                            <div className="label" style={{ marginBottom: '0.75rem' }}>Learning Velocity</div>
                                            <div style={{ fontSize: '2rem', fontWeight: 600, lineHeight: 1 }}>{lvs}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.375rem' }}>+12% from last week</div>
                                        </div>
                                        <div style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: 8 }}>
                                            <div className="label" style={{ marginBottom: '0.75rem' }}>4-Week Projection</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                {processedSkills.slice(0, 3).map((s, i) => (
                                                    <div key={i}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '3px', color: 'var(--text-secondary)' }}>
                                                            <span>{s.name}</span>
                                                            <span style={{ color: 'var(--success)' }}>{s.score}% → {Math.min(100, Math.round(s.score + (s.growth * 4)))}%</span>
                                                        </div>
                                                        <div style={{ width: '100%', height: '2px', background: 'var(--border-color)', borderRadius: 1 }}>
                                                            <div style={{ width: `${s.score}%`, height: '100%', background: 'var(--accent-color)', borderRadius: 1 }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: 8 }}>
                                        <div className="label" style={{ marginBottom: '0.75rem' }}>AI Action Plan</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                                            {["Complete 'Advanced Redux' Module", "Book 2 Mock Interviews", "Target 15 Focus Hours", "Solve 5 'Graph' Medium Problems"].map((action, i) => (
                                                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '0.5rem' }}>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, width: 16 }}>{i+1}.</span>
                                                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{action}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {!isPremium && (
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                                        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '2rem', textAlign: 'center', maxWidth: '360px' }}>
                                            <Lock size={24} color="var(--text-tertiary)" style={{ marginBottom: '1rem' }} />
                                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.375rem' }}>Unlock Intelligence</h3>
                                            <p className="body-sm" style={{ marginBottom: '1.25rem' }}>Get velocity tracking, projections, and AI action plans.</p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                                                {['Weakness Detection', 'AI Action Plans', 'Skill Projections'].map(f => (
                                                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                                                        <CheckCircle size={13} color="var(--success)" /> {f}
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={() => setShowPremiumModal(true)} className="btn btn-primary" style={{ width: '100%' }}>Upgrade to Pro</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <PremiumModal 
                isOpen={showPremiumModal} 
                onClose={() => setShowPremiumModal(false)}
                featureName="Advanced AI Intelligence"
            />
        </motion.div>
    );
};

export default Overview;
