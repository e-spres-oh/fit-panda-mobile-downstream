import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Screen from '../components/layout/Screen';
import { IStore, RootContext } from '../stores/rootStore';
import { Routes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { useNavigation } from '@react-navigation/native';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const HomeScreen: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const user = rootStore.getUser();
  const navigation = useNavigation<RoutePropType>();

  return (
    <Screen>
      <View style={styles.container}>
        <Text>{`Welcome ${user.name}\n\n`}</Text>
        <Text>{JSON.stringify(user, null, 2)} </Text>
        <Button
          onPress={() => {
            navigation.navigate(Routes.AddFood);
          }}
        >
          Add Food
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  logo: {
    width: '20%',
  },
});

export default HomeScreen;
