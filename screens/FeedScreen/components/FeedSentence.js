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
  container: {
    paddingVertical: layout.padding * 2,
    paddingHorizontal: layout.padding,
  },
  sentence: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  date: {
    color: colors.gray.lighter,
    paddingTop: layout.padding / 2,
    fontSize: 12,
  },
})

const FeedSentence = ({ group }) => {
  const { user, verb, connector, target, object } = group

  return (
    <View style={styles.container}>
      <View style={styles.sentence}>
        <UserNameText user={user} mode="feed" />
        <Text>{verb} </Text>
        <FeedWordLink object={object} phrase={group.object_phrase} />
        <Text>{connector} </Text>
        <FeedWordLink object={target} phrase={group.target_phrase} />
      </View>
      <Text style={styles.date}>{group.created_at}</Text>
    </View>
  )
}

FeedSentence.propTypes = {
  group: PropTypes.any.isRequired,
}

export default FeedSentence
