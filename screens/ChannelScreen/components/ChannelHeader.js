import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import UserNameText from '../../../components/UserNameText'
import TabToggle from '../../../components/TabToggle'
import FollowButtonWithData from '../../../components/FollowButton'
import HTML from '../../../components/HTML'
import { Colors, Units, Typography } from '../../../constants/Style'

import pluralize from '../../../utilities/pluralize'

const Container = styled.View`
  margin-bottom: ${Units.base};
`

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
  width: 85%;
  margin-vertical: ${Units.scale[1]};
  color: ${({ visibility }) => Colors.channel[visibility]};
  font-size: ${Typography.fontSize.small};
`

const Description = styled(HTML)`
  width: 85%;
  margin-vertical: ${Units.scale[1]};
`

const Follow = styled.View`
  margin-top: ${Units.scale[1]};
`

const ChannelHeader = ({ channel, type, onToggle }) => {
  const TAB_OPTIONS = {
    [pluralize(channel.counts.channels, 'Channel')]: 'CHANNEL',
    [pluralize(channel.counts.blocks, 'Block')]: 'BLOCK',
  }

  return (
    <Container>
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

        <Description
          value={channel.description || '<p>—</p>'}
          stylesheet={{
            p: {
              color: Colors.channel[channel.visibility],
            },
          }}
        />

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
    </Container>
  )
}

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
