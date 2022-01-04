import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PulseIndicator } from 'react-native-indicators';

/**
 * The SpecificLotCard screen is a screen for each lot, which you can see once you click on
 * a card for that lot in the ViewLots screen. It provides some more detailed info about the
 * lot, and a Google Maps link to use your GPS to get to the lot.
 *
 * @param {*} props The indicator color (depends on availability), status label, lot info.
 */
export default class SpecificLotCard extends Component {
  render() {
    return (
      <View style={styles.card}>
        {/* ---------------PULSE--------------- */}
        <View style={styles.pulse}>
          <PulseIndicator color={this.props.indicatorColor} />
        </View>
        {/* ---------------CENTER-------------- */}
        <View style={styles.cardCenter}>
          <Text style={styles.text}>{this.props.statusLabel}</Text>
        </View>
        {/* ---------------SPACES-------------- */}
        <View>
          <Text style={styles.text}>{this.props.lotInfo}</Text>
        </View>
      </View>
    );
  }
}

/**
 * Styles for specificlotcard.
 */
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 10,
    backgroundColor: '#CEE5E3',
    padding: 10,
    margin: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 10,
  },

  pulse: {
    flex: 1,
    alignItems: 'flex-start',
  },

  cardCenter: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 70,
  },

  text: {
    color: 'grey',
    fontSize: 17,
    fontWeight: 'bold',
  },

  headerText: {},
});
