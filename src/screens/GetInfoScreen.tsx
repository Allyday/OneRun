import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ActionButton, TouchableWrapper } from '../components';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'GetInfo'>;

const GetInfoScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>This is get info screen!</Text>
      <ActionButton title="next" onPress={() => navigation.navigate('AllRuns')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GetInfoScreen;
