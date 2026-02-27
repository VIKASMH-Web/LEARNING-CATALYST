import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sparkles, Brain, Zap, ArrowRight,
  Code, Target, Lightbulb, CheckCircle, Cpu, X, Compass, ChevronRight
} from 'lucide-react';
import { useTranslation } from '../utils/i18n';
import { Link } from 'react-router-dom';

const POPULAR_PATHS = [
  'Python', 'JavaScript', 'React', 'Data Science', 'DevOps', 'Digital Marketing',
  'UI/UX Design', 'Product Manager', 'Backend Developer', 'Frontend Developer',
  'Full Stack', 'Cloud Engineer'
];

const LearningHub = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock Intelligence Database (Simplified for demo)
  const learningDB = {
    'python': {
      name: 'Python',
      type: 'language',
      difficulty: 'Beginner',
      explanation: 'Python is a high-level, interpreted language known for its readability and versatility. It is a cornerstone for modern data science, automation, and AI development.',
      coreConcepts: ['Variables & Types', 'Control Flow', 'Object-Oriented Programming (OOP)', 'Libraries'],
      useCases: ['Web Development', 'AI & Machine Learning', 'Automation', 'Data Analysis'],
      suggestedRoadmap: 'AI Engineer'
    },
    'javascript': {
        name: 'JavaScript',
        type: 'language',
        difficulty: 'Beginner to Advanced',
        explanation: 'JavaScript is the engine of the web, enabling interactive user interfaces and high-performance server-side applications via Node.js.',
        coreConcepts: ['DOM Manipulation', 'Async/Await', 'ES6 Syntax', 'Functional Programming'],
        useCases: ['Frontend Development', 'Server-side with Node', 'Mobile Apps'],
        suggestedRoadmap: 'Full Stack Developer'
    },
    'full stack': {
        name: 'Full Stack Developer',
        type: 'domain',
        difficulty: 'Advanced',
        explanation: 'A Full Stack Developer handles both the client-facing frontend and the server-side backend logic, providing end-to-end solutions.',
        roadmapName: 'Full Stack Engineering 2026',
        suggestedNext: 'Database Schema Design',
        suggestedRoadmap: 'Cloud Architect'
    }
  };

  const handleSearch = (queryOverride) => {
    const query = queryOverride || searchQuery;
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchResult(null);
    
    setTimeout(() => {
      const q = query.toLowerCase();
      const match = Object.keys(learningDB).find(key => q.includes(key) || key.includes(q));
      
      if (match) {
        setSearchResult(learningDB[match]);
      } else {
        setSearchResult({
          name: query,
          type: 'unknown',
          explanation: "We couldn't find an exact match in our primary database, but our AI engine suggests exploring related roadmap clusters for " + query + ".",
          suggestedRoadmap: 'General Engineering Path'
        });
      }
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0b', 
      color: '#FFFFFF',
      padding: '4rem 1.5rem',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        {/* LANDING STATE */}
        {!searchResult && !isSearching && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', paddingTop: '4rem' }}
          >
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '100px', border: '1px solid rgba(99, 102, 241, 0.2)', marginBottom: '3rem' }}>
              <Sparkles size={16} color="#818cf8" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.02em' }}>AI-Powered Learning Engine</span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
              What do you want to learn?
            </h1>
            
            {/* Subtitle */}
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.4)', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem', fontWeight: 500, lineHeight: 1.6 }}>
              Search any skill, role, or technology — get an instant roadmap <br /> with resources
            </p>

            {/* Search Bar */}
            <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto 4rem' }}>
              <div style={{ 
                background: '#121214', 
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 0 40px rgba(99, 102, 241, 0.05)',
                transition: 'all 0.3s'
              }}>
                <div style={{ paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.3)' }}>
                  <Search size={22} />
                </div>
                <input 
                  type="text"
                  placeholder="Search: Python, Digital Marketing, UI Design, Backend Developer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  style={{ 
                    background: 'transparent',
                    border: 'none',
                    color: '#FFFFFF',
                    flex: 1,
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    outline: 'none',
                    padding: '12px 0'
                  }}
                />
                <button 
                  onClick={() => handleSearch()}
                  style={{ 
                    background: '#6366f1',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '12px 32px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                  }}>
                  Search
                </button>
              </div>
            </div>

            {/* Popular Paths */}
            <div style={{ marginTop: '5rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '2rem' }}>Or explore popular paths</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', maxWidth: '900px', margin: '0 auto' }}>
                {POPULAR_PATHS.map(path => (
                  <button 
                    key={path}
                    onClick={() => { setSearchQuery(path); handleSearch(path); }}
                    style={{ 
                      background: '#121214',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '100px',
                      padding: '12px 24px',
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                    {path}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* LOADING STATE */}
        {isSearching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '10rem 0' }}
          >
            <Zap size={48} color="#818cf8" style={{ animation: 'pulse 1.5s infinite' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2rem' }}>Synthesizing Intelligence...</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>Structuring your industry-aligned roadmap for {searchQuery}</p>
          </motion.div>
        )}

        {/* RESULT STATE */}
        {searchResult && !isSearching && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ paddingTop: '2rem' }}
          >
            <button 
              onClick={() => { setSearchResult(null); setSearchQuery(''); }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '3rem', fontSize: '0.9rem', fontWeight: 700 }}>
              <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to Search
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem' }}>
              {/* Main Analysis */}
              <div>
                <div style={{ background: '#121214', borderRadius: '32px', padding: '3.5rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                    <div>
                      <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: 0, letterSpacing: '-0.04em' }}>{searchResult.name}</h2>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '1.25rem' }}>
                        <span style={{ padding: '6px 14px', background: 'rgba(99,102,241,0.1)', color: '#818cf8', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800 }}>{searchResult.type?.toUpperCase()}</span>
                        <span style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.4)', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800, border: '1px solid rgba(255,255,255,0.05)' }}>{searchResult.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                    {searchResult.explanation}
                  </p>

                  {searchResult.coreConcepts && (
                    <div style={{ marginTop: '3.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Code size={18} color="#818cf8" /> Core Pillars
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {searchResult.coreConcepts.map((c, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)' }}>
                              <CheckCircle size={14} color="#10b981" /> {c}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Target size={18} color="#818cf8" /> Market Use Cases
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {searchResult.useCases.map((u, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)' }}>
                              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} /> {u}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Suggestions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ background: '#121214', borderRadius: '32px', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>Roadmap Integration</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>Recommended Path</label>
                      <div style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <Compass size={24} color="#818cf8" />
                        <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{searchResult.suggestedRoadmap}</span>
                      </div>
                    </div>

                    <Link to="/curriculum" style={{ background: '#FFFFFF', color: '#000000', borderRadius: '16px', padding: '18px', textAlign: 'center', textDecoration: 'none', fontWeight: 900, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 10px 30px rgba(255,255,255,0.1)' }}>
                      Start Learning Now <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #1e1e2d 0%, #12121e 100%)', padding: '2.5rem', borderRadius: '32px', border: '1px solid rgba(129, 140, 248, 0.1)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <Lightbulb size={24} color="#818cf8" />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem' }}>Expert Strategy</h4>
                  <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    To master {searchResult.name}, we recommend 12-15 hours of focused study per week with active project work.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 0px rgba(129, 140, 248, 0)); }
          50% { transform: scale(1.1); opacity: 0.8; filter: drop-shadow(0 0 20px rgba(129, 140, 248, 0.5)); }
          100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 0px rgba(129, 140, 248, 0)); }
        }
      `}</style>
    </div>
  );
};

export default LearningHub;
