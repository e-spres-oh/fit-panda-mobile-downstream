import * as React from 'react';
import { Button, StyleProp, StyleSheet, Text, TextStyle, View, Image } from 'react-native';
import { Colors } from '../constants';
import { useState } from 'react';
import { Camera, CameraCapturedPicture, CameraType, PermissionStatus } from 'expo-camera';

interface CameraProps {
  onPictureTaken: (image: CameraCapturedPicture) => void;
  onClose: () => void;
}

const CameraComponent: React.FC<CameraProps> = (props) => {
  const { onPictureTaken, onClose } = props;

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [image, setImage] = useState<CameraCapturedPicture | null>(null);
  const [type, setType] = useState((Camera.Constants.Type = CameraType.back));

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

  //If the object is null the app only renders a empty View
  if (hasCameraPermission === null) {
    return <View />;
  }

  //If the user hasn't granted permission for camera a text message is shown
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera ref={(ref) => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={'1:1'} />
      </View>
      <Button title="Take Picture" onPress={takePicture} />
      <Button title="Cancel" onPress={onClose} />
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
});
