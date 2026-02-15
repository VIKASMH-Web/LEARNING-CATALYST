import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { motion } from 'framer-motion';
import { Target, Calendar, Clock, DollarSign, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

const CareerPlanner = () => {
  const { careerProfile, updateCareerProfile } = useProgress();
  
  // Local state for form input
  const [formData, setFormData] = useState({
    targetRole: 'Full Stack Developer',
    salaryGoal: '',
    timeline: '6 Months',
    dailyHours: '2 Hours',
    currentLevel: 'Beginner',
    preferredLanguage: 'JavaScript'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateRoadmap = (data) => {
    // Mock logic to generate a structured roadmap
    // In a real app, this might come from an API
    
    const months = parseInt(data.timeline.split(' ')[0]) || 6;
    const roadmap = [];
    
    for (let i = 1; i <= months; i++) {
      roadmap.push({
        month: i,
        title: `Month ${i}: ${getMonthTitle(i, data.targetRole)}`,
        topics: getTopics(i, data.targetRole),
        project: getProject(i, data.targetRole)
      });
    }

    const newProfile = {
      ...data,
      generatedAt: new Date().toISOString(),
      roadmap: roadmap
    };
    
    updateCareerProfile(newProfile);
  };

  const getMonthTitle = (month, role) => {
    const titles = [
        "Foundations & Core Concepts",
        "Advanced Logic & Data Structures",
        "Frontend Mastery & UI/UX",
        "Backend Architecture & APIs",
        "Database Design & Integration",
        "Testing, DevOps & Deployment",
        "System Design & Scalability",
        "Real-world Projects & Portfolio",
        "Interview Prep & Soft Skills",
        "Advanced Specialization",
        "Mock Interviews & Final Polish",
        "Job Application Strategy"
    ];
    return titles[(month - 1) % titles.length];
  };

  const getTopics = (month, role) => {
      // Mock topics
      return [
          "Week 1: Core Syntax & Variables",
          "Week 2: Control Structures & Loops",
          "Week 3: Functions & Modules",
          "Week 4: Mini Assessment"
      ].map(t => t.replace("Core Syntax", `Focus Area ${month}.1`)); 
  };
  
  const getProject = (month, role) => {
      return `Build a ${role.split(' ')[0]} Project Phase ${month}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.salaryGoal) {
        alert("Please enter expected salary"); // Basic validation
        return;
    }
    generateRoadmap(formData);
  };

  if (careerProfile) {
    return (
      <div className="page-container" style={{ padding: '2rem', height: '100vh', overflowY: 'auto' }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           style={{ maxWidth: '800px', margin: '0 auto' }}
        >
             <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Career Roadmap</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Target: <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{careerProfile.targetRole}</span> • 
                        Timeline: {careerProfile.timeline}
                    </p>
                </div>
                <button 
                    onClick={() => updateCareerProfile(null)}
                    className="glass-button"
                    style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                >
                    Reset Plan
                </button>
             </header>

             <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Target size={20} color="var(--accent-color)" />
                    Goal Overview
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                    <StatBox label="Expected Salary" value={careerProfile.salaryGoal} icon={<DollarSign size={16}/>} />
                    <StatBox label="Daily Study" value={careerProfile.dailyHours} icon={<Clock size={16}/>} />
                    <StatBox label="Current Level" value={careerProfile.currentLevel} icon={<BookOpen size={16}/>} />
                    <StatBox label="Language" value={careerProfile.preferredLanguage} icon={<CodeIcon size={16}/>} />
                </div>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {careerProfile.roadmap.map((step, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card"
                        style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-color)' }}
                    >
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{step.title}</h4>
                        <div style={{ marginLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '1rem' }}>
                            {step.topics.map((topic, i) => (
                                <div key={i} style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    • {topic}
                                </div>
                            ))}
                            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(130, 87, 229, 0.1)', borderRadius: '8px', fontSize: '0.9rem' }}>
                                <strong>🏆 Monthly Project:</strong> {step.project}
                            </div>
                        </div>
                    </motion.div>
                ))}
             </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card"
            style={{ maxWidth: '500px', width: '100%', padding: '2.5rem' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ 
                    width: 60, height: 60, background: 'var(--accent-color)', borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
                    boxShadow: '0 0 20px var(--accent-glow)'
                }}>
                    <Target size={30} color="white" />
                </div>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Career Planner</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Design your personalized path to success.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <FormSelect 
                    label="Target Profession" 
                    name="targetRole" 
                    value={formData.targetRole} 
                    onChange={handleChange}
                    options={["Full Stack Developer", "Frontend Engineer", "Backend Engineer", "Data Scientist", "DevOps Engineer", "Mobile Developer"]}
                />
                
                <FormInput 
                    label="Expected Salary (e.g. $80k, ₹12LPA)" 
                    name="salaryGoal" 
                    type="text"
                    value={formData.salaryGoal} 
                    onChange={handleChange}
                    placeholder="Enter amount..."
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FormSelect 
                        label="Timeline" 
                        name="timeline" 
                        value={formData.timeline} 
                        onChange={handleChange}
                        options={["3 Months", "6 Months", "12 Months"]}
                    />
                    <FormSelect 
                        label="Daily Study Hours" 
                        name="dailyHours" 
                        value={formData.dailyHours} 
                        onChange={handleChange}
                        options={["1 Hour", "2 Hours", "4 Hours", "6+ Hours"]}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FormSelect 
                        label="Current Level" 
                        name="currentLevel" 
                        value={formData.currentLevel} 
                        onChange={handleChange}
                        options={["Beginner", "Intermediate", "Advanced"]}
                    />
                    <FormSelect 
                        label="Preferred Language" 
                        name="preferredLanguage" 
                        value={formData.preferredLanguage} 
                        onChange={handleChange}
                        options={["JavaScript", "Python", "Java", "C++", "Go"]}
                    />
                </div>

                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="primary-button"
                    style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
                >
                    Generate Roadmap <ArrowRight size={18} />
                </motion.button>
            </form>
        </motion.div>
    </div>
  );
};

// Helper Components
const FormInput = ({ label, type = "text", ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</label>
        <input 
            type={type} 
            {...props} 
            style={{ 
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                padding: '10px 14px', borderRadius: '8px', color: 'white', outline: 'none'
            }}
        />
    </div>
);

const FormSelect = ({ label, options, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</label>
        <select 
            {...props} 
            style={{ 
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                padding: '10px 14px', borderRadius: '8px', color: 'white', outline: 'none', appearance: 'none'
            }}
        >
            {options.map(opt => <option key={opt} value={opt} style={{ background: '#1a1a1a' }}>{opt}</option>)}
        </select>
    </div>
);

const StatBox = ({ label, value, icon }) => (
    <div style={{ 
        background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', 
        display: 'flex', flexDirection: 'column', gap: '4px' 
    }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {icon} {label}
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 600 }}>{value}</div>
    </div>
);

const CodeIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

export default CareerPlanner;
