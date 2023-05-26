import React from 'react';
import { DependencyList, useEffect } from 'react';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import HeaderButton from '../components/HeaderButton';

export function useBackSoftwareButton<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList & string
>(onGoBackCallback: () => boolean, deps?: DependencyList) {
  const navigation = useNavigation<StackNavigationProp<ParamList, RouteName>>();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButton
          onPress={() => {
            if (!onGoBackCallback()) {
              navigation.goBack();
            }
          }}
        />
      ),
    });
  }, [onGoBackCallback, navigation, deps]);
}
