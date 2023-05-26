import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';
import { useNavigation } from '@react-navigation/native';
import { Photo } from '../types';
import Screen from '../components/layout/Screen';
import CameraComponent from '../components/CameraComponent';
import { CameraCapturedPicture } from 'expo-camera';
import { IStore, RootContext } from '../stores/rootStore';
import { useBackHardwareButtonAndGestureHandler } from '../hooks/useBackHardwareButtonAndGestureHandler';
import { useBackSoftwareButton } from '../hooks/useBackSoftwareButton';

type RoutePropType = StackNavigationProp<RouteParams, Routes.AddFood>;

const AddFoodScreen: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const [name, setName] = useState('');
  const [kcal, setKcal] = useState(0);
  const [image, setImage] = useState<CameraCapturedPicture | null>(null);
  const navigation = useNavigation<RoutePropType>();
  const [showCamera, setShowCamera] = useState(false);

  const backHandler = useCallback(() => {
    if (showCamera) {
      setShowCamera(false);
      return true;
    }
    return false;
  }, [showCamera]);

  useBackHardwareButtonAndGestureHandler(backHandler);

  useBackSoftwareButton(backHandler);

  const onSubmit = async () => {
    try {
      const foodId = await rootStore.addFood(name, kcal, new Date());
      if (foodId && image) {
        await rootStore.addFoodImage(foodId, { uri: image?.uri, name: '', type: '' } as Photo);
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const onPictureTacken = (picture: CameraCapturedPicture) => {
    setShowCamera(false);
    setImage(picture);
  };

  const openCamera = () => {
    setShowCamera(true);
    Keyboard.dismiss();
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <TouchableOpacity onPress={openCamera}>
              <View style={styles.imageContainer}>
                {image ? (
                  <Image source={{ uri: image.uri }} style={styles.image} />
                ) : (
                  <Text>Add Image</Text>
                )}
              </View>
            </TouchableOpacity>

            <TextInput
              label="Food name"
              value={name}
              onChangeText={setName}
              style={styles.textInput}
              underlineStyle={{ display: 'none' }}
            />

            <TextInput
              label="Kcal"
              keyboardType="numeric"
              value={kcal ? kcal.toString() : ''}
              onChangeText={(v) => setKcal(v ? parseInt(v) : 0)}
              style={[styles.textInput, { width: '30%' }]}
              underlineStyle={{ display: 'none' }}
            />
          </View>
        </View>
      </ScrollView>
      <Button mode="contained" style={styles.button} onPress={onSubmit} disabled={!name}>
        Save
      </Button>
      {showCamera && <CameraComponent onPictureTaken={onPictureTacken} />}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textInput: {
    marginBottom: 16,
    borderRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  button: {
    margin: 20,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    height: Dimensions.get('window').height,
    margin: 16,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    borderStyle: 'dashed',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddFoodScreen;
