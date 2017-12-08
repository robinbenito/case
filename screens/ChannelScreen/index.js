import React, { Component } from 'react'

import HeaderAwareContainer from '../../components/UI/Layout/HeaderAwareContainer'
import ChannelContainer from './components/ChannelContainer'

export default class ChannelScreen extends Component {
  render() {
    return (
      <HeaderAwareContainer>
        <ChannelContainer
          {...this.props}
          page={1}
          type="BLOCK"
        />
      </HeaderAwareContainer>
    )
  }
}
