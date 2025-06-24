// Type declarations for SpeechRecognition API

export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

export interface SpeechRecognitionInterface extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onerror: ((this: SpeechRecognitionInterface, ev: SpeechRecognitionErrorEvent) => any) | null;
  onresult: ((this: SpeechRecognitionInterface, ev: SpeechRecognitionEvent) => any) | null;
  onstart: ((this: SpeechRecognitionInterface, ev: Event) => any) | null;
  onend: ((this: SpeechRecognitionInterface, ev: Event) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new(): SpeechRecognitionInterface;
    };
    webkitSpeechRecognition: {
      new(): SpeechRecognitionInterface;
    };
  }
}

export {};