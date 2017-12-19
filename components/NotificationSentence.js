import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import gql from 'graphql-tag'

import UserNameText from './UserNameText'
import FeedWordLink from './FeedWordLink'

import NavigatorService from '../utilities/navigationService'

import { Typography, Units, Colors } from '../constants/Style'

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

const UserNameLink = styled(UserNameText)`
  font-weight: ${Typography.fontWeight.bold};
`

const Notification = styled.TouchableOpacity`
  padding-vertical: ${Units.scale[2]};
  padding-right: ${Units.base};
  margin-right: ${Units.scale[1]};
`

const Sentence = styled.Text`
  color: ${p => (p.isUnread ? Colors.state.alert : Colors.semantic.text)};
  font-size: ${Typography.fontSize.base};
  line-height: ${Typography.lineHeightFor('base', 'compact')};
`

const Timestamp = styled.Text`
  margin-top: ${Units.scale[1] / 2};
  color: ${Colors.gray.medium};
  font-size: ${Typography.fontSize.small};
  line-height: ${Typography.lineHeightFor('small', 'compact')};
`

class NotificationSentence extends React.Component {
  onPress = () => {
    // 'connected' => `item`
    // 'commented' => `target`
    // 'followed' => `item`
    // 'collaborator' => `target`

    // Navigate to the proper place
    const { action, item, target, is_read: isRead } = this.props.deed
    const { __typename: itemType } = item

    // Mark the notification as read
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

    const isUnread = !isRead && showUnreadState
    const onPressEvent = isRead ? () => null : onPress
    const targetColor = ((target && target.__typename === 'Channel') && !isUnread
      ? Colors.channel[target.visibility]
      : null
    )

    return (
      <Notification onPress={this.onPress}>
        <Sentence isUnread={isUnread}>
          <UserNameLink user={user} onPress={onPressEvent} />

          <Text> {action} </Text>

          <FeedWordLink
            object={item}
            phrase={item.title || item.body}
            onPress={onPressEvent}
          />

          <Text> {connector} </Text>

          {target &&
            <FeedWordLink
              object={target}
              phrase={target.title || target.name}
              onPress={onPressEvent}
              style={{
                fontWeight: Typography.fontWeight.bold,
                color: targetColor,
              }}
            />
          }
        </Sentence>

        <Timestamp>
          {deed.created_at}
        </Timestamp>
      </Notification>
    )
  }
}

NotificationSentence.fragments = {
  // TODO: Separate out the rest of the fucking fragments...
  notificationSentence: gql `
    fragment NotificationSentence on Deed {
      __typename
      id
      bulletin_id
      is_read
      user {
        id
        name
        slug
      }
      action
      item_title
      item {
        __typename
        ...ChannelWord
        ...ConnectableWord
        ...UserWord
        ... on Comment {
          body
        }
      }
      connector
      target {
        __typename
        ...ChannelWord
        ...ConnectableWord
        ...UserWord
      }
      created_at(relative: true)
    }
    ${FeedWordLink.fragments.channel}
    ${FeedWordLink.fragments.connectable}
    ${FeedWordLink.fragments.user}
  `,
}

NotificationSentence.propTypes = {
  deed: PropTypes.any.isRequired,
  showUnreadState: PropTypes.bool,
  onPress: PropTypes.func,
}

NotificationSentence.defaultProps = {
  showUnreadState: false,
  onPress: () => null,
}

export default NotificationSentence
