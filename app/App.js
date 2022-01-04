import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import SpeedyNavigator from './src/navigation/SpeedyNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens();

/**
 * The main function which launches the app.
 */
export default function App() {
  return <SpeedyNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF'
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
