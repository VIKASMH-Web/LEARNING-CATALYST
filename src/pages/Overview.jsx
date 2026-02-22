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
import { Treemap, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Overview = () => {
    const { focusMinutes, roadmapProgress, activeDays, getSkillLevel } = useProgress();
    const { user } = useAuth();
    const { isPremium, lvsScore } = useGame();
    const displayName = user?.name || user?.email?.split('@')[0] || 'Learner';
    const [selectedPeriod, setSelectedPeriod] = useState('Last 7 days');
    const [showReport, setShowReport] = useState(false);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    // --- 1. REAL DATA CALCULATION ---
    const totalHours = (focusMinutes / 60).toFixed(1);
    const completedStages = Object.values(roadmapProgress).filter(item => item.completed).length;
    const avgScore = 92; 
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="h1" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Welcome back, {displayName}
                        {isPremium && <Star size={20} fill="#fbbf24" color="#fbbf24" style={{marginTop: '4px'}} />}
                    </h1>
                    <p className="body-sm">You've maintained a {activeDays.length} day streak! Keep it up!</p>
                </div>
                <button 
                    onClick={() => setShowReport(true)}
                    style={{
                        padding: '0.75rem 1.25rem',
                        background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                        color: 'white', border: 'none', borderRadius: '12px',
                        fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                    }}
                >
                    <FileText size={18} />
                    View Weekly Report
                    {!isPremium && <Lock size={14} style={{ opacity: 0.8 }} />}
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid-cols-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <StatsCard icon={<Clock size={20} color="#8be9fd" />} label="Total Study Time" value={`${totalHours}h`} trend="+12%" trendColor="#50fa7b" />
                <StatsCard icon={<Zap size={20} color="#ffb86c" />} label="Stages Completed" value={completedStages} trend="+2" trendColor="#50fa7b" />
                <StatsCard icon={<Target size={20} color="#bd93f9" />} label="Avg. Score" value={`${avgScore}%`} trend="+3%" trendColor="#50fa7b" />
                <StatsCard icon={<TrendingUp size={20} color="#ff5555" />} label="Global Rank" value={rank} trend="-2" trendColor="#ffb86c" />
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Learning Activity Chart */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Learning Activity</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Weekly progress breakdown</p>
                        </div>
                        <div style={{ padding: '4px 12px', background: 'var(--bg-elevated)', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            {selectedPeriod}
                        </div>
                    </div>
                    <div style={{ flex: 1, width: '100%', minHeight: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorMeasure" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" tick={{fill: 'var(--text-secondary)', fontSize: 12}} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px' }} itemStyle={{ color: 'white' }} />
                                <Area type="monotone" dataKey="hours" stroke="var(--accent-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorMeasure)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Knowledge Heatmap */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Knowledge Heatmap</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Based on quizzes, mock interviews & recall</p>
                        </div>
                    </div>
                    <div style={{ flex: 1, width: '100%', minHeight: '220px', marginBottom: '1rem' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <Treemap
                                data={heatmapData}
                                dataKey="size"
                                stroke="#121222"
                                fill="#8884d8"
                                content={<HeatmapCustomContent />}
                            />
                        </ResponsiveContainer>
                    </div>
                    {weakestSkill && (
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '1rem', borderRadius: '0 8px 8px 0', marginTop: 'auto' }}>
                            <div style={{ fontSize: '0.8rem', color: '#fca5a5', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={14} /> AI DIAGNOSTIC</div>
                            <div style={{ fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.4 }}>
                                You struggle with <strong style={{color: '#f87171'}}>{weakestSkill.weakest}</strong>.
                                <br/>Recommended: {weakestSkill.nextAction}.
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Current Roadmaps</h3>
                         <Link to="/learning-hub" style={{ fontSize: '0.8rem', color: 'var(--accent-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            View All <ArrowRight size={14} />
                         </Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {activeRoadmaps.map((map, i) => (
                             <RoadmapItem key={i} icon={i === 0 ? "⚛️" : i === 1 ? "🏗️" : "🤖"} title={map.title} progress={map.percentage} color={map.levelColor} />
                        ))}
                    </div>
                </div>
                <div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                         <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>AI Recommendations</h3>
                    </div>
                    <div style={{ 
                        background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)', 
                        borderRadius: '16px', padding: '1.5rem', 
                        color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                        minHeight: '180px', boxShadow: '0 10px 25px rgba(124, 58, 237, 0.3)'
                    }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.8, marginBottom: '0.5rem', letterSpacing: '0.5px' }}>NEXT CHALLENGE</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Mastering {recommendedRoadmap.title}</h3>
                            <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.5, maxWidth: '90%' }}>
                                Based on your progress ({recommendedRoadmap.percentage}%), continue to the next module.
                            </p>
                        </div>
                        <Link to="/learning-hub" style={{ 
                            alignSelf: 'flex-start', padding: '0.5rem 1rem', 
                            background: 'white', color: '#4f46e5', border: 'none', 
                            borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem',
                            cursor: 'pointer', marginTop: '1rem', textDecoration: 'none'
                        }}>
                            Start Next Stage
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
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(4px)', zIndex: 1000,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            style={{
                                width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto',
                                background: '#18181b', border: '1px solid #27272a', borderRadius: '24px',
                                padding: '2rem', position: 'relative'
                            }}
                        >
                            <button onClick={() => setShowReport(false)} style={{ position: 'absolute', top: 20, right: 20, border: 'none', background: 'none', color: '#71717a', cursor: 'pointer' }}>
                                <AlertTriangle size={24} style={{ transform: 'rotate(180deg)', display: 'none' }} /> 
                                <span style={{fontSize: '1.5rem'}}>×</span>
                            </button>

                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ 
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    background: 'rgba(124, 58, 237, 0.1)', color: '#a78bfa',
                                    padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600,
                                    marginBottom: '1rem'
                                }}>
                                    <CheckCircle size={16} /> Weekly Growth Report
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>Your Weekly Intelligence</h2>
                                <p style={{ color: '#a1a1aa' }}>Feb 12 - Feb 19 • Week 7</p>
                            </div>

                            {/* Free Tier Content */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                    <div style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Study Time</div>
                                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>12.5h</div>
                                </div>
                                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                    <div style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Sessions</div>
                                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>8</div>
                                </div>
                                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                    <div style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Skill Change</div>
                                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#50fa7b' }}>+2.4%</div>
                                </div>
                            </div>

                            {/* Premium Section */}
                            <div style={{ position: 'relative' }}>
                                {/* Content (Effective content that is blurred if not pro) */}
                                <div style={{ 
                                    filter: isPremium ? 'none' : 'blur(8px)', 
                                    opacity: isPremium ? 1 : 0.5,
                                    pointerEvents: isPremium ? 'auto' : 'none',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        {/* Learning Velocity Score */}
                                        <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(0,0,0,0))' }}>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#a78bfa' }}>Learning Velocity Score (LVS)</h3>
                                            <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>{lvs}</div>
                                            <div style={{ fontSize: '0.9rem', color: '#50fa7b', marginTop: '0.5rem' }}>+12% from last week</div>
                                            <p style={{ fontSize: '0.8rem', color: '#71717a', marginTop: '1rem', lineHeight: 1.5 }}>
                                                Your consistently high focus scores and mock interview performance have boosted your LVS significantly.
                                            </p>
                                        </div>

                                        {/* 4-Week Projection */}
                                        <div className="glass-card" style={{ padding: '1.5rem' }}>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#a78bfa' }}>4-Week Projection</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                {processedSkills.slice(0, 3).map((s, i) => (
                                                    <div key={i}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '4px' }}>
                                                            <span>{s.name}</span>
                                                            <span style={{ color: '#50fa7b' }}>{s.score}% → {Math.min(100, Math.round(s.score + (s.growth * 4)))}%</span>
                                                        </div>
                                                        <div style={{ width: '100%', height: '6px', background: '#27272a', borderRadius: '3px' }}>
                                                            <div style={{ width: `${s.score}%`, height: '100%', background: '#a78bfa', borderRadius: '3px' }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Action Plan */}
                                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#a78bfa' }}>AI Action Plan for Next Week</h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                            {[
                                                "Complete 'Advanced Redux' Module",
                                                "Book 2 Mock Interviews", 
                                                "Target 15 Focus Hours",
                                                "Solve 5 'Graph' Medium Problems"
                                            ].map((action, i) => (
                                                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', background: '#27272a', borderRadius: '8px' }}>
                                                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#7c3aed', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>{i+1}</div>
                                                    <span style={{ fontSize: '0.9rem', color: '#f4f4f5' }}>{action}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* GATE OVERLAY */}
                                {!isPremium && (
                                    <div style={{
                                        position: 'absolute', inset: 0, 
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                        zIndex: 10
                                    }}>
                                        <div style={{
                                            background: '#18181b', border: '1px solid #7c3aed', borderRadius: '24px',
                                            padding: '2rem', textAlign: 'center', maxWidth: '400px',
                                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                        }}>
                                            <div style={{ width: 64, height: 64, margin: '0 auto 1.5rem', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Lock size={32} color="#a78bfa" />
                                            </div>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>Unlock AI Intelligence</h3>
                                            <p style={{ color: '#a1a1aa', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                                Get deep insights into your learning velocity, weakness detection, and AI-personalized weekly plans.
                                            </p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                {['Weakness Detection', 'AI Action Plans', 'Badge Analytics', 'Skill Projections'].map(f => (
                                                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#e4e4e7' }}>
                                                        <CheckCircle size={16} color="#50fa7b" /> {f}
                                                    </div>
                                                ))}
                                            </div>
                                            <button 
                                                onClick={() => setShowPremiumModal(true)}
                                                style={{
                                                    width: '100%', marginTop: '2rem', padding: '14px',
                                                    background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                                                    color: 'white', border: 'none', borderRadius: '12px',
                                                    fontWeight: 700, cursor: 'pointer', fontSize: '1rem',
                                                    boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)'
                                                }}
                                            >
                                                Upgrade Now
                                            </button>
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

const StatsCard = ({ icon, label, value, trend, trendColor }) => (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <div style={{ padding: '2px 8px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', fontSize: '0.75rem', fontWeight: 700, color: trendColor }}>
                {trend}
            </div>
        </div>
        <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{value}</div>
        </div>
    </div>
);

const RoadmapItem = ({ icon, title, progress, color }) => (
    <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
            {icon}
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{title}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.7 }}>{progress}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} style={{ height: '100%', background: color, borderRadius: '3px' }} />
            </div>
        </div>
    </div>
);

const HeatmapCustomContent = (props) => {
    const { root, depth, x, y, width, height, index, name, score } = props;
    if (depth !== 1) return null; // Only render children of root
    let status = "Strength";
    let fillCol = "url(#gradGreen)";
    let strokeCol = "#10b981";
    
    if (score < 50) {
        status = "Critical Weakness";
        fillCol = "url(#gradRed)";
        strokeCol = "#ef4444";
    } else if (score <= 70) {
        status = "Needs Practice";
        fillCol = "url(#gradYellow)";
        strokeCol = "#fbbf24";
    }

    return (
        <g transform={`translate(${x},${y})`}>
            <defs>
                <linearGradient id="gradRed" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(239,68,68,0.3)" />
                    <stop offset="100%" stopColor="rgba(153,27,27,0.8)" />
                </linearGradient>
                <linearGradient id="gradYellow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(245,158,11,0.3)" />
                    <stop offset="100%" stopColor="rgba(180,83,9,0.8)" />
                </linearGradient>
                <linearGradient id="gradGreen" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(16,185,129,0.3)" />
                    <stop offset="100%" stopColor="rgba(4,120,87,0.8)" />
                </linearGradient>
            </defs>
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                rx={12}
                ry={12}
                style={{
                    fill: fillCol,
                    stroke: strokeCol,
                    strokeWidth: 2,
                    strokeOpacity: 0.6,
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            />
            {width > 60 && height > 45 && (
                <>
                    <text x={12} y={24} fill="#ffffff" fontSize={13} fontWeight="800" textAnchor="start">
                        {name}
                    </text>
                    <text x={12} y={42} fill="rgba(255,255,255,0.7)" fontSize={11} fontWeight="600" textAnchor="start">
                        {score}% 
                    </text>
                </>
            )}
        </g>
    );
};

const RadarChart = ({ skills }) => {
    // 5 points polygon for 5 clusters
    // Vertices at angles: -90, -18, 54, 126, 198 (pi/2 starts top)
    // Indices 0..4
    const count = 5;
    const radius = 100;
    const center = 110; // slightly padded
    
    // Helper to get coordinates
    const getCoords = (value, i) => {
        const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
        const r = radius * value;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return { x, y };
    };

    const points = skills.map((s, i) => {
        const { x, y } = getCoords(s.score / 100, i);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="220" height="220" viewBox="0 0 220 220">
                {/* Background Web */}
                {[0.2, 0.4, 0.6, 0.8, 1].map(r => (
                    <polygon 
                        key={r}
                        points={[0,1,2,3,4].map(i => {
                            const { x, y } = getCoords(r, i);
                            return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="var(--border-color)"
                        strokeWidth="1"
                        style={{ opacity: 0.5 }}
                    />
                ))}
                
                {/* Data Polygon */}
                <polygon points={points} fill="rgba(124, 58, 237, 0.2)" stroke="var(--accent-color)" strokeWidth="2" />
                
                {/* Labels */}
                {skills.map((s, i) => {
                    const { x, y } = getCoords(1.15, i); // Place labels further out
                    let anchor = 'middle';
                    if (x < center - 10) anchor = 'end';
                    if (x > center + 10) anchor = 'start';
                    return (
                        <text key={i} x={x} y={y} textAnchor={anchor} fill="var(--text-secondary)" fontSize="10" dominantBaseline="middle">
                            {s.name}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

export default Overview;
