import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Typography, Colors } from '../../constants/Style'

import { Meta, MetaText } from './Meta'

const Container = styled.View`
  justify-content: center;
`

const Title = styled.Text`
  font-size: ${Typography.fontSize.smedium};
  font-weight: ${Typography.fontWeight.medium};
`

export default class ChannelResult extends React.Component {
  render() {
    const { channel } = this.props
    return (
      <Container>
        <Title style={{ color: Colors.channel[channel.visibility] }}>
          {channel.title}
        </Title>
        <Meta>
          <MetaText>
            {channel.user.name} • {channel.updated_at}
          </MetaText>
        </Meta>
      </Container>
    )
  }
}

ChannelResult.propTypes = {
  channel: PropTypes.any.isRequired,
}
