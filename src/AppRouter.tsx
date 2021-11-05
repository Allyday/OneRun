import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from './redux/hooks';

import { AllRunsScreen, GetInfoScreen, RunDetailsScreen } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = useAppSelector(state => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShadowVisible: false }}
      >
        {user ?
          <>
            <Stack.Screen
              name="AllRuns"
              component={AllRunsScreen}
              options={{ title: 'Running Tracking' }}
            />
            <Stack.Screen
              name="RunDetails"
              component={RunDetailsScreen}
              options={{ title: 'Run Details' }}
            />
          </> :
          <Stack.Screen
            name="GetInfo"
            component={GetInfoScreen}
            options={{ headerShown: false }}
          />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
