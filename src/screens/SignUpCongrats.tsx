import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import Subtitle from '../components/Subtitle';
import { IStore, RootContext } from '../stores/rootStore';

type RoutePropType = StackNavigationProp<RouteParams, Routes.SignUpCongrats>;

const SignUpCongratsScreen: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const navigation = useNavigation<RoutePropType>();
  const [kcal, setKcal] = useState(Math.round(rootStore.computeTDEE()).toString());

  const onStartPressed = async () => {
    try {
      rootStore.updateStoredUser({ target: parseInt(kcal, 10) });
      await rootStore.updateUser(rootStore.getUser());
      navigation.navigate(Routes.Home);
    } catch (e) {
      console.log(e);
      navigation.navigate(Routes.UserInfo);
    }
  };
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
        <Title title={'Congratulations!'} />
        <Subtitle
          subtitle={'Your custom plan is ready and you’re one step closer to your goal weight'}
          style={styles.subtitle}
        />
        <View style={styles.inputFieldsContainer}>
          <Text style={styles.inputLabel}>Your KCals allowance per day is</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter kcals"
            value={kcal}
            onChangeText={setKcal}
            mode="outlined"
            outlineStyle={styles.inputField}
            keyboardType="numeric"
          />

          <Button mode="contained" style={styles.nextButton} onPress={onStartPressed}>
            Start your journey!
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
  inputFieldsContainer: {
    flex: 3,
    marginTop: 30,
  },
  button: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 0,
    justifyContent: 'center',
    marginTop: 10,
  },
  nextButton: {
    marginTop: 40,
  },
  inputLabel: {
    fontSize: 15,
    marginHorizontal: 50,
    textAlign: 'center',
    color: Colors.textLabel,
  },
  inputField: {
    borderRadius: 5,
    backgroundColor: Colors.inputBackground,
    borderWidth: 0,
  },
  input: {
    textAlign: 'center',
    height: 48,
    marginBottom: 20,
    marginTop: 5,
  },
  subtitle: {
    marginTop: 10,
    marginHorizontal: 50,
  },
});

export default SignUpCongratsScreen;
