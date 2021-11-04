import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AppRouter from './src/AppRouter';
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
    <PaperProvider theme={theme}>
      <AppRouter />
    </PaperProvider>
  );
}
