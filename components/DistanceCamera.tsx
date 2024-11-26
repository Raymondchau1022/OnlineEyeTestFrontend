import { useEffect, useRef } from 'react';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor
} from 'react-native-vision-camera';
import { 
  Face,
  useFaceDetector,
  FaceDetectionOptions
} from 'react-native-vision-camera-face-detector';
import { Worklets } from 'react-native-worklets-core';

interface DistanceCameraProps {
  onDistanceChange: (distance: number | null) => void; // Callback to pass distance
}

const DistanceCamera = ({ onDistanceChange }: DistanceCameraProps) => {
  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    // Customize face detector options if needed
  }).current;

  const device = useCameraDevice('front');
  const { detectFaces } = useFaceDetector(faceDetectionOptions);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log({ status });
    })();
  }, [device]);

  const handleDetectedFaces = Worklets.createRunOnJS((faces: Face[]) => {
    if (faces.length > 0) {
      const face = faces[0];
      const faceWidth = face.bounds.width;

      // Parameters
      const knownFaceWidthAt1Meter = 300; // Assume face width is 300 pixels at 1 meter
      const focalLength = 110; // Assume camera focal length is 110 pixels

      // Calculate distance
      const calculatedDistanceCm = (knownFaceWidthAt1Meter * focalLength) / faceWidth;

      console.log('Calculated distance in cm:', calculatedDistanceCm);

      onDistanceChange(calculatedDistanceCm); // Pass distance to parent
    } else {
      console.log('No face detected');
      onDistanceChange(null); // Pass null if no face detected
    }
  });

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const faces = detectFaces(frame);
    handleDetectedFaces(faces);
  }, [handleDetectedFaces]);

  return device ? (
    <Camera
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
    />
  ) : null; // Return null if no device is available
};

export default DistanceCamera;

