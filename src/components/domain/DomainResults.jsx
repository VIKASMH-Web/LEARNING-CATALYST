import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronRight, Zap, Trophy, Bell, ExternalLink, PlayCircle, Lock } from 'lucide-react';
import DomainCard from './DomainCard';

const DomainResults = ({ domainData, isPremium }) => {
  const [notified, setNotified] = useState(false);

  if (!domainData) return null;

  const { title, description, roadmap, resources, interviewPrep, skills, action } = domainData;
  
  // Free tier limits
  const visibleResources = isPremium ? resources : resources.slice(0, 2);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const handleCreateNotification = () => {
    if (!isPremium) {
      alert("Domain Updates are a Premium Feature. Upgrade to unlock.");
      return;
    }
    setNotified(true);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem 5rem 1.5rem' }}
    >
      {/* 📌 DOMAIN HEADER */}
      <motion.div variants={itemVariants} className="dr-header">
        <div>
          <h1 className="dr-title">
            {title}
          </h1>
          <p className="dr-subtitle">
            {description}
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
           {!notified ? (
            <button 
              onClick={handleCreateNotification}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
                borderRadius: '12px', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)', color: '#d1d5db',
                fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Bell size={16} />
              {isPremium ? 'Get Updates' : 'Enable Updates (Pro)'}
            </button>
           ) : (
             <button disabled style={{
               display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
               borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)',
               border: '1px solid rgba(16, 185, 129, 0.2)', color: '#34d399',
               fontSize: '0.875rem', fontWeight: 500, cursor: 'default'
             }}>
               <ShieldCheck size={16} />
               Updates Enabled
             </button>
           )}
           
          <button style={{
             display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem',
             borderRadius: '12px', background: '#2563eb',
             border: 'none', color: 'white', fontWeight: 600,
             boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
             transition: 'transform 0.2s', cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <PlayCircle size={20} />
            Start Roadmap
          </button>
        </div>
      </motion.div>

      <div className="dr-grid">
        
        {/* LEFT COLUMN: Skills & Progress */}
        <div style={{ gridColumn: 'span 1' }}>
           {/* Skill Readiness Card */}
          <motion.div variants={itemVariants} className="dr-skill-card">
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
               <Zap size={20} color="#facc15" />
               <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white' }}>Skill Intelligence</h3>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
               {Object.entries(skills).map(([skill, level]) => (
                 <div key={skill}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', fontSize: '0.875rem' }}>
                     <span style={{ color: '#9ca3af', fontWeight: 500 }}>{skill}</span>
                     <span style={{ fontWeight: 700, color: level >= 70 ? '#4ade80' : level >= 40 ? '#facc15' : '#f87171' }}>
                       {level}%
                     </span>
                   </div>
                   <div style={{ height: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${level}%` }}
                       transition={{ duration: 1, ease: "easeOut" }}
                       style={{ 
                         height: '100%', borderRadius: '99px',
                         background: level >= 70 ? 'linear-gradient(to right, #22c55e, #34d399)' : 
                                     level >= 40 ? 'linear-gradient(to right, #eab308, #fb923c)' : 
                                     'linear-gradient(to right, #ef4444, #ec4899)'
                       }}
                     />
                   </div>
                 </div>
               ))}
             </div>

             {!isPremium && (
               <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                 <p style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', marginBottom: '0.5rem' }}>
                   Unlock AI-Powered Predictions & Custom Action Plans
                 </p>
                 <button style={{ width: '100%', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#facc15', background: 'rgba(250, 204, 21, 0.1)', border: '1px solid rgba(250, 204, 21, 0.2)', borderRadius: '8px', cursor: 'pointer' }}>
                   Unlock Full Intelligence
                 </button>
               </div>
             )}

             {isPremium && (
               <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ 
                    display: 'flex', alignItems: 'flex-start', gap: '0.75rem', 
                    background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', 
                    borderRadius: '12px', padding: '1rem' 
                  }}>
                    <ShieldCheck size={20} color="#f87171" style={{ marginTop: '2px' }} />
                    <div>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fca5a5', marginBottom: '0.25rem' }}>Recommended Action</h4>
                      <p style={{ fontSize: '0.75rem', color: 'rgba(254, 202, 202, 0.8)', lineHeight: 1.5 }}>
                        {action}
                      </p>
                    </div>
                  </div>
               </div>
             )}
          </motion.div>

          {/* Interview Prep List */}
          <motion.div variants={itemVariants} className="dr-skill-card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Interview Focus
              {!isPremium && <Lock size={16} color="#9ca3af" />}
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0, listStyle: 'none', filter: isPremium ? 'none' : 'blur(4px)', pointerEvents: isPremium ? 'auto' : 'none', opacity: isPremium ? 1 : 0.5 }}>
              {interviewPrep.map((topic, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: '#9ca3af', padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7' }}></div>
                  {topic}
                </li>
              ))}
            </ul>
             {!isPremium && <div style={{ textAlign: 'center', marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
                <span style={{ fontSize: '0.8rem', color: '#c084fc', background: '#121214', padding: '0.25rem 0.75rem', borderRadius: '99px', border: '1px solid rgba(192, 132, 252, 0.3)' }}>Premium Content</span>
             </div>}
             <button style={{ 
               width: '100%', marginTop: '1.5rem', padding: '0.75rem', 
               fontSize: '0.875rem', fontWeight: 500, color: '#c084fc', 
               background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)', 
               borderRadius: '12px', cursor: 'pointer', transition: 'background 0.2s'
             }} onClick={() => !isPremium && alert("Upgrade to unlock!")}>
               {isPremium ? 'Download Interview Pack' : 'Unlock Interview Pack'}
             </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Roadmap & Resources */}
        <div style={{ gridColumn: 'span 1' }}>
          
          {/* Roadmap Horizontal Scroll */}
          <motion.div variants={itemVariants}>
             <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} color="#4ade80" />
              Strategic Roadmap
             </h3>
             <div className="dr-roadmap-container">
               {roadmap.map((step, i) => (
                 <div key={i} className="dr-roadmap-step">
                   <div className="dr-step-number">
                     {i + 1}
                   </div>
                   <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#e5e7eb' }}>{step}</span>
                   
                   {i < roadmap.length - 1 && (
                     <div style={{ position: 'absolute', top: '50%', right: '-0.75rem', width: '1rem', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                   )}
                 </div>
               ))}
                <div className="dr-roadmap-step" style={{ borderStyle: 'dashed', cursor: 'pointer', opacity: 0.7 }}>
                   <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#9ca3af' }}>View Full Path</span>
                </div>
             </div>
          </motion.div>

          {/* Resources Grid */}
          <motion.div variants={itemVariants}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white' }}>Curated Resources</h3>
               <div style={{ display: 'flex', gap: '0.5rem' }}>
                 {['All', 'Docs', 'Videos', 'Practice'].map((filter) => (
                   <button 
                     key={filter}
                     style={{ 
                       padding: '0.375rem 0.75rem', fontSize: '0.75rem', fontWeight: 500, 
                       borderRadius: '8px', background: 'rgba(255,255,255,0.05)', 
                       color: '#9ca3af', border: 'none', cursor: 'pointer' 
                     }}
                   >
                     {filter}
                   </button>
                 ))}
               </div>
            </div>

            <div className="dr-resources-grid">
              {visibleResources.map((res, i) => (
                <DomainCard key={i} resource={res} index={i} />
              ))}
               {!isPremium && (
                 <div style={{ 
                   border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px', 
                   display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                   cursor: 'pointer', padding: '1.25rem', color: '#6b7280', minHeight: '160px'
                 }} onClick={() => alert("Upgrade to unlock more resources!")}>
                   <Lock size={24} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                   <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Unlock {resources.length - 2} More</span>
                 </div>
               )}
            </div>
             
             <button style={{ 
               width: '100%', marginTop: '2rem', padding: '1rem', textAlign: 'center', 
               fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', 
               background: 'transparent', border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', 
               cursor: 'pointer' 
             }}>
               {isPremium ? 'Show more resources...' : 'Upgrade to see all resources'}
             </button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default DomainResults;
