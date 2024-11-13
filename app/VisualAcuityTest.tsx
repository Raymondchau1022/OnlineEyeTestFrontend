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
      <View style={styles.container}>
        <Text style={styles.questionText}> 
          {selectedEye === 'left' ? 'Left' : 'Right'} eye: Question {currentQuestionIndex} of 7
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
      <View style={styles.container}>
        <Text style={styles.resultText}>Test Complete Results:</Text>
        <View style={styles.shadowContainer}>
          <ScrollView style={styles.resultsContainer}>
            {answers.map((answer, index) => (
              <View key={index} style={styles.resultItem}>
                <Text style={styles.resultTextCommon}>
                  {(index < 7) ? 
                    `Left eye question ${index + 1}:` : 
                    `Right eye question ${index - 6}:`}
                </Text>
                <Text style={styles.resultTextCommon}>User Answer: {answer.userAnswer}</Text>
                <Text style={styles.resultTextCommon}>Correct Answer: {answer.roundAnswer}</Text>
                <Text style={[
                  styles.resultTextCommon, 
                  answer.userAnswer === answer.roundAnswer ? styles.correct : styles.incorrect
                ]}>
                  {answer.userAnswer === answer.roundAnswer ? 'Correct' : 'Incorrect'}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
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
  },
  questionText: {
    fontSize: 24,
    color: '#333', // Dark gray text color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 28,
    marginBottom: 40,
    color: '#007AFF', // iOS blue color
  },
  shadowContainer: {
    maxHeight: '70%',
    width: '100%',
    padding: 50,
    backgroundColor: '#fff', // White background for shadow container
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5,
    
  },
  resultsContainer: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  resultItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  resultTextCommon: {
    fontSize: 18, 
    color: '#333', 
  },
  correct: {
    color: '#4CAF50', // Green for correct answers
  },
  incorrect: {
    color: '#F44336', // Red for incorrect answers
  },
});

export default VisualAcuityTest;
