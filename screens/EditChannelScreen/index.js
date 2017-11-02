import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EditChannelForm from './components/EditChannelForm'

class EditChannelScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      channel: this.props.navigation.state.params.channel,
    }
  }

  render() {
    const { navigation } = this.props
    const { channel } = this.state

    return (
      <EditChannelForm
        id={channel.id}
        channel={channel}
        navigation={navigation}
      />
    )
  }
}

EditChannelScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

EditChannelScreen.defaultProps = {
  navigation: {},
}

export default EditChannelScreen
