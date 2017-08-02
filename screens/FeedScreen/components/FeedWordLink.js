import React from 'react'
import gql from 'graphql-tag'
import {
  Text,
} from 'react-native'
import PropTypes from 'prop-types'

import UserNameText from '../../../components/UserNameText'
import ChannelNameText from '../../../components/ChannelNameText'

const FeedWordLink = ({ object, phrase }) => {
  let objectLink


  if (object) {
    const { __typename } = object
    switch (__typename) {
      case 'Channel':
        objectLink = <ChannelNameText channel={object} />
        break
      case 'User':
        objectLink = <UserNameText user={object} />
        break
      default:
        objectLink = <Text>{phrase || object.title} </Text>
    }
  }

  return objectLink || <Text>{phrase} </Text>
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
  object: PropTypes.any,
  phrase: PropTypes.string,
}

FeedWordLink.defaultProps = {
  object: {},
  phrase: '',
}

export default FeedWordLink
