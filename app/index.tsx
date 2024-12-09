import React, { useState, useEffect } from 'react';
import { Button, Linking, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useCameraPermissions } from 'expo-camera';

const HomeScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [started, setStarted] = useState<boolean>(false);

  const router = useRouter();

  const handleStartPress = () => {
    // setStarted(true);
    // router.push('/StartScreen'); // Navigate to StartScreen
    router.push('/TermsOfAgreement'); // Navigate to Terms of Agreement
    };

  const handlePermissionPress = () => {
    requestPermission();
    if (permission && !permission.canAskAgain) {
      Linking.openSettings();
    }
  }

  useEffect(() => {
    if (started && permission && permission.granted) {
      router.push('/VisualAcuityTest');
      //router.push('/testing');
    }
  }, [permission, started, router]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  return (
    <View style={styles.container}>
      {!started ? 
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Online Eye Test</Text>
        <Text style={styles.instructions}>
          This app will help you test your visual acuity using the logMAR scale with a tumbling E-test.
          Please ensure you are in a well-lit environment and follow the instructions carefully.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleStartPress}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
      : 
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
          <Button onPress={handlePermissionPress} title="Grant Permission" />
      </View>
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});

export default HomeScreen;
