import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

/**
 * The "LotCard" component, which represents each lot on the "ViewLots" screen. Each ViewLot
 * component is a card that has a bit of information about the lot, including what type of
 * lot it is, current spots available and current handicap spots available. This is called from
 * the ViewLots screen.
 *
 * @param {*} props Props include some additional styling properties, the lot status (faculty,
 * commuter, resident), the lot name, capacity, handicap capacity.
 */
export default class LotCard extends React.PureComponent {
  render() {
    return (
      <View style={styles.container2}>
        <View style={{ ...styles.card, ...this.props.style }}>
          <Image source={this.props.status} style={styles.imageStyle} />
          <View style={styles.textView}>
            <Text style={styles.lotName}> {this.props.title}</Text>
            <Text style={styles.otherText}>
              {' '}
              {this.props.spotsAvailable}/{this.props.capacity} spots open
            </Text>
            <Text style={styles.otherText}>
              {' '}
              {this.props.handicapSpotsAvailable}/{this.props.handicapCapacity}{' '}
              handicap spots open
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

/**
 * Styling for each card
 */

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    //justifyContent: "center"
    paddingTop: 20,
    paddingBottom: 20,
  },

  container2: {
    flex: 1,
    padding: 10,
  },

  imageStyle: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    paddingTop: 100,
  },

  card: {
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 6,
    backgroundColor: 'white',
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 10,
  },

  textView: {
    paddingRight: 20,
    paddingLeft: 10,
    paddingBottom: 20,
    paddingTop: 20,
  },

  lotName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  otherText: {
    fontSize: 16,
  },
});

//export default LotCard;
