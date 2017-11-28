import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import { graphql } from 'react-apollo'
import styled from 'styled-components/native'

import readNotificationMutation from '../mutations/readNotification'
import notificationsQuery from '../queries/notifications'
import { NotificationCountQuery } from '../../../components/NotificationCount'

import NotificationSentence from '../../../components/NotificationSentence'
import { HorizontalRule } from '../../../components/UI/Layout'

import alertErrors from '../../../utilities/alertErrors'

import { Units } from '../../../constants/Style'

const Item = styled.View`
  margin-left: ${Units.base};
`

class NotificationContents extends Component {
  static propTypes = {
    readNotification: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
    refreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
  }

  static defaultProps = {
    refreshing: true,
  }

  keyExtractor = (deed, index) =>
    `${deed.id}-${index}`

  markNotificationAsRead = notification_id => () => {
    const { readNotification } = this.props

    readNotification({
      variables: { notification_id },
      refetchQueries: [
        { query: notificationsQuery },
        { query: NotificationCountQuery },
      ],
    })
      .catch(alertErrors)
  }

  renderItem = ({ item: deed, index }) => (
    <Item key={this.keyExtractor(deed, index)}>
      <NotificationSentence
        deed={deed}
        showUnreadState
        onPress={
          deed.is_read ?
            null :
            this.markNotificationAsRead(deed.bulletin_id)
        }
      />
      <HorizontalRule />
    </Item>
  )

  render() {
    const {
      notifications,
      refreshing,
      onRefresh,
    } = this.props

    return (
      <FlatList
        data={notifications}
        refreshing={refreshing}
        onRefresh={onRefresh}
        initialNumToRender={4}
        keyExtractor={this.keyExtractor}
        onEndReachedThreshold={0.9}
        renderItem={this.renderItem}
      />
    )
  }
}

export default graphql(readNotificationMutation, {
  name: 'readNotification',
})(NotificationContents)
