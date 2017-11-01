import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Attribution, Title } from './Meta'

import { Colors } from '../../constants/Style'

const Container = styled.View`
  justify-content: center;
`

export default class ChannelResult extends React.Component {
  render() {
    const { channel } = this.props

    return (
      <Container>
        <Title style={{ color: Colors.channel[channel.visibility] }}>
          {channel.title}
        </Title>

        <Attribution>
          {channel.user.name} • {channel.updated_at}
        </Attribution>
      </Container>
    )
  }
}

ChannelResult.propTypes = {
  channel: PropTypes.any.isRequired,
}
