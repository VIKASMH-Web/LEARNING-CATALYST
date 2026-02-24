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

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '4rem' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 className="h1" style={{ marginBottom: '0.375rem' }}>
                        Overview
                    </h1>
                    <p className="body-sm">Welcome back, {displayName}. Here's your learning analytics.</p>
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

            {/* Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
                {[
                    { label: 'Total XP', value: xp.toLocaleString(), change: '+120', changeColor: 'var(--success)' },
                    { label: 'Streak', value: `${streak}d`, change: null },
                    { label: 'Learning Velocity', value: lvsScore, change: '+12%', changeColor: 'var(--success)' },
                    { label: 'Focus Hours', value: totalHours, change: null },
                ].map((m, i) => (
                    <div key={i} style={{ 
                        padding: '1.25rem 1.5rem', 
                        borderRight: i < 3 ? '1px solid var(--border-color)' : 'none',
                    }}>
                        <div className="body-xs" style={{ marginBottom: '0.5rem' }}>{m.label}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                            {m.value}
                            {m.change && <span style={{ fontSize: '0.75rem', fontWeight: 500, color: m.changeColor }}>{m.change}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border-color)' }} />

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
                {/* Activity Chart */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <h3 className="h3">Activity</h3>
                        <span className="body-xs">{selectedPeriod}</span>
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

                {/* Skill Intelligence */}
                <div>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <h3 className="h3">Skill Intelligence</h3>
                        <p className="body-xs" style={{ marginTop: '2px' }}>AI-generated from your activity</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div style={{ flexShrink: 0, width: '180px', height: '180px' }}>
                            <RadarChart skills={processedSkills} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 6 }}>
                                <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '2px' }}>Weekly Growth</div>
                                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Backend Engineering <span style={{ color: 'var(--success)' }}>+4%</span></div>
                            </div>
                            {weakestSkill && (
                                <div style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 6 }}>
                                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '2px' }}>Recommended</div>
                                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Focus on {weakestSkill.weakest}.</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border-color)' }} />

            {/* Bottom Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem' }}>
                {/* Active Roadmaps */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                         <h3 className="h3">Active Roadmaps</h3>
                         <Link to="/learning-hub" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            View all <ArrowRight size={12} />
                         </Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {activeRoadmaps.map((map, i) => (
                             <RoadmapItem key={i} title={map.title} progress={map.percentage} color="var(--accent-color)" />
                        ))}
                    </div>
                </div>

                {/* AI Recommendation */}
                <div>
                    <h3 className="h3" style={{ marginBottom: '1rem' }}>Next Step</h3>
                    <div style={{ 
                        border: '1px solid var(--border-color)',
                        borderRadius: 8, padding: '1.25rem', 
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                        minHeight: '160px'
                    }}>
                        <div>
                            <div className="label" style={{ marginBottom: '0.5rem' }}>Recommended</div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{recommendedRoadmap.title}</h3>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Advancing this skill yields the highest ROI based on your trajectory.
                            </p>
                        </div>
                        <Link to="/learning-hub" className="btn btn-primary" style={{ 
                            alignSelf: 'flex-start', marginTop: '1rem', textDecoration: 'none',
                            padding: '0.4375rem 1rem', fontSize: '0.8125rem'
                        }}>
                            Continue →
                        </Link>
                    </div>
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

// --- Sub Components ---

const RoadmapItem = ({ title, progress, color }) => (
    <div style={{ padding: '0.625rem 0', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', alignItems: 'center' }}>
                <span style={{ fontWeight: 400, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{title}</span>
                <span style={{ fontSize: '0.6875rem', fontWeight: 500, color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>{progress}%</span>
            </div>
            <div style={{ width: '100%', height: '2px', background: 'var(--border-color)', borderRadius: '1px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: 'easeOut' }} style={{ height: '100%', background: color, borderRadius: '1px' }} />
            </div>
        </div>
    </div>
);

const RadarChart = ({ skills }) => {
    const count = 5;
    const radius = 80;
    const center = 90;
    
    const getCoords = (value, i) => {
        const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
        const r = radius * value;
        return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
    };

    const points = skills.map((s, i) => {
        const { x, y } = getCoords(s.score / 100, i);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="180" height="180" viewBox="0 0 180 180">
                {[0.25, 0.5, 0.75, 1].map(r => (
                    <polygon 
                        key={r}
                        points={[0,1,2,3,4].map(i => {
                            const { x, y } = getCoords(r, i);
                            return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="var(--border-color)"
                        strokeWidth="0.5"
                    />
                ))}
                <polygon points={points} fill="rgba(99, 102, 241, 0.1)" stroke="var(--accent-color)" strokeWidth="1.5" />
                {skills.map((s, i) => {
                    const { x, y } = getCoords(1.2, i);
                    let anchor = 'middle';
                    if (x < center - 8) anchor = 'end';
                    if (x > center + 8) anchor = 'start';
                    return (
                        <text key={i} x={x} y={y} textAnchor={anchor} fill="var(--text-tertiary)" fontSize="9" dominantBaseline="middle" fontFamily="Inter, sans-serif">
                            {s.name}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

export default Overview;
