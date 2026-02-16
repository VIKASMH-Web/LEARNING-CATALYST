import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { domainResources } from '../../data/domainResources';

const DomainSearch = ({ onDomainSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentDomainSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleSearch = (input) => {
    const normalizedInput = input.toLowerCase().trim();
    setQuery(input);

    if (!normalizedInput) {
      setSuggestions([]);
      return;
    }

    const matchedDomains = Object.keys(domainResources).filter(domain =>
      domain.includes(normalizedInput)
    );
    setSuggestions(matchedDomains);
  };

  const selectDomain = (domainKey) => {
    if (!domainResources[domainKey]) return;
    
    const resource = domainResources[domainKey];
    setQuery(resource.title);
    setShowSuggestions(false);
    onDomainSelect(resource); // Pass full domain object
    
    // Update Recent Searches (Store Keys)
    const updatedSearches = [domainKey, ...recentSearches.filter(d => d !== domainKey)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentDomainSearches', JSON.stringify(updatedSearches));
  };

  return (
    <div className="ds-container">
      {/* Glow Effect behind input */}
      <div className="ds-glow-bg"></div>
      
      <div className="ds-input-wrapper">
        <Search color="#9ca3af" size={24} style={{ marginRight: '1rem' }} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            handleSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search domain (e.g., Frontend, AI/ML...)"
          className="ds-input"
        />
      </div>

      {showSuggestions && (
        <div className="ds-suggestions">
          
          {/* Suggestions List */}
          {suggestions.length > 0 && (
             <div style={{ padding: '0.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.5rem', paddingLeft: '0.75rem', paddingTop: '0.5rem' }}>
                Suggestions
              </div>
              {suggestions.map((domainKey) => (
                <button
                  key={domainKey}
                  onClick={() => selectDomain(domainKey)}
                  className="ds-suggestion-item"
                >
                  <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', marginRight: '0.75rem', color: '#60a5fa' }}>
                    <TrendingUp size={16} />
                  </div>
                   <span style={{ textTransform: 'capitalize', flex: 1 }}>{domainResources[domainKey]?.title || domainKey}</span>
                   <ArrowRight size={16} color="#4b5563" />
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
           {suggestions.length === 0 && recentSearches.length > 0 && (
            <div style={{ padding: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
               <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.5rem', paddingLeft: '0.75rem', paddingTop: '0.5rem' }}>
                Recent
               </div>
              {recentSearches.map((domainKey) => (
                <button
                  key={domainKey}
                  onClick={() => selectDomain(domainKey)}
                  className="ds-suggestion-item"
                >
                  <div style={{ padding: '0.5rem', background: 'rgba(55, 65, 81, 0.3)', borderRadius: '8px', marginRight: '0.75rem', color: '#9ca3af' }}>
                    <Clock size={16} />
                  </div>
                  <span style={{ textTransform: 'capitalize' }}>{domainResources[domainKey]?.title || domainKey}</span>
                </button>
              ))}
            </div>
          )}
          
           {suggestions.length === 0 && !query && recentSearches.length === 0 && (
             <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
               <p>Start typing to explore learning paths...</p>
             </div>
           )}

            {query && suggestions.length === 0 && (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                <p>No domains found for "{query}"</p>
              </div>
            )}
        </div>
      )}
      
      {/* Backdrop to close suggestions */}
      {showSuggestions && (
        <div 
          style={{ position: 'fixed', inset: 0, zIndex: 90 }}
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default DomainSearch;
