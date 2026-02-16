import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Command, Keyboard } from 'lucide-react';
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

  // Toast helper
  const showToast = useCallback((message, type = 'info') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    toastTimerRef.current = setTimeout(() => setToast(null), 2500);
  }, []);

  // Toggle function (used by both button click and keyboard shortcut)
  const toggleListening = useCallback(() => {
    setIsListening(prev => {
      const newState = !prev;
      if (newState) {
        showToast('🎙 Voice Mode Activated', 'activated');
      } else {
        showToast('Voice Mode Disabled', 'disabled');
      }
      return newState;
    });
  }, [showToast]);

  // Sync ref with state
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  // Listen for global toggleVoiceMode event (from Cmd+K / Ctrl+K)
  useEffect(() => {
    const handler = () => toggleListening();
    window.addEventListener('toggleVoiceMode', handler);
    return () => window.removeEventListener('toggleVoiceMode', handler);
  }, [toggleListening]);

  useEffect(() => {
    // Browser Support Check
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // IMPORTANT: Continuous FALSE for single command mode
    // "Speak once -> Navigate -> Disable voice mode"
    recognition.continuous = false; 
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setStatusMessage('Listening...');
    };

    recognition.onend = () => {
        if (isListeningRef.current) {
            setIsListening(false);
            setStatusMessage('');
            showToast('Voice Mode Disabled', 'disabled');
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
    
    recognition.onerror = (event) => {
       console.error("Speech recognition error", event.error);
       if(event.error === 'not-allowed') {
           setIsListening(false);
           setStatusMessage('Microphone access denied');
           showToast('❌ Microphone access denied', 'error');
       }
       if (event.error === 'no-speech') {
           setIsListening(false);
           setStatusMessage('No speech detected');
           showToast('No speech detected', 'disabled');
       }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []); 

  useEffect(() => {
      if (!recognitionRef.current) return;
      
      if (isListening) {
          try {
              recognitionRef.current.start();
          } catch (e) {
              // already started
          }
      } else {
          try {
            recognitionRef.current.stop();
          } catch(e) {}
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
    console.log('Voice Command:', lowerCmd);
    
    const commandMap = {
        'dashboard': '/',
        'home': '/',
        'roadmap': '/roadmaps',
        'road map': '/roadmaps',
        'resources': '/resources',
        'code': '/code-engine',
        'engine': '/code-engine',
        'focus': '/focus',
        'profile': '/profile',
        'account': '/profile',
        'career': '/career-planner',
        'planner': '/career-planner',
        'interview': '/mock-interview',
        'mock': '/mock-interview'
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
        // 1. Stop recognition immediately
        if (recognitionRef.current) recognitionRef.current.stop();
        
        // 2. Set state to false so it doesn't restart
        isListeningRef.current = false;
        setIsListening(false);

        setStatusMessage(`Open ${targetLabel}`);
        showToast(`✅ Navigating to ${targetLabel}`, 'activated');
        
        // 3. One-time feedback
        speak(`Opening ${targetLabel}`);
        
        setTimeout(() => {
            navigate(targetPath);
            setTranscript('');
            setStatusMessage('');
        }, 500);
        
    } else {
         setIsListening(false); 
         setStatusMessage("Command not recognized");
         showToast("Command not recognized", 'error');
         speak("Sorry, I didn't catch that.");
    }
  };

  if (!isSupported) return null;

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <>
      {/* Voice Control Button */}
      <div className={`voice-control-container ${isListening ? 'active' : ''}`}>
        <button 
          className={`voice-toggle-btn ${isListening ? 'listening' : ''}`}
          onClick={toggleListening}
          title={isListening ? "Stop Listening (⌘K)" : "Start Voice Navigation (⌘K)"}
          style={{ width: isListening ? '200px' : '160px' }}
        >
          {isListening ? (
            <Mic size={18} className="pulse-anim" />
          ) : (
            <MicOff size={18} />
          )}
          <span className="voice-btn-label">
            {isListening ? (transcript || 'Listening...') : 'Voice Mode'}
          </span>
          {/* Keyboard shortcut badge */}
          {!isListening && (
            <span className="voice-shortcut-badge">
              {isMac ? '⌘' : 'Ctrl'} K
            </span>
          )}
        </button>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`voice-toast voice-toast-${toast.type}`}>
          <div className="voice-toast-content">
            {toast.type === 'activated' && <Mic size={16} className="pulse-anim" />}
            {toast.type === 'disabled' && <MicOff size={16} />}
            {toast.type === 'error' && <MicOff size={16} />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceControl;
