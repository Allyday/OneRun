import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import AppRouter from './src/AppRouter';
import { store } from './src/redux/store';
import { Colors } from './src/constants';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.main,
    accent: Colors.secondary,
  },
};

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <AppRouter />
      </PaperProvider>
    </ReduxProvider>
  );
}
