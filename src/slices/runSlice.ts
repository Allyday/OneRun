import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Storage } from '../constants';

import { Run } from '../models';

export interface RunState {
  runs: Run[],
  current: Run | null;
};

const initialState: RunState = {
  runs: [],
  current: null,
};

export const runSlice = createSlice({
  name: 'run',
  initialState,
  reducers: {
    setRuns: (state, action: PayloadAction<Run[]>) => {
      state.runs = action.payload;
    },
    addRun: (state, action: PayloadAction<Run>) => {
      state.runs.push(action.payload);
    },
    setCurrentRun: (state, action: PayloadAction<Run | null>) => {
      state.current = action.payload;
    },
  },
});

export const addRunThunk = (distance: number, time: Date) => {
  return async (dispatch: (arg0: any) => void, getState: any) => {
    const { runs } = getState().run;

    const newRun: Run = {
      id: runs.length + 1,
      distance,
      time,
    };

    dispatch(addRun(newRun));
    await AsyncStorage.setItem(Storage.runs, JSON.stringify(runs));
  }
};

export const { setRuns, addRun, setCurrentRun } = runSlice.actions;

export default runSlice.reducer;
