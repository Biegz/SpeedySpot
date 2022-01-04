import React, { Component, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import LotPicker from '../components/LotPicker';
import LotCard from '../components/LotCard';
import {
  FlatList,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import FilterOptions from '../constants/FilterOptions';
import Colors from '../constants/Color';
import Color from '../constants/Color';
const images = {
  commuter: require('../../assets/c_black.png'),
  resident: require('../../assets/r_black.png'),
  faculty: require('../../assets/f_black.png'),
  lirr: require('../../assets/l_black.png'),
};

/**
 * Functionality for the ViewLots page, which is the main page of the app the user is on
 * upon logging in. This has a list of lot cards, which show all the current lots and
 * some basic information about them.
 */
export default class ViewLots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lots: [],
      lotUsed: [],
      selectedFilter: 0,
    };
  }

  abortController = new AbortController();

  onRegister = () => {};

  /**
   * Fetches the current lot information once the user gets on this page.
   */
  fetchLotInfo() {
    console.log('hello');
    fetch(
      'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/allLots',
      { signal: this.abortController.signal },
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          lots: data.map((lot) => ({
            key: lot.id,
            name: lot.name,
            capacity: lot.capacity,
            spots_available: lot.spots_available,
            total_handicap_spots: lot.total_handicap_spots,
            handicap_spots_available: lot.handicap_spots_available,
            address: lot.address,
            type: lot.lot_type,
            latitude: lot.latitude,
            longitude: lot.longitude,
          })),
        });
      })
      .catch((error) => console.log(error));
  }

  fetchLotInfo2() {
    console.log('hello2');
    fetch(
      'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/allLots',
      { signal: this.abortController.signal },
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          lotUsed: data.map((lot) => ({
            key: lot.id,
            name: lot.name,
            capacity: lot.capacity,
            spots_available: lot.spots_available,
            total_handicap_spots: lot.total_handicap_spots,
            handicap_spots_available: lot.handicap_spots_available,
            address: lot.address,
            type: lot.lot_type,
            latitude: lot.latitude,
            longitude: lot.longitude,
          })),
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.fetchLotInfo();
    this.fetchLotInfo2();
  }

  refreshHandler = () => {
    this.fetchLotInfo();
    this.fetchLotInfo2();
  };

  componentWillUnmount() {
    this.abortController.abort();
  }

  getBackgroundColor(lot) {
    if (lot.type == 2) {
      return {
        backgroundColor: Color.commuterGreen, //Commuter
      };
    } else if (lot.type == 1) {
      return {
        backgroundColor: Color.facultyRed, //Faculty
      };
    } else if (lot.type == 3) {
      return {
        backgroundColor: Color.residentYellow, //Resident
      };
    } else {
      return {
        backgroundColor: Color.lirrBlue, //LIRR
      };
    }
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

  selectedFilterHandler = (value) => {
    this.setState({
      selectedFilter: value,
    });
    if (value === 1) {
      this.setState({
        lotUsed: this.state.lots.filter((lot) => lot.type === 2),
      });
    }
    if (value === 2) {
      this.setState({
        lotUsed: this.state.lots.filter((lot) => lot.type === 3),
      });
    }
    if (value === 3) {
      this.setState({
        lotUsed: this.state.lots.filter((lot) => lot.type === 1),
      });
    }
    if (value === 0 || value === null) {
      this.setState({
        lotUsed: this.state.lots,
      });
    }
  };

  render() {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
    }

    const user_info = this.props.navigation
      .dangerouslyGetParent()
      .getParam('username');

    return (
      <View style={styles.scrollViewStyle}>
        <View style={styles.buttonPicker}>
          <View style={styles.button}>
            <Button
              mode='contained'
              onPress={this.refreshHandler}
              color={Color.loginBackground}
            >
              Refresh
            </Button>
          </View>
          <View style={styles.picker}>
            <LotPicker
              placeholder='All Lots'
              placeholder_color={Colors.loginBackground}
              items={FilterOptions}
              setSelect={this.selectedFilterHandler}
            />
          </View>
        </View>
        <FlatList
          data={this.state.lotUsed}
          renderItem={({ item }) => (
            <TouchableCmp
              onPress={() => {
                this.props.navigation.navigate({
                  routeName: 'SpecificLot',
                  params: {
                    lot_info: item,
                    user: user_info,
                  },
                });
              }}
            >
              <LotCard
                title={item.name}
                status={this.getStatus(item)}
                style={this.getBackgroundColor(item)}
                spotsAvailable={item.spots_available}
                capacity={item.capacity}
                handicapCapacity={item.total_handicap_spots}
                handicapSpotsAvailable={item.handicap_spots_available}
              />
            </TouchableCmp>
          )}
          keyExtractor={(item) => item.key.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    );
  }
}

ViewLots.navigationOptions = {
  headerTitle: 'View Lots',
  headerStyle: {
    backgroundColor: Platform.OS == 'android' ? '#083541' : '',
  },
  headerTintColor: Platform.OS == 'android' ? 'white' : '#083541',
};

const styles = StyleSheet.create({
  buttonPicker: {
    flexDirection: 'row',
  },
  scrollViewStyle: {
    backgroundColor: Colors.azureishWhite,
  },
  button: {
    //alignItems: 'center',
    justifyContent: 'space-around',
    width: '50%',
    padding: 10,
    //borderRadius: 10
  },
  picker: {
    width: '50%',
    padding: 10,
  },
});
