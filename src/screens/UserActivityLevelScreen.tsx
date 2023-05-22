import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { IStore, RootContext } from '../stores/rootStore';
import { UserActivityLevel } from '../types';

type RoutePropType = StackNavigationProp<RouteParams, Routes.UserActivityLevel>;

const UserActivityLevelScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [activityLevel, setActivityLevel] = useState(UserActivityLevel.Low);

  const rootStore = React.useContext<IStore>(RootContext);

  const onNextPressed = () => {
    rootStore.updateStoredUser({ activity: activityLevel });
    navigation.navigate(Routes.UserGoal);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
        <View style={styles.titleContainer}>
          <Title title={'What is your activity level?'} />
        </View>
        <View style={styles.inputFieldsContainer}>
          <Text style={styles.inputLabel}>Little or no activity</Text>
          <Button
            mode="contained"
            style={[
              styles.button,
              UserActivityLevel.Low === activityLevel && { backgroundColor: Colors.selectedButton },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setActivityLevel(UserActivityLevel.Low);
            }}
          >
            Low
          </Button>
          <Text style={styles.inputLabel}>
            Walking or cycling to work, light chores in spare time
          </Text>
          <Button
            mode="contained"
            style={[
              styles.button,
              UserActivityLevel.Moderate === activityLevel && {
                backgroundColor: Colors.selectedButton,
              },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setActivityLevel(UserActivityLevel.Moderate);
            }}
          >
            Moderate
          </Button>
          <Text style={styles.inputLabel}>
            Physical activity throughout the day. Active in spare time
          </Text>
          <Button
            mode="contained"
            style={[
              styles.button,
              UserActivityLevel.High === activityLevel && {
                backgroundColor: Colors.selectedButton,
              },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setActivityLevel(UserActivityLevel.High);
            }}
          >
            High
          </Button>
          <Text style={styles.inputLabel}>
            Physically demanding daily activity, Intense activity in spare time
          </Text>
          <Button
            mode="contained"
            style={[
              styles.button,
              UserActivityLevel.VeryHigh === activityLevel && {
                backgroundColor: Colors.selectedButton,
              },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setActivityLevel(UserActivityLevel.VeryHigh);
            }}
          >
            Very high
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
  titleContainer: {
    flex: 1,
  },
  subtitle: {
    marginTop: 10,
    marginHorizontal: 70,
  },
  inputFieldsContainer: {
    flex: 4,
  },
  inputLabel: {
    fontSize: 15,
    marginHorizontal: 50,
    textAlign: 'center',
    color: Colors.textLabel,
  },
  selectable: {
    height: 48,
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    textAlign: 'center',
    height: 48,
    marginBottom: 20,
    marginTop: 5,
  },
  button: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 0,
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  nextButton: {
    marginTop: 40,
  },
});

export default UserActivityLevelScreen;
