import React, { Component, useState } from 'react';
import { StyleSheet, View, ScrollView, Modal, Text } from 'react-native';
import Header from './Header';
import { Button } from 'react-native-paper';
import Colors from '../constants/Color';

/**
 * Handles checkout functionality. Function is called from "CheckIn", located in screens. This
 * function displays a modal which covers the CheckIn screen once a user has checked in, presenting
 * a thank you message to the user. The screen will continue to cover the check in screen until a user
 * has checked out, even if they close and log off the application. Once the user clicks the "check-out"
 * button, they will be brought back to the check in scren, and can check into a lot once more.
 *
 * @param {*} props Props from CheckIn include a "visible" boolean, which shows/hides the checkout modal,
 * and "collapsemodal" which links to a function in CheckIn that handles the CheckOut functionality
 * (i.e. calling the API to modify the database), while also hiding the modal
 */
const CheckOut = (props) => {
  return (
    <View style={{ backgroundColor: Colors.azureishWhite }}>
      <Modal visible={props.visible} animationType='slide'>
        <Header title='Check Out' />
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            Thank you for using SpeedySpot. Your contribution makes our app
            better for all of our users.
          </Text>
          <View style={styles.buttonContainer}>
            <View style={styles.loginButton}>
              <Button
                mode='contained'
                onPress={props.collapseModal}
                color='red'
              >
                Check-Out
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

/**
 * Styling properties for the CheckOut screen.
 */
const styles = StyleSheet.create({
  card: {
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 10,
    backgroundColor: Colors.azureishWhite,
    padding: 10,
    margin: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  loginButton: {
    width: '90%',
    borderRadius: 20,
  },
  paragraph: {
    fontSize: 16,
  },
});

export default CheckOut;
