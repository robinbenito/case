import React from 'react'
import gql from 'graphql-tag'
import {
  Text,
} from 'react-native'
import PropTypes from 'prop-types'

import UserNameText from '../../../components/UserNameText'
import ChannelNameText from '../../../components/ChannelNameText'

const FeedWordLink = ({ object, phrase, style }) => {
  let objectLink


  if (object) {
    const { __typename } = object
    switch (__typename) {
      case 'Channel':
        objectLink = <ChannelNameText channel={object} style={style} />
        break
      case 'User':
        objectLink = <UserNameText user={object} style={style} />
        break
      default:
        objectLink = <Text style={style}>{phrase || object.title} </Text>
    }
  }

  return objectLink || <Text style={style}>{phrase} </Text>
}

FeedWordLink.fragments = {
  channel: gql`
    fragment ChannelWord on Channel {
      id
      title
      visibility
    }
  `,
  connectable: gql`
    fragment ConnectableWord on Connectable {
      id
      title
    }
  `,
  user: gql`
    fragment UserWord on User {
      id
      name
      slug
    }
  `,
}

FeedWordLink.propTypes = {
  style: PropTypes.any,
  object: PropTypes.any,
  phrase: PropTypes.string,
}

FeedWordLink.defaultProps = {
  style: {},
  object: {},
  phrase: '',
}

export default FeedWordLink
