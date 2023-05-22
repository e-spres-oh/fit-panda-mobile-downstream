import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Screen from '../components/layout/Screen';
import { IStore, RootContext } from '../stores/rootStore';

const HomeScreen: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const user = rootStore.getUser();

  return (
    <Screen>
      <View style={styles.container}>
        <Text>{`Welcome ${user.name}\n\n`}</Text>
        <Text>{JSON.stringify(user, null, 2)} </Text>
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
