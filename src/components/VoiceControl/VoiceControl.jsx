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
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setStatusMessage('Listening...');
    };

    recognition.onend = () => {
      // Only restart if we are still supposed to be listening
      // AND we didn't just manually stop it in handleCommand which sets isListeningRef to false
      if (isListeningRef.current) {
        try {
            recognition.start();
        } catch (e) {
            // ignore
        }
      } else {
        setStatusMessage('');
      }
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
          handleCommand(finalTranscript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      if (interimTranscript) {
           setTranscript(interimTranscript);
           setStatusMessage(''); 
      } else if (finalTranscript) {
           setTranscript(finalTranscript);
      }
    };
    
    recognition.onerror = (event) => {
       console.error("Speech recognition error", event.error);
       if(event.error === 'not-allowed') {
           setIsListening(false);
           setStatusMessage('Microphone access denied');
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
          recognitionRef.current.stop();
          setTranscript('');
          setStatusMessage('');
      }
  }, [isListening]);

  const handleCommand = (cmd) => {
    const lowerCmd = cmd.toLowerCase().trim();
    console.log('Voice Command:', lowerCmd);
    
    // Flexible Command Mapping
    const commandMap = {
        'dashboard': '/',
        'home': '/',
        'roadmap': '/roadmaps',
        'roadmaps': '/roadmaps',
        'road map': '/roadmaps',
        'road maps': '/roadmaps',
        'resources': '/resources',
        'code': '/code-engine',
        'engine': '/code-engine',
        'focus': '/focus',
        'profile': '/profile',
        'account': '/profile'
    };

    let targetPath = null;
    let targetLabel = '';

    // Check if spoken text contains any key
    // We sort keys by length descending to match specific phrases first if overlaps exist (e.g. "code engine" vs "code")
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
        if (recognitionRef.current) {
            recognitionRef.current.abort();
        }
        
        // 2. Turn OFF Voice Mode
        setIsListening(false);
        isListeningRef.current = false;
        
        setStatusMessage(`Opening ${targetLabel}...`);
        speak(`Opening ${targetLabel}`);
        
        // 3. Navigate
        setTimeout(() => {
            navigate(targetPath);
            setTranscript('');
            setStatusMessage('');
        }, 800);
        
    } else {
        if (lowerCmd.length > 0) {
             setStatusMessage("Sorry, I didn't understand that command.");
             speak("Sorry, I didn't understand that command.");
             
             // Clear error after 2s
             setTimeout(() => {
                 if(isListeningRef.current) setStatusMessage('Listening...');
             }, 2000);
        }
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) return null;

  return (
    <div className={`voice-control-container ${isListening ? 'active' : ''}`}>
       <button 
        className={`voice-toggle-btn ${isListening ? 'listening' : ''}`}
        onClick={() => setIsListening(!isListening)}
        title={isListening ? "Stop Listening" : "Start Voice Navigation"}
      >
        {isListening ? <Mic size={18} /> : <MicOff size={18} />}
        <span className="voice-btn-label">{isListening ? 'Listening...' : 'Voice Mode'}</span>
      </button>
      
      {isListening && (
        <div className="voice-status">
            <div className="voice-feedback">
                <div className="voice-indicator"></div>
                <span className="voice-text">
                   {transcript ? `"${transcript}"` : statusMessage}
                </span>
            </div>
        </div>
      )}
    </div>
  );
};

export default VoiceControl;
