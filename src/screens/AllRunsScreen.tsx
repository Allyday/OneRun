import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../redux/hooks';

const AllRunsScreen = () => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <Text>{user?.firstName}, {user?.lastName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AllRunsScreen;
