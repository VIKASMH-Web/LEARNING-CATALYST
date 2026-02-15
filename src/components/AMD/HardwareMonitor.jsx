import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity } from 'lucide-react';

const HardwareMonitor = () => {
    const [stats, setStats] = useState({ cpu: 0, gpu: 0, npu: 0, status: 'Initializing...' });

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/hardware-status');
                const data = await res.json();
                setStats(data);
            } catch (e) {
                // Fallback for demo if backend is not running
                setStats({
                    cpu: Math.floor(Math.random() * 20) + 10,
                    gpu: Math.floor(Math.random() * 30) + 20,
                    npu: Math.floor(Math.random() * 10) + 5,
                    status: "Simulation Mode"
                });
            }
        };

        const interval = setInterval(fetchStatus, 3000);
        fetchStatus();
        return () => clearInterval(interval);
    }, []);

    const ProgressCircle = ({ value, label, color, icon: Icon }) => (
        <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 80, height: 80, marginBottom: '0.5rem' }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="36" fill="none" stroke="#222" strokeWidth="8" />
                    <motion.circle 
                        cx="40" cy="40" r="36" fill="none" stroke={color} 
                        strokeWidth="8" strokeDasharray="226" 
                        initial={{ strokeDashoffset: 226 }}
                        animate={{ strokeDashoffset: 226 - (226 * value) / 100 }}
                        strokeLinecap="round"
                    />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
                   <Icon size={20} />
                </div>
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{value}%</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{label}</div>
        </div>
    );

    return (
        <div className="glass-card" style={{ padding: '1.5rem', width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity size={18} color="var(--accent-color)" />
                    <h3 style={{ fontSize: '0.9rem', margin: 0 }}>AMD Hardware Monitor</h3>
                </div>
                <div style={{ fontSize: '0.7rem', background: 'rgba(80, 250, 123, 0.1)', color: '#50fa7b', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(80, 250, 123, 0.2)' }}>
                    {stats.status}
                </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ProgressCircle value={stats.cpu} label="CPU" color="#ff79c6" icon={Cpu} />
                <ProgressCircle value={stats.gpu} label="GPU" color="#8be9fd" icon={Zap} />
                <ProgressCircle value={stats.npu} label="NPU" color="#ffb86c" icon={Activity} />
            </div>
        </div>
    );
};

export default HardwareMonitor;
