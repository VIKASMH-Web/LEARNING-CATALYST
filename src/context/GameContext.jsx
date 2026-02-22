import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const QUEST_POOL = [
  { id: 'q1', title: 'Study for 25 minutes', reward: 50 },
  { id: 'q2', title: 'Complete 1 recall session', reward: 100 },
  { id: 'q3', title: 'Finish 1 mock test', reward: 150 },
  { id: 'q4', title: 'Summarize 1 concept', reward: 50 },
  { id: 'q5', title: 'Read 2 documentation pages', reward: 50 },
  { id: 'q6', title: 'Solve 1 practice problem', reward: 100 },
];

export const GameProvider = ({ children }) => {
  const [xp, setXP] = useState(() => {
    return parseInt(localStorage.getItem('lc_xp') || '0', 10);
  });
  
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('lc_streak') || '0', 10);
  });

  const [completedQuests, setCompletedQuests] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lc_completedQuests') || '[]');
    } catch {
      return [];
    }
  });

  const [skillTreeState, setSkillTreeState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lc_skillTreeState') || '{"root_programming": "mastered", "js_core": "available", "backend_core": "available"}');
    } catch {
      return { "root_programming": "mastered", "js_core": "available", "backend_core": "available" };
    }
  });

  const [skillScores, setSkillScores] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lc_skillScores') || '{}');
    } catch {
      return {};
    }
  });

  const [masteryLevels, setMasteryLevels] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lc_masteryLevels') || '{}');
    } catch {
      return {};
    }
  });

  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem('lc_isPremium') === 'true';
  });

  const [lvsScore, setLvsScore] = useState(() => {
    return parseInt(localStorage.getItem('lc_lvsScore') || '78', 10);
  });

  // --- Phase 4: Career Marketplace States ---
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('lc_userRole') || 'student'; // 'student' or 'recruiter'
  });

  const [talentProfiles, setTalentProfiles] = useState(() => {
    try {
      const stored = localStorage.getItem('lc_talentProfiles');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [shortlist, setShortlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lc_shortlist') || '[]');
    } catch {
      return [];
    }
  });

  const [jobRoleFilter, setJobRoleFilter] = useState(() => {
    return localStorage.getItem('lc_jobRoleFilter') || 'all';
  });
  // ------------------------------------------

  const [weeklyReportData, setWeeklyReportData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lc_weeklyReportData') || 'null');
    } catch {
      return null;
    }
  });

  const [skillHistory, setSkillHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lc_skillHistory') || '[]');
    } catch {
      return [];
    }
  });

  const level = Math.floor(xp / 500) + 1;

  // Generate daily quests using deterministic seed based on date
  const dailyQuests = useMemo(() => {
    const today = new Date().toDateString();
    
    // Clear completed quests if it's a new day
    if (localStorage.getItem('lc_questsDate') !== today) {
      localStorage.setItem('lc_questsDate', today);
      setCompletedQuests([]);
      localStorage.setItem('lc_completedQuests', JSON.stringify([]));
    }

    let seed = 0;
    for (let i = 0; i < today.length; i++) {
        seed += today.charCodeAt(i);
    }
    
    // Simple LCG for random selection
    const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    const shuffled = [...QUEST_POOL].sort(() => 0.5 - random());
    return shuffled.slice(0, 3);
  }, []);

  useEffect(() => {
    localStorage.setItem('lc_xp', xp.toString());
    localStorage.setItem('lc_streak', streak.toString());
    localStorage.setItem('lc_completedQuests', JSON.stringify(completedQuests));
    localStorage.setItem('lc_skillTreeState', JSON.stringify(skillTreeState));
    localStorage.setItem('lc_skillScores', JSON.stringify(skillScores));
    localStorage.setItem('lc_masteryLevels', JSON.stringify(masteryLevels));
    localStorage.setItem('lc_isPremium', isPremium.toString());
    localStorage.setItem('lc_lvsScore', lvsScore.toString());
    localStorage.setItem('lc_weeklyReportData', JSON.stringify(weeklyReportData));
    localStorage.setItem('lc_skillHistory', JSON.stringify(skillHistory));
    
    // Phase 4 persistence
    localStorage.setItem('lc_userRole', userRole);
    if(talentProfiles) localStorage.setItem('lc_talentProfiles', JSON.stringify(talentProfiles));
    localStorage.setItem('lc_shortlist', JSON.stringify(shortlist));
    localStorage.setItem('lc_jobRoleFilter', jobRoleFilter);

  }, [xp, streak, completedQuests, skillTreeState, skillScores, masteryLevels, isPremium, lvsScore, weeklyReportData, skillHistory, userRole, talentProfiles, shortlist, jobRoleFilter]);

  const addXP = (amount) => {
    setXP(prev => prev + amount);
  };

  const updateStreak = () => {
    // Only update streak once a day
    const lastStreakDate = localStorage.getItem('lc_lastStreakDate');
    const today = new Date().toDateString();
    if (lastStreakDate !== today) {
        setStreak(prev => prev + 1);
        localStorage.setItem('lc_lastStreakDate', today);
    }
  };

  const completeQuest = (questId, reward) => {
    if (!completedQuests.includes(questId)) {
      setCompletedQuests(prev => [...prev, questId]);
      addXP(reward);
      updateStreak();
    }
  };

  const updateSkillTreeState = (nodeId, status) => {
    setSkillTreeState(prev => ({ ...prev, [nodeId]: status }));
  };

  const updateSkillScore = (skill, score) => {
    setSkillScores(prev => ({ ...prev, [skill]: score }));
  };

  const updateMasteryLevel = (domain, level) => {
    setMasteryLevels(prev => ({ ...prev, [domain]: level }));
  };

  const upgradeToPremium = () => {
    setIsPremium(true);
  };

  const value = {
    xp,
    level,
    streak,
    completedQuests,
    dailyQuests,
    skillTreeState,
    skillScores,
    masteryLevels,
    isPremium,
    lvsScore,
    weeklyReportData,
    skillHistory,
    userRole,
    setUserRole,
    talentProfiles,
    setTalentProfiles,
    shortlist,
    setShortlist,
    jobRoleFilter,
    setJobRoleFilter,
    addXP,
    updateStreak,
    completeQuest,
    updateSkillTreeState,
    updateSkillScore,
    updateMasteryLevel,
    upgradeToPremium
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
