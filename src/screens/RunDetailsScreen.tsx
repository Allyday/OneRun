import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ActionButton, Screen } from '../components';
import { RootStackParamList } from '../navigation';
import { Colors, Styles, WINDOW_HEIGHT } from '../constants';

type RunDetailsProps = NativeStackScreenProps<RootStackParamList, 'RunDetails'>;

const RunDetailsScreen = ({ navigation }: RunDetailsProps) => {
  const onPressSave = () => {
  };

  return (
    <Screen>
      <View style={styles.bodyContainer}>
        <Text style={styles.questionText}>Input run details</Text>
        <TextInput
          placeholder="Distance"
          style={Styles.textInput}
          placeholderTextColor={Colors.darkGrey}
        />
        <TextInput
          placeholder="Timing"
          style={Styles.textInput}
          placeholderTextColor={Colors.darkGrey}
        />
      </View>
      <ActionButton
        title="next" onPress={onPressSave}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    paddingTop: WINDOW_HEIGHT * 0.1,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '500',
  },
});

export default RunDetailsScreen;
