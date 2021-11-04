import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

import { HORIZONTAL_PADDING, WINDOW_WIDTH } from '../../constants';

const ActionButton = (props: any) => {
  return (
    <Button mode="contained" theme={{ roundness: 4 }}  {...props} style={styles.button}>
      {props.title.toUpperCase()}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: WINDOW_WIDTH - 2 * HORIZONTAL_PADDING,
  },
});

export default ActionButton;
