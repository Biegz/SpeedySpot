import React, { Component, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Colors from '../constants/Color';

const handicap_options = [
  {
    key: 1,
    text: 'Currently Handicapped',
  },
  {
    key: 0,
    text: 'Not Currently Handicapped',
  },
];

const status_options = [
  {
    key: 0,
    text: 'Faculty/Staff',
  },
  {
    key: 1,
    text: 'Student: Commuter',
  },
  {
    key: 2,
    text: 'Student: Resident',
  },
];

/**
 * The preferences page, which allows users to access to not only access the FAQ page, but change
 * any of their current information like their username, password, status, and handicap status.
 * This page has a lot of the same API transactions as many of the other pages, so I won't go
 * into much detail here.
 */
export default class Preferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      new_username: '',
      old_password: '',
      new_password: '',
      handicap_val: '',
      status_val: '',
      new_email: '',
    };
  }
  handleLogout() {
    this.props.navigation.navigate({
      routeName: 'LogSignUp',
    });
  }

  updateUsernameHandler = () => {
    let user_info = this.props.navigation
      .dangerouslyGetParent()
      .getParam('username');
    if (this.state.new_username == user_info) {
      Alert.alert(
        'Your new username cannot be the same as your old one.',
        'Please choose a different username.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'OK' },
        ],
        { cancelable: false }
      );
    } else if (this.state.new_username.length > 16) {
      Alert.alert(
        'Your username is too long',
        'Please choose a username with less than 16 characters',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'OK' },
        ],
        { cancelable: false }
      );
    } else if (this.state.new_username === '') {
      Alert.alert(
        'You must complete all of the fields',
        'Please ensure all fields have been filled out',
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
      fetch(
        'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/updateUsername',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user_info,
            new_username: this.state.new_username,
          }),
        }
      ).then((response) => {
        if (response.status == 404) {
          Alert.alert(
            'A user with this username already exists',
            'Please choose another username',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'OK' },
            ],
            { cancelable: false }
          );
        } else if (response.status == 400) {
          Alert.alert(
            'Error: A user with your username could not be found',
            'A user with this username could not be found. Please contact the administrator',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'OK' },
            ],
            { cancelable: false }
          );
        } else if (response.status == 200) {
          Alert.alert(
            'Username successfully changed!',
            'Your username has successfully been updated! To continue to use the app, please close the app and sign in with your new credentials. ',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'OK' },
            ],
            { cancelable: false }
          );
        }
      });
    }
  };

  updatePasswordHandler = () => {
    const user_info = this.props.navigation
      .dangerouslyGetParent()
      .getParam('username');

    if (this.state.old_password === '' || this.state.new_password === '') {
      Alert.alert(
        'You must complete all of the fields',
        'Please ensure all fields have been filled out',
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
      fetch(
        'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/updatePassword',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user_info,
            password: this.state.old_password,
            new_password: this.state.new_password,
          }),
        }
      ).then((response) => {
        if (response.status == 404) {
          Alert.alert(
            'Password does not match',
            'Your current password does not match what we have on record. Please try again',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'OK' },
            ],
            { cancelable: false }
          );
        } else if (response.status == 400) {
          Alert.alert(
            'Error: A user with your username could not be found',
            'A user with this username could not be found. Please contact the administrator',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'OK' },
            ],
            { cancelable: false }
          );
        } else if (response.status == 200) {
          Alert.alert(
            'Password successfully changed!',
            'Your password has successfully been updated!',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'OK' },
            ],
            { cancelable: false }
          );
        }
      });
    }
  };

  updateEmailHandler = () => {
    const user_info = this.props.navigation
      .dangerouslyGetParent()
      .getParam('username');

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.new_email === '') {
      Alert.alert(
        'You must complete all of the fields',
        'Please ensure all fields have been filled out',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'OK' },
        ],
        { cancelable: false }
      );
    } else if (reg.test(this.state.new_email) === false) {
      Alert.alert(
        'Invalid email address',
        'Please enter a valid email address',
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
      fetch(
        'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/updateEmail',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user_info,
            new_email: this.state.new_email,
          }),
        }
      ).then((response) => {
        if (response.status == 400) {
          Alert.alert(
            'Error: A user with your username could not be found',
            'A user with this username could not be found. Please contact the administrator',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'OK' },
            ],
            { cancelable: false }
          );
        } else if (response.status == 200) {
          Alert.alert(
            'Email successfully changed!',
            'Your email has successfully been updated!',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'OK' },
            ],
            { cancelable: false }
          );
        }
      });
    }
  };

  updateHandicapHandler = () => {
    const user_info = this.props.navigation
      .dangerouslyGetParent()
      .getParam('username');

    fetch(
      'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/updateHandicap',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user_info,
          handicap: this.state.handicap_val,
        }),
      }
    ).then((response) => {
      if (response.status == 400) {
        Alert.alert(
          'Error: A user with your username could not be found',
          'A user with this username could not be found. Please contact the administrator',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      } else if (response.status == 200) {
        Alert.alert(
          'Handicap status successfully changed!',
          'Your handicap status has successfully been updated!',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      }
    });
  };

  updateStatusHandler = () => {
    const user_info = this.props.navigation
      .dangerouslyGetParent()
      .getParam('username');

    fetch(
      'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/updateStatus',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user_info,
          status: this.state.status_val,
        }),
      }
    ).then((response) => {
      if (response.status == 400) {
        Alert.alert(
          'Error: A user with your username could not be found',
          'A user with this username could not be found. Please contact the administrator',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      } else if (response.status == 200) {
        Alert.alert(
          'SBU status successfully changed!',
          'Your SBU status has successfully been updated!',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      }
    });
  };

  guestInfo() {
    const isGuest = this.props.navigation
      .dangerouslyGetParent()
      .getParam('status');

    if (isGuest === 'GUEST') {
      return (
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            If you're a guest user who wants to convert to a full account,
            please set your username, email, and password below. Once you log
            out and log back in, you will be able to see the scoreboard.
          </Text>
        </View>
      );
    } else if (isGuest === 'USER') {
      return <View></View>;
    }
  }

  render() {
    const user_info = this.props.navigation
      .dangerouslyGetParent()
      .getParam('username');

    const options_h = handicap_options;
    const options_s = status_options;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View>{this.guestInfo()}</View>
          <View style={styles.buttonContainer}>
            <View style={styles.loginButton}>
              <Button
                mode='contained'
                onPress={() => {
                  this.props.navigation.navigate('FAQ');
                }}
                color={Colors.faq}
              >
                FAQs
              </Button>
            </View>
          </View>
          <Text style={styles.text2}>Update your username</Text>
          <View style={styles.inputContainer}>
            <TextInput
              label='New Username '
              placeholder='Enter new username'
              mode='outlined'
              underlineColorAndroid={'rgba(0,0,0,0)'}
              text='white'
              value={this.state.new_username}
              onChangeText={(text) => this.setState({ new_username: text })}
              underlineColor='transparent'
              autoCapitalize='none'
              autoCompleteType='off'
              autoCorrect={false}
              theme={{
                colors: {
                  placeholder: Colors.loginBackground,
                  text: Colors.loginBackground,
                  primary: Colors.loginBackground,
                  underlineColor: 'transparent',
                  background: 'white',
                },
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.loginButton}>
              <Button
                mode='contained'
                onPress={this.updateUsernameHandler}
                color={Colors.ube}
                dark
              >
                Update Username
              </Button>
            </View>
          </View>
          <View style={{ marginTop: 20 }}></View>
          <Text style={styles.text2}>Update your email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              label='New email '
              placeholder='Enter new email'
              mode='outlined'
              underlineColorAndroid={'rgba(0,0,0,0)'}
              text='white'
              value={this.state.new_email}
              onChangeText={(text) => this.setState({ new_email: text })}
              underlineColor='transparent'
              autoCapitalize='none'
              autoCompleteType='off'
              autoCorrect={false}
              theme={{
                colors: {
                  placeholder: Colors.loginBackground,
                  text: Colors.loginBackground,
                  primary: Colors.loginBackground,
                  underlineColor: 'transparent',
                  background: 'white',
                },
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.loginButton}>
              <Button
                mode='contained'
                onPress={this.updateEmailHandler}
                color={Colors.ube}
                dark
              >
                Update Email
              </Button>
            </View>
          </View>
          <View style={{ marginTop: 20 }}></View>
          <Text style={styles.text2}>Update your password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              label='Old Password '
              placeholder='Enter old password'
              mode='outlined'
              secureTextEntry={true}
              underlineColorAndroid={'rgba(0,0,0,0)'}
              text='white'
              value={this.state.old_password}
              onChangeText={(text) => this.setState({ old_password: text })}
              underlineColor='transparent'
              theme={{
                colors: {
                  placeholder: Colors.loginBackground,
                  text: Colors.loginBackground,
                  primary: Colors.loginBackground,
                  underlineColor: 'transparent',
                  background: 'white',
                },
              }}
            />
            <TextInput
              label='New Password '
              placeholder='Enter new password'
              mode='outlined'
              secureTextEntry={true}
              underlineColorAndroid={'rgba(0,0,0,0)'}
              text='white'
              value={this.state.new_password}
              onChangeText={(text) => this.setState({ new_password: text })}
              underlineColor='transparent'
              theme={{
                colors: {
                  placeholder: Colors.loginBackground,
                  text: Colors.loginBackground,
                  primary: Colors.loginBackground,
                  underlineColor: 'transparent',
                  background: 'white',
                },
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.loginButton}>
              <Button
                mode='contained'
                onPress={this.updatePasswordHandler}
                color={Colors.ube}
                dark
              >
                Update Password
              </Button>
            </View>
          </View>
          <Text style={styles.text2}>Update handicap status</Text>
          <View style={styles.inputContainerRadio}>
            <View>
              {options_h.map((item) => {
                return (
                  <View key={item.key} style={styles.radioButtonContainer}>
                    <Text style={styles.buttonText}>{item.text}</Text>
                    <TouchableOpacity
                      style={styles.circle}
                      onPress={() => {
                        this.setState({
                          handicap_val: item.key,
                        });
                      }}
                    >
                      {this.state.handicap_val === item.key && (
                        <View style={styles.checkedCircle} />
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.loginButton}>
              <Button
                mode='contained'
                onPress={this.updateHandicapHandler}
                color={Colors.ube}
                dark
              >
                Update Handicap
              </Button>
            </View>
          </View>
          <Text style={styles.text2}>Update university status</Text>
          <View style={styles.inputContainerRadio}>
            <View>
              {options_s.map((item) => {
                return (
                  <View key={item.key} style={styles.radioButtonContainer}>
                    <Text style={styles.buttonText}>{item.text}</Text>
                    <TouchableOpacity
                      style={styles.circle}
                      onPress={() => {
                        this.setState({
                          status_val: item.key,
                        });
                      }}
                    >
                      {this.state.status_val === item.key && (
                        <View style={styles.checkedCircle} />
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.loginButton}>
              <Button
                mode='contained'
                onPress={this.updateStatusHandler}
                color={Colors.ube}
                dark
              >
                Update Status
              </Button>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.loginButton}>
              <Button
                mode='contained'
                onPress={() => {
                  this.props.navigation.navigate({
                    routeName: 'LogSignUp',
                  });
                }}
                color='red'
              >
                Log-Out
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

Preferences.navigationOptions = {
  headerTitle: 'Preferences',
  headerStyle: {
    backgroundColor: Platform.OS == 'android' ? Colors.loginBackground : '',
  },
  headerTintColor: Platform.OS == 'android' ? 'white' : Colors.loginBackground,
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'column',
    height: '100%',
    backgroundColor: Colors.azureishWhite,
    alignItems: 'center',
    //justifyContent: "center"
    paddingTop: 20,
    paddingBottom: 90,
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    paddingTop: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  loginButton: {
    width: '100%',
    borderRadius: 20,
  },

  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: Colors.loginBackground,
    borderStyle: 'solid',
  },

  inputContainer: {
    width: '80%',
    marginTop: 30,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: Colors.loginBackground,
    // borderRadius: 25,
    // color: Colors.loginBackground
  },

  text1: {
    fontSize: 20,
    color: Colors.loginBackground,
  },

  text2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.loginBackground,
  },
  inputContainerRadio: {
    width: '80%',
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.loginBackground,
    borderRadius: 7,
    color: Colors.loginBackground,
  },

  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginBottom: 30,
    padding: 20,
  },

  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.loginBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.loginBackground,
  },

  buttonText: {
    color: Colors.loginBackground,
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
    elevation: 10,
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
    color: 'red',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    margin: 10,
  },
});
