import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import ChannelResult from './ChannelResult'
import ConnectableResult from './ConnectableResult'
import UserResult from './UserResult'

import { Units, Border, Colors } from '../../constants/Style'

import navigationService from '../../utilities/navigationService'

const Container = styled.TouchableOpacity`
  justify-content: center;
  padding-vertical: ${Units.scale[2]};
  padding-right: ${Units.scale[3]};
  margin-left: ${Units.scale[3]};
  border-bottom-color: ${Border.borderColor};
  border-bottom-width: ${Border.borderWidth};
`

class SearchResult extends Component {
  onPress = () => {
    const { item } = this.props

    switch (item.__typename) {
      case 'Channel':
        navigationService.navigate('channel', {
          id: item.id,
          title: item.title,
          color: Colors.channel[item.visibility],
        })
        break
      case 'Connectable':
        navigationService.navigate('block', {
          id: item.id,
          title: item.title,
        })
        break
      case 'User':
        navigationService.navigate('profile', {
          id: item.id,
          title: item.name,
        })
        break
      default:
        break
    }
  }

  render() {
    let result

    const { item } = this.props

    switch (item.__typename) {
      case 'Connectable':
        result = <ConnectableResult connectable={item} />
        break
      case 'User':
        result = <UserResult user={item} />
        break
      case 'Channel':
        result = <ChannelResult channel={item} />
        break
      default:
        break
    }

    return (
      <Container
        activeOpacity={0.95}
        onPress={this.onPress}
      >
        {result}
      </Container>
    )
  }
}

SearchResult.fragments = {
  channel: gql`
    fragment ChannelItem on Channel {
      __typename
      id
      title(truncate: 30)
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

// TODO: Break out fragments to individual subcomponents
SearchResult.propTypes = {
  item: PropTypes.any.isRequired,
}

export default SearchResult
