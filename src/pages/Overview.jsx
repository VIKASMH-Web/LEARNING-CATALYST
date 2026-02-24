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
    const bestGrower = [...processedSkills].sort((a, b) => b.growth - a.growth)[0];
    const primaryRoadmap = activeRoadmaps[0];
    const currentStageIndex = Math.floor((primaryRoadmap.percentage / 100) * 6) + 1;
    const estimatedWeeksLeft = primaryRoadmap.percentage > 0 ? Math.max(1, Math.round((100 - primaryRoadmap.percentage) / 8)) : 12;
    const nextLevel = weakestSkill.score < 40 ? 'Intermediate' : 'Advanced';

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2.5rem' }}>

            {/* ═══ SECTION 1 — AI HERO INTELLIGENCE ═══ */}
            <div style={{
                background: 'linear-gradient(135deg, #15171A 0%, #1a1c20 100%)',
                border: '1px solid var(--border-color)', borderRadius: 12,
                padding: '2rem 2.25rem', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="label" style={{ marginBottom: '0.75rem', color: 'var(--accent-color)' }}>AI Intelligence</div>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                        Your Learning Intelligence Overview
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '640px', marginBottom: '0.375rem' }}>
                        You improved {bestGrower.name} <span style={{ color: 'var(--success)', fontWeight: 500 }}>+{bestGrower.growth.toFixed(1)}%</span> this week. At this pace, you'll reach {nextLevel} in ~{estimatedWeeksLeft} weeks.
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginBottom: '1.5rem' }}>
                        Consistency score increased by 12%. Focus on {weakestSkill.weakest} to close your biggest gap.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <Link to="/learning-hub" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1.25rem', fontSize: '0.8125rem' }}>
                            Continue Learning
                        </Link>
                        <button onClick={() => setShowReport(true)} className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
                            View Weekly Report {!isPremium && <Lock size={11} style={{ opacity: 0.4 }} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ═══ SECTION 2 — COMPACT METRIC BAR ═══ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                {[
                    { label: 'Total XP', value: xp.toLocaleString(), trend: '+120', up: true },
                    { label: 'Streak', value: `${streak} days`, trend: null },
                    { label: 'Learning Velocity', value: lvsScore, trend: '+12%', up: true },
                    { label: 'Focus Hours', value: totalHours, trend: null },
                ].map((m, i) => (
                    <div key={i} style={{ padding: '0.75rem 1.25rem', borderRight: i < 3 ? '1px solid var(--border-color)' : 'none' }}>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: '0.1875rem' }}>{m.label}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{m.value}</span>
                            {m.trend && <span style={{ fontSize: '0.625rem', fontWeight: 500, color: 'var(--success)' }}>{m.trend}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* ═══ SECTION 3 — MAIN INTELLIGENCE GRID ═══ */}
            <div style={{ display: 'grid', gridTemplateColumns: '65fr 35fr', gap: '2rem' }}>
                {/* LEFT — Learning Activity Chart */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 className="h3">Learning Activity</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--success)', fontWeight: 500 }}>+18% vs last week</span>
                            <span className="body-xs">{selectedPeriod}</span>
                        </div>
                    </div>
                    <div style={{ height: '280px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorMeasure" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.15}/>
                                        <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ background: '#15171A', border: '1px solid var(--border-color)', borderRadius: 6, fontSize: '0.8125rem' }} itemStyle={{ color: 'var(--text-primary)' }} labelStyle={{ color: 'var(--text-secondary)' }} />
                                <Area type="monotone" dataKey="hours" stroke="var(--accent-color)" strokeWidth={2} fillOpacity={1} fill="url(#colorMeasure)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* RIGHT — Skill Intelligence Breakdown */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 className="h3">Skill Intelligence</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {processedSkills.map((skill, i) => (
                            <div key={i} style={{ padding: '0.625rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                                    <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)' }}>{skill.name}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{skill.score}%</span>
                                        <span style={{ fontSize: '0.625rem', fontWeight: 600, color: skill.momentum.color, fontVariantNumeric: 'tabular-nums' }}>
                                            {skill.growth > 0 ? '+' : ''}{skill.growth.toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                                <div style={{ width: '100%', height: '3px', background: 'var(--border-color)', borderRadius: 2, overflow: 'hidden', marginBottom: '0.25rem' }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${skill.score}%` }} transition={{ duration: 0.6, delay: i * 0.05 }}
                                        style={{ height: '100%', background: skill.score >= 70 ? 'var(--success)' : skill.score >= 40 ? 'var(--accent-color)' : 'var(--text-tertiary)', borderRadius: 2 }} />
                                </div>
                                <div style={{ fontSize: '0.625rem', color: 'var(--text-tertiary)' }}>Focus: {skill.weakest}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ SECTION 4 — ACTIVE ROADMAP ═══ */}
            <div style={{ background: '#15171A', border: '1px solid var(--border-color)', borderRadius: 12, padding: '1.5rem 1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 className="h3">Active Roadmap</h3>
                    <Link to="/learning-hub" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        All roadmaps <ArrowRight size={12} />
                    </Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{primaryRoadmap.title}</h2>
                        <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: 3, overflow: 'hidden', marginBottom: '0.75rem' }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${primaryRoadmap.percentage}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ height: '100%', background: 'var(--accent-color)', borderRadius: 3 }} />
                        </div>
                        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                            <span>Stage <strong style={{ color: 'var(--text-secondary)' }}>{currentStageIndex}</strong> of 6</span>
                            <span>Progress <strong style={{ color: 'var(--text-secondary)' }}>{primaryRoadmap.percentage}%</strong></span>
                            <span>ETA <strong style={{ color: 'var(--text-secondary)' }}>~{estimatedWeeksLeft} weeks</strong></span>
                        </div>
                    </div>
                    <Link to="/learning-hub" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1.5rem', fontSize: '0.8125rem', flexShrink: 0 }}>
                        Continue →
                    </Link>
                </div>
                {activeRoadmaps.length > 1 && (
                    <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1.25rem', paddingTop: '0.75rem', display: 'flex', gap: '2rem' }}>
                        {activeRoadmaps.slice(1).map((map, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{map.title}</span>
                                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{map.percentage}%</span>
                                <div style={{ width: 48, height: 2, background: 'var(--border-color)', borderRadius: 1 }}>
                                    <div style={{ width: `${map.percentage}%`, height: '100%', background: 'var(--text-tertiary)', borderRadius: 1 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ═══ SECTION 5 — AI NEXT ACTION PANEL ═══ */}
            <div style={{ background: '#15171A', border: '1px solid var(--border-color)', borderRadius: 12, padding: '1.5rem 1.75rem' }}>
                <div className="label" style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>AI Recommendation</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Your Next Best Action</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.375rem', maxWidth: '600px' }}>
                    {weakestSkill.nextAction}. Your {weakestSkill.name} cluster is at {weakestSkill.score}% — improving {weakestSkill.weakest} yields the highest ROI based on your current trajectory.
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '1.25rem' }}>
                    Estimated impact: +{(Math.random() * 3 + 2).toFixed(1)}% skill growth this week
                </p>
                <Link to="/learning-hub" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.5625rem 1.5rem', fontSize: '0.875rem' }}>
                    Start Now →
                </Link>
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
