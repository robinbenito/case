import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { pickBy } from 'lodash'
import { Text } from 'react-native'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'

import ChannelActions from './ChannelActions'
import UserNameText from '../../../components/UserNameText'
import TabToggle from '../../../components/TabToggle'
import HTML from '../../../components/HTML'

import { Colors, Units, Typography } from '../../../constants/Style'

import { pluralize } from '../../../utilities/inflections'

const Container = styled.View`
  margin-bottom: ${Units.scale[2]};
`

const Header = styled.View`
  padding-horizontal: ${Units.scale[3]};
`

const Title = styled.Text`
  text-align: center;
  width: 100%;
  margin-bottom: ${Units.scale[1]};
  font-size: ${Typography.fontSize.h1};
  font-weight: ${Typography.fontWeight.semiBold};
  color: ${({ visibility }) => Colors.channel[visibility]};
`

const Metadata = styled.Text`
  text-align: center;
  margin-vertical: ${Units.scale[1]};
  color: ${({ visibility }) => Colors.channel[visibility]};
  font-size: ${Typography.fontSize.base};
  line-height: ${Typography.lineHeightFor('base', 'compact')};
`

const Author = styled(UserNameText)`
  font-weight: ${Typography.fontWeight.bold};
`

const Description = styled(HTML)`
  margin-vertical: ${Units.scale[1]};
`

class ChannelHeader extends Component {
  render() {
    const { channel, type, onToggle } = this.props

    let TAB_OPTIONS = {
      [pluralize(channel.counts.connections, 'Connection')]: 'CONNECTION',
      [pluralize(channel.counts.channels, 'Channel')]: 'CHANNEL',
      [pluralize(channel.counts.blocks, 'Block')]: 'BLOCK',
    }

    // Remove channels tab if there are none
    if (channel.counts.channels === 0) {
      TAB_OPTIONS = pickBy(TAB_OPTIONS, value => value !== 'CHANNEL')
    }

    return (
      <Container>
        <Header>
          <Title visibility={channel.visibility}>
            {channel.title}
          </Title>

          <Description
            value={channel.displayDescription || '<p>—</p>'}
            stylesheet={{
              p: {
                color: Colors.channel[channel.visibility],
                textAlign: 'center',
                lineHeight: Typography.lineHeightFor('small'),
              },
            }}
          />

          <Metadata visibility={channel.visibility}>
            by <Author user={channel.user} />

            {channel.collaborators.length > 0 &&
              <Text>
                {' with '}
                {channel.collaborators.map((collaborator, i) => (
                  <Text key={collaborator.id}>
                    <Author user={collaborator} />
                    {channel.collaborators.length - 1 === i ? '' : ', '}
                  </Text>
                ))}
              </Text>
            }
          </Metadata>

          <ChannelActions channel={channel} />
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
}

ChannelHeader.fragments = {
  channelHeader: gql`
    fragment ChannelHeader on Channel {
      id
      visibility
      title
      displayDescription: description(format: HTML)
      user {
        id
        name
        slug
      }
      counts {
        connections
        channels
        blocks
      }
      collaborators {
        id
        slug
        name
      }
      ...ChannelActions
    }
    ${ChannelActions.fragment}
  `,
}

ChannelHeader.propTypes = {
  type: PropTypes.oneOf(['CHANNEL', 'BLOCK', 'CONNECTION']).isRequired,
  onToggle: PropTypes.func,
  channel: propType(ChannelHeader.fragments.channelHeader).isRequired,
}

ChannelHeader.defaultProps = {
  onToggle: () => null,
}

export default ChannelHeader
