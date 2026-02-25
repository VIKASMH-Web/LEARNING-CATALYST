import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Book, Target, Award, CheckCircle, ArrowRight, Brain, FileText, ChevronRight, Star, Lock, Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';

const RECIPES = [
  {
    id: 'exam_prep',
    title: 'Exam Prep',
    description: 'Master a topic through concept extraction and mock testing.',
    icon: <FileText size={20} color="#3b82f6" />,
    xp: 200,
    steps: [
      { id: 'ep_1', title: 'Upload PDF', desc: 'Provide your study material' },
      { id: 'ep_2', title: 'Extract Concepts', desc: 'AI identifies key topics' },
      { id: 'ep_3', title: 'Generate Mock Test', desc: 'Creating customized questions' },
      { id: 'ep_4', title: 'Take Test', desc: 'Test your knowledge' },
      { id: 'ep_5', title: 'Results & Feedback', desc: 'Review your performance' }
    ]
  },
  {
    id: 'active_recall',
    title: 'Active Recall',
    description: 'Enhance memory retention through Socratic questioning.',
    icon: <Brain size={20} color="#8b5cf6" />,
    xp: 150,
    steps: [
      { id: 'ar_1', title: 'Enter Topic', desc: 'What do you want to recall?' },
      { id: 'ar_2', title: 'AI Socratic Questions', desc: 'Answer deep questions' },
      { id: 'ar_3', title: 'Student Answers', desc: 'Provide your explanation' },
      { id: 'ar_4', title: 'AI Rating', desc: 'Evaluating your understanding' },
      { id: 'ar_5', title: 'Analysis & Feedback', desc: 'Find gaps in your knowledge' }
    ]
  },
];

const WorkflowEngine = () => {
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addXP, updateStreak } = useGame();

  const handleStartRecipe = (recipe) => {
    setActiveRecipe(recipe);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (!activeRecipe) return;

    setIsProcessing(true);
    // Mock processing delay for realism
    setTimeout(() => {
      setIsProcessing(false);

      if (currentStep < activeRecipe.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Complete Workflow
        addXP(activeRecipe.xp);
        updateStreak();
        setCurrentStep(activeRecipe.steps.length); // Mark all as complete
      }
    }, 1500);
  };

  const handleQuit = () => {
    setActiveRecipe(null);
    setCurrentStep(0);
  };

  if (activeRecipe) {
    const isCompleted = currentStep === activeRecipe.steps.length;

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{
        background: '#0a0a14', borderRadius: '16px', border: '1px solid rgba(124,58,237,0.2)',
        padding: '2rem', maxWidth: '800px', margin: '0 auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              {activeRecipe.icon}
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#e2e8f0', margin: 0 }}>
                {activeRecipe.title}
              </h2>
            </div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', margin: 0 }}>
              {activeRecipe.description} • Reward: <strong style={{ color: '#fbbf24' }}>+{activeRecipe.xp} XP</strong>
            </p>
          </div>
          <button onClick={handleQuit} style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)',
            padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem'
          }}>
            {isCompleted ? 'Close' : 'Quit Workflow'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '3rem' }}>
          {/* Vertical Stepper UI (Linear style) */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
            {/* Connecting line */}
            <div style={{
              position: 'absolute', top: '10px', bottom: '20px', left: '9px',
              width: '1px', background: 'var(--border-color)', zIndex: 0
            }} />

            {activeRecipe.steps.map((step, idx) => {
              const status = idx < currentStep ? 'completed' : idx === currentStep && !isCompleted ? 'active' : 'locked';

              const nodeColors = {
                completed: { text: 'var(--text-primary)', icon: 'var(--text-secondary)' },
                active: { text: 'var(--text-primary)', icon: 'var(--accent-color)' },
                locked: { text: 'var(--text-tertiary)', icon: 'var(--border-color)' }
              };

              const colorConfig = nodeColors[status];

              return (
                <div key={step.id} style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1, opacity: status === 'locked' ? 0.5 : 1 }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    background: 'var(--bg-primary)', border: `1px solid ${status === 'locked' ? 'var(--border-color)' : 'transparent'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: '2px'
                  }}>
                    {status === 'completed' ? <CheckCircle size={16} color="var(--text-secondary)" />
                      : status === 'active' ? (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-color)' }}
                        />
                      ) : <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--border-color)' }} />}
                  </div>
                  <div style={{ paddingBottom: '0.25rem' }}>
                    <h3 style={{
                      fontSize: '0.95rem', fontWeight: 500, margin: '0 0 4px 0',
                      color: colorConfig.text
                    }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Area */}
          <div style={{ flex: '1.5', display: 'flex', flexDirection: 'column' }}>
            {isCompleted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                  borderRadius: '12px', padding: '2rem', textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  flex: 1, position: 'relative', overflow: 'hidden'
                }}
              >
                {/* Background Celebration Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, var(--success) 0%, transparent 70%)' }}
                />

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Award size={40} color="var(--success)" style={{ marginBottom: '1rem' }} />
                </motion.div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>Recipe Completed!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                  Excellent work. You've successfully finished this study workflow.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{ padding: '8px 16px', background: 'rgba(16,185,129,0.1)', borderRadius: '6px', color: 'var(--success)', fontWeight: 500, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Sparkles size={14} /> +{activeRecipe.xp} XP Awarded
                </motion.div>
              </motion.div>
            ) : (
              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                borderRadius: '12px', padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1
              }}>
                <div style={{ marginBottom: 'auto' }}>
                  <div style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', marginBottom: '1rem' }}>
                    Current Step
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    {activeRecipe.steps[currentStep].title}
                  </h3>
                  <div style={{
                    padding: '1.25rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px',
                    color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, minHeight: '150px'
                  }}>
                    {/* Mock Content based on step */}
                    {currentStep === 0 && "Waiting for user input... Please provide the necessary data to begin this phase of the study recipe."}
                    {currentStep > 0 && "AI Engine is ready. Please review the output from the previous step or provide your reasoning to move forward."}
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <button
                    onClick={handleNextStep}
                    disabled={isProcessing}
                    style={{
                      width: '100%', padding: '0.875rem', borderRadius: '8px', border: '1px solid var(--border-color)',
                      background: isProcessing ? 'var(--bg-elevated)' : 'var(--text-primary)',
                      color: isProcessing ? 'var(--text-secondary)' : 'var(--bg-primary)',
                      fontWeight: 500, fontSize: '0.875rem', cursor: isProcessing ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isProcessing ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Processing ...
                      </span>
                    ) : (
                      <>
                        {currentStep === activeRecipe.steps.length - 1 ? 'Complete Workflow' : 'Proceed to Next Step'} <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {RECIPES.map((recipe) => (
          <div key={recipe.id} style={{
            background: 'rgba(20, 20, 30, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            transition: 'all 0.3s ease',
            position: 'relative',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
          >
            <div style={{ padding: '1.5rem', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {recipe.icon}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(251, 191, 36, 0.1)', color: '#fde047', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                  <Award size={14} /> +{recipe.xp} XP
                </div>
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem' }}>{recipe.title}</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                {recipe.description}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1rem' }}>
                {recipe.steps.slice(0, 3).map((step, i) => (
                  <span key={i} style={{ fontSize: '0.7rem', color: '#64748b', background: 'rgba(255,255,255,0.02)', padding: '2px 8px', borderRadius: '4px' }}>
                    {i + 1}. {step.title}
                  </span>
                ))}
                {recipe.steps.length > 3 && <span style={{ fontSize: '0.7rem', color: '#64748b', padding: '2px' }}>+{recipe.steps.length - 3} more</span>}
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.2)' }}>
              <button
                onClick={() => handleStartRecipe(recipe)}
                style={{
                  width: '100%', padding: '0.8rem', borderRadius: '10px', border: 'none',
                  background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: 'white',
                  fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)', transition: 'all 0.2s'
                }}
              >
                <Play size={16} fill="currentColor" /> Start Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkflowEngine;
