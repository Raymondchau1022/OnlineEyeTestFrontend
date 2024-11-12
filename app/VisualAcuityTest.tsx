import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TumblingE from '../components/TumblingE';
import CircularButton from '../components/CircularButton';

type Direction = 'Top' | 'Left' | 'Right' | 'Bottom';

const VisualAcuityTest = () => {
  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [selectedEye, setSelectedEye] = useState('left'); // Or 'right'
  const [roundDirection, setRoundDirection] = useState<Direction>('Top'); //default Direction
  const [answers, setAnswers] = useState<Array<{ userAnswer: Direction; roundAnswer: Direction }>>([]);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleDirectionPress = (direction: Direction) => {
    setSelectedDirection(direction);
    setAnswers((prevAnswers) => {
      return [...prevAnswers, { userAnswer: direction, roundAnswer: roundDirection }];
    });
    if (currentQuestionIndex === 7) {
      if (selectedEye === 'left') {
        setCurrentQuestionIndex(1);
        setSelectedEye('right');
      } else {
        setTestCompleted(true);
      }  
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    setRoundDirection(randomDirection());
  };

  const randomDirection = () => {
    const directions: Direction[] = ['Top', 'Right', 'Bottom', 'Left'];
    const newDirection = directions[Math.floor(Math.random() * directions.length)];
    setRoundDirection(newDirection);
    return newDirection;
  };

  const getSizeForQuestion = (questionNumber: number): number => {
    const sizes = [200, 120, 60, 40, 15, 8, 4];
    return sizes[questionNumber - 1];
  };

  const questionLogic = () => {
    return (
      <View>
        <Text style={styles.questionText}> 
          {selectedEye === 'left' ? 'Left' : 'right'} eye: Question {currentQuestionIndex} of 7
        </Text>
        <TumblingE direction={roundDirection} size={getSizeForQuestion(currentQuestionIndex)} />      
        <CircularButton onDirectionPress={handleDirectionPress} />
        <Text style={{ fontSize: 18, marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
          {selectedDirection ? `Pressed: ${selectedDirection}` : 'Not pressed'}
        </Text>
      </View>
    );  
  };

  const resultDisplay = () => {
    return (
      <View>
        <Text style={styles.resultText}>Test Complete</Text>
        <Text style={styles.resultText}>Results:</Text>
        <ScrollView style={styles.resultsContainer}>
          {answers.map((answer, index) => (
            <View key={index} style={styles.resultItem}>
              <Text>Question {index + 1}:</Text>
              <Text>User Answer: {answer.userAnswer}</Text>
              <Text>Correct Answer: {answer.roundAnswer}</Text>
              <Text style={answer.userAnswer === answer.roundAnswer ? styles.correct : styles.incorrect}>
                {answer.userAnswer === answer.roundAnswer ? 'Correct' : 'Incorrect'}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {testCompleted ? resultDisplay() : questionLogic()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light gray background
    margin: 40,
  },
  questionText: {
    fontSize: 24,
    color: '#333', // Dark gray text color
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 28,
    marginBottom: 20,
    color: '#007AFF', // iOS blue color
  },
  resultsContainer: {
    maxHeight: 300,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff', // White background for results
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  correct: {
    color: '#4CAF50', // Green for correct answers
  },
  incorrect: {
    color: '#F44336', // Red for incorrect answers
  },
});

export default VisualAcuityTest;
