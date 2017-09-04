import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

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
    this.props.onPress()
    NavigatorService.navigate('channel', { id: this.props.channel.id })
  }

  render() {
    const privacyStyle = {
      public: styles.channelTitlePublic,
      closed: styles.channelTitleClosed,
      private: styles.channelTitlePrivate,
    }[this.props.channel.visibility]

    const { channel, style } = this.props
    const textStyle = [styles.text, privacyStyle, style]

    return (
      <Text style={textStyle} onPress={this.goToChannel}>{channel.title} </Text>
    )
  }
}

ChannelNameText.propTypes = {
  style: PropTypes.any,
  channel: PropTypes.shape({
    id: PropTypes.any,
    visibility: PropTypes.any,
    title: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
}

ChannelNameText.defaultProps = {
  style: {},
  onPress: () => null,
}
