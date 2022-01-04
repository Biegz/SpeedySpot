import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import ViewLotsScreen from '../screens/ViewLots';
import SpecificLotsScreen from '../screens/SpecificLot';
import CheckInScreen from '../screens/CheckIn';
import ScoreboardScreen from '../screens/Scoreboard';
import PreferencesScreen from '../screens/Preferences';
import FAQScreen from '../screens/FAQ';
import Color from '../constants/Color';

/**
 * The main navigator functionality for the application. This page handles all the navigation
 * between the various screens and pages throughout the app.
 */

/**
 * Stack navigator between ViewLots and SpecificLots screen. Once you click on the card in
 * ViewLots, this brings you to the "SpecificLot" page for that lot, which has some more detailed
 * information
 */
const ViewLotsNav = createStackNavigator(
  {
    ViewLots: ViewLotsScreen,
    SpecificLot: SpecificLotsScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    },
  }
);

/**
 * Stack navigator for the CheckIn screen. We don't really need this, but we put this in a
 * StackNavigator so we can get a header. Does not actually navigate to anything.
 */
const CheckInNav = createStackNavigator(
  {
    CheckIn: CheckInScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    },
  }
);

/**
 * Stack navigator for the Scoreboard screen. We don't really need this, but we put this in a
 * StackNavigator so we can get a header. Does not actually navigate to anything.
 */
const ScoreboardNav = createStackNavigator(
  {
    Scoreboard: ScoreboardScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    },
  }
);

/**
 * Stack navigator for the Preferences screen. This creates the navigation between the preferences
 * screen and the the FAQ screen, which has the FAQs for the app.
 */
const PreferencesNav = createStackNavigator(
  {
    Preferences: PreferencesScreen,
    FAQ: FAQScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    },
  }
);

/**
 * The options for the main tab navigator on the bottom, which has 4 screens: view lots,
 * check in, scoreboard, and preferences.
 */
const tabOptions = {
  ViewLots: {
    screen: ViewLotsNav,
    navigationOptions: {
      tabBarLabel: 'View Lots',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-list' size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Color.loginBackground,
    },
  },
  CheckIn: {
    screen: CheckInNav,
    navigationOptions: {
      tabBarLabel: 'Check In',
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name='ios-add-circle-outline'
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Color.loginBackground,
    },
  },

  Scoreboard: {
    screen: ScoreboardNav,
    navigationOptions: {
      tabBarLabel: 'Scoreboard',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-play' size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Color.loginBackground,
    },
  },

  Preferences: {
    screen: PreferencesNav,
    navigationOptions: {
      tabBarLabel: 'Preferences',
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name='ios-settings' size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Color.loginBackground,
    },
  },
};

/**
 * The tab navigator functionality. It's a bit different for iOS and Android, for iOS we use the
 * default React BottomTabNavigator but we use a more specific Android one for Android devices.
 * Overall, they work the same, and the info for the navigator comes from above.
 */
const Rest =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabOptions, {
        activeColor: 'white',
        shifting: true,
      })
    : createBottomTabNavigator(tabOptions, {
        tabBarOptions: {
          activeTintColor: Color.loginBackground,
        },
        defaultNavigationOptions: {
          headerTitleAlign: 'center',
        },
      });

/**
 * The stack navigator for the Login/SignUp/FAQ screens. These are the first set of screens the
 * user sees when they open the app, and this facilitates the movement between those screens.
 */
const LogSignUp = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    FAQ: FAQScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    },
  }
);

/**
 * The main navigator for the application. Lets you transition between the two main parts
 * of the application, the Login/Signup portion and the main application. It functions as a
 * stack navigator.
 */
const SpeedyNavigator = createStackNavigator(
  {
    LogSignUp: {
      screen: LogSignUp,
    },
    Rest: {
      screen: Rest,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default createAppContainer(SpeedyNavigator);
