import React from 'react'
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

FeedWordLink.propTypes = {
  object: PropTypes.any,
  phrase: PropTypes.string,
}

FeedWordLink.defaultProps = {
  object: {},
  phrase: '',
}

export default FeedWordLink
