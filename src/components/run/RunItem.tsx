import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

import { Colors, HORIZONTAL_PADDING } from '../../constants';
import { Run } from '../../models';

const RunItem = ({ item, onEdit }: { item: Run, onEdit: () => void }) => {
  return (
    <View style={styles.runItem}>
      <View>
        <Text style={styles.runDistance}>{item.distance} km</Text>
        <View style={styles.rowContainer}>
          <MaterialCommunityIcons name="clock-outline" size={14} color={Colors.darkGrey} />
          <Text style={styles.runTime}>{item.time}</Text>
        </View>
      </View>
      <IconButton
        icon="pencil"
        color={Colors.darkGrey}
        size={18}
        onPress={onEdit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  runItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: 16,
  },
  runDistance: {
    fontWeight: '700',
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  runTime: {
    fontSize: 12,
    marginLeft: 5,
  },
});

export default RunItem;
