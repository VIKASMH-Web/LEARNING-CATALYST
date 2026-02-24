import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, BookOpen, ExternalLink, ChevronRight, Sparkles, 
  Clock, CheckCircle, Wrench, FileText, Code, Play,
  TrendingUp, Star, ArrowRight, Zap, Globe, X,
  GraduationCap, Layers, Target
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import WorkflowEngine from '../components/LearningHub/WorkflowEngine';
import { fullSearch, popularSearches, generateRoadmap, getResourcesForDomain, getToolsForDomain } from '../utils/roadmapEngine';

// ============================================
// LEARNING HUB — Dynamic Search Engine
// ============================================
const LearningHub = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [activeTab, setActiveTab] = useState('roadmap');
  const [searchHistory, setSearchHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lh_history') || '[]'); } catch { return []; }
  });
  const [expandedDomain, setExpandedDomain] = useState(true); // For notion style collapsible
  const searchRef = useRef(null);
  const debounceRef = useRef(null);
  const { completedLessons, completedQuizzes } = useProgress();

  // Debounced search suggestions
  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) return popularSearches.slice(0, 8);
    const lower = query.toLowerCase();
    return popularSearches.filter(s => s.toLowerCase().includes(lower)).slice(0, 6);
  }, [query]);

  // Handle search execution
  const executeSearch = useCallback((searchQuery) => {
    const q = searchQuery.trim();
    if (!q) return;
    
    setIsSearching(true);
    setShowSuggestions(false);
    setActiveStage(0);
    setActiveTab('roadmap');
    
    // Simulate brief loading for UX feel
    setTimeout(() => {
      const result = fullSearch(q);
      setSearchResult(result);
      setIsSearching(false);
      
      // Save to history
      setSearchHistory(prev => {
        const updated = [q, ...prev.filter(h => h.toLowerCase() !== q.toLowerCase())].slice(0, 10);
        localStorage.setItem('lh_history', JSON.stringify(updated));
        return updated;
      });
    }, 300);
  }, []);

  // Handle input change with debounce
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  // Handle key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeSearch(query);
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const clearSearch = () => {
    setQuery('');
    setSearchResult(null);
    setShowSuggestions(false);
  };

  // Resource type icons
  const getResourceIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'documentation': return <FileText size={14} />;
      case 'course': return <GraduationCap size={14} />;
      case 'practice': return <Code size={14} />;
      case 'tools': return <Wrench size={14} />;
      default: return <Globe size={14} />;
    }
  };

  const getResourceColor = (type) => {
    switch(type?.toLowerCase()) {
      case 'documentation': return '#60a5fa';
      case 'course': return '#34d399';
      case 'practice': return '#fbbf24';
      case 'tools': return '#f472b6';
      default: return '#a78bfa';
    }
  };

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: searchResult ? '1.5rem' : '3rem' }}
      >
        {!searchResult && (
          <>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', marginBottom: 16, fontSize: '0.8rem', color: '#a78bfa', fontWeight: 600 }}>
              <Sparkles size={14} /> AI-Powered Learning Engine
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8, background: 'linear-gradient(135deg, #e2e8f0, #a78bfa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', letterSpacing: '-0.03em' }}>
              What do you want to learn?
            </h1>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto' }}>
              Search any skill, role, or technology — get an instant roadmap with resources
            </p>
          </>
        )}
      </motion.div>

      {/* Search Bar */}
      <div ref={searchRef} style={{ position: 'relative', maxWidth: 680, margin: '0 auto', marginBottom: searchResult ? '2rem' : '3rem', zIndex: 100 }}>
        <div style={{ position: 'absolute', inset: -2, background: 'linear-gradient(135deg, #7c3aed, #3b82f6, #7c3aed)', borderRadius: 20, filter: 'blur(8px)', opacity: showSuggestions ? 0.4 : 0.15, transition: 'opacity 0.4s ease' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', background: '#0a0a14', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 16, padding: '0.875rem 1.25rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          <Search size={20} color="#6b7280" />
          <input
            id="learning-hub-search"
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search: Python, Digital Marketing, UI Design, Backend Developer..."
            style={{ flex: 1, background: 'transparent', border: 'none', fontSize: '1.1rem', color: '#fff', marginLeft: 12, outline: 'none' }}
            autoComplete="off"
          />
          {query && (
            <button onClick={clearSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <X size={18} color="#6b7280" />
            </button>
          )}
          <button
            id="learning-hub-search-btn"
            onClick={() => executeSearch(query)}
            style={{ marginLeft: 8, padding: '8px 20px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            Search
          </button>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8, background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', zIndex: 200 }}
            >
              {searchHistory.length > 0 && !query && (
                <div style={{ padding: '8px 16px 4px', fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Recent Searches</div>
              )}
              {!query && searchHistory.slice(0, 3).map((h, i) => (
                <button
                  key={'h-'+i}
                  onClick={() => { setQuery(h); executeSearch(h); }}
                  style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#d1d5db', cursor: 'pointer', fontSize: '0.9rem', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.04)'}
                  onMouseLeave={e => e.target.style.background = 'none'}
                >
                  <Clock size={14} color="#6b7280" />
                  {h}
                </button>
              ))}
              {(query ? filteredSuggestions : popularSearches.slice(0, 8)).length > 0 && (
                <div style={{ padding: '8px 16px 4px', fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                  {query ? 'Suggestions' : 'Popular Searches'}
                </div>
              )}
              {(query ? filteredSuggestions : popularSearches.slice(0, 8)).map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => { setQuery(suggestion); executeSearch(suggestion); }}
                  style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#d1d5db', cursor: 'pointer', fontSize: '0.9rem', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.04)'}
                  onMouseLeave={e => e.target.style.background = 'none'}
                >
                  <Search size={14} color="#6b7280" />
                  {suggestion}
                  <ChevronRight size={14} color="#4b5563" style={{ marginLeft: 'auto' }} />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '3rem' }}
          >
            <div style={{ display: 'inline-block', width: 40, height: 40, border: '3px solid rgba(124,58,237,0.2)', borderTopColor: '#7c3aed', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ marginTop: 16, color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Generating your personalized roadmap...</p>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Empty State - Popular Topics */}
      {!searchResult && !isSearching && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 500 }}>Or explore popular paths</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 700, margin: '0 auto' }}>
            {popularSearches.slice(0, 12).map((search, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setQuery(search); executeSearch(search); }}
                style={{ padding: '8px 18px', borderRadius: 10, background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)', color: '#c4b5fd', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {search}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Study Recipes Dashboard */}
      {!searchResult && !isSearching && (
        <div style={{ marginTop: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: 30 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Automated Study Workflows</h2>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>One-click recipes to accomplish specific learning goals.</p>
            </div>
            <WorkflowEngine />
        </div>
      )}

      {/* ============================================ */}
      {/* SEARCH RESULTS */}
      {/* ============================================ */}
      {searchResult && !isSearching && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Result Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, background: 'linear-gradient(135deg, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: 4 }}>
                {searchResult.roadmap.label}
              </h2>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ padding: '3px 10px', borderRadius: 6, background: searchResult.roadmap.type === 'technical' ? 'rgba(52,211,153,0.1)' : 'rgba(251,191,36,0.1)', color: searchResult.roadmap.type === 'technical' ? '#34d399' : '#fbbf24', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
                  {searchResult.roadmap.type}
                </span>
                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                  {searchResult.roadmap.stages.length} stages • {searchResult.resources.length} resources • {searchResult.tools.length} tools
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 12, width: 'fit-content' }}>
            {[
              { key: 'roadmap', label: 'Roadmap', icon: <Layers size={15} /> },
              { key: 'resources', label: 'Resources', icon: <BookOpen size={15} /> },
              { key: 'tools', label: 'Tools', icon: <Wrench size={15} /> },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 18px', borderRadius: 8, border: 'none',
                  background: activeTab === tab.key ? 'rgba(124,58,237,0.15)' : 'transparent',
                  color: activeTab === tab.key ? '#a78bfa' : 'var(--text-tertiary)',
                  fontWeight: activeTab === tab.key ? 600 : 500,
                  fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Roadmap Tab (Notion Style) */}
          {activeTab === 'roadmap' && (
             <div style={{ maxWidth: '800px' }}>
                {/* Domain Card (Expandable) */}
                <div 
                   onClick={() => setExpandedDomain(!expandedDomain)}
                   style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px', padding: '16px 20px',
                      cursor: 'pointer', transition: 'all 0.2s',
                      display: 'flex', flexDirection: 'column', gap: '12px'
                   }}
                   onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                   onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
                >
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                         <motion.div animate={{ rotate: expandedDomain ? 90 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronRight size={18} color="var(--text-secondary)" />
                         </motion.div>
                         <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {searchResult.roadmap.label}
                         </span>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                         0%
                      </span>
                   </div>
                   {/* Thin Progress Bar */}
                   <div style={{ width: '100%', height: '2px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '0%', height: '100%', background: 'var(--accent-color)' }} />
                   </div>
                </div>

                {/* Expanded Stages List */}
                <AnimatePresence>
                   {expandedDomain && (
                      <motion.div 
                         initial={{ opacity: 0, height: 0 }} 
                         animate={{ opacity: 1, height: 'auto' }} 
                         exit={{ opacity: 0, height: 0 }}
                         style={{ overflow: 'hidden', marginLeft: '12px', paddingLeft: '20px', borderLeft: '1px solid var(--border-color)', marginTop: '8px' }}
                      >
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0' }}>
                            {searchResult.roadmap.stages.map((stage, i) => (
                               <div key={i} style={{ 
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  padding: '10px 16px', borderRadius: '6px',
                                  background: 'transparent',
                                  transition: 'background 0.2s'
                               }}
                               onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                               onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                               >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                     <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-tertiary)' }} />
                                     <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>{stage.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{stage.topics.slice(0, 2).join(', ')}{stage.topics.length > 2 ? '...' : ''}</div>
                                     </div>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                     <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>0%</span>
                                     <button style={{ 
                                        padding: '6px 14px', borderRadius: '4px',
                                        background: 'var(--bg-elevated)', border: '1px solid var(--border-color)',
                                        color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 500,
                                        cursor: 'pointer', transition: 'all 0.2s'
                                     }}
                                     onMouseEnter={e => { e.currentTarget.style.background = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
                                     onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-elevated)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                                     >
                                        Start
                                     </button>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
              {searchResult.resources.map((resource, i) => (
                <motion.a
                  key={i}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: 8,
                    padding: '1.25rem', borderRadius: 14,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    textDecoration: 'none', transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 6, background: `${getResourceColor(resource.type)}15`, color: getResourceColor(resource.type), fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase' }}>
                      {getResourceIcon(resource.type)} {resource.type}
                    </span>
                    <ExternalLink size={14} color="#6b7280" />
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e2e8f0' }}>{resource.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{resource.source}</span>
                </motion.a>
              ))}
            </div>
          )}

          {/* Tools Tab */}
          {activeTab === 'tools' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {searchResult.tools.map((tool, i) => (
                <motion.a
                  key={i}
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '1.25rem', borderRadius: 14,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    textDecoration: 'none', transition: 'all 0.2s'
                  }}
                >
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Wrench size={18} color="#a78bfa" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>{tool.name}</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>{tool.description}</p>
                    <span style={{ fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase' }}>{tool.category}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default LearningHub;
