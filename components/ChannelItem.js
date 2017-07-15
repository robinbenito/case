import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

import Colors from '../constants/Colors'
import NavigatorService from '../utilities/navigationService'

const styles = StyleSheet.create({
  channelContainer: {
    borderColor: '#666',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    padding: 15,
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
  },
  channelContainerPrivate: {
    backgroundColor: Colors.privateBackground,
    borderColor: Colors.private,
  },
  channelContainerClosed: {
    backgroundColor: Colors.closedBackground,
    borderColor: Colors.closed,
  },
  channelContainerPublic: {
    backgroundColor: Colors.publicBackground,
    borderColor: Colors.public,
  },
  channelTitle: {
    fontSize: 16,
    color: '#000',
    lineHeight: 32,
  },
  channelTitlePrivate: {
    color: Colors.private,
  },
  channelTitleClosed: {
    color: Colors.closed,
  },
  channelTitlePublic: {
    color: Colors.public,
  },
})

export default class ChannelItem extends Component {
  constructor(props) {
    super(props)
    this.onPressButton = this.onPressButton.bind(this)
  }

  onPressButton() {
    NavigatorService.navigate('channel', { id: this.props.channel.id })
  }

  render() {
    const containerStyle = {
      public: styles.channelContainerPublic,
      closed: styles.channelContainerClosed,
      private: styles.channelContainerPrivate,
    }[this.props.channel.kind.visibility]

    const textStyle = {
      public: styles.channelTitlePublic,
      closed: styles.channelTitleClosed,
      private: styles.channelTitlePrivate,
    }[this.props.channel.kind.visibility]

    const textColor = Colors[this.props.channel.kind.visibility]

    return (
      <TouchableOpacity onPress={this.onPressButton}>
        <View style={[styles.channelContainer, containerStyle]}>
          <Text style={[styles.channelTitle, textStyle]}>
            {this.props.channel.title}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 12, color: textColor }}>
                {this.props.channel.user.name}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, color: textColor }}>
                {this.props.channel.updated_at}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

ChannelItem.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    updated_at: PropTypes.string,
    user: PropTypes.any,
    kind: PropTypes.any,
  }).isRequired,
}
