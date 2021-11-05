import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '../redux/hooks';

import { ActionButton, Screen } from '../components';
import { RootStackParamList } from '../navigation';
import { Colors, Styles, WINDOW_HEIGHT } from '../constants';
import { setUserThunk } from '../slices/authSlice';

type GetInfoProps = NativeStackScreenProps<RootStackParamList, 'GetInfo'>;

const GetInfoScreen = ({ navigation }: GetInfoProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useAppDispatch();

  const onPressConfirmNames = () => {
    const user = { firstName, lastName };
    dispatch(setUserThunk(user));
  };

  return (
    <Screen>
      <View style={styles.bodyContainer}>
        <Text style={styles.questionText}>How do we address you?</Text>
        <TextInput
          placeholder="First name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          style={Styles.textInput}
          placeholderTextColor={Colors.darkGrey}
        />
        <TextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={text => setLastName(text)}
          style={Styles.textInput}
          placeholderTextColor={Colors.darkGrey}
        />
      </View>
      <ActionButton
        title="next" onPress={onPressConfirmNames}
        disabled={!firstName.length || !lastName.length}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    paddingTop: WINDOW_HEIGHT * 0.2,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '500',
  },
});

export default GetInfoScreen;
