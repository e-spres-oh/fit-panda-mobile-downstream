import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  onPress(): void;
}

const HeaderButton: React.FC<Props> = (props) => {
  const { onPress } = props;

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress} activeOpacity={0.9}>
      <Ionicons name="arrow-back" size={32} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
  },
});

export default HeaderButton;
