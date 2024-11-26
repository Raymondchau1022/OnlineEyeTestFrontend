import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native'
import { 
  useEffect, 
  useState,
  useRef
} from 'react'
import {
  Camera,
  useCameraDevice,
  useFrameProcessor
} from 'react-native-vision-camera'
import { 
  Face,
  useFaceDetector,
  FaceDetectionOptions
} from 'react-native-vision-camera-face-detector'
import { Worklets } from 'react-native-worklets-core'

const Testing = () => {
  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    // Face detector options can be customized here
  }).current;

  const device = useCameraDevice('front');
  const { detectFaces } = useFaceDetector(faceDetectionOptions);

  const [distance, setDistance] = useState<number | null>(null); // Store the calculated distance in cm

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log({ status });
    })();
  }, [device]);

  const handleDetectedFaces = Worklets.createRunOnJS((faces: Face[]) => {
    if (faces.length > 0) {
      const face = faces[0]; // Assume the first detected face is the one we measure
      const faceWidth = face.bounds.width;

      // Parameters
      const knownFaceWidthAt1Meter = 300; // Assume face width is 160 pixels at 1 meter
      const focalLength = 110; // Assume camera focal length is 500 pixels

      // Calculate distance
      const calculatedDistanceCm = (knownFaceWidthAt1Meter * focalLength) / faceWidth;

      console.log('Face detected:', face);
      console.log('Calculated distance in cm:', calculatedDistanceCm);

      setDistance(calculatedDistanceCm); // Update distance in cm
    } else {
      console.log('No face detected');
      setDistance(null); // If no face is detected, set distance to null
    }
  });

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    const faces = detectFaces(frame);
    handleDetectedFaces(faces);
  }, [handleDetectedFaces]);

  return (
    <View style={styles.container}>
      {!!device ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
        />
      ) : (
        <Text>No Device</Text>
      )}
      <Text style={styles.distanceText}>
        Distance: {distance ? `${distance.toFixed(2)} cm` : 'N/A'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceText: {
    position: 'absolute',
    bottom: 50,
    color: 'white',
    fontSize: 20,
  },
});

export default Testing;

