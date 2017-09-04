import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import PropTypes from 'prop-types'

import UserNameText from './UserNameText'
import FeedWordLink from './FeedWordLink'

import colors from '../constants/Colors'
import typesizes from '../constants/Type'
import layout from '../constants/Layout'

const styles = StyleSheet.create({
  container: {
    paddingVertical: layout.padding,
    paddingHorizontal: layout.padding * 2,
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

const FeedSentence = ({ deed, showUnreadState, onPress }) => {
  const { user, action, connector, target, item, item_title: itemTitle, is_read: isRead } = deed

  const color = (isRead === false && showUnreadState) ? { color: colors.state.alert } : {}

  return (
    <View style={styles.container}>
      <View style={styles.sentence}>
        <Text style={color}>
          <UserNameText user={user} mode="feed" style={styles.word} onPress={onPress} />
          <Text style={styles.word}>{action} </Text>
          <FeedWordLink
            object={item}
            phrase={itemTitle}
            style={[styles.word, color, { fontWeight: 'bold' }]}
            onPress={onPress}
          />
          <Text style={styles.word}>{connector} </Text>
          {target && <FeedWordLink
            object={target}
            phrase={target.title || target.name}
            style={[styles.word, color]}
            onPress={onPress}
          />}
        </Text>
      </View>
      <Text style={styles.date}>{deed.created_at}</Text>
    </View>
  )
}

FeedSentence.propTypes = {
  deed: PropTypes.any.isRequired,
  showUnreadState: PropTypes.bool,
  onPress: PropTypes.func,
}

FeedSentence.defaultProps = {
  showUnreadState: false,
  onPress: () => null,
}

export default FeedSentence
