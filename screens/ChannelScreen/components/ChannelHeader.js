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

import Colors from '../../../constants/Colors';

export default class ChannelHeader extends Component {
  render() {
    const channel = this.props.channel;

    const textStyle = {
      'public': styles.channelPublic,
      'closed': styles.channelClosed,
      'private': styles.channelPrivate,
    }[channel.visibility];

    return (
      <View style={styles.header}>
        <View style={styles.innerHeader}>
          <Text style={[styles.headerText, textStyle]}>
            {channel.title}
          </Text>
          <View style={styles.collaborators}>
            <Text style={textStyle}>by </Text>
            <UserNameText style={textStyle} user={channel.user} />
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
  },
  collaborators: {
    flexDirection: 'row',
  },
  channelPrivate: {
    color: Colors.private
  }, 
  channelClosed: {
    color: Colors.closed,
  }, 
  channelPublic: {
    color: Colors.public,
  },  
});