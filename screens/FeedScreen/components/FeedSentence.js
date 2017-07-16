import React from 'react'
import {
  StyleSheet,
  View,
  Text,

} from 'react-native'
import PropTypes from 'prop-types'

import UserNameText from '../../../components/UserNameText'
import FeedWordLink from './FeedWordLink'

import colors from '../../../constants/Colors'
import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
  sentence: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.border,
    display: 'flex',
    flexDirection: 'row',
    padding: layout.padding,
  },
})

const FeedSentence = ({ group }) => {
  const { user, verb, connector, target } = group

  return (
    <View style={styles.sentence}>
      <UserNameText user={user} />
      <Text> </Text>
      <Text>{verb} </Text>
      <FeedWordLink object={group.object} phrase={group.object_phrase} />
      <Text>{connector} </Text>
      <FeedWordLink object={group.target} phrase={group.target_phrase} />
    </View>
  )
}

FeedSentence.propTypes = {
  group: PropTypes.any.isRequired,
}

export default FeedSentence
