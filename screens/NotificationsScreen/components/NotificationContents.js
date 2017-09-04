import React from 'react'
import PropTypes from 'prop-types'

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

import { NotificationCountQuery } from '../../../components/NotificationCount'
import FeedWordLink from '../../../components/FeedWordLink'
import FeedSentence from '../../../components/FeedSentence'

import layout from '../../../constants/Layout'
import type from '../../../constants/Type'
import colors from '../../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  itemContainer: {
    marginBottom: layout.padding,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.border,
  },
  text: {
    fontSize: type.sizes.medium,
  },
})

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
        <View style={styles.loadingContainer}>
          <Text>
            Error fetching notifications
          </Text>
        </View>
      )
    }

    if (loading && !me) {
      return (
        <View style={styles.loadingContainer} >
          <ActivityIndicator />
        </View>
      )
    }

    const deeds = me.feed.deeds.slice().reverse()

    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.container}
        data={deeds}
        refreshing={loading}
        onRefresh={this.onRefresh}
        initialNumToRender={4}
        keyExtractor={(deed, index) => `${deed.id}-${index}`}
        onEndReachedThreshold={0.9}
        renderItem={({ item: deed, index }) => (
          <View key={`${deed.id}-${index}`} style={styles.itemContainer} >
            <FeedSentence
              deed={deed}
              showUnreadState
              onPress={() => this.markNotificationAsRead(deed.bulletin_id)}
            />
          </View>
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
