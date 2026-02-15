import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Zap, Trophy, Target, 
  TrendingUp, BarChart2, MoreHorizontal, ArrowRight, 
  Cpu, Activity
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { Link } from 'react-router-dom';

const Overview = () => {
    const { focusMinutes, codeRuns, activeDays, roadmapProgress, getSkillLevel } = useProgress();
    const [selectedPeriod, setSelectedPeriod] = useState('Last 7 days');

    // Derived Stats
    const totalHours = (focusMinutes / 60).toFixed(1);
    const coursesCompleted = Object.values(roadmapProgress).filter(i => i.completed).length; 
    // Mock avg score based on code runs success (simulated)
    const avgScore = 94; 
    // Mock rank
    const rank = "#124";

    // Chart Data (Mocked based on activeDays for "Learning Activity")
    const activityData = [
        { day: 'Mon', value: 2.5 },
        { day: 'Tue', value: 1.8 },
        { day: 'Wed', value: 4.2 },
        { day: 'Thu', value: 3.1 },
        { day: 'Fri', value: 5.5 }, // Peak
        { day: 'Sat', value: 1.2 },
        { day: 'Sun', value: 3.9 },
    ];
    const maxActivity = Math.max(...activityData.map(d => d.value));

    // Skill Radar Data (Mocked from actual progress)
    const skills = [
        { name: 'React', value: getSkillLevel('Full Stack Developer').percentage || 60 },
        { name: 'Node.js', value: getSkillLevel('Backend Developer').percentage || 45 },
        { name: 'Python', value: getSkillLevel('Python').percentage || 30 },
        { name: 'System Design', value: 40 }, // Mock
        { name: 'Algorithms', value: getSkillLevel('AI Engineer').percentage || 50 },
        { name: 'AI/ML', value: 70 }, // Mock
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="h1" style={{ marginBottom: '0.5rem' }}>Welcome back, John</h1>
                    <p className="body-sm">You're in the top 5% of React learners this week. Keep it up!</p>
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
                    label="Courses Completed" 
                    value={coursesCompleted} 
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
                    label="Rank" 
                    value={rank} 
                    trend="-2" 
                    trendColor="#ffb86c" // neutral/down
                />
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Learning Activity Bar Chart */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Learning Activity</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Weekly progress breakdown</p>
                        </div>
                        <div style={{ padding: '4px 12px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            {selectedPeriod}
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', height: '200px', paddingBottom: '1rem' }}>
                        {activityData.map((d, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '8px' }}>
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.value / maxActivity) * 100}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    style={{ 
                                        width: '100%', maxWidth: '40px', 
                                        background: d.value === maxActivity ? 'var(--accent-color)' : 'var(--bg-elevated)', 
                                        borderRadius: '6px',
                                        minHeight: '4px',
                                        opacity: d.value === maxActivity ? 1 : 0.6
                                    }}
                                />
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skill Intelligence Radar (Simulated with Polygon) */}
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
                        <RoadmapItem 
                            icon="⚛️" title="Fullstack React Mastery" 
                            progress={75} color="#bd93f9" 
                        />
                        <RoadmapItem 
                            icon="🏗️" title="Advanced System Design" 
                            progress={42} color="#f1fa8c" 
                        />
                        <RoadmapItem 
                            icon="🤖" title="AI Engineer Path" 
                            progress={15} color="#50fa7b" 
                        />
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
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Mastering GraphQL Mutations</h3>
                            <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.5, maxWidth: '90%' }}>
                                Based on your React proficiency, you should focus on data fetching patterns next.
                            </p>
                        </div>
                        <button style={{ 
                            alignSelf: 'flex-start', padding: '0.5rem 1rem', 
                            background: 'white', color: '#4f46e5', border: 'none', 
                            borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem',
                            cursor: 'pointer', marginTop: '1rem'
                        }}>
                            Start Module
                        </button>
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

// Simplified Radar Chart SVG
const RadarChart = ({ skills }) => {
    // Generate polygon points based on values
    // This is a simplified visual representation
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
                
                {/* Data Polygon (Approximation) */}
                <polygon 
                    points="100,50 160,80 150,140 100,180 50,140 40,80" 
                    fill="rgba(124, 58, 237, 0.2)"
                    stroke="var(--accent-color)"
                    strokeWidth="2"
                />
                
                {/* Labels */}
                {/* Top */}
                <text x="100" y="15" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">{skills[0]?.name}</text>
                {/* Top Right */}
                <text x="180" y="60" textAnchor="start" fill="var(--text-secondary)" fontSize="10">{skills[1]?.name}</text>
                {/* Bottom Right */}
                <text x="180" y="160" textAnchor="start" fill="var(--text-secondary)" fontSize="10">{skills[2]?.name}</text>
                {/* Bottom - Center */}
                <text x="100" y="210" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">{skills[3]?.name}</text>
                {/* Bottom Left */}
                <text x="20" y="160" textAnchor="end" fill="var(--text-secondary)" fontSize="10">{skills[4]?.name}</text>
                {/* Top Left */}
                <text x="20" y="60" textAnchor="end" fill="var(--text-secondary)" fontSize="10">{skills[5]?.name}</text>
            </svg>
        </div>
    );
};

export default Overview;
