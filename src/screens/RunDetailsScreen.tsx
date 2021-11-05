import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Platform, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IconButton } from 'react-native-paper';

import { ActionButton, Screen } from '../components';
import { RootStackParamList } from '../navigation';
import { getTimeString } from '../utils';
import { Colors, Styles, WINDOW_HEIGHT, HORIZONTAL_PADDING } from '../constants';
import { addRunThunk, deleteRunByIdThunk, editRunThunk } from '../slices/runSlice';

type RunDetailsProps = NativeStackScreenProps<RootStackParamList, 'RunDetails'>;

const RunDetailsScreen = ({ route, navigation }: RunDetailsProps) => {
  const [distance, setDistance] = useState<string>('');
  const [time, setTime] = useState<Date>();
  const [show, setShow] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);

  const { runs } = useAppSelector(state => state.run);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setEditMode(!!route.params?.editedItemId);
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const editedItem = runs.find(run => run.id === route.params?.editedItemId);
      if (editedItem) {
        setDistance(editedItem.distance.toString());
        setTime(editedItem.time);
      }
    };
  }, [isEditMode]);

  const onDelete = () => {
    Alert.alert(
      "Are you sure?",
      "If you delete this entry, it cannot be undone.",
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            route.params?.editedItemId && dispatch(deleteRunByIdThunk(route.params?.editedItemId));
            navigation.pop();
          },
          style: 'destructive',
        }
      ]
    );
  };

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
    if (isEditMode && route.params?.editedItemId) {
      const editedRun = {
        id: route.params?.editedItemId,
        distance: +distance,
        time: time || new Date(),
      }
      dispatch(editRunThunk(editedRun));
    } else {
      dispatch(addRunThunk(+distance, time || new Date()));
    }
    navigation.pop();
  };

  return (
    <Screen>
      <View style={styles.header}>
        {isEditMode && <IconButton
          icon="delete"
          color={Colors.secondary}
          size={24}
          onPress={onDelete}
        />}
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.questionText}>{isEditMode ? 'Edit' : 'Input'} run details</Text>
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
        title={isEditMode ? 'update' : 'save'} onPress={onPressSave}
        disabled={!time || !distance.length}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    height: WINDOW_HEIGHT * 0.1,
    alignItems: 'flex-end',
  },
  bodyContainer: {
    flex: 1,
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
