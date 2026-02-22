import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Award, CheckCircle, Flame, Star, Zap, ChevronRight, User, Github, FileText, Bookmark, BookmarkCheck, LayoutDashboard } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import PremiumModal from '../components/Shared/PremiumModal';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// --- MOCK DATA FOR RECRUITER VIEW ---
const MOCK_TALENT_POOL = [
  { id: 'usr_1', name: 'Alex Johnson', role: 'Frontend Developer', level: 12, xp: 6200, lvs: 92, interviewScore: 88, streak: 45, badges: ['React Master', 'UI/UX Pro'], skills: [{skill: 'React', val: 95}, {skill: 'CSS', val: 85}, {skill: 'Node', val: 65}, {skill: 'Typescript', val: 80}, {skill: 'Testing', val: 70}], location: 'Remote', verified: true, available: true },
  { id: 'usr_2', name: 'Sarika Patel', role: 'Backend Developer', level: 15, xp: 7800, lvs: 95, interviewScore: 94, streak: 60, badges: ['System Architect', 'DB Guru'], skills: [{skill: 'Node', val: 98}, {skill: 'SQL', val: 90}, {skill: 'AWS', val: 85}, {skill: 'Docker', val: 80}, {skill: 'Security', val: 75}], location: 'London, UK', verified: true, available: true },
  { id: 'usr_3', name: 'David Chen', role: 'Data Scientist', level: 8, xp: 4100, lvs: 78, interviewScore: 75, streak: 12, badges: ['Python Elite'], skills: [{skill: 'Python', val: 90}, {skill: 'Pandas', val: 85}, {skill: 'ML', val: 75}, {skill: 'SQL', val: 60}, {skill: 'Stats', val: 80}], location: 'San Francisco, CA', verified: false, available: false },
  { id: 'usr_4', name: 'Emma Watson', role: 'Frontend Developer', level: 5, xp: 2500, lvs: 65, interviewScore: 60, streak: 5, badges: [], skills: [{skill: 'React', val: 70}, {skill: 'CSS', val: 60}, {skill: 'Node', val: 40}, {skill: 'Typescript', val: 50}, {skill: 'Testing', val: 30}], location: 'Remote', verified: false, available: true },
  { id: 'usr_5', name: 'Michael Ross', role: 'Full Stack Engineer', level: 20, xp: 10500, lvs: 98, interviewScore: 96, streak: 120, badges: ['God Tier', 'Mentor'], skills: [{skill: 'React', val: 100}, {skill: 'Node', val: 95}, {skill: 'Systems', val: 90}, {skill: 'Cloud', val: 85}, {skill: 'Agile', val: 90}], location: 'New York, NY', verified: true, available: true },
];

const CAREER_DOMAINS = ['All', 'Frontend Developer', 'Backend Developer', 'Data Scientist', 'Full Stack Engineer'];

export default function CareerMarketplace() {
  const { user } = useAuth();
  const { userRole, isPremium, level, xp, streak, lvsScore, shortlist, setShortlist } = useGame();
  
  const [activeTab, setActiveTab] = useState('search'); // search, shortlist
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [mockAvailable, setMockAvailable] = useState(true);

  // Computed Values for Student Profile
  const isVerified = level > 5 && streak > 14; 
  const studentRadarData = [
    { skill: 'Programming', val: 85 },
    { skill: 'Communication', val: 75 },
    { skill: 'Problem Solving', val: 90 },
    { skill: 'System Design', val: 60 },
    { skill: 'Agile/Team', val: 80 },
  ];

  // Filters for Recruiter
  const filteredTalent = useMemo(() => {
    return MOCK_TALENT_POOL.filter(t => {
      const matchQuery = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDomain = selectedDomain === 'All' || t.role === selectedDomain;
      return matchQuery && matchDomain;
    }).sort((a,b) => b.lvs - a.lvs); // Default sort by LVS
  }, [searchQuery, selectedDomain]);

  const shortlistedTalent = useMemo(() => {
    return MOCK_TALENT_POOL.filter(t => shortlist.includes(t.id));
  }, [shortlist]);

  const handleShortlistToggle = (id) => {
    setShortlist(prev => {
      if(prev.includes(id)) return prev.filter(i => i !== id);
      return [...prev, id];
    });
  };

  // --- RENDERING STUDENT MODE ---
  if (userRole === 'student') {
    return (
      <div style={{ padding: '0 1rem 4rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
          <div>
             <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'white', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
               Career Profile
               {isVerified && (
                 <div style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', padding: '4px 10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={14} /> AI Verified
                 </div>
               )}
             </h1>
             <p style={{ color: 'var(--text-tertiary)', fontSize: '0.95rem' }}>This is how companies see your verified skills and learning velocity.</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: mockAvailable ? '#50fa7b' : '#a1a1aa' }}>
              {mockAvailable ? 'Open to Opportunities' : 'Not Looking'}
            </span>
            <div 
              onClick={() => setMockAvailable(!mockAvailable)}
              style={{
                width: 44, height: 24, borderRadius: 12, background: mockAvailable ? '#10b981' : 'rgba(255,255,255,0.1)',
                position: 'relative', cursor: 'pointer', transition: 'all 0.3s'
              }}
            >
              <div style={{
                width: 20, height: 20, background: 'white', borderRadius: '50%', position: 'absolute',
                top: 2, left: mockAvailable ? 22 : 2, transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '1.5rem' }}>
          {/* Main Content Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', display: 'flex', gap: '2rem' }}>
                <div style={{ width: 100, height: 100, borderRadius: '20px', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 800 }}>
                    {user?.name?.charAt(0) || 'L'}
                </div>
                <div style={{ flex: 1 }}>
                   <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', margin: '0 0 0.25rem 0' }}>{user?.name || 'Learner'}</h2>
                   <div style={{ color: '#a78bfa', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem' }}>Full Stack Engineer Pathway</div>
                   
                   <div style={{ display: 'flex', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                         <span style={{ fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase', fontWeight: 700 }}>Level</span>
                         <span style={{ fontSize: '1.2rem', color: 'white', fontWeight: 800 }}>{level}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                         <span style={{ fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase', fontWeight: 700 }}>Streak</span>
                         <span style={{ fontSize: '1.2rem', color: '#ef4444', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}><Flame size={16}/> {streak}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                         <span style={{ fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase', fontWeight: 700 }}>LVS Score</span>
                         <span style={{ fontSize: '1.2rem', color: '#50fa7b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}><Zap size={16}/> {lvsScore}</span>
                      </div>
                   </div>
                </div>
            </div>

            <div style={{ padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>
               <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', margin: '0 0 1.5rem 0' }}>AI Resume Summary</h3>
               <div style={{ padding: '1.5rem', background: 'rgba(124,58,237,0.05)', borderRadius: '12px', border: '1px solid rgba(124,58,237,0.1)' }}>
                   <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: '#e2e8f0' }}>
                       "{user?.name || 'This learner'} demonstrates highly consistent engagement with an LVS of {lvsScore}, placing them in the top tier of their cohort. They have consistently mastered complex technical domains while maintaining a {streak}-day momentum streak. Strong analytical skills combined with clear communication markers from recent AI mock interviews indicate readiness for mid-level collaborative engineering roles."
                   </p>
               </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem' }}>
                <button onClick={() => { if(!isPremium) setShowPremiumModal(true); }} style={{ flex: 1, padding: '1.2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', color: '#a1a1aa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.2s' }}>
                   <Github size={20} /> Connect GitHub
                   {!isPremium && <Lock size={14} style={{marginLeft: 'auto'}}/>}
                </button>
                <button onClick={() => { if(!isPremium) setShowPremiumModal(true); }} style={{ flex: 1, padding: '1.2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', color: '#a1a1aa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.2s' }}>
                   <FileText size={20} /> Upload Resume
                   {!isPremium && <Lock size={14} style={{marginLeft: 'auto'}}/>}
                </button>
            </div>

          </div>

          {/* Right Sidebar - Analytics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', margin: '0 0 1rem 0' }}>AI Skill Radar</h3>
                  <div style={{ width: '100%', height: 220, background: '#09090b', borderRadius: '12px' }}>
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={studentRadarData}>
                           <PolarGrid stroke="rgba(255,255,255,0.1)" />
                           <PolarAngleAxis dataKey="skill" tick={{ fill: '#71717a', fontSize: 10 }} />
                           <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                           <Radar name="Skills" dataKey="val" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.4} />
                        </RadarChart>
                     </ResponsiveContainer>
                  </div>
              </div>

              {!isPremium && (
                 <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(217,119,6,0.02))', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '20px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fbbf24', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={16} fill="#fbbf24"/> Premium Boost</h3>
                    <p style={{ fontSize: '0.85rem', color: '#e2e8f0', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                        Get 3x more visibility in Recruiter Search results and unlock the advanced AI cover letter generator.
                    </p>
                    <button onClick={() => setShowPremiumModal(true)} style={{ width: '100%', padding: '0.75rem', background: '#fbbf24', color: '#78350f', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Upgrade Profile</button>
                 </div>
              )}
          </div>
        </div>
        
        <PremiumModal 
            isOpen={showPremiumModal} 
            onClose={() => setShowPremiumModal(false)}
            featureName="Premium Talent Profile"
        />
      </div>
    );
  }

  // --- RENDERING RECRUITER MODE ---
  return (
    <div style={{ padding: '0 1rem 4rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
                 <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users size={28} color="#10b981" /> Talent Search
                 </h1>
                 <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', margin: 0 }}>Find pre-verified talent ranked by actual learning velocity.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <button 
                   onClick={() => setActiveTab('search')}
                   style={{ padding: '8px 16px', background: activeTab === 'search' ? '#1f2937' : 'transparent', color: activeTab === 'search' ? 'white' : '#9ca3af', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                    <Search size={14}/> Discover
                </button>
                <button 
                   onClick={() => setActiveTab('shortlist')}
                   style={{ padding: '8px 16px', background: activeTab === 'shortlist' ? '#1f2937' : 'transparent', color: activeTab === 'shortlist' ? 'white' : '#9ca3af', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                    <Bookmark size={14}/> Shortlist ({shortlist.length})
                </button>
            </div>
        </div>

        {activeTab === 'search' && (
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} color="#6b7280" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '16px' }} />
                    <input 
                        type="text" 
                        placeholder="Search by name, role, or skill..." 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', color: 'white', outline: 'none', fontSize: '0.95rem' }}
                    />
                </div>
                <select 
                    value={selectedDomain}
                    onChange={e => setSelectedDomain(e.target.value)}
                    style={{ padding: '1rem 1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', color: 'white', outline: 'none', fontSize: '0.95rem', cursor: 'pointer' }}
                >
                    {CAREER_DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {!isPremium && (
                    <button onClick={() => setShowPremiumModal(true)} style={{ padding: '0 1.5rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Star size={16} fill="white" /> Pro Filters
                    </button>
                )}
            </div>
        )}

        <div style={{ display: 'grid', gap: '1.25rem' }}>
            {((activeTab === 'search' ? filteredTalent : shortlistedTalent).length === 0) ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: '#71717a' }}>
                    <LayoutDashboard size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                    <p>No candidates found matching your criteria.</p>
                </div>
            ) : (
                (activeTab === 'search' ? filteredTalent : shortlistedTalent).map(talent => {
                    const isShortlisted = shortlist.includes(talent.id);
                    
                    // Simple Match Score Logic (Demo)
                    const matchScore = selectedDomain === 'All' ? null : 
                        Math.min(99, Math.round((talent.lvs * 0.4) + (talent.interviewScore * 0.4) + (talent.role === selectedDomain ? 20 : 0)));

                    return (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={talent.id} 
                            style={{ 
                                background: 'var(--bg-card)', border: '1px solid var(--border-color)', 
                                borderRadius: '20px', padding: '1.5rem', display: 'flex', gap: '2rem',
                                opacity: talent.available ? 1 : 0.6, position: 'relative', overflow: 'hidden'
                            }}
                        >
                            {!talent.available && (
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ background: 'rgba(0,0,0,0.8)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, color: '#aaa' }}>NOT SEEKING OPPORTUNITIES</div>
                                </div>
                            )}
                            
                            <div style={{ width: 80, height: 80, borderRadius: '16px', background: '#1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '2rem', fontWeight: 800, flexShrink: 0 }}>
                                {talent.name.charAt(0)}
                            </div>
                            
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {talent.name}
                                            {talent.verified && <CheckCircle size={16} color="#10b981" />}
                                        </h3>
                                        <div style={{ fontSize: '0.9rem', color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span>{talent.role}</span>
                                            <span>•</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12}/> {talent.location}</span>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        {matchScore && (
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <span style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 700 }}>Match Score</span>
                                                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: matchScore > 85 ? '#10b981' : matchScore > 70 ? '#fbbf24' : '#ef4444' }}>{matchScore}%</span>
                                            </div>
                                        )}
                                        <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }}/>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                            <span style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 700 }}>LVS</span>
                                            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{talent.lvs}</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {talent.skills.slice(0,3).map(s => (
                                            <div key={s.skill} style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                {s.skill} <span style={{ opacity: 0.5, marginLeft: '4px' }}>{s.val}%</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 11 }}>
                                        <button 
                                            onClick={() => handleShortlistToggle(talent.id)}
                                            style={{ 
                                                width: 40, height: 40, borderRadius: '10px', 
                                                background: isShortlisted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)', 
                                                border: isShortlisted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                                                color: isShortlisted ? '#10b981' : '#a1a1aa',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s'
                                            }}
                                        >
                                            {isShortlisted ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                                        </button>
                                        <button style={{ padding: '0 1.25rem', height: 40, background: 'white', color: 'black', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })
            )}
        </div>
        
        <PremiumModal 
            isOpen={showPremiumModal} 
            onClose={() => setShowPremiumModal(false)}
            featureName="Recruiter Pro Suite"
        />
    </div>
  );
}
