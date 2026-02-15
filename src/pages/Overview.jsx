import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Zap, Trophy, Target, 
  TrendingUp, BarChart2, MoreHorizontal, ArrowRight, Activity
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Overview = () => {
    const { focusMinutes, roadmapProgress, activeDays, getSkillLevel } = useProgress();
    const [selectedPeriod, setSelectedPeriod] = useState('Last 7 days');

    // --- 1. REAL DATA CALCULATION ---
    const totalHours = (focusMinutes / 60).toFixed(1);
    
    // Count completed STAGES across all roadmaps
    const completedStages = Object.values(roadmapProgress).filter(item => item.completed).length;

    // Avg Score (Mocked for now, but linked to data structure)
    const avgScore = 92; 
    const rank = "#42"; // Placeholder

    // --- 2. ACTIVITY CHART DATA (Mocked based on activeDays) ---
    // In a real app, we would query the backend for daily focus duration.
    // Here we generate plausible data for the chart.
    const activityData = [
        { day: 'Mon', hours: 2.5 },
        { day: 'Tue', hours: 3.8 },
        { day: 'Wed', hours: 1.5 },
        { day: 'Thu', hours: 4.2 },
        { day: 'Fri', hours: 5.0 },
        { day: 'Sat', hours: 2.0 },
        { day: 'Sun', hours: 3.5 },
    ];

    // --- 3. SKILL RADAR DATA ---
    const skills = [
        { subject: 'React', A: getSkillLevel('Full Stack Developer').percentage || 60, fullMark: 100 },
        { subject: 'Node.js', A: getSkillLevel('Backend Developer').percentage || 40, fullMark: 100 },
        { subject: 'Python', A: getSkillLevel('Python').percentage || 20, fullMark: 100 },
        { subject: 'System Design', A: 45, fullMark: 100 },
        { subject: 'Algorithms', A: 55, fullMark: 100 },
        { subject: 'AI/ML', A: getSkillLevel('AI Engineer').percentage || 10, fullMark: 100 },
    ];

    // --- 4. BROWSER NOTIFICATIONS ---
    useEffect(() => {
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    // --- 5. CURRENT ROADMAPS (SORTED BY RECENT) ---
    // Get unique roadmap names from progress
    const activeRoadmaps = Array.from(new Set(
        Object.keys(roadmapProgress).map(k => k.split('-')[0])
    )).map(title => {
        const stats = getSkillLevel(title);
        return { title, ...stats };
    }).sort((a,b) => b.percentage - a.percentage).slice(0, 3); // Top 3

    // Fallback if empty
    if (activeRoadmaps.length === 0) {
        activeRoadmaps.push({ title: "Full Stack Developer", percentage: 0, levelColor: "#bd93f9" });
    }

    // --- 6. AI RECOMMENDATION ---
    const recommendedRoadmap = activeRoadmaps.find(r => r.percentage < 100) || activeRoadmaps[0];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="h1" style={{ marginBottom: '0.5rem' }}>Welcome back, John</h1>
                    <p className="body-sm">You've maintained a {activeDays.length} day streak! Keep it up!</p>
                </div>
                <button className="btn btn-primary" style={{ borderRadius: '20px', padding: '0.5rem 1.5rem' }}>
                    + Start New Session
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid-cols-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <StatsCard 
                    icon={<Clock size={20} color="#8be9fd" />} 
                    label="Total Study Time" 
                    value={`${totalHours}h`} 
                    trend="+12%" 
                    trendColor="#50fa7b"
                />
                <StatsCard 
                    icon={<Zap size={20} color="#ffb86c" />} 
                    label="Stages Completed" 
                    value={completedStages} 
                    trend="+2" 
                    trendColor="#50fa7b"
                />
                <StatsCard 
                    icon={<Target size={20} color="#bd93f9" />} 
                    label="Avg. Score" 
                    value={`${avgScore}%`} 
                    trend="+3%" 
                    trendColor="#50fa7b"
                />
                <StatsCard 
                    icon={<TrendingUp size={20} color="#ff5555" />} 
                    label="Global Rank" 
                    value={rank} 
                    trend="-2" 
                    trendColor="#ffb86c" 
                />
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Learning Activity Chart */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', minHeight: '300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Learning Activity</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Weekly progress breakdown</p>
                        </div>
                        <div style={{ padding: '4px 12px', background: 'var(--bg-elevated)', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            {selectedPeriod}
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorMeasure" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="day" 
                                    tick={{fill: 'var(--text-secondary)', fontSize: 12}} 
                                    axisLine={false} tickLine={false} 
                                />
                                {/* <YAxis hide /> */}
                                <Tooltip 
                                    contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                    itemStyle={{ color: 'white' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="hours" 
                                    stroke="var(--accent-color)" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorMeasure)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Skill Intelligence Radar */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                         <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Skill Intelligence</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>AI-evaluated proficiency</p>
                        </div>
                        <MoreHorizontal size={16} color="var(--text-secondary)" />
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <RadarChart skills={skills} />
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
                {/* Current Roadmaps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Current Roadmaps</h3>
                         <Link to="/roadmaps" style={{ fontSize: '0.8rem', color: 'var(--accent-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            View All <ArrowRight size={14} />
                         </Link>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {activeRoadmaps.map((map, i) => (
                             <RoadmapItem 
                                key={i}
                                icon={i === 0 ? "⚛️" : i === 1 ? "🏗️" : "🤖"} 
                                title={map.title} 
                                progress={map.percentage} 
                                color={map.levelColor} 
                            />
                        ))}
                    </div>
                </div>

                {/* AI Recommendations */}
                <div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                         <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>AI Recommendations</h3>
                         <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', cursor: 'pointer' }}>Refine AI ✨</span>
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
                                Based on your progress ({recommendedRoadmap.percentage}%), continue to the next module to bridge your skill gap.
                            </p>
                        </div>
                        <Link to="/roadmaps" style={{ 
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
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    style={{ height: '100%', background: color, borderRadius: '3px' }}
                />
            </div>
        </div>
    </div>
);

// Simplified Radar Chart SVG (Reused for consistent look without heavy libs if Recharts radar is complex to setup quickly)
// Actually, passing data to this component makes it dynamic
const RadarChart = ({ skills }) => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Background Web */}
                {[0.2, 0.4, 0.6, 0.8, 1].map(r => (
                    <polygon 
                        key={r}
                        points="100,20 176,65 176,155 100,200 24,155 24,65"
                        fill="none"
                        stroke="var(--border-color)"
                        strokeWidth="1"
                        transform={`scale(${r})`}
                        style={{ transformOrigin: 'center' }}
                    />
                ))}
                
                {/* Data Polygon */}
                <polygon 
                    points={skills.map((s, i) => {
                        const angle = (Math.PI / 3) * i - (Math.PI / 2); // Start at top
                        const value = s.A / 100;
                        const r = 90 * value; // Radius 90
                        const x = 100 + r * Math.cos(angle);
                        const y = 100 + r * Math.sin(angle);
                        return `${x},${y}`;
                    }).join(' ')}
                    fill="rgba(124, 58, 237, 0.2)"
                    stroke="var(--accent-color)"
                    strokeWidth="2"
                />
                
                {/* Labels (Approximate positions) */}
                <text x="100" y="15" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">{skills[0].subject}</text>
                <text x="180" y="60" textAnchor="start" fill="var(--text-secondary)" fontSize="10">{skills[1].subject}</text>
                <text x="180" y="160" textAnchor="start" fill="var(--text-secondary)" fontSize="10">{skills[2].subject}</text>
                <text x="100" y="210" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">{skills[3].subject}</text>
                <text x="20" y="160" textAnchor="end" fill="var(--text-secondary)" fontSize="10">{skills[4].subject}</text>
                <text x="20" y="60" textAnchor="end" fill="var(--text-secondary)" fontSize="10">{skills[5].subject}</text>
            </svg>
        </div>
    );
};

export default Overview;
