import React from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, HORIZONTAL_PADDING } from '../../constants';

const Screen = ({ ...props }) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView {...props} style={{ ...styles.screen, ...props.style }}>
          {props.children}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = {
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
};

export default Screen;
