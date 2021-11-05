import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Storage } from '../constants';

import { Run } from '../models';

export interface RunState {
  runs: Run[],
};

const initialState: RunState = {
  runs: [],
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
    editRun: (state, action: PayloadAction<Run>) => {
      const editedRun = action.payload;
      const editedIndex = state.runs.findIndex((run => run.id === editedRun.id));
      state.runs[editedIndex] = editedRun;
    },
    deleteRunById: (state, action: PayloadAction<string>) => {
      const deletedIndex = state.runs.findIndex((run => run.id === action.payload));
      state.runs.splice(deletedIndex, 1);
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

export const editRunThunk = (editedRun: Run) => {
  return async (dispatch: (arg0: any) => void, getState: any) => {
    const { runs } = getState().run;
    dispatch(editRun(editedRun));
    await AsyncStorage.setItem(Storage.runs, JSON.stringify(runs));
  };
};

export const deleteRunByIdThunk = (id: string) => {
  return async (dispatch: (arg0: any) => void, getState: any) => {
    const { runs } = getState().run;
    dispatch(deleteRunById(id));
    await AsyncStorage.setItem(Storage.runs, JSON.stringify(runs));
  };
};

export const { setRuns, addRun, editRun, deleteRunById } = runSlice.actions;

export default runSlice.reducer;
