import React, { Component } from 'react'
import { View } from 'react-native'
import { graphql } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import PropTypes from 'prop-types'

import { HorizontalRule } from '../UI/Layout'
import MenuButtonGroup from '../Menu/MenuButtonGroup'
import MenuButton from '../Menu/MenuButton'
import { closeModal } from '../Modal'

import { Colors } from '../../constants/Style'

import navigationService from '../../utilities/navigationService'
import alertErrors from '../../utilities/alertErrors'
import { pluralize } from '../../utilities/inflections'

import channelQuery from '../../screens/ChannelScreen/queries/channel'
import channelBlocksQuery from '../../screens/ChannelScreen/queries/channelBlocks'

import deleteConnectionMutation from './mutations/deleteConnection'
import blockModalMenuBlockFragment from './fragments/blockModalMenuBlock'
import blockModalMenuChannelFragment from './fragments/blockModalMenuChannel'

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

  visitBlock = () => {
    const { block: { id } } = this.props
    this.close()
    navigationService.navigate('block', { id })
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
      <MenuButtonGroup>
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
          onPress={this.visitBlock}
        >
          Visit block
        </MenuButton>

        {channel &&
          <View>
            <HorizontalRule />
            <MenuButton
              centered
              onPress={this.visitChannel}
            >
              Visit channel
            </MenuButton>
          </View>
        }

        {block.can && block.can.manage &&
          <View>
            <HorizontalRule />
            <MenuButton
              centered
              onPress={this.editBlock}
            >
              Edit block
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
      </MenuButtonGroup>
    )
  }
}

export default graphql(deleteConnectionMutation, {
  name: 'deleteConnection',
})(BlockModalMenu)
