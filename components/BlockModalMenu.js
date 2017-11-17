import React, { Component } from 'react'
import { View } from 'react-native'
import { gql } from 'react-apollo'
import { propType } from 'graphql-anywhere'

import { HorizontalRule } from './UI/Layout'
import MenuButtonGroup from './Menu/MenuButtonGroup'
import MenuButton from './Menu/MenuButton'
import { closeModal } from './Modal'

import { Colors } from '../constants/Style'

import navigationService from '../utilities/navigationService'
import { pluralize } from '../utilities/inflections'

export default class BlockModalMenu extends Component {
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

  close = () => {
    closeModal()
  }

  render() {
    const { channel, block: { can } } = this.props

    return (
      <MenuButtonGroup>
        <MenuButton onPress={this.connect}>Connect &rarr;</MenuButton>
        <HorizontalRule />

        <MenuButton onPress={this.leaveComment}>Leave comment</MenuButton>
        <HorizontalRule />

        <MenuButton onPress={this.visitBlock}>Visit block</MenuButton>
        <HorizontalRule />

        {channel &&
          <View>
            <MenuButton onPress={this.visitChannel}>Visit channel</MenuButton>
            <HorizontalRule />
          </View>
        }

        {can.manage &&
          <MenuButton onPress={this.editBlock}>Edit block</MenuButton>
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
      counts {
        comments
      }
      can {
        manage
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
}

BlockModalMenu.defaultProps = {
  channel: null,
}
