import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Units, Typography, Colors } from '../../../constants/Style'

const ChannelResult = styled.View`
  justify-content: center;
`

const Title = styled.Text`
  font-size: ${Typography.fontSize.smedium};
  font-weight: ${Typography.fontWeight.medium};
`

const ChannelMeta = styled.View`
  padding-top: ${Units.scale[1]};
`

const MetaText = styled.Text`
  font-size: ${Typography.fontSize.small};
  color: ${Colors.gray.semiBold};
`

export default class SearchResultChannelItem extends React.Component {
  render() {
    const { channel } = this.props
    return (
      <ChannelResult>
        <Title style={{ color: Colors.channel[channel.visibility] }}>
          {channel.title}
        </Title>
        <ChannelMeta >
          <MetaText>
            {channel.user.name} • {channel.updated_at}
          </MetaText>
        </ChannelMeta >
      </ChannelResult>
    )
  }
}

SearchResultChannelItem.propTypes = {
  channel: PropTypes.any.isRequired,
}
