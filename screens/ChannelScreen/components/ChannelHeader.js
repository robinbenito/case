import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import UserNameText from '../../../components/UserNameText'
import TabToggle from '../../../components/TabToggle'
import FollowButtonWithData from '../../../components/FollowButton'
import { Colors, Units, Typography } from '../../../constants/Style'

const TAB_OPTIONS = {
  Channels: 'CHANNEL',
  Blocks: 'BLOCK',
}

const Header = styled.View`
  padding-top: ${Units.scale[3]};
  padding-horizontal: ${Units.scale[3]};
  padding-bottom: ${Units.scale[4]};
`

const Headline = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

const Title = styled.Text`
  flex: 1;
  margin-right: ${Units.scale[2]};
  margin-bottom: ${Units.scale[3]};
  font-size: ${Typography.fontSize.h1};
  font-weight: ${Typography.fontWeight.medium};
  color: ${({ visibility }) => Colors.channel[visibility]};
`

const Metadata = styled.Text`
  margin-vertical: ${Units.scale[1]};
  color: ${({ visibility }) => Colors.channel[visibility]};
  font-size: ${Typography.fontSize.small};
  width: 85%;
`

const Follow = styled.View`
  margin-top: ${Units.scale[1]};
`

const ChannelHeader = ({ channel, type, onToggle }) => (
  <View>
    <Header>
      <Headline>
        <Title visibility={channel.visibility}>
          {channel.title}
        </Title>

        {channel.can.follow &&
          <Follow>
            <FollowButtonWithData id={channel.id} type="CHANNEL" />
          </Follow>
        }
      </Headline>

      <Metadata visibility={channel.visibility}>
        {channel.description || '—'}
      </Metadata>

      <Metadata visibility={channel.visibility}>
        by <UserNameText user={channel.user} />
      </Metadata>
    </Header>

    <TabToggle
      selectedSegment={type}
      onToggleChange={onToggle}
      options={TAB_OPTIONS}
      color={Colors.channel[channel.visibility]}
    />
  </View>
)

ChannelHeader.propTypes = {
  type: PropTypes.oneOf(['CHANNEL', 'BLOCK']).isRequired,
  onToggle: PropTypes.func,
  channel: PropTypes.shape({
    id: PropTypes.any,
    visibility: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.any,
    can: PropTypes.any,
  }).isRequired,
}

ChannelHeader.defaultProps = {
  onToggle: () => null,
}

export default ChannelHeader
