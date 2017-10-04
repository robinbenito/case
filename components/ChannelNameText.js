import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import NavigatorService from '../utilities/navigationService'
import { Colors } from '../constants/Style'

export default class ChannelNameText extends React.Component {
  goToChannel = () => {
    this.props.onPress()

    NavigatorService.navigate('channel', {
      id: this.props.channel.id,
      title: this.props.channel.title,
      color: Colors.channel[this.props.channel.visibility],
    })
  }

  render() {
    const { channel, onPress, ...rest } = this.props

    return (
      <Text onPress={this.goToChannel} {...rest}>
        {channel.title}
      </Text>
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
