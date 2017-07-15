import React from 'react'
import {
  StyleSheet,
  View,
  Text,

} from 'react-native'
import PropTypes from 'prop-types'

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
  const { user, verb, connector } = group
  return (
    <View style={styles.sentence}>
      <Text>{user.name} </Text>
      <Text>{verb} </Text>
      <Text>{group.object_phrase} </Text>
      <Text>{connector} </Text>
      <Text>{group.target_phrase} </Text>
    </View>
  )
}

FeedSentence.propTypes = {
  group: PropTypes.any.isRequired,
}

export default FeedSentence
