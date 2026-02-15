import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff } from 'lucide-react';
import './VoiceControl.css';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(isListening);
  const navigate = useNavigate();

  // Sync ref with state
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    // Browser Support Check
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // IMPORTANT: Continuous FALSE for single command mode as per User Request
    // "Speak once -> Navigate -> Disable voice mode"
    recognition.continuous = false; 
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setStatusMessage('Listening...');
    };

    recognition.onend = () => {
        // If we processed a command, isListening will be false, so we stop.
        // If we just stopped speaking without a command, we might want to restart?
        // User Request: "Never re-trigger."
        // So we just stop.
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
    
    recognition.onerror = (event) => {
       console.error("Speech recognition error", event.error);
       if(event.error === 'not-allowed') {
           setIsListening(false);
           setStatusMessage('Microphone access denied');
       }
       // If no-speech, just stop.
       if (event.error === 'no-speech') {
           setIsListening(false);
           setStatusMessage('No speech detected');
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
    
    // Flexible Command Mapping
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
        
        // 3. One-time feedback
        speak(`Opening ${targetLabel}`);
        
        setTimeout(() => {
            navigate(targetPath);
            setTranscript('');
            setStatusMessage('');
        }, 500);
        
    } else {
         // No match logic
         setIsListening(false); 
         setStatusMessage("Command not recognized");
         speak("Sorry, I didn't catch that.");
    }
  };

  if (!isSupported) return null;

  return (
    <div className={`voice-control-container ${isListening ? 'active' : ''}`}>
       <button 
        className={`voice-toggle-btn ${isListening ? 'listening' : ''}`}
        onClick={() => setIsListening(!isListening)}
        title={isListening ? "Stop Listening" : "Start Voice Navigation"}
        style={{ width: isListening ? '180px' : '140px' }} // Dynamic width
      >
        {isListening ? <Mic size={18} className="pulse-anim" /> : <MicOff size={18} />}
        <span className="voice-btn-label">{isListening ? (transcript || 'Listening...') : 'Voice Mode'}</span>
      </button>
    </div>
  );
};

export default VoiceControl;
