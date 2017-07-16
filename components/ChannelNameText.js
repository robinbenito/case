import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import Colors from '../constants/Colors'
import NavigatorService from '../utilities/navigationService'

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
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

export default class ChannelNameText extends React.Component {
  constructor(props) {
    super(props)
    this.goToChannel = this.goToChannel.bind(this)
  }

  goToChannel() {
    NavigatorService.navigate('channel', { id: this.props.channel.slug })
  }

  render() {
    const textStyle = {
      public: styles.channelTitlePublic,
      closed: styles.channelTitleClosed,
      private: styles.channelTitlePrivate,
    }[this.props.channel.visibility]

    return (
      <TouchableOpacity onPress={this.goToChannel}>
        <Text style={[styles.text, textStyle]}>
          {this.props.channel.title}
        </Text>
      </TouchableOpacity>
    )
  }
}

ChannelNameText.propTypes = {
  channel: PropTypes.shape({
    visibility: PropTypes.any,
    title: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
}
