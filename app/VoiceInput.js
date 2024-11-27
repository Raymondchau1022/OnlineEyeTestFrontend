// useVoiceInput.ts
import { useState, useEffect } from 'react';
import Voice from '@react-native-voice/voice';

interface VoiceInputOptions {
  language?: string;
  onResult?: (text: string) => void;
}

export const useVoiceInput = (options: VoiceInputOptions = {}) => {
  const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const {
    language = 'zh-HK',
    onResult
  } = options;

  useEffect(() => {
    // Set up voice recognition listeners
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);

    // Start speech recognition
    startSpeechToText();

    // Cleanup on unmount
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [language]);

  const startSpeechToText = async () => {
    try {
      await Voice.start(language);
    } catch (err) {
      console.error("Speech recognition start error", err);
      setError(err);
    }
  };

  const onSpeechResults = (event) => {
    const recognizedTexts = event.value;
    setResults(recognizedTexts);

    // Call custom result handler if provided
    if (onResult && recognizedTexts.length > 0) {
      onResult(recognizedTexts[0]);
    }
  };

  const onSpeechError = (error) => {
    console.error("Speech Recognition Error:", error);
    setError(error);
    setIsListening(false);
  };

  // Manual control methods
  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (err) {
      console.error("Error stopping voice recognition", err);
    }
  };

  const restartListening = async () => {

      setResults([]);

    
  };

  return {
    result: results.length > 0 ? results[0] : '',
    isListening,
    error,
    setResults,
    startSpeechToText,
    stopListening,
    restartListening
  };
};