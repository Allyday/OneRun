import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/hooks';

import { ActionButton } from '../components';
import { RunItem } from '../components/run';
import { RootStackParamList } from '../navigation';
import { HORIZONTAL_PADDING } from '../constants';
import { Run } from '../models';

type AllRunsProps = NativeStackScreenProps<RootStackParamList, 'AllRuns'>;

const AllRunsScreen = ({ navigation }: AllRunsProps) => {
  const { user } = useAppSelector(state => state.auth);

  const runs: Run[] = [
    { id: '1', distance: 9, time: new Date() },
  ];

  const _renderRunItem: ListRenderItem<Run> = ({ item }) => {
    const onEditItem = () => {
      navigation.navigate('RunDetails');
    };

    return <RunItem item={item} key={item.id} onEdit={onEditItem} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={runs}
        renderItem={_renderRunItem}
        contentContainerStyle={styles.flatList}
        ListHeaderComponentStyle={styles.paddingHorizontal}
        ListFooterComponentStyle={styles.paddingHorizontal}
        ListHeaderComponent={<>
          <Text style={styles.title}>{user?.firstName}, {user?.lastName}</Text>
          <Text style={{
            ...styles.subtitle,
            marginBottom: runs.length > 0 ? 36 : 0,
          }}>
            {runs.length > 0 ?
              'Here’s the listing of all your running entries.' :
              'This is where you can track all your runnings. Create an entry now to see how it works!'
            }
          </Text>
        </>}
        ListFooterComponent={
          <ActionButton title="add new run details" onPress={() => navigation.navigate('RunDetails')} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  title: {
    fontSize: 24,
    marginTop: 24,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 16,
  },
  flatList: {
    flexGrow: 1,
  },
});

export default AllRunsScreen;
