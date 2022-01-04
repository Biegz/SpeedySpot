import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  Text,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import LotPicker from '../components/LotPicker';
import CheckOut from '../components/CheckOut';
import LotList from '../constants/LotList';
import Colors from '../constants/Color';

/**
 * The CheckIn screen. This facilitates the checkin/checkout portion of the application, in which
 * users can select a lot, check in, and then check out once they leave.
 */
export default class CheckIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkOutVisible: false,
      selectedLot: '',
      currentLot: '',
    };
  }

  onRegister = () => {};

  /**
   * This function is called right when the screen is first loaded, and checks to see if the user
   * is currently checked into a lot. If so, it brings them to the CheckOut page where they would
   * have to first checkout before they check into another lot.
   */
  componentDidMount() {
    const user_info = this.props.navigation
      .dangerouslyGetParent()
      .getParam('username');

    fetch(
      `http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/isCheckedIn?user=${encodeURIComponent(
        user_info
      )}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      if (response.status != 404) {
        this.setState({
          checkOutVisible: true,
        });
      }
    });
  }

  /**
   * This function handles checking in. Upon clicking the check-in button,
   * it takes in the user and lot info and passes that to the database
   * to check them into the lot.
   */
  checkInButtonHandler = () => {
    const user_info = this.props.navigation
      .dangerouslyGetParent()
      .getParam('username');
    if (this.state.selectedLot === '' || this.state.selectedLot === null) {
      Alert.alert(
        'Please select a lot',
        'Please select a lot in order to check in ',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'OK' },
        ],
        { cancelable: false }
      );
    } else {
      console.log(user_info);
      console.log(this.state.selectedLot);
      fetch(
        'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/checkin',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user_info,
            lot: this.state.selectedLot,
          }),
        }
      )
        .then((response) => {
          console.log(response.status);
        })
        .catch((response) => {
          console.log(response.status);
        });
      this.setState({
        checkOutVisible: true,
      });
    }
  };

  selectedLotHandler = (value) => {
    //console.log(this.state.selectedLot);
    this.setState({
      selectedLot: value,
    });
  };

  /**
   * This function handles checking out. Upon clicking the check-out button,
   * it takes in the user and lot info and passes that to the database
   * to check them out of the lot.
   */
  checkOutButtonHandler = () => {
    const user_info = this.props.navigation
      .dangerouslyGetParent()
      .getParam('username');

    fetch(
      `http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/isCheckedIn?user=${encodeURIComponent(
        user_info
      )}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((responseJSON) => {
        fetch(
          'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/checkout',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user_info,
              lot: responseJSON.parked_id,
            }),
          }
        )
          .then((response) => {
            //console.log(response.status);
          })
          .catch((response) => {
            //console.log(response.status);
          });
        this.setState({
          checkOutVisible: false,
        });
      });
  };

  render() {
    return (
      <ScrollView style={styles.colorPicker}>
        <View style={styles.picker}>
          <LotPicker
            placeholder='Select a lot'
            placeholder_color={Colors.ube}
            items={LotList}
            setSelect={this.selectedLotHandler}
          />
        </View>
        <View style={styles.checkInView}>
          <View style={styles.checkInButton}>
            <Button
              mode='contained'
              onPress={this.checkInButtonHandler}
              color={Colors.ube}
              dark
            >
              Check-In
            </Button>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            Please make sure the lot you are checking into has adequate spaces
            available before checking in. This is especially important for
            handicap users, as many lots have minimal amounts of handicap spots
          </Text>
        </View>
        <CheckOut
          visible={this.state.checkOutVisible}
          collapseModal={this.checkOutButtonHandler}
        />
      </ScrollView>
    );
  }
}

/**
 * This is just setting some additional navigation options for this screen apart from the ones
 * in the navigation page.
 */
CheckIn.navigationOptions = {
  headerTitle: 'Check In',
  headerStyle: {
    backgroundColor: Platform.OS == 'android' ? Colors.loginBackground : '',
  },
  headerTintColor: Platform.OS == 'android' ? 'white' : Colors.loginBackground,
};

/**
 * Styling for the check-in page.
 */
const styles = StyleSheet.create({
  colorPicker: {
    backgroundColor: Colors.azureishWhite,
  },
  picker: {
    padding: 10,
  },
  button: {
    width: '100%',
  },
  checkInView: {
    alignItems: 'center',
    alignContent: 'center',
    padding: 20,
  },
  checkInButton: {
    width: '80%',
  },
  card: {
    //flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems: 'center',
    textAlign: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 6,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 10,
  },
  paragraph: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    //borderWidth: 1,
    //borderColor: '#06487C',
    //borderRadius: 4,
    color: '#06487C',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#06487C',
    borderRadius: 8,
    color: '#06487C',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
