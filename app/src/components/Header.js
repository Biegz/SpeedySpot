import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

/**
 * A basic header. It is usually automatically applied when using StackNavigation, but this
 * is our custom header for certain screens (like CheckOut) that are not part of navigation.
 * Just a horizontal bar across the top of the screen with some color and any word.
 *
 * @param {*} props The "title" which is what will be displayed on the header.
 */
const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

/**
 * Styling properties for the header. Note that like many other components, this one uses "Platform"
 * to determine how the styling of the header will be for Android vs iOS devices. It'll look more
 * iOS native for iOS devices, and more Android native for Android ones.
 */
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    paddingTop: 0,
    backgroundColor: Platform.OS === 'android' ? '#083541' : 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: Platform.OS === 'android' ? 'white' : '#06487C',
    fontSize: 18,
  },
});

export default Header;
