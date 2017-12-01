import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Container } from '../../components/UI/Layout'
import ChannelContainer from './components/ChannelContainer'

export default class ChannelScreen extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  render() {
    return (
      <Container>
        <ChannelContainer
          id={this.props.id}
          page={1}
          type="BLOCK"
        />
      </Container>
    )
  }
}
