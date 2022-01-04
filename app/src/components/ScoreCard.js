import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

/**
 * A scorecard for registered user that shows their current username and the amount of points
 * they have accumulated. Called from the Scoreboard screen.
 *
 * @param {*} props Props include some styling, the username, and their points.
 */
export default class ScoreCard extends React.PureComponent {
  render() {
    return (
      <View style={styles.container2}>
        <View style={{ ...styles.card, ...this.props.style }}>
          <View style={styles.textView}>
            <View>
              <Text style={styles.userName}>{this.props.name}</Text>
            </View>
            <View style={styles.score}>
              <Text style={styles.number}>{this.props.points}</Text>
              <Text style={styles.otherText}>point(s)</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

/**
 * Styling for the scorecard.
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

  card: {
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 10,
    backgroundColor: 'white',
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 10,
  },

  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 10,
    paddingBottom: 20,
    paddingTop: 20,
    flex: 1,
  },

  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },

  otherText: {
    fontSize: 16,
  },

  number: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  score: {
    //paddingLeft: 120
  },
});
