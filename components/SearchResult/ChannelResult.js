import React from 'react'
import styled from 'styled-components/native'
import { gql } from 'react-apollo'
import { propType } from 'graphql-anywhere'

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

ChannelResult.fragments = {
  channel: gql`
    fragment ChannelResult on Channel {
      __typename
      id
      title
      visibility
      updated_at(relative: true)
      user {
        id
        name
      }
    }
  `,
}

ChannelResult.propTypes = {
  channel: propType(ChannelResult.fragments.channel).isRequired,
}
