import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, CheckCircle, Award, Network, ChevronRight, X, Play, Zap, BarChart2, Book } from 'lucide-react';
import { useGame } from '../context/GameContext';

const CURRICULUM = {
  id: 'root_programming',
  title: 'Programming Core',
  domain: 'Programming',
  xp: 0,
  children: [
    {
      id: 'js_core',
      title: 'JavaScript',
      xp: 0,
      children: [
        { id: 'js_basics', title: 'Basics', xp: 100 },
        { id: 'js_async', title: 'Async Patterns', xp: 150 },
        { id: 'js_adv', title: 'Advanced Concepts', xp: 200 }
      ]
    },
    {
      id: 'backend_core',
      title: 'Backend',
      xp: 0,
      children: [
        { id: 'be_apis', title: 'APIs', xp: 100 },
        { id: 'be_auth', title: 'Authentication', xp: 150 },
        { id: 'be_db', title: 'Database Design', xp: 200 }
      ]
    },
    {
      id: 'system_design',
      title: 'System Design',
      xp: 0,
      children: [
        { id: 'sd_scaling', title: 'Scaling', xp: 250 },
        { id: 'sd_micro', title: 'Microservices', xp: 300 }
      ]
    }
  ]
};

// Flatten to easily compute mastery overall
const flattenNodes = (node, acc = []) => {
  acc.push(node);
  if (node.children) {
    node.children.forEach(c => flattenNodes(c, acc));
  }
  return acc;
};
const ALL_NODES = flattenNodes(CURRICULUM);
const DATA_NODES = ALL_NODES.filter(n => n.id !== 'root_programming'); // Skip abstract root for stat counting

const NodeLines = ({ childrenCount }) => {
  if (childrenCount === 0) return null;
  return (
    <div style={{ position: 'relative', width: '100%', height: '40px', display: 'flex', justifyContent: 'center' }}>
       {/* Small vertical stalk down from parent */}
       <div style={{ width: '2px', height: '20px', background: 'rgba(255,255,255,0.15)', position: 'absolute', top: 0 }} />
       {childrenCount > 1 && (
         <div style={{ 
            position: 'absolute', top: '20px', height: '2px', background: 'rgba(255,255,255,0.15)',
            width: `calc(100% - ${100 / childrenCount}%)`
         }} />
       )}
       {Array(childrenCount).fill(0).map((_, i) => (
         <div key={i} style={{ 
            position: 'absolute', left: `calc(${(i + 0.5) * (100 / childrenCount)}% - 1px)`, 
            top: '20px', width: '2px', height: '20px', background: 'rgba(255,255,255,0.15)' 
         }} />
       ))}
    </div>
  );
};

const SkillTreePage = () => {
  const { 
    skillTreeState, updateSkillTreeState, 
    addXP, updateStreak, 
    masteryLevels, updateMasteryLevel,
    completeQuest // from Phase 1, just in case
  } = useGame();

  const [selectedNode, setSelectedNode] = useState(null);
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeScore, setChallengeScore] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [challengeQuestion, setChallengeQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showInsights, setShowInsights] = useState(false);

  // Initialize Root node if not preset
  useEffect(() => {
    if (!skillTreeState['root_programming']) {
      updateSkillTreeState('root_programming', 'mastered');
      // Set level 1 initial states
      updateSkillTreeState('js_core', 'available');
      updateSkillTreeState('backend_core', 'available');
      updateSkillTreeState('system_design', 'locked'); 
    }
  }, [skillTreeState, updateSkillTreeState]);

  // Compute Mastery Level
  const masteredCount = DATA_NODES.filter(n => skillTreeState[n.id] === 'mastered').length;
  const masteryPercentage = (masteredCount / DATA_NODES.length) * 100;

  useEffect(() => {
    let newBadge = 'Bronze';
    if (masteryPercentage >= 100) newBadge = 'Diamond';
    else if (masteryPercentage >= 60) newBadge = 'Gold';
    else if (masteryPercentage >= 30) newBadge = 'Silver';

    if (masteryLevels['Programming'] !== newBadge) {
      updateMasteryLevel('Programming', newBadge);
    }
  }, [masteryPercentage, masteryLevels, updateMasteryLevel]);

  const currentBadge = masteryLevels['Programming'] || 'Bronze';
  const badgeColors = {
    'Bronze': '#b45309', // amber-700 approx
    'Silver': '#94a3b8',
    'Gold': '#fbbf24',
    'Diamond': '#38bdf8'
  };

  const getNodeStatus = (node) => {
    return skillTreeState[node.id] || 'locked';
  };

  const handleNodeClick = (node) => {
    const status = getNodeStatus(node);
    if (status === 'locked') return;
    setSelectedNode(node);
    setChallengeScore(null);
  };

  const CHALLENGE_BANK = {
    'js_basics': { q: "What keyword declares a block-scoped mutable variable in JS?", a: "let" },
    'js_async': { q: "What JS object represents the eventual completion of an asynchronous operation?", a: "promise" },
    'js_adv': { q: "What function concept allows maintaining access to its lexical scope even when executing outside?", a: "closure" },
    'backend_core': { q: "Which HTTP method is traditionally used for creating a new resource?", a: "post" },
    'node_js': { q: "What is the name of Node's package manager?", a: "npm" },
    'databases': { q: "What language is used to query relational databases natively?", a: "sql" },
    'system_design': { q: "What technique distributes traffic across multiple servers?", a: "load balancing" },
    'cache_layer': { q: "Which open-source in-memory data store is frequently used as a cache?", a: "redis" },
    'microservices': { q: "What is the standard format used to pass data between microservices?", a: "json" },
  };

  const handleStartChallenge = () => {
    setShowChallenge(true);
    setIsProcessing(true);
    setUserAnswer('');
    setChallengeScore(null);
    
    // Simulate generation delay
    setTimeout(() => {
      setIsProcessing(false);
      const qData = CHALLENGE_BANK[selectedNode?.id] || { q: "Type 'ready' to pass the general assessment.", a: "ready" };
      setChallengeQuestion(qData);
    }, 1500);
  };

  const submitAnswer = () => {
    if (!challengeQuestion) return;
    const isCorrect = userAnswer.toLowerCase().trim() === challengeQuestion.a.toLowerCase();
    setChallengeScore(isCorrect ? 100 : 40);
  };

  const handleCompleteChallenge = () => {
    if (challengeScore >= 70 && selectedNode) {
      // Mark Mastered
      updateSkillTreeState(selectedNode.id, 'mastered');
      if (selectedNode.xp > 0) {
        addXP(selectedNode.xp);
        updateStreak();
      }
      
      // Unlock Children
      if (selectedNode.children) {
        selectedNode.children.forEach(child => {
          updateSkillTreeState(child.id, 'available');
        });
      }

      // Special global unlocks if needed could go here
    }
    setShowChallenge(false);
    setSelectedNode(null);
  };

  const renderNode = (node) => {
    const status = getNodeStatus(node);
    const isMastered = status === 'mastered';
    const isAvailable = status === 'available';

    return (
      <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>
        <motion.div 
          whileHover={isAvailable || isMastered ? { scale: 1.05 } : {}}
          whileTap={isAvailable || isMastered ? { scale: 0.95 } : {}}
          onClick={() => handleNodeClick(node)}
          style={{
            zIndex: 10,
            padding: '1rem', width: '150px',
            borderRadius: '16px', textAlign: 'center',
            cursor: status === 'locked' ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            background: isMastered ? 'rgba(251, 191, 36, 0.15)' : isAvailable ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${isMastered ? '#fbbf24' : isAvailable ? '#3b82f6' : 'rgba(255,255,255,0.05)'}`,
            boxShadow: isMastered ? '0 0 20px rgba(251, 191, 36, 0.2)' : isAvailable ? '0 0 15px rgba(59, 130, 246, 0.2)' : 'none',
            filter: status === 'locked' ? 'grayscale(100%) opacity(0.6)' : 'none'
          }}
        >
          <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
            {isMastered ? <CheckCircle size={24} color="#fbbf24" /> : isAvailable ? <Unlock size={24} color="#60a5fa" /> : <Lock size={24} color="#6b7280" />}
          </div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: isMastered ? '#fde047' : isAvailable ? '#eff6ff' : '#9ca3af', margin: 0, lineHeight: 1.2 }}>
            {node.title}
          </h4>
          {node.xp > 0 && <span style={{ fontSize: '0.7rem', color: isMastered ? '#fef08a' : isAvailable ? '#93c5fd' : '#6b7280', display: 'block', marginTop: '4px' }}>+{node.xp} XP</span>}
        </motion.div>
        
        {/* Render Children Recursively */}
        {node.children && node.children.length > 0 && (
          <div style={{ width: '100%' }}>
            <NodeLines childrenCount={node.children.length} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', width: '100%' }}>
              {node.children.map(child => (
                <div key={child.id} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  {renderNode(child)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '0 1rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Network size={28} color="#a78bfa" /> Skill Tree
          </h1>
          <p style={{ color: 'var(--text-tertiary)', margin: 0 }}>Master modules to unlock advanced curriculum branches.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setShowInsights(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '16px', border: '1px solid rgba(251,191,36,0.3)', background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(217,119,6,0.02))', color: '#fbbf24', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 15px rgba(251,191,36,0.1)'
              }}
            >
              <Zap size={18} fill="#fbbf24" /> Insights AI
            </button>
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', 
              padding: '10px 20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' 
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Domain Mastery</div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>Programming</div>
              </div>
              <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={24} color={badgeColors[currentBadge]} />
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: badgeColors[currentBadge] }}>{currentBadge}</span>
              </div>
            </div>
        </div>
      </div>

      {/* Tree Container */}
      <div style={{ 
        background: '#0a0a14', borderRadius: '24px', border: '1px solid rgba(124,58,237,0.15)',
        padding: '4rem 2rem', minHeight: '600px', display: 'flex', justifyContent: 'center',
        overflowX: 'auto', WebkitOverflowScrolling: 'touch', position: 'relative'
      }}>
        <div style={{ minWidth: '800px', display: 'flex', justifyContent: 'center' }}>
          {renderNode(CURRICULUM)}
        </div>
      </div>

      {/* Modal / Action Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { if (!showChallenge) setSelectedNode(null); }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
              zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '90%', maxWidth: '500px', background: '#121222', border: '1px solid rgba(124,58,237,0.3)',
                borderRadius: '24px', padding: '2.5rem', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}
            >
              {!showChallenge && <button onClick={() => setSelectedNode(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><X size={24} /></button>}
              
              {!showChallenge ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Book size={32} color="#60a5fa" />
                  </div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>{selectedNode.title}</h2>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                    Master this module to unlock the next series of paths in the {selectedNode.domain || 'Curriculum'} tree.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 600 }}>Difficulty</div>
                      <div style={{ fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>Intermediate</div>
                    </div>
                    <div style={{ background: 'rgba(251, 191, 36, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(251, 191, 36, 0.1)' }}>
                      <div style={{ fontSize: '0.75rem', color: '#fbbf24', textTransform: 'uppercase', fontWeight: 600 }}>Reward</div>
                      <div style={{ fontSize: '1.1rem', color: '#fde047', fontWeight: 800 }}>+{selectedNode.xp || 50} XP</div>
                    </div>
                  </div>

                  {getNodeStatus(selectedNode) === 'mastered' ? (
                     <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                       <CheckCircle size={20} /> Module Mastered
                     </div>
                  ) : (
                    <button 
                      onClick={handleStartChallenge}
                      style={{
                        width: '100%', padding: '1.25rem', borderRadius: '14px', border: 'none',
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white',
                        fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
                      }}
                    >
                      Start AI Challenge <Play size={18} fill="currentColor" />
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  {isProcessing ? (
                    <div style={{ padding: '3rem 0' }}>
                      <div className="spin" style={{ width: 48, height: 48, border: '4px solid rgba(124,58,237,0.2)', borderTopColor: '#7c3aed', borderRadius: '50%', margin: '0 auto 1.5rem' }} />
                      <h3 style={{ fontSize: '1.3rem', color: 'white' }}>Generating Assessment...</h3>
                      <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Analyzing your historical logic patterns</p>
                    </div>
                  ) : challengeScore === null ? (
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#a78bfa', marginBottom: '1rem' }}>AI Module Challenge</h3>
                      <p style={{ fontSize: '1.1rem', color: '#f8fafc', marginBottom: '2rem', lineHeight: 1.5 }}>{challengeQuestion?.q}</p>
                      
                      <input 
                        type="text" 
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Your answer..."
                        onKeyDown={(e) => { if(e.key === 'Enter') submitAnswer(); }}
                        style={{ width: '100%', padding: '1rem', background: '#09090b', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', color: 'white', fontSize: '1rem', marginBottom: '1.5rem', outline: 'none' }}
                      />
                      <button 
                         onClick={submitAnswer}
                         disabled={!userAnswer.trim()}
                         style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: 'none', background: userAnswer.trim() ? '#7c3aed' : 'rgba(124,58,237,0.2)', color: 'white', fontWeight: 700, fontSize: '1rem', cursor: userAnswer.trim() ? 'pointer' : 'not-allowed' }}
                      >Submit Answer</button>
                    </div>
                  ) : (
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '2rem' }}>Challenge Results</h3>
                      
                      <div style={{ width: 120, height: 120, borderRadius: '50%', background: challengeScore >= 70 ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `4px solid ${challengeScore >= 70 ? '#34d399' : '#ef4444'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: challengeScore >= 70 ? '#34d399' : '#ef4444' }}>{challengeScore}%</span>
                      </div>

                      {challengeScore >= 70 ? (
                        <>
                          <h4 style={{ color: '#34d399', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Challenge Passed!</h4>
                          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Excellent. You've demonstrated sufficient mastery of {selectedNode.title}. Next branches unlocked!</p>
                        </>
                      ) : (
                        <>
                          <h4 style={{ color: '#ef4444', fontSize: '1.2rem', marginBottom: '0.5rem' }}>More Practice Needed</h4>
                          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>You scored below the 70% threshold. Review the material and try again.</p>
                          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', textAlign: 'left', marginBottom: '2rem' }}>
                            <strong style={{ color: '#e2e8f0', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Correct Answer Hint:</strong>
                            <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>The answer was expected to be "{challengeQuestion?.a}".</span>
                          </div>
                        </>
                      )}

                      <button 
                        onClick={handleCompleteChallenge}
                        style={{
                          width: '100%', padding: '1rem', borderRadius: '12px', border: 'none',
                          background: challengeScore >= 70 ? '#7c3aed' : 'rgba(255,255,255,0.1)', color: 'white',
                          fontWeight: 700, fontSize: '1rem', cursor: 'pointer'
                        }}
                      >
                        {challengeScore >= 70 ? 'Claim Reward' : 'Close & Study'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInsights && (
           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}>
               <motion.div initial={{scale:0.95, y:20}} animate={{scale:1, y:0}} exit={{scale:0.95, y:20}} style={{ width: '90%', maxWidth: 700, background: '#121222', borderRadius: '24px', padding: '2.5rem', border: '1px solid rgba(251,191,36,0.2)', position: 'relative', boxShadow: '0 25px 50px -12px rgba(251,191,36,0.1)' }}>
                   <button onClick={() => setShowInsights(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><X size={20}/></button>
                   <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}><BarChart2 /> Advanced Skill Analytics</h2>
                   
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                       <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                           <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '8px' }}>Pacing vs Peers</div>
                           <div style={{ fontSize: '2rem', fontWeight: 800, color: '#50fa7b' }}>Top 12%</div>
                       </div>
                       <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                           <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '8px' }}>Suggested Next Node</div>
                           <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#60a5fa' }}>Advanced Concepts</div>
                           <div style={{ fontSize: '0.75rem', color: '#a78bfa', marginTop: '4px' }}>Based on recent performance</div>
                       </div>
                   </div>
                   <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                       <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.6 }}>
                           <strong>AI Discovery:</strong> You are mastering JavaScript Basics 30% faster than average. The internal difficulty curve for your upcoming nodes has been automatically increased by 15% to maintain an optimal flow state.
                       </p>
                   </div>
               </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillTreePage;
