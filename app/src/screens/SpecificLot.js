import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  Modal,
  Text,
  Image,
  Platform,
} from 'react-native';

import SpecificLotCard from '../components/SpecificLotCard.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import openMap from 'react-native-open-maps';
import Color from '../constants/Color';

const images = {
  commuter: require('../../assets/c_black.png'),
  resident: require('../../assets/r_black.png'),
  faculty: require('../../assets/f_black.png'),
  lirr: require('../../assets/l_black.png'),
};

/**
 * The specific lot page, which you get to once you click on a LotCard on the ViewLots page.
 */
export default class SpecificLot extends Component {
  constructor(props) {
    super(props);
  }
  getStatus(lot) {
    if (lot.type == 2) {
      return images.commuter;
    } else if (lot.type == 1) {
      return images.faculty;
    } else if (lot.type == 3) {
      return images.resident;
    } else {
      return images.lirr;
    }
  }

  /**
   * Functionality to open the lot in Google Maps, using the coordinates stored in the database
   * for the particular lot.
   */
  openInMaps = () => {
    const lot = this.props.navigation.getParam('lot_info');
    const latlon = '' + lot.latitude + ',' + lot.longitude;
    openMap({ query: latlon });
  };

  /**
   * Manages the indicator color, which changes from green/red/yellow depending on spots available.
   * @param {*} lot
   */
  indicatorColorHandler(lot) {
    if (lot.spots_available > lot.capacity * 0.5) {
      return 'green';
    } else if (lot.spots_available > lot.capacity * 0.25) {
      return '#FFE046';
    } else {
      return 'red';
    }
  }

  /**
   * Same thing as above, but for handicap lots.
   * @param {*} lot
   */
  handicapIndicatorColorHandler(lot) {
    if (lot.handicap_spots_available > lot.total_handicap_spots * 0.5) {
      return 'green';
    } else if (lot.handicap_spots_available > lot.total_handicap_spots * 0.25) {
      return '#FFE046';
    } else {
      return 'red';
    }
  }

  render() {
    const lot = this.props.navigation.getParam('lot_info');
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.card}>
            <Image source={this.getStatus(lot)} style={styles.imageStyle} />
            <Text style={styles.lotname}>{lot.name}</Text>
          </View>

          {/* -------------------LINE---------------------- */}
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 0,
              borderBottomColor: 'lightgrey',
              borderBottomWidth: 1,
            }}
          />

          {/* -------------------PARKING CARDS---------------------- */}
          <View style={styles.headerText}>
            <Text style={styles.text}>Regular Parking</Text>
          </View>
          <SpecificLotCard
            indicatorColor={this.indicatorColorHandler(lot)}
            statusLabel='Spots Available:'
            lotInfo={lot.spots_available}
          />

          <View style={styles.headerText}>
            <Text style={styles.text}>Handicap Parking</Text>
          </View>
          <SpecificLotCard
            indicatorColor={this.handicapIndicatorColorHandler(lot)}
            statusLabel='Spots Available:'
            lotInfo={lot.handicap_spots_available}
          />

          {/* -------------------LINE---------------------- */}
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 0,
              borderBottomColor: 'lightgrey',
              borderBottomWidth: 1,
            }}
          />

          {/* -------------------MAPS EXPORT---------------------- */}
          <View style={styles.card}>
            <Text style={{ color: 'grey' }}>Open in: </Text>
            <TouchableOpacity onPress={this.openInMaps}>
              <Image
                source={require('../../assets/icons/google.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>

          {/* -------------------LINE---------------------- */}
          <View
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              borderBottomColor: 'lightgrey',
              borderBottomWidth: 1,
            }}
          />

          {/* -------------------NOTE---------------------- */}
          <View style={styles.card}>
            <Text style={{ color: 'grey' }}>
              Please note, listed availabilities are approximations. They do not
              reflect exact values.{' '}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

SpecificLot.navigationOptions = (navigationData) => {
  const lot = navigationData.navigation.getParam('lot_info');

  return {
    headerTitle: lot.name,
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Color.loginBackground : '',
    },
    headerTintColor:
      Platform.OS === 'android' ? 'white' : Color.loginBackground,
  };
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 10,
    backgroundColor: '#CEE5E3',
    //padding: 10,
    margin: 10,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 15,

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

  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    paddingTop: 100,
  },

  lotname: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Color.loginBackground,
    marginTop: 20,
    marginBottom: 20,
  },

  scrollView: {
    backgroundColor: 'white',
    paddingBottom: 400,
  },

  headerText: {
    paddingTop: 18,
    paddingLeft: 15,
    alignItems: 'center',
    paddingRight: 10,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#223843',
  },
});

//export default SpecificLot;
