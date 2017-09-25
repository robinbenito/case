import React from 'react'
import PropTypes from 'prop-types'
import ChannelContainerWithData from './components/ChannelContainer'
import { Container } from '../../components/UI/Layout'

export default class ChannelScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channelId: this.props.navigation.state.params.id,
    }
  }

  render() {
    return (
      <Container>
        <ChannelContainerWithData
          id={this.state.channelId}
          page={1}
          type="BLOCK"
        />
      </Container>
    )
  }
}

ChannelScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
