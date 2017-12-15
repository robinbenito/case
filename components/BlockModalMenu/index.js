import React, { Component } from 'react'
import { View, Share } from 'react-native'
import { graphql } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Color } from '../UI/Texts'
import { HorizontalRule, AbsoluteFill } from '../UI/Layout'
import MenuButtonGroup from '../Menu/MenuButtonGroup'
import MenuButton from '../Menu/MenuButton'
import { closeModal } from '../Modal'
import BlockInner from '../BlockInner'

import { Colors, Units } from '../../constants/Style'

import navigationService from '../../utilities/navigationService'
import alertErrors from '../../utilities/alertErrors'
import { pluralize } from '../../utilities/inflections'

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

  constructor(props) {
    super(props)

    const { channel } = props

    this.state = {
      removeLabel: channel ? `Remove from ${channel.title}` : '',
    }
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

    Share.share({ url: `https://www.are.na${href}` })
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
        title,
        visibility,
      },
      block: {
        connection: {
          id,
        },
      },
    } = this.props

    this.setState({
      removeLabel: 'Removing...',
    })

    return deleteConnection({
      variables: { id },
    })

    .then(() => {
      this.close()

      navigationService.navigate('channel', {
        id: channel_id, title, color: Colors.channel[visibility],
      })
    })

    .catch((err) => {
      alertErrors(err)
      this.close()
    })
  }

  close = () => {
    closeModal()
  }

  render() {
    const { removeLabel } = this.state
    const { block } = this.props

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

          {block.visibility !== 'private' &&
            <View>
              <HorizontalRule />
              <MenuButton
                centered
                onPress={this.share}
              >
                Share
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
                <Color path="state.alert">
                  {removeLabel}
                </Color>
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
