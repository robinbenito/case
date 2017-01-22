import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SegmentedControlIOS
} from 'react-native';

import HTMLView from 'react-native-htmlview'

export default class ProfileHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.innerHeader}>
          <Text style={styles.headerText}>
            {this.props.user.name}
          </Text>
          <HTMLView
            value={this.props.user.bio}
            stylesheet={styles}
          />
          <Image
            style={styles.avatar}
            source={{uri: this.props.user.avatar}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 75,
    height: 75
  },  
  header: {
    padding: 20,
  },
  innerHeader: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 20
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20
  }
});