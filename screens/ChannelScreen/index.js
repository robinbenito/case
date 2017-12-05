import React, { Component } from 'react'

import { Container } from '../../components/UI/Layout'
import ChannelContainer from './components/ChannelContainer'

export default class ChannelScreen extends Component {
  render() {
    return (
      <Container>
        <ChannelContainer
          {...this.props}
          page={1}
          type="BLOCK"
        />
      </Container>
    )
  }
}
