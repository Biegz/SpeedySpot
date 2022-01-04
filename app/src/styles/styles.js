import React, { StyleSheet } from 'react-native';

/**
 * Stylesheet for the SignUp page. Becuase of changes in our coding methodology after starting,
 * we have one stylesheet different from the rest in its own folder. For the rest of the screens
 * and components, the stylesheets are in the same file.
 */
export default StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#083541',
    alignItems: 'center',
    //justifyContent: "center"
    paddingTop: 20,
    paddingBottom: 120,
  },
  imageContainer: {
    paddingTop: 200,
    paddingBottom: 200,
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    paddingTop: 100,
  },

  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
  },

  newAccount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 20,
  },

  inputContainer: {
    width: '80%',
    marginTop: 30,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'white',
    borderRadius: 25,
    //color: 'white'
  },

  inputContainerRadio: {
    width: '80%',
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
    borderRadius: 7,
    color: 'white',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    width: '40%',
  },
  loginButton: {
    width: '90%',
  },

  text: {
    width: '80%',
    marginTop: 30,
    color: 'white',
    fontSize: 18,
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
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'white',
  },

  buttonText: {
    color: 'white',
  },
});
