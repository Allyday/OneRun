import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AllRunsScreen, GetInfoScreen } from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GetInfo" component={GetInfoScreen} />
        <Stack.Screen name="AllRuns" component={AllRunsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
