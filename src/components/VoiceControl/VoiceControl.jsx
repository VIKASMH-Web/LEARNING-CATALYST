import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Command, Keyboard, Zap, ChevronRight, Search, Layout, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import './VoiceControl.css';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [toast, setToast] = useState(null); // { message, type: 'activated' | 'disabled' | 'error' }
  
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(isListening);
  const toastTimerRef = useRef(null);
  const navigate = useNavigate();

  const showToast = useCallback((message, type = 'info') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    toastTimerRef.current = setTimeout(() => setToast(null), 2500);
  }, []);

  const toggleListening = useCallback(() => {
    setIsListening(prev => {
      const newState = !prev;
      if (newState) {
        showToast('🎙 Intelligence Engine Active', 'activated');
      } else {
        showToast('Voice Interface Disabled', 'disabled');
      }
      return newState;
    });
  }, [showToast]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    const handler = () => toggleListening();
    window.addEventListener('toggleVoiceMode', handler);
    return () => window.removeEventListener('toggleVoiceMode', handler);
  }, [toggleListening]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false; 
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setStatusMessage('Listening...');
    recognition.onend = () => {
        if (isListeningRef.current) {
            setIsListening(false);
            setStatusMessage('');
        }
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
          handleCommand(finalTranscript);
        } else {
            setTranscript(event.results[i][0].transcript);
        }
      }
    };
    
    recognition.onerror = (e) => {
       setIsListening(false);
       showToast(e.error === 'not-allowed' ? '❌ Microphone permission denied' : 'No speech detected', 'error');
    };
    recognitionRef.current = recognition;
    return () => { if (recognitionRef.current) recognitionRef.current.stop(); };
  }, []); 

  useEffect(() => {
    if (!recognitionRef.current) return;
    if (isListening) {
      try { recognitionRef.current.start(); } catch (e) {}
    } else {
      try { recognitionRef.current.stop(); } catch(e) {}
      setTranscript('');
    }
  }, [isListening]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCommand = (cmd) => {
    const lowerCmd = cmd.toLowerCase().trim();
    const commandMap = {
        'analytics': '/',
        'dashboard': '/',
        'home': '/',
        'practice': '/practice',
        'intelligence': '/practice',
        'reviews': '/reviews',
        'mastery': '/reviews',
        'board': '/reviews',
        'roadmap': '/roadmap',
        'growth': '/roadmap',
        'path': '/roadmap',
        'simulation': '/career-simulator',
        'interview': '/career-simulator',
        'career': '/career-simulator',
        'code': '/code-engine',
        'engine': '/code-engine',
        'profile': '/profile',
        'account': '/profile',
        'help': '/help',
        'support': '/help'
    };

    let targetPath = null;
    let targetLabel = '';
    const keys = Object.keys(commandMap).sort((a, b) => b.length - a.length);
    for (const key of keys) {
        if (lowerCmd.includes(key)) {
            targetPath = commandMap[key];
            targetLabel = key.charAt(0).toUpperCase() + key.slice(1);
            break;
        }
    }

    if (targetPath) {
        setIsListening(false);
        showToast(`✅ Initializing ${targetLabel}`, 'activated');
        speak(`Opening ${targetLabel}`);
        setTimeout(() => {
            navigate(targetPath);
            setTranscript('');
            setStatusMessage('');
        }, 500);
    } else {
         setIsListening(false); 
         showToast("Command unrecognized", 'error');
         speak("Could you repeat that?");
    }
  };

  if (!isSupported) return null;
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <>
      <div className={`voice-control-container ${isListening ? 'active' : ''}`}>
        <button 
          className={`voice-toggle-btn ${isListening ? 'listening' : ''}`}
          onClick={toggleListening}
          style={{ width: isListening ? '220px' : 'auto' }}
        >
          <div className="mic-icon-wrapper">
            {isListening ? <Mic size={16} className="pulse-anim" /> : <Mic size={16} />}
          </div>
          <span className="voice-btn-label">
            {isListening ? (transcript || 'Listening...') : 'Voice Interface'}
          </span>
          {!isListening && (
            <div className="voice-shortcut-hint">
              {isMac ? '⌘' : 'Ctrl'} K
            </div>
          )}
        </button>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`voice-toast voice-toast-${toast.type}`}
          >
            <div className="voice-toast-content">
              {toast.type === 'activated' ? <Zap size={16} fill="white" /> : <ShieldCheck size={16} />}
              <span>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceControl;
