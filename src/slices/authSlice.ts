import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Storage } from '../constants';

import { User } from '../models';

export interface AuthState {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const setUserThunk = (user: User) => {
  return async (dispatch: (arg0: any) => void, getState: any) => {
    dispatch(setUser(user));
    await AsyncStorage.setItem(Storage.user, JSON.stringify(user));
  };
};

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
