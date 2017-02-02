import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SegmentedControlIOS,
  ActivityIndicator
} from 'react-native';

import UserNameText from '../../../components/UserNameText'
import HTMLView from 'react-native-htmlview';

export default class ChannelHeader extends Component {
  render() {
    const channel = this.props.channel;
    console.log('channel', channel)
    return (
      <View style={styles.header}>
        <View style={styles.innerHeader}>
          <Text style={styles.headerText}>
            {channel.title}
          </Text>
          <View>
            <Text>by</Text>
            <UserNameText user={channel.user} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingBottom: 0
  },
  innerHeader: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 20,
    minHeight: 100
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20
  }
});