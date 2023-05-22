import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DefaultTheme, MD3Theme, Provider as PaperProvider } from 'react-native-paper';
import { Routes } from './src/routes/routes';
import { RouteParams } from './src/routes/types';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import UserInfoScreen from './src/screens/UserInfoScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import UserActivityLevelScreen from './src/screens/UserActivityLevelScreen';
import UserGoalScreen from './src/screens/UserGoal';
import SignUpCongratsScreen from './src/screens/SignUpCongrats';
import { IStore, RootContext, RootStore } from './src/stores/rootStore';
import HomeScreen from './src/screens/HomeScreen';

const colors = {
  primary: '#5589f8',
  background: '#edf1f5',
};

const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
    surfaceVariant: '#fff',
    secondaryContainer: '#fff',
  },
  roundness: 1,
};

const Stack = createStackNavigator<RouteParams>();

export default function App() {
  const [store] = React.useState<IStore>(new RootStore());
  return (
    <RootContext.Provider value={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={Routes.Welcome}>
            <Stack.Screen
              name={Routes.Welcome}
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Routes.Login}
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={Routes.SignUp}
              component={SignUpScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={Routes.UserInfo}
              component={UserInfoScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={Routes.UserActivityLevel}
              component={UserActivityLevelScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={Routes.UserGoal}
              component={UserGoalScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={Routes.SignUpCongrats}
              component={SignUpCongratsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={Routes.Home}
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </RootContext.Provider>
  );
}
