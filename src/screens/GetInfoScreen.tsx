import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ActionButton } from '../components';
import { RootStackParamList } from '../navigation';

type GetInfoProps = NativeStackScreenProps<RootStackParamList, 'GetInfo'>;

const GetInfoScreen = ({ navigation }: GetInfoProps) => {
  const onPressConfirmNames = () => {
    navigation.navigate('AllRuns');
  };

  return (
    <View style={styles.container}>
      <Text>This is get info screen!</Text>
      <ActionButton title="next" onPress={onPressConfirmNames} />
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
