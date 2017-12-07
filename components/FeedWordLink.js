import React from 'react'
import gql from 'graphql-tag'
import { Text } from 'react-native'
import { decode } from 'he'
import PropTypes from 'prop-types'

import UserNameText from './UserNameText'
import ChannelNameText from './ChannelNameText'
import BlockLink from './BlockLink'

const FeedWordLink = ({ object, phrase, ...rest }) => {
  let link = <Text {...rest}>{phrase}</Text>

  if (object) {
    const { __typename } = object

    switch (__typename) {
      case 'Channel':
        link = <ChannelNameText channel={object} {...rest} />
        break
      case 'User':
        link = <UserNameText user={object} {...rest} />
        break
      case 'Connectable':
        link = <BlockLink block={object} phrase={phrase} {...rest} />
        break
      case 'Comment':
        link = <Text {...rest}>“{decode(phrase)}”</Text>
        break
      default:
        link = <Text {...rest}>{phrase || (object.title && decode(object.title))}</Text>
    }
  }

  return link
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
      kind {
        __typename
      }
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
