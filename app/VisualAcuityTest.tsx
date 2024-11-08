import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';


const VisualAcuityTest = () => {




  return (
    <View style={styles.container}>
        <View style={styles.overlay}>
          <Image 
            source={require('../assets/images/tumblingE.png')} 
            style={[styles.eSymbol, { transform: [{ rotate: `${Math.floor(Math.random() * 8) * 45}deg` }] }]}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'Write',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eSymbol: {
    width: 100,
    height: 100,
  },
  warningText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default VisualAcuityTest;
