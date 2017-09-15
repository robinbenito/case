import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

import NavigatorService from '../utilities/navigationService'

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

const typeToRoute = (type) => {
  switch (type) {
    case 'Channel':
      return 'channel'
    case 'Connectable':
      return 'block'
    case 'User':
      return 'profile'
    default:
      return null
  }
}

class FeedSentence extends React.Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    // connected should bring you to the item
    // commented should bring you to the target
    // followed should bring you to the item
    // collaborator should bring you to the target

    // Mark the notification as read

    // Navigate to the proper place
    const { action, item, target, is_read: isRead } = this.props.deed
    const { __typename: itemType } = item

    if (!isRead) { this.props.onPress() }

    if (action === 'added' || action === 'followed') {
      const route = typeToRoute(itemType)
      NavigatorService.navigate(route, { id: item.id })
    } else if (action === 'commented on' || action === 'is collaborating with') {
      const { __typename: targetType } = target
      const route = typeToRoute(targetType)
      NavigatorService.navigate(route, { id: target.id })
    }
  }

  render() {
    const { deed, showUnreadState, onPress } = this.props
    const { user, action, connector, target, item, is_read: isRead } = deed

    const color = (!isRead && showUnreadState) ? { color: colors.state.alert } : {}
    const onPressEvent = isRead ? () => null : onPress

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.container}>
          <View style={styles.sentence}>
            <Text style={color}>
              <UserNameText user={user} mode="feed" style={styles.word} onPress={onPressEvent} />
              <Text style={styles.word}>{action} </Text>
              <FeedWordLink
                object={item}
                phrase={item.title}
                style={[styles.word, color]}
                onPress={onPressEvent}
              />
              <Text style={styles.word}>{connector} </Text>
              {target && <FeedWordLink
                object={target}
                phrase={target.title || target.name}
                style={[styles.word, color]}
                onPress={onPressEvent}
              />}
            </Text>
          </View>
          <Text style={styles.date}>{deed.created_at}</Text>
        </View>
      </TouchableOpacity>
    )
  }
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
