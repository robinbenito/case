import React, { Component } from 'react'
import { View, Share } from 'react-native'
import { graphql } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { HorizontalRule, AbsoluteFill } from '../UI/Layout'
import MenuButtonGroup from '../Menu/MenuButtonGroup'
import MenuButton from '../Menu/MenuButton'
import { closeModal } from '../Modal'
import BlockInner from '../BlockInner'

import { Colors, Units } from '../../constants/Style'

import navigationService from '../../utilities/navigationService'
import alertErrors from '../../utilities/alertErrors'
import { pluralize } from '../../utilities/inflections'

import channelQuery from '../../screens/ChannelScreen/queries/channel'
import channelBlocksQuery from '../../screens/ChannelScreen/queries/channelBlocks'

import deleteConnectionMutation from './mutations/deleteConnection'
import blockModalMenuBlockFragment from './fragments/blockModalMenuBlock'
import blockModalMenuChannelFragment from './fragments/blockModalMenuChannel'

const Fill = styled(AbsoluteFill)`
  padding-horizontal: ${Units.base};
  padding-vertical: ${Units.base};
  justify-content: flex-end;
`

const Menu = styled(MenuButtonGroup)`
  margin-top: ${Units.base}
`

class BlockModalMenu extends Component {
  static fragments = {
    block: blockModalMenuBlockFragment,
    channel: blockModalMenuChannelFragment,
  }

  static propTypes = {
    channel: propType(blockModalMenuChannelFragment),
    block: propType(blockModalMenuBlockFragment).isRequired,
    deleteConnection: PropTypes.func,
  }

  static defaultProps = {
    channel: null,
    deleteConnection: null,
  }

  connect = () => {
    const { block: { id, title } } = this.props
    this.close()
    navigationService.navigate('connect', {
      title, connectable_id: id, connectable_type: 'BLOCK',
    })
  }

  leaveComment = () => {
    const { block: { id, kind: { counts: { comments } } } } = this.props
    this.close()
    navigationService.navigate('comment', {
      id, title: pluralize(comments, 'Comment'),
    })
  }

  share = () => {
    const { block: { href } } = this.props

    Share.share({ url: `https://www.are.na/${href}` })
  }

  visitChannel = () => {
    const { channel: { id, title, visibility } } = this.props
    this.close()
    navigationService.navigate('channel', {
      id, title, color: Colors.channel[visibility],
    })
  }

  editBlock = () => {
    const { block: { id } } = this.props
    this.close()
    navigationService.navigate('editBlock', { id })
  }

  deleteConnection = () => {
    const {
      deleteConnection,
      channel: {
        id: channel_id,
      },
      block: {
        connection: {
          id,
        },
      },
    } = this.props

    return deleteConnection({
      variables: { id },
      refetchQueries: [
        { query: channelQuery, variables: { id: channel_id } },
        { query: channelBlocksQuery, variables: { id: channel_id, page: 1, type: 'BLOCK' } },
      ],
    })

    .then(() => this.close())

    .catch((err) => {
      alertErrors(err)
      this.close()
    })
  }

  close = () => {
    closeModal()
  }

  render() {
    const { channel, block } = this.props

    return (
      <Fill>
        <BlockInner block={block} />
        <Menu>
          <MenuButton
            centered
            onPress={this.connect}
          >
              Connect &rarr;
          </MenuButton>

          <HorizontalRule />
          <MenuButton
            centered
            onPress={this.leaveComment}
          >
            Leave comment
          </MenuButton>

          <HorizontalRule />
          <MenuButton
            centered
            onPress={this.share}
          >
            Share
          </MenuButton>

          {block.can && block.can.manage &&
            <View>
              <HorizontalRule />
              <MenuButton
                centered
                onPress={this.editBlock}
              >
                Edit
              </MenuButton>
            </View>
          }

          {block.connection && block.connection.can.destroy &&
            <View>
              <HorizontalRule />
              <MenuButton
                centered
                onPress={this.deleteConnection}
              >
                Remove from {channel.title}
              </MenuButton>
            </View>
          }

          <HorizontalRule />
          <MenuButton
            centered
            onPress={this.close}
          >
            Close
          </MenuButton>
        </Menu>
      </Fill>
    )
  }
}

export default graphql(deleteConnectionMutation, {
  name: 'deleteConnection',
})(BlockModalMenu)
