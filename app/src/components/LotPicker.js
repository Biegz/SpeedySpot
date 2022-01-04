import React, { Component, useState } from 'react';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import Colors from '../constants/Color';
//import { Colors } from 'react-native/Libraries/NewAppScreen';

/**
 * The LotPicker component is for the picker that lets you pick a parking lot on the CheckIn screen.
 * It uses the RNPickerSelect from the imported package. This lotpicker is also used for sorting on the
 * ViewLots screen.
 * @param {*} props The placeholder label for the picker, the color, the items in the picker. This is
 * passed in from the screen that is using the picker.
 */
const LotPicker = (props) => {
  return (
    <RNPickerSelect
      placeholder={{
        label: props.placeholder,
        value: null,
        color: props.placeholder_color,
      }}
      items={props.items}
      onValueChange={(value) => props.setSelect(value)}
      style={{
        ...pickerStyles,
        iconContainer: {
          top: 20,
          right: 10,
        },
        placeholder: {
          color: Colors.loginBackground,
          fontSize: 20,
        },
      }}
    />
  );
};

/**
 * The styles for the LotPicker. Have two different style functions for both iOS and Android.
 */
const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    //borderWidth: 1,
    //borderColor: '#06487C',
    //borderRadius: 4,
    color: Colors.loginBackground,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: Colors.loginBackground,
    borderRadius: 8,
    color: Colors.loginBackground,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default LotPicker;
