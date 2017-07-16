import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

import UserNameText from '../../../components/UserNameText'
import ChannelNameText from '../../../components/ChannelNameText'

const FeedWordLink = ({ object, phrase }) => {
  let objectLink

  if (object) {
    switch (object.__typename) {
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

  return objectLink || <View />
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
