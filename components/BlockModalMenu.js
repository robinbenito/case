import React, { Component } from 'react'
import { View } from 'react-native'
import { gql, graphql } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import PropTypes from 'prop-types'

import { HorizontalRule } from './UI/Layout'
import MenuButtonGroup from './Menu/MenuButtonGroup'
import MenuButton from './Menu/MenuButton'
import { closeModal } from './Modal'

import { Colors } from '../constants/Style'

import navigationService from '../utilities/navigationService'
import alertErrors from '../utilities/alertErrors'
import { pluralize } from '../utilities/inflections'

import {
  ChannelQuery,
  ChannelConnectionsQuery,
  ChannelBlocksQuery,
} from '../screens/ChannelScreen/components/ChannelContainer'

export const deleteConnectionMutation = gql`
  mutation deleteConnectionMutation($id: ID!) {
    delete_connection(input: { id: $id }) {
      clientMutationId
      status
    }
  }
`

class BlockModalMenu extends Component {
  connect = () => {
    const { block: { id, title } } = this.props
    this.close()
    navigationService.navigate('connect', {
      title, connectable_id: id, connectable_type: 'BLOCK',
    })
  }

  leaveComment = () => {
    const { block: { id, counts: { comments } } } = this.props
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
        { query: ChannelQuery, variables: { id: channel_id } },
        { query: ChannelConnectionsQuery, variables: { id: channel_id } },
        { query: ChannelBlocksQuery, variables: { id: channel_id, page: 1, type: 'BLOCK' } },
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
        <MenuButton onPress={this.connect}>Connect &rarr;</MenuButton>

        <HorizontalRule />
        <MenuButton onPress={this.leaveComment}>Leave comment</MenuButton>

        <HorizontalRule />
        <MenuButton onPress={this.visitBlock}>Visit block</MenuButton>

        {channel &&
          <View>
            <HorizontalRule />
            <MenuButton onPress={this.visitChannel}>Visit channel</MenuButton>
          </View>
        }

        {block.can.manage &&
          <View>
            <HorizontalRule />
            <MenuButton onPress={this.editBlock}>Edit block</MenuButton>
          </View>
        }

        {block.connection.can.destroy &&
          <View>
            <HorizontalRule />
            <MenuButton onPress={this.deleteConnection}>
              Remove from {channel.title}
            </MenuButton>
          </View>
        }
      </MenuButtonGroup>
    )
  }
}

BlockModalMenu.fragments = {
  block: gql`
    fragment BlockModalMenuBlock on Connectable {
      id
      title
      can {
        manage
      }
      connection {
        id
        can {
          destroy
        }
      }
      kind {
        ...on Block {
          counts {
            comments
          }
        }
      }
    }
  `,
  channel: gql`
    fragment BlockModalMenuChannel on Channel {
      id
      title
      visibility
    }
  `,
}

BlockModalMenu.propTypes = {
  channel: propType(BlockModalMenu.fragments.channel),
  block: propType(BlockModalMenu.fragments.block).isRequired,
  deleteConnection: PropTypes.func,
}

BlockModalMenu.defaultProps = {
  channel: null,
  deleteConnection: null,
}

export default graphql(deleteConnectionMutation, {
  name: 'deleteConnection',
})(BlockModalMenu)
