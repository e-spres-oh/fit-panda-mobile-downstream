import { DependencyList, useEffect } from 'react';
import { BackHandler } from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export function useBackHardwareButtonAndGestureHandler<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList & string
>(onGoBackCallback: () => boolean | null | undefined, deps?: DependencyList) {
  const navigation = useNavigation<StackNavigationProp<ParamList, RouteName>>();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onGoBackCallback);
    navigation.addListener('gestureStart', onGoBackCallback);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onGoBackCallback);
      navigation.removeListener('gestureStart', onGoBackCallback);
    };
  }, [navigation, onGoBackCallback, deps]);
}
