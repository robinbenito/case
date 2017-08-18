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
import typesizes from '../../../constants/Type'
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
  word: {
    fontSize: typesizes.sizes.feed,
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
        <UserNameText user={user} mode="feed" style={styles.word} />
        <Text style={styles.word}>{verb} </Text>
        <FeedWordLink object={object} phrase={group.object_phrase} style={styles.word} />
        <Text style={styles.word}>{connector} </Text>
        <FeedWordLink object={target} phrase={group.target_phrase} style={styles.word} />
      </View>
      <Text style={styles.date}>{group.created_at}</Text>
    </View>
  )
}

FeedSentence.propTypes = {
  group: PropTypes.any.isRequired,
}

export default FeedSentence
