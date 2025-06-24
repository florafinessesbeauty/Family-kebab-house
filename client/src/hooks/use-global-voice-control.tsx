import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Type declarations for SpeechRecognition API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface VoiceControlCommands {
  [key: string]: () => void;
}

export function useGlobalVoiceControl() {
  const navigate = useNavigate();

  const commands: VoiceControlCommands = {
    'go home': () => navigate('/'),
    'show menu': () => navigate('/menu'),
    'nutrition info': () => navigate('/nutritional-info'),
    'nutritional information': () => navigate('/nutritional-info'),
    'about us': () => navigate('/about'),
    'contact us': () => navigate('/contact'),
    'call restaurant': () => window.open('tel:01692584100', '_self'),
    'phone number': () => window.open('tel:01692584100', '_self'),
    'scroll up': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    'scroll down': () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
    'go back': () => window.history.back(),
    'refresh page': () => window.location.reload(),
  };

  const processVoiceCommand = useCallback((transcript: string) => {
    const normalizedTranscript = transcript.toLowerCase().trim();
    
    // Check for exact matches first
    if (commands[normalizedTranscript]) {
      commands[normalizedTranscript]();
      return true;
    }

    // Check for partial matches
    for (const [command, action] of Object.entries(commands)) {
      if (normalizedTranscript.includes(command)) {
        action();
        return true;
      }
    }

    // Menu-specific commands
    if (normalizedTranscript.includes('show') || normalizedTranscript.includes('find')) {
      if (normalizedTranscript.includes('burger') || normalizedTranscript.includes('burgers')) {
        navigate('/menu');
        setTimeout(() => {
          const burgersButton = document.querySelector('[aria-label*="burgers"]') as HTMLElement;
          if (burgersButton) burgersButton.click();
        }, 500);
        return true;
      }
      
      if (normalizedTranscript.includes('pizza') || normalizedTranscript.includes('pizzas')) {
        navigate('/menu');
        setTimeout(() => {
          const pizzasButton = document.querySelector('[aria-label*="pizzas"]') as HTMLElement;
          if (pizzasButton) pizzasButton.click();
        }, 500);
        return true;
      }
      
      if (normalizedTranscript.includes('kebab') || normalizedTranscript.includes('kebabs')) {
        navigate('/menu');
        setTimeout(() => {
          const kebabsButton = document.querySelector('[aria-label*="kebabs"]') as HTMLElement;
          if (kebabsButton) kebabsButton.click();
        }, 500);
        return true;
      }
      
      if (normalizedTranscript.includes('chicken')) {
        navigate('/menu');
        setTimeout(() => {
          const chickenButton = document.querySelector('[aria-label*="fried-chicken"]') as HTMLElement;
          if (chickenButton) chickenButton.click();
        }, 500);
        return true;
      }
    }

    return false;
  }, [navigate]);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Voice command:', transcript);
      
      const commandExecuted = processVoiceCommand(transcript);
      
      if (commandExecuted) {
        // Provide audio feedback
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance('Command executed');
          utterance.rate = 0.8;
          utterance.volume = 0.7;
          window.speechSynthesis.speak(utterance);
        }
      } else {
        // Provide feedback for unrecognized commands
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance('Command not recognized. Try saying go home, show menu, or nutrition info');
          utterance.rate = 0.8;
          utterance.volume = 0.7;
          window.speechSynthesis.speak(utterance);
        }
      }
    };

    recognition.onerror = (event) => {
      // Only log actual errors, not user cancellations or expected states
      if (event.error !== 'aborted' && event.error !== 'no-speech' && event.error !== 'network') {
        console.error('Speech recognition error:', event.error);
      }
    };

    recognition.start();
  }, [processVoiceCommand]);

  return { startListening, processVoiceCommand };
}