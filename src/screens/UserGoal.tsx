import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { UserGoal } from '../types';
import { IStore, RootContext } from '../stores/rootStore';

type RoutePropType = StackNavigationProp<RouteParams, Routes.UserGoal>;

const UserGoalScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [goal, setUserGoal] = useState(UserGoal.LoseWeight);

  const rootStore = React.useContext<IStore>(RootContext);

  const onNextPressed = () => {
    navigation.navigate(Routes.SignUpCongrats);
    rootStore.updateStoredUser({ goal });
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
        <Title title={'What is your goal?'} />
        <View style={styles.inputFieldsContainer}>
          <Button
            mode="contained"
            style={[
              styles.button,
              UserGoal.LoseWeight === goal && { backgroundColor: Colors.selectedButton },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setUserGoal(UserGoal.LoseWeight);
            }}
          >
            Lose weight
          </Button>

          <Button
            mode="contained"
            style={[
              styles.button,
              UserGoal.MaintainWeight === goal && {
                backgroundColor: Colors.selectedButton,
              },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setUserGoal(UserGoal.MaintainWeight);
            }}
          >
            Maintain Weight
          </Button>

          <Button
            mode="contained"
            style={[
              styles.button,
              UserGoal.GainWeight === goal && {
                backgroundColor: Colors.selectedButton,
              },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setUserGoal(UserGoal.GainWeight);
            }}
          >
            Gain Weight
          </Button>

          <Button mode="contained" style={styles.nextButton} onPress={onNextPressed}>
            Next
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
});

export default UserGoalScreen;
