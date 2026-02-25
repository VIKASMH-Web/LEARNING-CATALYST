import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
    return useContext(ProgressContext);
};

export const ProgressProvider = ({ children }) => {
    // --- STATE ---
    // Core Progress
    const [roadmapProgress, setRoadmapProgress] = useState({});
    const [focusMinutes, setFocusMinutes] = useState(0); // Store in minutes for finer tracking
    const [codeRuns, setCodeRuns] = useState(0);
    const [activeDays, setActiveDays] = useState([]); // List of unique date strings (YYYY-MM-DD)
    
    // Derived/Meta
    const [badges, setBadges] = useState({}); // { badgeId: unlockedBoolean }
    const [notifications, setNotifications] = useState([]);
    const [isPremium, setIsPremium] = useState(false); // Simulate premium status
    
    // Career & Interview
    const [careerProfile, setCareerProfile] = useState(null); // { targetRole, salaryGoal, timeline, dailyHours, currentLevel, roadmap: [...] }
    const [interviewHistory, setInterviewHistory] = useState([]); // [{ date, score, feedback: {...} }, ...]
    const [dailyFocus, setDailyFocus] = useState({}); // { 'YYYY-MM-DD': minutes }

    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    // --- INITIALIZATION ---
    useEffect(() => {
        // Load from localStorage
        const savedProgress = JSON.parse(localStorage.getItem('lc_progress') || '{}');
        const savedFocus = parseInt(localStorage.getItem('lc_focusWait') || '0', 10);
        const savedCodeRuns = parseInt(localStorage.getItem('lc_codeRuns') || '0', 10);
        const savedDays = JSON.parse(localStorage.getItem('lc_activeDays') || '[]');
        const savedBadges = JSON.parse(localStorage.getItem('lc_badges') || '{}');
        const savedCareer = JSON.parse(localStorage.getItem('lc_careerProfile') || 'null');
        const savedInterviews = JSON.parse(localStorage.getItem('lc_interviewHistory') || '[]');
        const savedDailyFocus = JSON.parse(localStorage.getItem('lc_dailyFocus') || '{}');
        let initialDailyFocus = savedDailyFocus;
        if (Object.keys(savedDailyFocus).length === 0) {
            // Seed sample data for last 7 days to "WOW" the user
            const sampleData = {};
            const todayDate = new Date();
            for (let i = 0; i < 7; i++) {
                const d = new Date();
                d.setDate(todayDate.getDate() - i);
                const ds = d.toISOString().split('T')[0];
                sampleData[ds] = Math.floor(Math.random() * 90) + 30; // 30-120 mins
            }
            initialDailyFocus = sampleData;
            localStorage.setItem('lc_dailyFocus', JSON.stringify(sampleData));
        }

        setRoadmapProgress(savedProgress);
        setFocusMinutes(savedFocus || (initialDailyFocus ? Object.values(initialDailyFocus).reduce((a,b) => a+b, 0) : 0));
        setCodeRuns(savedCodeRuns);
        setActiveDays(savedDays);
        setBadges(savedBadges);
        setCareerProfile(savedCareer);
        setInterviewHistory(savedInterviews);
        setDailyFocus(initialDailyFocus);

        // Check Daily Activity
        const today = new Date().toISOString().split('T')[0];
        if (!savedDays.includes(today)) {
             // Keep only last 7 days usually, but for streak we might want logic
             // For "7 active days" badge, we just need count.
             // Let's store unique days.
             const newDays = [...savedDays, today];
             setActiveDays(newDays); 
             localStorage.setItem('lc_activeDays', JSON.stringify(newDays));
        }
    }, []);

    // --- PERSISTENCE HELPERS ---
    useEffect(() => { localStorage.setItem('lc_progress', JSON.stringify(roadmapProgress)); }, [roadmapProgress]);
    useEffect(() => { localStorage.setItem('lc_focusWait', focusMinutes.toString()); }, [focusMinutes]);
    useEffect(() => { localStorage.setItem('lc_codeRuns', codeRuns.toString()); }, [codeRuns]);
    useEffect(() => { localStorage.setItem('lc_badges', JSON.stringify(badges)); }, [badges]);
    useEffect(() => { localStorage.setItem('lc_careerProfile', JSON.stringify(careerProfile)); }, [careerProfile]);
    useEffect(() => { localStorage.setItem('lc_interviewHistory', JSON.stringify(interviewHistory)); }, [interviewHistory]);
    useEffect(() => { localStorage.setItem('lc_dailyFocus', JSON.stringify(dailyFocus)); }, [dailyFocus]);

    // --- BADGE LOGIC ---
    useEffect(() => {
        checkBadges();
    }, [roadmapProgress, focusMinutes, codeRuns, activeDays]);

    const checkBadges = () => {
        const newBadges = { ...badges };
        let hasNew = false;
        
        const unlock = (id, title) => {
            if (!newBadges[id]) {
                newBadges[id] = true;
                hasNew = true;
                addNotification({
                    title: "🏆 Badge Unlocked!",
                    msg: `You've earned the "${title}" badge.`,
                    type: "success"
                });
            }
        };

        // 1. 7 Active Days
        if (activeDays.length >= 7) unlock('active_7', '7 Active Days');

        // 2. Code Warrior (25 runs)
        if (codeRuns >= 25) unlock('code_warrior', 'Code Warrior');

        // 3. Focus Master (10 hours = 600 mins)
        if (focusMinutes >= 600) unlock('focus_master', 'Focus Master');

        // 4. Halfway Hero (Any domain >= 50%)
        // 5. Advanced Achiever (Any domain >= 70%)
        let maxProgress = 0;
        
        // We need list of domains. We can get them from keys or stored totals.
        // Or better, just iterate the keys in roadmapProgress to find domains.
        // Dynamic Domain Discovery:
        const domains = new Set();
        Object.keys(roadmapProgress).forEach(k => {
            const parts = k.split('-');
            if (parts.length > 1) {
                parts.pop(); // remove index
                domains.add(parts.join('-'));
            }
        });

        domains.forEach(domain => {
             const stats = getSkillLevel(domain);
             if (stats.percentage > maxProgress) maxProgress = stats.percentage;
        });

        if (maxProgress >= 50) unlock('halfway_hero', 'Halfway Hero');
        if (maxProgress >= 70) unlock('advanced_achiever', 'Advanced Achiever');

        if (hasNew) {
            setBadges(newBadges);
        }
    };

    // --- ACTIONS ---

    const updateRoadmapProgress = (key, data, totalStepsForDomain) => {
        // key: "Full Stack Developer-0"
        // data: { progress: 50, completed: false, lastUpdated: ... }
        setRoadmapProgress(prev => {
            const newState = { ...prev, [key]: data };
            return newState;
        });
        
        // We can check badges immediately if we have totals
        // But easier to let effect hook handle it if we can compute %
        // To compute %, we need to store how many steps a domain has.
        // Let's store a map of domain -> totalSteps in localStorage as we see them?
        if (key && totalStepsForDomain) {
            const domainName = key.split('-').slice(0, -1).join('-');
            const storedTotals = JSON.parse(localStorage.getItem('lc_domain_totals') || '{}');
            if (storedTotals[domainName] !== totalStepsForDomain) {
                 storedTotals[domainName] = totalStepsForDomain;
                 localStorage.setItem('lc_domain_totals', JSON.stringify(storedTotals));
            }
        }
    };

    const resetRoadmapProgress = () => {
        setRoadmapProgress({});
        // Also clear domain totals if needed? Nah.
        addNotification({ title: "Cleared All Progress", msg: "All roadmap progress has been reset.", type: "neutral" });
    };

    const addFocusMinutes = (mins) => {
        setFocusMinutes(prev => prev + mins);
        const today = new Date().toISOString().split('T')[0];
        setDailyFocus(prev => ({
            ...prev,
            [today]: (prev[today] || 0) + mins
        }));
    };

    const incrementCodeRuns = () => {
        setCodeRuns(prev => prev + 1);
    };

    const addNotification = ({ title, msg, type = 'info' }) => {
        const id = Date.now();
        setNotifications(prev => [{ id, title, msg, type }, ...prev].slice(0, 10));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };
    
    const updateCareerProfile = (profileData) => {
        setCareerProfile(profileData);
    };

    const addInterviewSession = (sessionData) => {
        // sessionData: { date, score: { technical, communication, confidence }, feedback: {...} }
        setInterviewHistory(prev => [sessionData, ...prev]);
    };

    // --- GETTERS (Intelligence) ---

    // Returns { percentage, level, levelColor }
    const getSkillLevel = (domainName) => {
        // Need total steps. Read from stored totals or localstorage.
        const storedTotals = JSON.parse(localStorage.getItem('lc_domain_totals') || '{}');
        const total = storedTotals[domainName] || 1; // avoid /0
        
        // Calculate completed/progress
        let totalProgressVal = 0; // sum of percentages
        // Iterate all keys to find matches for this domain
        Object.keys(roadmapProgress).forEach(k => {
            if (k.startsWith(domainName + '-')) {
                const item = roadmapProgress[k];
                if (item.completed) totalProgressVal += 100;
                else totalProgressVal += (item.progress || 0);
            }
        });

        // Average progress across all steps?
        // Or: (Stages Completed / Total Stages) * 100
        // User spec: (roadmapCompletedStages / totalStages) * 100
        // But we allow partial progress (sliders).
        // Let's use the USER SPEC strictly: COMPLETED stages.
        
        let completedCount = 0;
        Object.keys(roadmapProgress).forEach(k => {
             if (k.startsWith(domainName + '-') && roadmapProgress[k].completed) {
                 completedCount++;
             }
        });

        const percentage = Math.round((completedCount / total) * 100);
        
        let level = "Beginner";
        let color = "#8be9fd"; // Cyan
        if (percentage > 30) { level = "Intermediate"; color = "#ffb86c"; } // Orange
        if (percentage > 70) { level = "Advanced"; color = "#ff5555"; } // Red/Pink
        if (percentage === 100) { level = "Master"; color = "#50fa7b"; } // Green

        return { percentage, level, levelColor: color, completedCount, total };
    };

    // --- WEEKLY REPORT ---
    const generateWeeklyReport = () => {
        // Collect stats
        // In a real app, we'd have timestamps for everything.
        // Here, we have aggregates.
        // We'll simulate "Last 7 Days" by just showing current stats for the MVP, 
        // or assumes resets happen weekly.
        // User spec: "Reset weekly counters automatically after report generation."
        
        // Identify strong/weak domains
        const domainStats = [];
        const storedTotals = JSON.parse(localStorage.getItem('lc_domain_totals') || '{}');
        Object.keys(storedTotals).forEach(domain => {
            const stats = getSkillLevel(domain);
            domainStats.push({ name: domain, ...stats });
        });
        
        const strong = domainStats.filter(d => d.percentage > 70).map(d => d.name);
        const weak = domainStats.filter(d => d.percentage < 40).map(d => d.name);

        const report = {
            date: new Date().toLocaleDateString(),
            focusHours: (focusMinutes / 60).toFixed(1),
            codeRuns: codeRuns,
            stagesCompleted: Object.values(roadmapProgress).filter(i => i.completed).length, // Total lifetime? Or weekly?
            // "Weekly" implies we track weekly delta. We only have global counters now.
            // MVP: Show global.
            strongDomains: strong,
            weakDomains: weak,
            nextSteps: "Focus on " + (weak[0] || "maintaining your streak!")
        };

        return report;
    };


    return (
        <ProgressContext.Provider value={{
            roadmapProgress, updateRoadmapProgress, resetRoadmapProgress,
            focusMinutes, addFocusMinutes,
            codeRuns, incrementCodeRuns,
            activeDays,
            badges,
            notifications, addNotification, clearNotifications,
            getSkillLevel, generateWeeklyReport, isPremium,
            careerProfile, updateCareerProfile,
            interviewHistory, addInterviewSession,
            dailyFocus
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

export default ProgressProvider;
