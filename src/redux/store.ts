import { configureStore } from '@reduxjs/toolkit';

import { authReducer, runReducer } from '../slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    run: runReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
