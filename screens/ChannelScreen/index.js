import React from 'react'
import PropTypes from 'prop-types'

import ChannelContainerWithData from './components/ChannelContainer'

export default class ChannelScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channelId: this.props.navigation.state.params.id,
    }
  }

  render() {
    console.log('this.state.channelId', this.state.channelId)
    return (
      <ChannelContainerWithData id={this.state.channelId} />
    )
  }
}

ChannelScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
