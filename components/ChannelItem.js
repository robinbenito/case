import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { decode } from 'he'
import { Border, Colors, Typography, Units } from '../constants/Style'
import navigationService from '../utilities/navigationService'

const Background = styled.TouchableOpacity`
  margin-horizontal: ${Units.scale[2]};
  margin-bottom: ${Units.scale[2]};
  padding-vertical: ${Units.base};
  padding-horizontal: ${Units.scale[2]};
  background-color: ${c => Colors.channel.background[c.visibility]};
  border-color: ${c => (c.isSelected ? Colors.channel[c.visibility] : 'transparent')};
  border-width: ${Border.borderWidthMedium};
  border-radius: ${Border.borderRadius};
`

const Color = styled.Text`
  color: ${c => Colors.channel[c.visibility]};
`

const Title = styled.Text`
  font-size: ${Typography.fontSize.medium};
`

const Metadata = styled.View`
  flex-direction: row;
  margin-top: ${Units.scale[1]};
`

const Attribution = styled.Text`
  align-self: flex-start;
  flex: 1;
  font-size: ${Typography.fontSize.tiny};
`

const Timestamp = styled.Text`
  font-size: ${Typography.fontSize.tiny};
`

export default class ChannelItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSelected: props.isSelected,
    }
  }

  onPressButton = () => {
    const { onToggleSelect } = this.props

    if (onToggleSelect) return this.toggleSelect()

    const { channel } = this.props
    const visibility = channel.visibility || channel.kind.visibility

    navigationService.navigate('channel', {
      id: channel.id,
      title: channel.title,
      color: Colors.channel[visibility],
    })
  }

  toggleSelect() {
    const { onToggleSelect, channel } = this.props

    const isSelected = !this.state.isSelected

    this.setState({ isSelected })

    onToggleSelect(channel, isSelected)
  }

  render() {
    const { channel } = this.props
    const { isSelected } = this.state

    const visibility = channel.visibility || channel.kind.visibility
    const counts = channel.counts || channel.kind.counts

    return (
      <Background visibility={visibility} isSelected={isSelected} onPress={this.onPressButton}>
        <Title numberOfLines={1}>
          <Color visibility={visibility}>
            {decode(channel.title)}
          </Color>
        </Title>

        <Metadata>
          <Attribution numberOfLines={1}>
            <Color visibility={visibility}>
              {channel.user.name} • {counts.contents} blocks
            </Color>
          </Attribution>

          <Timestamp numberOfLines={1}>
            <Color visibility={visibility}>
              {channel.updated_at}
            </Color>
          </Timestamp>
        </Metadata>
      </Background>
    )
  }
}

ChannelItem.fragments = {
  channel: gql`
    fragment ChannelThumb on Channel {
      __typename
      id
      title
      visibility
      updated_at(relative: true)
      counts {
        contents
      }
      user {
        id
        name
      }
    }
  `,
}

ChannelItem.propTypes = {
  isSelected: PropTypes.bool,
  onToggleSelect: PropTypes.any,
  channel: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    updated_at: PropTypes.string,
    user: PropTypes.any,
    kind: PropTypes.any,
    visibility: PropTypes.any,
    counts: PropTypes.any,
  }).isRequired,
}

ChannelItem.defaultProps = {
  onToggleSelect: null,
  isSelected: false,
}
