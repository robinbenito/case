import React from 'react'
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  FlatList,
} from 'react-native'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import styled from 'styled-components/native'

import { NotificationCountQuery } from '../../../components/NotificationCount'
import FeedWordLink from '../../../components/FeedWordLink'
import FeedSentence from '../../../components/FeedSentence'

import { HorizontalRule, CenteringPane } from '../../../components/UI/Layout'
import Empty from '../../../components/Empty'
import formatErrors from '../../../utilities/formatErrors'
import { ErrorMessage, StatusMessage } from '../../../components/UI/Alerts'
import { Units } from '../../../constants/Style'

const Item = styled.View`
  margin-left: ${Units.base};
`

const ReadNotificationMutation = gql`
  mutation ReadNotificationMutation($notification_id: ID!){
    read_notification(input: { notification_id: $notification_id }) {
      deed {
        __typename
        id
        is_read
      }
    }
  }
`

const NotificationsQuery = gql`
  query FeedQuery($offset: Int, $limit: Int){
    me {
      id
      __typename
      feed(offset: $offset, limit: $limit, type: "Notification") {
        __typename
        deeds {
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
      }
    }
  }
  ${FeedWordLink.fragments.channel}
  ${FeedWordLink.fragments.connectable}
  ${FeedWordLink.fragments.user}
`

class NotificationContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: props.offset,
      limit: props.limit,
    }
    this.onRefresh = this.onRefresh.bind(this)
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this)
  }

  onRefresh() {
    this.setState({
      offset: 0,
    })
    this.props.data.refetch({ notifyOnNetworkStatusChange: true })
  }

  markNotificationAsRead(notificationId) {
    const refetchQueries = [{ query: NotificationsQuery }, { query: NotificationCountQuery }]
    const variables = { notification_id: notificationId }
    this.props.mutate({ variables, refetchQueries })
  }

  render() {
    const { data } = this.props
    const { error, loading, me } = data

    if (error) {
      return (
        <CenteringPane>
          <StatusMessage>
            Error fetching notifications
          </StatusMessage>

          <ErrorMessage>
            {formatErrors(error)}
          </ErrorMessage>
        </CenteringPane>
      )
    }

    if (loading && !me) {
      return (
        <Empty>
          <ActivityIndicator />
        </Empty>
      )
    }

    const deeds = me.feed.deeds.slice().reverse()

    return (
      <FlatList
        data={deeds}
        refreshing={loading}
        onRefresh={this.onRefresh}
        initialNumToRender={4}
        keyExtractor={(deed, index) => `${deed.id}-${index}`}
        onEndReachedThreshold={0.9}
        renderItem={({ item: deed, index }) => (
          <Item key={`${deed.id}-${index}`}>
            <FeedSentence
              deed={deed}
              showUnreadState
              onPress={() => this.markNotificationAsRead(deed.bulletin_id)}
            />
            <HorizontalRule />
          </Item>
        )}
      />
    )
  }
}

NotificationContents.propTypes = {
  data: PropTypes.any.isRequired,
  mutate: PropTypes.func.isRequired,
  limit: PropTypes.number,
  offset: PropTypes.number,
}

NotificationContents.defaultProps = {
  limit: 20,
  offset: 0,
}

const NotificationsWithData = compose(
  graphql(NotificationsQuery),
  graphql(ReadNotificationMutation),
)(NotificationContents)

export default NotificationsWithData
