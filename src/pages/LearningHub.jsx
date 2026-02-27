import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, BookOpen, ExternalLink, ChevronRight, Sparkles, 
  CheckCircle, Globe, X, GraduationCap, Target, 
  MessageSquare, Lightbulb, Brain, Zap, ArrowRight,
  TrendingUp, BarChart2, Book, Code, ShieldCheck, Cpu
} from 'lucide-react';
import { useTranslation } from '../utils/i18n';

const LearningHub = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock Intelligence Database
  const learningDB = {
    'python': {
      name: 'Python',
      type: 'language',
      category: 'Technical',
      difficulty: 'Beginner',
      explanation: 'Python is a high-level, interpreted language known for its readability and versatility. It is a cornerstone for modern data science and automation.',
      overview: 'Interpreted, high-level, general-purpose programming language.',
      coreConcepts: ['Variables & Types', 'Control Flow', 'Object-Oriented Programming (OOP)', 'Standard Libraries'],
      useCases: ['Web Development (Django/Flask)', 'AI & Machine Learning', 'Automation', 'Data Analysis'],
      careerPaths: ['Data Scientist', 'Backend Engineer', 'AI Researcher'],
      relatedRoadmaps: ['AI Engineer', 'Python Developer', 'Data Science'],
      relatedTopics: ['NumPy', 'Pandas', 'Asynchronous Programming'],
      suggestedRoadmap: 'AI Engineer',
      suggestedNext: 'Data Manipulation with Pandas'
    },
    'javascript': {
        name: 'JavaScript',
        type: 'language',
        category: 'Technical',
        difficulty: 'Beginner to Advanced',
        explanation: 'JavaScript is the engine of the modern web, enabling interactive user interfaces and high-performance server-side applications.',
        overview: 'A high-level, just-in-time compiled language that conforms to the ECMAScript specification.',
        coreConcepts: ['DOM Manipulation', 'Asynchronous JS (Promises & Async/Await)', 'ES6+ Syntax', 'Functional Programming'],
        useCases: ['Frontend Development', 'Server-side with Node.js', 'Mobile Development (React Native)'],
        careerPaths: ['Frontend Developer', 'Full Stack Engineer', 'Mobile App Developer'],
        relatedRoadmaps: ['Full Stack Developer', 'Frontend Specialist'],
        relatedTopics: ['React', 'TypeScript', 'Node.js'],
        suggestedRoadmap: 'Full Stack Developer',
        suggestedNext: 'React Core Architecture'
    },
    'jwt authentication': {
      name: 'JWT Authentication',
      type: 'concept',
      category: 'Technical',
      difficulty: 'Intermediate',
      explanation: 'JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.',
      relatedRoadmap: 'Full Stack Developer',
      stage: 'Backend API Security',
      overview: 'A standard for representing claims to be transferred between two parties.',
      suggestedNext: 'OAuth 2.0 & OpenID Connect',
      nextTopics: ['OAuth', 'Session Management', 'Hacking JWTs (Prevention)'],
      suggestedRoadmap: 'Cybersecurity Engineer'
    },
    'star method': {
      name: 'STAR Method',
      type: 'non-technical',
      category: 'Professional Skills',
      difficulty: 'Beginner',
      explanation: 'The STAR method (Situation, Task, Action, Result) is a structured manner of responding to behavioral-based interview questions.',
      stucture: {
        'Situation': 'Set the scene and give the necessary details of your example.',
        'Task': 'Describe what your responsibility was in that situation.',
        'Action': 'Explain exactly what steps you took to address it.',
        'Result': 'Share what outcomes your actions achieved.'
      },
      practicalTips: [
        'Prepare 5-7 stories that can apply to multiple questions.',
        'Be specific but concise.',
        'Focus on YOUR actions, not just the team.',
        'Emphasize measurable results where possible.'
      ],
      whereItApplies: 'Behavioral Interviews, Performance Reviews',
      actions: ['Practice out loud', 'Map stories to common themes (Leadership, Failure, Conflict)'],
      relatedTopics: ['Active Listening', 'Body Language', 'Value Quantification'],
      suggestedRoadmap: 'Career Growth Path'
    },
    'full stack': {
        name: 'Full Stack Developer',
        type: 'domain',
        category: 'Career Path',
        difficulty: 'Advanced (Comprehensive)',
        explanation: 'A Full Stack Developer handles both the client-facing frontend and the server-side backend logic of an application.',
        roadmapName: 'Full Stack Engineering 2026',
        stageName: 'Foundations of the Web',
        stageDescription: 'Understanding HTTP, DNS, and how browsers interpret HTML/CSS/JS.',
        suggestedNext: 'Database Schema Design',
        relatedTopics: ['System Design', 'Deployment Strategies', 'API Optimization'],
        suggestedRoadmap: 'Cloud Architect'
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    
    // Simulate thinking
    setTimeout(() => {
      const q = searchQuery.toLowerCase();
      // Simple fuzzy match strategy
      const match = Object.keys(learningDB).find(key => q.includes(key) || key.includes(q));
      
      if (match) {
        setSearchResult(learningDB[match]);
      } else {
        setSearchResult({
          name: searchQuery,
          type: 'unknown',
          explanation: "We couldn't find an exact match in our high-fidelity database, but our AI engine suggests exploring related roadmap clusters.",
          relatedTopics: ['System Design Basics', 'Algorithmic Thinking', 'Modern Web Standards'],
          suggestedRoadmap: 'General Engineering Path'
        });
      }
      setIsSearching(false);
    }, 800);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      {/* 1. Search Header */}
      <section style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: '30px', background: 'rgba(99, 102, 241, 0.08)', color: 'var(--accent-color)', marginBottom: '2.5rem', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}
        >
          <Brain size={16} /> Intelligent Learning Engine
        </motion.div>
        
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.05em', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Search any <span style={{ color: 'var(--accent-color)' }}>concept or career.</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3.5rem', fontWeight: 500, lineHeight: 1.6, maxWidth: 650, margin: '0 auto 3.5rem' }}>
          Get structured, industry-aligned insights directly connected to your growth path.
        </p>

        <div style={{ 
          background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '32px', padding: '12px',
          display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 12px 48px rgba(0,0,0,0.05)',
          maxWidth: 700, margin: '0 auto'
        }}>
          <div style={{ paddingLeft: '1.5rem', color: 'var(--text-tertiary)' }}><Search size={22} /></div>
          <input 
            type="text" 
            placeholder="Search Python, Full Stack, JWT, or STAR method..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '1.25rem', fontWeight: 500, outline: 'none', color: 'var(--text-primary)' }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            style={{ background: 'var(--text-primary)', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '22px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 10 }}
          >
            {isSearching ? <Zap size={18} className="spin" /> : <Sparkles size={18} />}
            {isSearching ? 'Processing...' : 'Search Engine'}
          </button>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {searchResult && (
          <motion.div 
            key={searchResult.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '2.5rem', marginBottom: '5rem' }}
          >
            {/* Left Column: Result Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3rem', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                  <div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.04em' }}>{searchResult.name}</h2>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '1rem' }}>
                      <span style={{ padding: '4px 12px', background: 'rgba(99,102,241,0.08)', color: 'var(--accent-color)', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>{searchResult.category || searchResult.type}</span>
                      <span style={{ padding: '4px 12px', background: 'var(--bg-primary)', color: 'var(--text-tertiary)', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', border: '1px solid var(--border-color)' }}>{searchResult.difficulty}</span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--text-secondary)', fontWeight: 500, margin: 0 }}>
                  {searchResult.explanation}
                </p>

                {/* Specific Language Path */}
                {searchResult.type === 'language' && (
                  <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Code size={18} color="var(--accent-color)" /> Core Concepts
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {searchResult.coreConcepts.map((c, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1rem', color: 'var(--text-secondary)' }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--border-color)' }} /> {c}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Target size={18} color="var(--accent-color)" /> Use Cases
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {searchResult.useCases.map((u, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1rem', color: 'var(--text-secondary)' }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--border-color)' }} /> {u}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Non-Technical Content */}
                {searchResult.type === 'non-technical' && (
                  <div style={{ marginTop: '3rem' }}>
                     <h4 style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>STAR Structure Analysis</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                        {Object.entries(searchResult.stucture).map(([k, v]) => (
                          <div key={k} style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontWeight: 900, color: 'var(--accent-color)', marginBottom: '0.5rem' }}>{k}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{v}</div>
                          </div>
                        ))}
                     </div>
                  </div>
                )}
              </div>

              {/* Related roadmap link if exists */}
              {(searchResult.roadmapName || searchResult.relatedRoadmap) && (
                <div style={{ background: 'var(--text-primary)', borderRadius: '32px', padding: '2.5rem', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>Integrated Roadmap Context</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{searchResult.roadmapName || searchResult.relatedRoadmap}</h3>
                    {searchResult.stageName && <p style={{ margin: '0.5rem 0 0', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Currently at: <span style={{ color: '#white', fontWeight: 800 }}>{searchResult.stageName}</span></p>}
                  </div>
                  <Link to="/roadmap" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '16px', textDecoration: 'none', fontWeight: 800, border: '1px solid rgba(255,255,255,0.2)' }}>View Roadmap</Link>
                </div>
              )}
            </div>

            {/* Right Column: Recommendations & Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '1px' }}>Intelligence Recommendations</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Related Roadmaps */}
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>Recommended Roadmap</label>
                    <div style={{ padding: '1.25rem', background: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Compass size={20} color="var(--accent-color)" />
                      <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{searchResult.suggestedRoadmap || 'Elite Engineering 2026'}</span>
                    </div>
                  </div>

                  {/* Next Suggested Phase */}
                  {searchResult.suggestedNext && (
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>Next Progression Stage</label>
                      <div style={{ padding: '1.25rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Zap size={20} color="#10b981" />
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#065f46' }}>{searchResult.suggestedNext}</span>
                      </div>
                    </div>
                  )}

                  {/* Related Topics (The 3 topics rule) */}
                  {(searchResult.relatedTopics || searchResult.nextTopics) && (
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>Related Knowledge Clusters</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(searchResult.relatedTopics || searchResult.nextTopics || []).slice(0, 3).map((topic, i) => (
                          <div 
                            key={i} 
                            onClick={() => { setSearchQuery(topic); handleSearch(); }}
                            style={{ 
                              padding: '12px 18px', background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '14px', 
                              cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              fontSize: '0.9rem', fontWeight: 700, transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.background = 'var(--bg-primary)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = '#FFFFFF'; }}
                          >
                            {topic}
                            <ArrowRight size={14} color="var(--text-tertiary)" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action for Non-Tech */}
              {searchResult.type === 'non-technical' && searchResult.actions && (
                <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Lightbulb size={20} color="#f59e0b" /> Skill Improvement Plan
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {searchResult.actions.map((act, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        <CheckCircle size={16} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} /> {act}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .spin { animation: rotate 1s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// Simplified Placeholder Items to mirror Sidebar imports
const Compass = ({ size, color }) => <div style={{ width: size, height: size, border: '2px solid ' + color, borderRadius: '50%' }} />;

export default LearningHub;
