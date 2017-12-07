import React, { Component } from 'react'
import { Share } from 'react-native'
import styled from 'styled-components/native'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'

import FollowButtonWithData from '../../../components/FollowButton'
import SmallButton from '../../../components/UI/Buttons/SmallButton'

import navigationService from '../../../utilities/navigationService'

import { Colors, Units } from '../../../constants/Style'

const Actions = styled.View`
  margin-vertical: ${Units.scale[2]};
  flex-direction: row;
  justify-content: center;
`

const FollowButton = styled(FollowButtonWithData)`
  margin-horizontal: ${Units.scale[1]};
`

const Action = styled(SmallButton)`
  margin-horizontal: ${Units.scale[1]};
`

const channelActionsFragment = gql`
  fragment ChannelActions on Channel {
    id
    href
    visibility
    can {
      follow
      manage
    }
  }
`

export default class ChannelActions extends Component {
  static propTypes = {
    channel: propType(channelActionsFragment).isRequired,
  }

  static fragment = channelActionsFragment

  editChannel = () => {
    const { channel: { id } } = this.props
    navigationService.navigate('editChannel', { id })
  }

  share = () => {
    const { channel: { href } } = this.props
    Share.share({ url: `https://www.are.na/${href}` })
  }

  render() {
    const { channel: { id, can, visibility } } = this.props
    const color = Colors.channel[visibility]

    return (
      <Actions>
        {can.follow &&
          <FollowButton
            id={id}
            type="CHANNEL"
            color={color}
          />
        }

        {can.manage &&
          <Action
            onPress={this.editChannel}
            accessibilityLabel="Edit"
            color={color}
          >
            Edit
          </Action>
        }

        {/* TODO: `can { share }` */}
        {visibility !== 'private' &&
          <Action
            visibility={visibility}
            onPress={this.share}
            color={color}
          >
            Share
          </Action>
        }
      </Actions>
    )
  }
}
