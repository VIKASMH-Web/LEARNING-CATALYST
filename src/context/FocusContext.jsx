/**
 * FocusContext - Global persistent Focus Mode state
 * Timer continues across page navigation and survives app reload
 * Uses Context + useReducer + localStorage
 */
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const FocusContext = createContext();

// Actions
const ACTIONS = {
  START: 'START',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  RESET: 'RESET',
  TICK: 'TICK',
  SET_DURATION: 'SET_DURATION',
  SET_MODE: 'SET_MODE',
  COMPLETE: 'COMPLETE',
};

// Initial state
const getInitialState = () => {
  try {
    const saved = localStorage.getItem('focusState');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Recalculate remaining time if was running
      if (parsed.isRunning && parsed.startTimestamp) {
        const elapsed = Math.floor((Date.now() - parsed.startTimestamp) / 1000);
        const remaining = Math.max(0, parsed.totalSeconds - elapsed);
        if (remaining <= 0) {
          return {
            ...parsed,
            isRunning: false,
            remainingSeconds: 0,
            startTimestamp: null,
            completedSessions: (parsed.completedSessions || 0) + 1,
          };
        }
        return {
          ...parsed,
          remainingSeconds: remaining,
        };
      }
      return parsed;
    }
  } catch (e) {
    // Ignore parsing errors
  }
  return {
    isRunning: false,
    isPaused: false,
    totalSeconds: 25 * 60, // 25 min default (pomodoro)
    remainingSeconds: 25 * 60,
    startTimestamp: null,
    pausedAt: null,
    mode: 'pomodoro', // pomodoro, short-break, long-break, custom
    completedSessions: 0,
    totalFocusMinutes: 0,
  };
};

// Reducer
function focusReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START:
      return {
        ...state,
        isRunning: true,
        isPaused: false,
        startTimestamp: Date.now(),
        remainingSeconds: state.remainingSeconds > 0 ? state.remainingSeconds : state.totalSeconds,
      };
    case ACTIONS.PAUSE:
      return {
        ...state,
        isRunning: false,
        isPaused: true,
        pausedAt: Date.now(),
        remainingSeconds: state.remainingSeconds,
      };
    case ACTIONS.RESUME:
      return {
        ...state,
        isRunning: true,
        isPaused: false,
        startTimestamp: Date.now(),
      };
    case ACTIONS.RESET:
      return {
        ...state,
        isRunning: false,
        isPaused: false,
        remainingSeconds: state.totalSeconds,
        startTimestamp: null,
        pausedAt: null,
      };
    case ACTIONS.TICK:
      if (!state.isRunning) return state;
      const newRemaining = state.remainingSeconds - 1;
      if (newRemaining <= 0) {
        return {
          ...state,
          isRunning: false,
          isPaused: false,
          remainingSeconds: 0,
          startTimestamp: null,
          completedSessions: state.completedSessions + 1,
          totalFocusMinutes: state.totalFocusMinutes + Math.floor(state.totalSeconds / 60),
        };
      }
      return {
        ...state,
        remainingSeconds: newRemaining,
      };
    case ACTIONS.SET_DURATION: {
      const totalSeconds = action.payload * 60;
      return {
        ...state,
        totalSeconds,
        remainingSeconds: totalSeconds,
        isRunning: false,
        isPaused: false,
        startTimestamp: null,
      };
    }
    case ACTIONS.SET_MODE: {
      const modeSeconds = {
        'pomodoro': 25 * 60,
        'short-break': 5 * 60,
        'long-break': 15 * 60,
        'deep-work': 50 * 60,
      };
      const total = modeSeconds[action.payload] || 25 * 60;
      return {
        ...state,
        mode: action.payload,
        totalSeconds: total,
        remainingSeconds: total,
        isRunning: false,
        isPaused: false,
        startTimestamp: null,
      };
    }
    case ACTIONS.COMPLETE:
      return {
        ...state,
        isRunning: false,
        isPaused: false,
        remainingSeconds: 0,
        startTimestamp: null,
        completedSessions: state.completedSessions + 1,
        totalFocusMinutes: state.totalFocusMinutes + Math.floor((state.totalSeconds - state.remainingSeconds) / 60),
      };
    default:
      return state;
  }
}

// Provider
export function FocusProvider({ children }) {
  const [state, dispatch] = useReducer(focusReducer, null, getInitialState);

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('focusState', JSON.stringify(state));
    } catch (e) {
      // Ignore
    }
  }, [state]);

  // Timer tick
  useEffect(() => {
    let interval;
    if (state.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: ACTIONS.TICK });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isRunning]);

  // Actions
  const startTimer = useCallback(() => dispatch({ type: ACTIONS.START }), []);
  const pauseTimer = useCallback(() => dispatch({ type: ACTIONS.PAUSE }), []);
  const resumeTimer = useCallback(() => dispatch({ type: ACTIONS.RESUME }), []);
  const resetTimer = useCallback(() => dispatch({ type: ACTIONS.RESET }), []);
  const setDuration = useCallback((minutes) => dispatch({ type: ACTIONS.SET_DURATION, payload: minutes }), []);
  const setMode = useCallback((mode) => dispatch({ type: ACTIONS.SET_MODE, payload: mode }), []);

  const value = {
    ...state,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    setDuration,
    setMode,
    // Helper formatted values
    formattedTime: formatTime(state.remainingSeconds),
    progress: state.totalSeconds > 0 ? ((state.totalSeconds - state.remainingSeconds) / state.totalSeconds) * 100 : 0,
  };

  return (
    <FocusContext.Provider value={value}>
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  const ctx = useContext(FocusContext);
  if (!ctx) throw new Error('useFocus must be used within FocusProvider');
  return ctx;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default FocusContext;
