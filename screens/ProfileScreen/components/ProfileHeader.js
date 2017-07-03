import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native'

import HTMLView from 'react-native-htmlview'
import layout from '../../../constants/Layout'

export default class ProfileHeader extends Component {
  render() {
    const user = this.props.user;
    return (
      <View style={styles.header}>
        <View style={styles.innerHeader}>
          <Text style={styles.headerText}>
            {user.name}
          </Text>
          <HTMLView
            value={user.bio}
            stylesheet={styles}
          />
          <Image
            style={styles.avatar}
            source={{uri: user.avatar}}
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
    padding: layout.padding,
    paddingBottom: 0
  },
  innerHeader: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: layout.padding,
    minHeight: 100
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: layout.padding
  }
});