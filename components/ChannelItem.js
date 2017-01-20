import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity
} from 'react-native';

import Colors from '../constants/Colors';

export default class ChannelItem extends Component {
  _onPressButton() {
    console.log("channel pressed")
  }
  
  render() {
    const containerStyle = {
      'public': styles.channelContainerPublic,
      'closed': styles.channelContainerClosed,
      'public': styles.channelContainerPublic,
    }[this.props.channel.kind.visibility];

    const textStyle = {
      'public': styles.channelTitlePublic,
      'closed': styles.channelTitleClosed,
      'public': styles.channelTitlePublic,
    }[this.props.channel.kind.visibility];

    const textColor = Colors[this.props.channel.kind.visibility];

    return (
      <TouchableOpacity onPress={this._onPressButton}>
        <View style={[styles.channelContainer, containerStyle]}>
          <Text style={[styles.channelTitle, textStyle]}>
            {this.props.channel.title}
          </Text>
          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{}}>
              <Text style={{fontSize: 12, color: textColor}}>
                {this.props.channel.user.name}
              </Text>
            </View>
            <View style={{}}>
              <Text style={{fontSize: 12, color: textColor}}>
                {this.props.channel.updated_at}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({ 
  channelContainer: {
    borderColor: '#666',
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 1.0)",
    padding: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  channelContainerPrivate: {
    backgroundColor: Colors.privateBackground,
    borderColor: Colors.private
  }, 
  channelContainerClosed: {
    backgroundColor: Colors.closedBackground,
    borderColor: Colors.closed
  }, 
  channelContainerPublic: {
    backgroundColor: Colors.publicBackground,
    borderColor: Colors.public
  }, 
  channelTitle: {
    fontSize: 16,
    color: '#000',
    lineHeight: 32
  },
  channelTitlePrivate: {
    color: Colors.private
  }, 
  channelTitleClosed: {
    color: Colors.closed,
  }, 
  channelTitlePublic: {
    color: Colors.public,
  },  
});