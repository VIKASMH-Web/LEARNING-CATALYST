import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, Zap, ArrowUpRight, Cpu } from 'lucide-react';
import { useGame } from '../../context/GameContext';

const LearningVelocityGraph = () => {
    const { xp, streak, lvsScore } = useGame();

    const data = useMemo(() => {
        // Generate a "high velocity" trend
        // We'll simulate 30 data points that look like a steep takeoff
        const points = [];
        const base = 25;
        for (let i = 0; i < 30; i++) {
            // Power curve: y = x^2 + noise for that "steep" look
            const progress = i / 29;
            const curve = Math.pow(progress, 2.5) * 70;
            const noise = (Math.random() * 8);
            const value = base + curve + noise;
            
            points.push({
                time: `T-${30-i}`,
                velocity: Math.min(100, Math.round(value))
            });
        }
        return points;
    }, []);

    return (
        <section style={{ 
            background: 'linear-gradient(145deg, #0f172a, #1e293b)', 
            borderRadius: '32px', 
            padding: '2.5rem', 
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            width: '100%'
        }}>
            {/* Background Accent */}
            <div style={{ 
                position: 'absolute', 
                top: '-20%', 
                right: '-10%', 
                width: '60%', 
                height: '60%', 
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                            <div style={{ padding: '4px 12px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Cpu size={12} /> AMD ROCm™ TURBO
                            </div>
                            <motion.div 
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                style={{ padding: '4px 12px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                MAXIMUM THROUGHPUT
                            </motion.div>
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 950, letterSpacing: '-0.05em', margin: 0, textTransform: 'uppercase', lineHeight: 1 }}>
                            THE <span style={{ color: '#818cf8' }}>LEARNING VELOCITY</span> <br />
                            MUST BE HIGH
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginTop: '0.75rem', fontWeight: 600, maxWidth: '400px' }}>
                            Hardware-accelerated progress tracking. Your current orbital trajectory is 12% above baseline.
                        </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', justifyContent: 'flex-end' }}>
                            {lvsScore >= 70 && (
                                <motion.div 
                                    animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1.05, 0.95] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    style={{ 
                                        fontSize: '0.8rem', 
                                        padding: '4px 10px', 
                                        background: 'rgba(99, 102, 241, 0.2)', 
                                        color: '#818cf8', 
                                        borderRadius: '8px', 
                                        fontWeight: 900,
                                        border: '1px solid rgba(99, 102, 241, 0.4)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)'
                                    }}>
                                    High Stability
                                </motion.div>
                            )}
                            <motion.span 
                                key={lvsScore}
                                initial={{ scale: 1.2, color: '#818cf8' }}
                                animate={{ scale: 1, color: '#FFFFFF' }}
                                style={{ fontSize: '4.5rem', fontWeight: 950, lineHeight: 1 }}>
                                {lvsScore}
                            </motion.span>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center' }}>
                                <ArrowUpRight size={24} /> +12%
                            </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.5rem' }}>
                            Velocity Index (LVS)
                        </div>
                    </div>
                </div>

                <div style={{ height: 320, width: '100%', position: 'relative', marginTop: '1rem' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="velocityTurbo" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" hide />
                            <YAxis domain={[0, 110]} hide />
                            <Tooltip 
                                contentStyle={{ 
                                    background: 'rgba(15, 23, 42, 0.95)', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    borderRadius: '16px',
                                    backdropFilter: 'blur(12px)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                }}
                                itemStyle={{ color: '#FFFFFF', fontWeight: 900 }}
                                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="velocity" 
                                stroke="#818cf8" 
                                strokeWidth={6} 
                                fill="url(#velocityTurbo)" 
                                animationDuration={2500}
                                isAnimationActive={true}
                                strokeLinecap="round"
                            />
                            <ReferenceLine y={80} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                        </AreaChart>
                    </ResponsiveContainer>
                    
                    {/* Floating Telemetry Pods */}
                    <div style={{ position: 'absolute', top: '10%', right: '0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { label: 'Efficiency', val: '98.4%', color: '#10b981' },
                            { label: 'Uptime', val: '14.2h', color: '#818cf8' },
                            { label: 'Load', val: 'Minimal', color: '#f59e0b' }
                        ].map((p, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (idx * 0.2) }}
                                style={{ 
                                    background: 'rgba(255,255,255,0.03)', 
                                    padding: '10px 16px', 
                                    borderRadius: '14px', 
                                    border: '1px solid rgba(255,255,255,0.06)', 
                                    backdropFilter: 'blur(10px)',
                                    minWidth: '100px'
                                }}
                            >
                                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.label}</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: p.color }}>{p.val}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}>
                    {[
                        { label: 'Neural Adaptation', val: '+4.2x', sub: 'Baseline comparison' },
                        { label: 'Attention Density', val: 'Maximum', sub: 'Distraction-free mode' },
                        { label: 'Growth Vector', val: 'Steep', sub: 'Stability confirmed' },
                    ].map((m, i) => (
                        <div key={i}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>{m.label}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>{m.val}</div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{m.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LearningVelocityGraph;
