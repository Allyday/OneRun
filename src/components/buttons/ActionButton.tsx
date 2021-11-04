import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';

import { TouchableWrapper } from '../containers';
import { Colors } from '../../constants';

interface ActionButtonProps {
  title: string;
  onPress: () => any,
  error?: string;
  style?: any;
  containerStyle?: any;
  disabled?: boolean;
}

const ActionButton = ({ title, style, containerStyle, error, onPress, disabled }: ActionButtonProps) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={{ width: '100%', ...containerStyle }}>
      <TouchableWrapper
        style={{ ...styles.container, ...style }}
        onPress={onPress}
        disabled={disabled}
        disabledBgColor={Colors.lightGrey}
      >
        {disabled ?
          <Text style={{
            ...styles.title,
            color: Colors.mediumGrey,
          }}>{title.toUpperCase()}</Text>
          :
          <Text style={styles.title}>{title.toUpperCase()}</Text>
        }
      </TouchableWrapper>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.main,
    borderRadius: 4,
    paddingVertical: 10,
    marginVertical: 20,
    marginHorizontal: 24,
  },
  title: {
    fontWeight: '500',
    lineHeight: 16,
    color: Colors.white,
  },
  errorText: {
    color: Colors.firebrick,
    paddingLeft: 24,
  },
});

export default ActionButton;
