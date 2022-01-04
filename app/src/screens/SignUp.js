import React, { Component } from 'react';
import {
  View,
  //TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styles from '../styles/styles';
import Colors from '../constants/Color';

const handicap_options = [
  {
    key: 1,
    text: 'Yes',
  },
  {
    key: 0,
    text: 'No',
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
 * The main signup page, in which users can signup for the app. It takes in their info, like
 * username, password, email, etc. along with some questions about university and handicap status.
 * It then calls the API which will update the database.
 */
export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      fullname: '',
      email: '',
      password: '',
      confirm_password: '',
      handicap_val: '',
      status_val: '',
    };
  }

  onRegister = () => {};

  componentDidMount() {}

  /**
   * This function handles the actual signup part. It does some checks on the information given
   * and makes sure it meets certain criteria, like making sure all fields are completed and that
   * the email address is in a valid format.
   */
  handleSignUp = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      this.state.fullname === '' ||
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.confirm_password === '' ||
      this.state.handicap_val === '' ||
      this.state.status_val === ''
    ) {
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
    } else if (this.state.fullname.length > 16) {
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
    } else if (reg.test(this.state.email) === false) {
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
    } else if (this.state.confirm_password !== this.state.password) {
      Alert.alert(
        'Confirm password does not match password',
        'Please re-type both passwords and ensure they are correct and match',
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
        'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/signUp',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: this.state.fullname,
            email: this.state.email,
            password: this.state.password,
            handicap: this.state.handicap_val,
            status: this.state.status_val,
          }),
        }
      )
        .then((response) => {
          if (response.status !== 201) {
            Alert.alert(
              'An account with these credentials already exists',
              'An account with this username or email already exists. Please sign in or select a different username or password',
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
            this.props.navigation.navigate({ routeName: 'Login' });
          }
        })
        .catch((response) => {
          console.log(response.status);
        });
    }
  };

  render() {
    const options_h = handicap_options;
    const options_s = status_options;

    return (
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.container}>
            <Text style={styles.newAccount}>Create new account</Text>
            <View style={styles.inputContainer}>
              <TextInput
                label='Username '
                placeholder='Enter new username'
                mode='outlined'
                underlineColorAndroid={'rgba(0,0,0,0)'}
                text='white'
                value={this.state.fullname}
                onChangeText={(text) => this.setState({ fullname: text })}
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
                label='Email '
                placeholder='Enter new email'
                mode='outlined'
                underlineColorAndroid={'rgba(0,0,0,0)'}
                text='white'
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
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
                placeholder='Enter new password'
                mode='outlined'
                secureTextEntry={true}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                text='white'
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
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

            <View style={styles.inputContainer}>
              <TextInput
                label='Confirm Password '
                placeholder='Confirm Password'
                mode='outlined'
                secureTextEntry={true}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                text='white'
                value={this.state.confirm_password}
                onChangeText={(text) =>
                  this.setState({ confirm_password: text })
                }
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

            <Text style={styles.text}>Are you a handicap user?</Text>
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

            <Text style={styles.text}>
              What is your status at the university?
            </Text>
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
                  onPress={this.handleSignUp}
                  color={Colors.ube}
                >
                  Create Account
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

SignUp.navigationOptions = {
  headerTitle: 'Sign Up',
  headerStyle: {
    backgroundColor: Platform.OS == 'android' ? Colors.loginBackground : '',
  },
  headerTintColor: Platform.OS == 'android' ? 'white' : Colors.loginBackground,
};
