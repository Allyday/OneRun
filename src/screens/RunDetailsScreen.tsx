import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Platform, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ActionButton, Screen } from '../components';
import { RootStackParamList } from '../navigation';
import { getTimeString } from '../utils';
import { Colors, Styles, WINDOW_HEIGHT } from '../constants';

type RunDetailsProps = NativeStackScreenProps<RootStackParamList, 'RunDetails'>;

const RunDetailsScreen = ({ navigation }: RunDetailsProps) => {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState();
  const [show, setShow] = useState(false);

  const onChangeDistance = (text: string) => {
    if (!Number.isNaN(+text)) setDistance(text);
  };

  const toggleTimePicker = () => {
    setShow(current => !current);
  };

  const onChangeTime = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const onPressSave = () => {
    navigation.pop();
  };

  return (
    <Screen>
      <View style={styles.bodyContainer}>
        <Text style={styles.questionText}>Input run details</Text>
        <TextInput
          value={distance}
          onChangeText={onChangeDistance}
          placeholder="Distance (km)"
          style={Styles.textInput}
          placeholderTextColor={Colors.darkGrey}
          keyboardType="numeric"
        />
        <TouchableWithoutFeedback onPress={toggleTimePicker}>
          <View style={Styles.textInput}>
            {time ? <Text>{getTimeString(time)}</Text> : <Text style={styles.placeholderText}>Timing</Text>}
            {show && (
              <DateTimePicker
                value={time || new Date()}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={onChangeTime}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ActionButton
        title="save" onPress={onPressSave}
        disabled={!time || !distance.length}
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
  placeholderText: {
    color: Colors.darkGrey,
  },
});

export default RunDetailsScreen;
