import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from './redux/hooks';

import { AllRunsScreen, GetInfoScreen, RunDetailsScreen } from './screens';
import { setUser } from './slices/authSlice';
import { setRuns } from './slices/runSlice';
import { Storage } from './constants';

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const prepare = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      const userData = await AsyncStorage.getItem(Storage.user);
      const runsData = await AsyncStorage.getItem(Storage.runs);

      if (userData)
        await dispatch(setUser(JSON.parse(userData)));

      if (runsData) {
        const parsedRunsData = JSON.parse(runsData).map((run: any) => {
          return {
            ...run,
            time: new Date(run.time),
          }
        })
        await dispatch(setRuns(parsedRunsData));
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  };

  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) hideSplashScreen();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

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
