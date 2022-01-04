import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { ThemeColors } from 'react-navigation';
//import DeviceInfo from 'react-native-device-info';
import Constants from 'expo-constants';
import Colors from '../constants/Color';

/**
 * The main login page screen. This page basically takes in the username and password from the
 * user when they try and log in, and then route them to the rest of the application upon confirming
 * the credentials are correct. You can also route to the SignUp page, the Guest Login, or the FAQ
 * page from the Login page.
 * @param {*} props
 */
const Login = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [userID, setUserID] = useState('');

  const usernameHandler = (enteredText) => {
    setEnteredUsername(enteredText);
  };

  const passwordHandler = (enteredText) => {
    setEnteredPassword(enteredText);
  };

  const userIDHandler = (id) => {
    setUserID(id);
  };

  /**
   * This function does the interaction with the API to facilitate login for registered users.
   */
  const handleLogin = () => {
    fetch('http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: enteredUsername,
        password: enteredPassword,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          Alert.alert(
            'Username or Password Incorrect',
            'Please re-enter your username and password',
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
          response.json().then((data) => {
            userIDHandler(data.id);
            props.navigation.navigate({
              routeName: 'Rest',
              params: {
                username: data.id,
                status: 'USER',
              },
            });
          });
        }
      })
      .catch((response) => {
        console.log(response.status);
      });
  };
  /**
   * This function does the interaction with the API to facilitate login for guest users.
   */
  const handleGuest = () => {
    let uniqueId = Constants.installationId;
    fetch(
      'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/checkGuestExists',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guest_id: uniqueId,
        }),
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          fetch(
            'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/createGuestUser',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                guest_id: uniqueId,
              }),
            }
          ).then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                userIDHandler(data.id);
                props.navigation.navigate({
                  routeName: 'Rest',
                  params: {
                    username: data.id,
                    status: 'GUEST',
                  },
                });
              });
            }
          });
        } else if (response.status === 200) {
          response.json().then((data) => {
            props.navigation.navigate({
              routeName: 'Rest',
              params: {
                username: data.id,
                status: 'GUEST',
              },
            });
          });
        }
      })
      .catch((response) => {
        console.log(response.status);
      });
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View>
            <Image
              source={require('../../assets/logogif.gif')}
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label='Username '
              placeholder='Enter username'
              mode='outlined'
              underlineColorAndroid={'rgba(0,0,0,0)'}
              text='white'
              value={enteredUsername}
              onChangeText={usernameHandler}
              underlineColor='transparent'
              autoCapitalize='none'
              autoCompleteType='off'
              autoCorrect={false}
              theme={{
                colors: {
                  placeholder: 'white',
                  text: 'white',
                  primary: 'white',
                  underlineColor: 'transparent',
                  background: Colors.payneGrey,
                },
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label='Password '
              placeholder='Enter password'
              mode='outlined'
              secureTextEntry={true}
              underlineColorAndroid={'rgba(0,0,0,0)'}
              text='white'
              value={enteredPassword}
              onChangeText={passwordHandler}
              underlineColor='transparent'
              theme={{
                colors: {
                  placeholder: 'white',
                  text: 'white',
                  primary: 'white',
                  underlineColor: 'transparent',
                  background: Colors.payneGrey,
                },
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.loginButton}>
              <Button mode='contained' onPress={handleLogin} color={Colors.ube}>
                Log-In
              </Button>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                mode='contained'
                onPress={() => {
                  props.navigation.navigate('SignUp');
                }}
                color={Colors.pewterBlue}
              >
                Sign Up
              </Button>
            </View>
            <View style={styles.button}>
              <Button
                mode='contained'
                onPress={handleGuest}
                color={Colors.pewterBlue}
              >
                Guest
              </Button>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.loginButton}>
              <Button
                mode='contained'
                onPress={() => {
                  props.navigation.navigate('FAQ');
                }}
                color={Colors.pewterBlue}
              >
                FAQs
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

/**
 * Some additional navigation properties besides the one on the main navigation page.
 */
Login.navigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS == 'android' ? Colors.loginBackground : '',
  },
  headerTintColor: Platform.OS == 'android' ? 'white' : Colors.loginBackground,
};

/**
 * Styles for the login page.
 */
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'column',
    height: '100%',
    backgroundColor: Colors.loginBackground,
    alignItems: 'center',
    //justifyContent: "center"
    paddingTop: 30,
    paddingBottom: 200,
  },
  imageContainer: {
    paddingTop: 200,
    paddingBottom: 200,
  },
  imageStyle: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    paddingTop: 100,
  },

  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
  },

  inputContainer: {
    width: '80%',
    marginTop: 30,
    //borderWidth: 1,
    //borderStyle: 'solid',
    //borderColor: 'white',
    //borderRadius: 25,
    //color: 'white'
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    paddingTop: 20,
    paddingBottom: 0,
  },
  button: {
    width: '46%',
    borderRadius: 10,
  },
  loginButton: {
    width: '96%',
    borderRadius: 20,
  },
});

export default Login;
