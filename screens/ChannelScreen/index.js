import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import AddMenu from '../../components/AddMenu'
import ChannelContainerWithData from './components/ChannelContainer'

const ChannelWrapper = styled.View`
  position: relative;
  flex: 1;
`

export default class ChannelScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channelId: this.props.navigation.state.params.id,
    }
  }

  render() {
    return (
      <ChannelWrapper>
        <ChannelContainerWithData
          id={this.state.channelId}
          page={1}
          type="BLOCK"
        />
        <AddMenu />
      </ChannelWrapper>
    )
  }
}

ChannelScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
