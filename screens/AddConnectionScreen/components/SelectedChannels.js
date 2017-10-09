import React from 'react'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

import styled from 'styled-components/native'
import { Units, Typography, Colors, Border } from '../../../constants/Style'

const Status = styled.View`
  justify-content: center;
  align-items: flex-start;
  margin-bottom: ${Units.scale[3]};
  padding-horizontal: ${Units.scale[2]};
`

const Sentence = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${Units.scale[2]};
`

const StatusText = styled.Text`
  font-size: ${Typography.fontSize.base};
  color: ${Colors.gray.semiBold};
`

const BoldStatusText = styled(StatusText)`
  font-weight: ${Typography.fontWeight.semiBold};
`

const SelectedChannelsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`

const SelectedChannel = styled.TouchableOpacity`
  margin-right: ${Units.scale[2]};
  margin-vertical: ${Units.scale[1]};
  border-width: ${Border.borderWidth};
  border-radius: ${Border.borderRadius};
  padding-horizontal: ${Units.scale[2]};
  padding-vertical: ${Units.scale[1]};
  flex-direction: row;
  align-items: center;
`

const Icon = styled(Ionicons)`
  padding-right: ${Units.scale[1]};
  position: relative;
  bottom: -1;
`

const ChannelWord = styled.Text`
  font-weight: ${Typography.fontWeight.semiBold};
`

export default class SelectedChannels extends React.Component {
  renderChannels() {
    const { channels, onRemove } = this.props
    return channels.map((channel) => {
      const channelColor = Colors.channel[channel.visibility]
      const backgroundColor = Colors.channel.background[channel.visibility]

      return (
        <SelectedChannel
          key={`connection-${channel.id}`}
          onPress={() => onRemove(channel)}
          style={{ backgroundColor, borderColor: channelColor }}
        >
          <Icon
            name="ios-close-outline"
            size={20}
            color={channelColor}
          />
          <ChannelWord style={{ color: channelColor }}>
            {channel.title}
          </ChannelWord>
        </SelectedChannel>
      )
    })
  }

  render() {
    const { channels, title, isSearching } = this.props
    if (channels.length > 0 || isSearching) {
      return (
        <Status>
          <Sentence>
            <StatusText>
              <StatusText>Connect </StatusText>
              <BoldStatusText>&#8220;{title}&#8220;</BoldStatusText>
              <StatusText> to</StatusText>
            </StatusText>
          </Sentence>
          {channels.length > 0 &&
            <SelectedChannelsContainer>
              {this.renderChannels()}
            </SelectedChannelsContainer>
          }
        </Status>
      )
    }
    return (
      <Status>
        <Sentence>
          <StatusText>
            Recent channels
          </StatusText>
        </Sentence>
      </Status>
    )
  }
}

SelectedChannels.propTypes = {
  title: PropTypes.string,
  channels: PropTypes.any.isRequired,
  onRemove: PropTypes.func,
  isSearching: PropTypes.bool,
}

SelectedChannels.defaultProps = {
  title: 'Untitled block',
  onRemove: () => null,
  isSearching: false,
}
