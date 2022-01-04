import React, { Component, useEffect } from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import { Button } from 'react-native-paper';
import ScoreCard from '../components/ScoreCard';
import {
  FlatList,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import Colors from '../constants/Color';

/**
 * The scoreboard page, which has a card on the screen indicating the current username and the amount
 * of points they had.
 */
export default class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: [],
      current_user: [],
    };
  }

  abortController = new AbortController();

  fetchScoreInfo() {
    console.log('scores!');
    fetch(
      'http://flask-env.xjspt2xtfg.us-east-2.elasticbeanstalk.com/scores',
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
          scores: data.map((user) => ({
            key: user.id,
            name: user.username,
            score: user.score,
          })),
        });
        //console.log(this.state.lots);
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.fetchScoreInfo();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  /**
   * This displays a different screen if the user is a guest, as guest users cannot collect
   * points in the app.
   */
  isUserGuestHandler() {
    const isGuest = this.props.navigation
      .dangerouslyGetParent()
      .getParam('status');
    if (isGuest === 'GUEST') {
      return (
        <View style={styles.scrollViewStyle}>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              Sorry, this page is only available to registered users. To
              participate in the scoreboard, please register for an account. For
              guest users that converted to a registered account, please log out
              and log back in to be able to view your scoreboard.
            </Text>
          </View>
        </View>
      );
    } else if (isGuest === 'USER') {
      const user_info = this.props.navigation
        .dangerouslyGetParent()
        .getParam('username');

      const curUser = this.state.scores.filter((user) => user.key == user_info);
      return (
        <View style={styles.scrollViewStyle}>
          <View style={styles.button}>
            <Button
              mode='contained'
              onPress={() => this.fetchScoreInfo()}
              color={Colors.loginBackground}
            >
              Refresh
            </Button>
          </View>
          <FlatList
            data={curUser}
            renderItem={({ item }) => (
              <ScoreCard
                name={item.name}
                points={item.score}
                current_user={user_info}
              />
            )}
            keyExtractor={(item) => item.key.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
      );
    }
  }

  render() {
    return <View>{this.isUserGuestHandler()}</View>;
  }
}

Scoreboard.navigationOptions = {
  headerTitle: 'Scoreboard',
  headerStyle: {
    backgroundColor: Platform.OS == 'android' ? Colors.loginBackground : '',
  },
  headerTintColor: Platform.OS == 'android' ? 'white' : Colors.loginBackground,
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: Colors.azureishWhite,
    height: '100%',
  },
  button: {
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  card: {
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
  },
});
