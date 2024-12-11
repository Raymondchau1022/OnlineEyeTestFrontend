import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';
import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice'; // Import the voice recognition library

export default function SpeechToText() {
  // State to track if speech recognition has started
  let [voiceInputstarted, setStarted] = useState(false);
  // Store the results of the speech recognition
  let [results, setResults] = useState([]);

  useEffect(() => {
    // Set up event listeners for speech recognition
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      // Cleanup listeners
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const startSpeechToText = async () => {
      await Voice.start("zh-HK"); // Start recognizing speech in Cantonese
      setStarted(true); // Update state to indicate recognition has started
      setResults([]);
  };

  // Function to stop speech recognition
  const stopSpeechToText = async () => {

      await Voice.destroy(); // Stop the speech recognition
      setStarted(false); // Update state to indicate recognition has stopped
  };

  // Function to handle successful speech recognition results
  const onSpeechResults = (event) => {
    const keywordActions = {
      '上': 'Top',
      '下': 'Bottom',
      '左': 'Left',
      '右': 'Right',
    };

    const recognizedWords = event.value || [];
    const action = recognizedWords.reduce((acc, value) => {
      return acc || Object.keys(keywordActions).find(keyword => value.includes(keyword)) || null;
    }, null);

    if (action) {
      setResults([keywordActions[action]]);
      Voice.destroy();
      setStarted(false);
      setTimeout(() => Voice.start("zh-HK"), 1500);
      setStarted(true);
      console.log(`Action: ${keywordActions[action]}`);
    }
  };

  // Function to handle errors during speech recognition
  const onSpeechError = (error) => {
    console.log(error);
  };

  // Render the UI
  return {
    results,
    startSpeechToText,
    stopSpeechToText,
    setStarted,
    voiceInputstarted,
  };
}




