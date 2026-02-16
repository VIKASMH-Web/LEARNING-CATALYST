import React from 'react';
import { ExternalLink, BookOpen, Video, Code, FileText } from 'lucide-react';

const DomainCard = ({ resource, index }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'Documentation': return <FileText size={20} color="#60a5fa" />;
      case 'Video': return <Video size={20} color="#f87171" />;
      case 'Practice': return <Code size={20} color="#4ade80" />;
      case 'Course': return <BookOpen size={20} color="#facc15" />;
      default: return <ExternalLink size={20} color="#c084fc" />;
    }
  };

  return (
    <div 
      className="dc-card"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div style={{ position: 'absolute', top: 12, right: 12, opacity: 0.5 }}>
        <ExternalLink size={16} color="#9ca3af" />
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ padding: '0.625rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}>
          {getIcon(resource.type)}
        </div>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#e5e7eb', marginBottom: '0.25rem', lineHeight: 1.25 }}>
            {resource.title}
          </h3>
          <span className="dc-badge">
            {resource.type}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <span style={{ 
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: resource.difficulty === 'Beginner' ? '#10b981' :
                              resource.difficulty === 'Intermediate' ? '#fbbf24' :
                              '#ef4444'
          }}></span>
          {resource.difficulty}
        </span>
        
        <span style={{ color: '#60a5fa', fontSize: '0.75rem', fontWeight: 500 }}>
          Start Learning
        </span>
      </div>
       {/* Background Glow Effect */}
      <div style={{ 
        position: 'absolute', bottom: -40, right: -40, width: '6rem', height: '6rem', 
        background: 'rgba(37, 99, 235, 0.2)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' 
      }}></div>
    </div>
  );
};

export default DomainCard;
