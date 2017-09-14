import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import { Colors, Units } from '../../../constants/Style'
import NavigatorService from '../../../utilities/navigationService'

import ChannelResult from './ChannelResult'
import ConnectableResult from './ConnectableResult'
import UserResult from './UserResult'

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderBottomColor: Colors.gray.regular,
    borderBottomWidth: 1,
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Units.base * 2,
    paddingVertical: Units.base,
  },
  innerContainer: {
    flex: 1,
  },
})

export default class SearchResultItem extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    const { item } = this.props
    const { __typename: typeName } = item
    switch (typeName) {
      case 'Channel':
        NavigatorService.navigate('channel', { id: item.id })
        break
      case 'Connectable':
        NavigatorService.navigate('block', { id: item.id })
        break
      case 'User':
        NavigatorService.navigate('searchProfile', { id: item.id })
        break
      default:
        break
    }
    return this
  }

  render() {
    let resultInner

    const { item } = this.props
    const { __typename: typeName } = item

    switch (typeName) {
      case 'Connectable':
        resultInner = (<ConnectableResult connectable={item} />)
        break
      case 'User':
        resultInner = (<UserResult user={item} />)
        break
      case 'Channel':
        resultInner = (<ChannelResult channel={item} />)
        break
      default:
        break
    }

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        style={styles.container}
        onPress={this.onPress}
      >
        <View style={styles.innerContainer}>
          {resultInner}
        </View>
      </TouchableOpacity>
    )
  }
}

SearchResultItem.fragments = {
  channel: gql`
    fragment ChannelItem on Channel {
      __typename
      id
      title
      visibility
      updated_at(relative: true)
      user {
        id
        name
      }
    }
  `,
  user: gql`
    fragment UserItem on User {
      id
      name
      first_name
      last_name
      slug
      href
      initials
      avatar(size: MEDIUM)
    }
  `,
  connectable: gql`
    fragment ConnectableItem on Connectable {
      __typename
      id
      title(truncate: 30)
      updated_at(relative: true)
      user {
        id
        name
      }
      klass
      kind {
        __typename
        ... on Attachment {
          image_url(size: THUMB)
        }
        ... on Embed {
          image_url(size: THUMB)
        }
        ... on Image {
          image_url(size: THUMB)
        }
        ... on Link {
          image_url(size: THUMB)
        }
      }
    }
  `,
}

SearchResultItem.propTypes = {
  item: PropTypes.any.isRequired,
}
