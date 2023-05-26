import * as React from 'react';
import {
  Button,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors } from '../constants';
import { useState } from 'react';
import { Camera, CameraCapturedPicture, CameraType, PermissionStatus } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CameraProps {
  onPictureTaken: (image: CameraCapturedPicture) => void;
}

const CameraComponent: React.FC<CameraProps> = (props) => {
  const { onPictureTaken } = props;

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);

  React.useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === PermissionStatus.GRANTED);
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      onPictureTaken(data);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={CameraType.back}
          ratio={'1:1'}
        />
      </View>
      <TouchableOpacity onPress={takePicture} style={styles.cameraButtonContainer}>
        <Ionicons name="camera" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    left: 0,
    top: 0,
    margin: 0,
    padding: 0,
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: Colors.background,
  },
  cameraContainer: {
    flex: 1,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  cameraButtonContainer: {
    position: 'absolute',
    bottom: 100,
    width: 64,
    left: Dimensions.get('window').width / 2 - 32,
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
