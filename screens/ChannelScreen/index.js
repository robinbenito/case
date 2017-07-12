import React from 'react'
import PropTypes from 'prop-types'

import BackButton from '../../components/BackButton'
import { ChannelContainerWithData } from './components/ChannelContainer'

export default class ChannelScreen extends React.Component {
  constructor(props) {
    super(props)
    this.route = {
      navigationBar: {
        title: 'Channel',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        renderLeft: () => (<BackButton />),
      },
    }
  }

  render() {
    return (
      <ChannelContainerWithData id={this.props.id} />
    )
  }
}

ChannelScreen.propTypes = {
  id: PropTypes.string.isRequired,
}
