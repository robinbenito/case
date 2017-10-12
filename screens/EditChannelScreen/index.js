import React from 'react'
import PropTypes from 'prop-types'

import BackButton from '../../components/BackButton'
import EditChannelForm from './components/EditChannelForm'

const navigationOptions = {
  title: 'Edit Channel',
  headerLeft: (<BackButton />),
}

class EditChannelScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

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
        navigation={navigation}
        channel={channel}
        id={channel.id}
      />
    )
  }
}

EditChannelScreen.propTypes = {
  navigation: PropTypes.any,
}

EditChannelScreen.defaultProps = {
  navigation: () => null,
}

export default EditChannelScreen
