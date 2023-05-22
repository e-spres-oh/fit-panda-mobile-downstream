import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Text, TextInput } from 'react-native-paper';

import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { UserProfile, UserSex } from '../types';
import { IStore, RootContext } from '../stores/rootStore';

type RoutePropType = StackNavigationProp<RouteParams, Routes.UserInfo>;

const UserInfoScreen: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const navigation = useNavigation<RoutePropType>();
  const [userSex, setUserSex] = useState<UserSex>('male');
  const [userInfo, setUserInfo] = useState<Partial<UserProfile>>({
    height: 170,
    weight: 80,
    age: 40,
  });

  const onNextPressed = () => {
    rootStore.updateStoredUser({
      sex: userSex,
      height: userInfo.height,
      age: userInfo.age,
      weight: userInfo.weight,
    });
    navigation.navigate(Routes.UserActivityLevel);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
        <Title title={'Welcome!'} />
        <Subtitle subtitle={'Let’s customize Fit Panda for your Goals'} style={styles.subtitle} />
        <View style={styles.inputFieldsContainer}>
          <Text style={styles.inputLabel}>
            Please select witch sex we should use to calculate your calorie needs
          </Text>
          <SegmentedButtons
            value={userSex}
            onValueChange={(value) => setUserSex(value as UserSex)}
            style={styles.selectable}
            buttons={[
              {
                value: 'male',
                label: 'Male',
                style: {
                  backgroundColor:
                    userSex === 'male' ? Colors.selectedButton : Colors.inputBackground,
                  borderWidth: 0,
                  justifyContent: 'center',
                },
              },
              {
                value: 'female',
                label: 'Female',
                style: {
                  backgroundColor:
                    userSex === 'female' ? Colors.selectedButton : Colors.inputBackground,
                  borderWidth: 0,
                  justifyContent: 'center',
                },
              },
            ]}
          />
          <Text style={styles.inputLabel}>How tall are you?</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            placeholder={'170 cm'}
            value={`${!Number.isNaN(userInfo.height) ? userInfo.height : ''}`}
            keyboardType="numeric"
            onChangeText={(text) => setUserInfo({ ...userInfo, height: parseInt(text, 10) })}
            outlineStyle={styles.inputField}
          />
          <Text style={styles.inputLabel}>How much do you weigh?</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            placeholder="80 kg"
            outlineStyle={styles.inputField}
            value={`${!Number.isNaN(userInfo.weight) ? userInfo.weight : ''}`}
            keyboardType="numeric"
            onChangeText={(text) => setUserInfo({ ...userInfo, weight: parseInt(text, 10) })}
          />
          <Text style={styles.inputLabel}>How old are you?</Text>
          <TextInput
            style={styles.input}
            placeholder="40"
            mode="outlined"
            outlineStyle={styles.inputField}
            value={`${!Number.isNaN(userInfo.age) ? userInfo.age : ''}`}
            keyboardType="numeric"
            onChangeText={(text) => setUserInfo({ ...userInfo, age: parseInt(text, 10) })}
          />

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
    flexDirection: 'column',
  },
  titleContainer: {},
  subtitle: {
    marginTop: 10,
    marginHorizontal: 70,
    marginBottom: 30,
  },
  inputFieldsContainer: {
    flexDirection: 'column',
    flexGrow: 1,
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
  nextButton: {
    marginTop: 40,
  },
});

export default UserInfoScreen;
