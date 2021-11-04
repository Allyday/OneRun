import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

let TouchableComponent: any = TouchableOpacity;

/**
 * Use Android ripple when possible
 * More information at: https://reactnative.dev/docs/improvingux#use-android-ripple
 */
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback;
}

const TouchableWrapper = (props: any) => {
  const style = props.style || {};

  return (
    <View style={{
      ...styles.outerContainer,
      width: style.width,
      height: style.height,
      borderRadius: style.borderRadius,
      marginTop: style.marginTop || style.marginVertical,
      marginBottom: style.marginBottom || style.marginVertical,
      marginRight: style.marginRight || style.marginHorizontal,
      marginLeft: style.marginLeft || style.marginHorizontal,
    }}>
      <TouchableComponent disabled={props.disabled || props.faded} onPress={props.onPress}>
        <View style={{
          ...style,
          ...styles.innerContainer,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          backgroundColor: props.disabled ? props.disabledBgColor : style.backgroundColor,
          opacity: props.faded ? 0.8 : 1,
        }}>
          {props.children}
        </View>
      </TouchableComponent>
    </View>
  )
};

const styles = StyleSheet.create({
  outerContainer: {
    overflow: 'hidden',
  },
  innerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TouchableWrapper;
