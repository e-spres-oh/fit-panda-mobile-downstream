import { StackNavigationProp } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';
import { useNavigation } from '@react-navigation/native';
import { Photo } from '../types';
import Screen from '../components/layout/Screen';
import CameraComponent from '../components/CameraComponent';
import { CameraCapturedPicture } from 'expo-camera';
import { IStore, RootContext } from '../stores/rootStore';

type RoutePropType = StackNavigationProp<RouteParams, Routes.AddFood>;

const AddFoodScreen: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const [name, setName] = useState('');
  const [kcal, setKcal] = useState(0);
  const [image, setImage] = useState<CameraCapturedPicture | null>(null);
  const navigation = useNavigation<RoutePropType>();
  const [showCamera, setShowCamera] = useState(false);

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

  return (
    <>
      <Screen>
        <View style={styles.container}>
          <View>
            <TouchableOpacity onPress={() => setShowCamera(true)}>
              <View style={styles.imageContainer}>
                {image ? (
                  <Image
                    source={{ uri: image.uri }}
                    style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'cover' }}
                  />
                ) : (
                  <Text>Add Image</Text>
                )}
              </View>
            </TouchableOpacity>

            <TextInput
              label="Food name"
              value={name}
              onChangeText={setName}
              style={{ marginBottom: 16 }}
              underlineStyle={{ display: 'none' }}
            />

            <TextInput
              label="Kcal"
              keyboardType="numeric"
              value={kcal ? kcal.toString() : ''}
              onChangeText={(v) => setKcal(v ? parseInt(v) : 0)}
              style={{ width: '30%' }}
              underlineStyle={{ display: 'none' }}
            />
          </View>

          <Button
            mode="contained"
            style={{ marginTop: 'auto' }}
            onPress={onSubmit}
            disabled={!name}
          >
            Save
          </Button>
        </View>
      </Screen>
      {showCamera && (
        <CameraComponent onPictureTaken={onPictureTacken} onClose={() => setShowCamera(false)} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
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
