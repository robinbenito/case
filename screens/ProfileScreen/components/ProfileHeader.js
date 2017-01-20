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
         <SegmentedControlIOS 
          tintColor="#222" 
          values={['Channels', 'Blocks']} 
          selectedIndex={0}
          onValueChange={(value) => { this.props.onToggleChange(value) }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    position: 'absolute',
    top: 20,
    right: 0,
    width: 75,
    height: 75
  },  
  header: {
    paddingTop: 20,
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