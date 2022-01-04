import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import FAQs from '../constants/FAQs';
import Colors from '../constants/Color';

/**
 * This is the FAQ screen, which basically just lists the FAQs we created for the app.
 * This mostly used stuff from external packages, like react-native-animatable and react-native
 * -collapisble.
 */
export default class FAQ extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: true,
  };

  /**
   * From the package
   */
  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  /**
   * From the package
   */
  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  /**
   * From the package
   */
  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition='backgroundColor'
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  /**
   * From the package
   */
  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition='backgroundColor'
      >
        <Animatable.Text
          style={styles.contentText}
          animation={isActive ? 'bounceIn' : undefined}
        >
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
          <Text style={styles.title}>Frequently Asked Questions</Text>

          <Accordion
            activeSections={activeSections}
            sections={FAQs}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
            underlayColor='white'
          />
        </ScrollView>
      </View>
    );
  }
}

/**
 * This is just setting some additional navigation options for this screen apart from the ones
 * in the navigation page.
 */
FAQ.navigationOptions = {
  headerTitle: 'FAQ',
  headerStyle: {
    backgroundColor: Platform.OS == 'android' ? Colors.loginBackground : '',
  },
  headerTintColor: Platform.OS == 'android' ? 'white' : Colors.loginBackground,
};

/**
 * Styling for the FAQ page.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.loginBackground,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  header: {
    backgroundColor: Colors.loginBackground,
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  contentText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: 'white',
  },
  content: {
    padding: 20,
    backgroundColor: 'white',
    color: 'white',
  },
  active: {
    backgroundColor: Colors.payneGrey,
    color: 'white',
  },
  inactive: {
    backgroundColor: Colors.loginBackground,
    color: 'white',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'white',
  },
  selector: {
    backgroundColor: Colors.payneGrey,
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    color: 'white',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
