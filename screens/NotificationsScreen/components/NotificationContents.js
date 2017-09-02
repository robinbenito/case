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
import { graphql } from 'react-apollo'

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

class NotificationContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
    }
  }

  render() {
    const { data } = this.props
    const { error, loading, me } = data

    if (error) {
      return (
        <View style={styles.loadingContainer} >
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

    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.container}
        data={me.feed.groups}
        refreshing={loading}
        initialNumToRender={4}
        keyExtractor={(group, index) => `${group.key}-${index}`}
        onEndReachedThreshold={0.9}
        renderItem={({ item, index }) => (
          <View key={`${item.key}-${index}`} style={styles.itemContainer} >
            <FeedSentence group={item} />
          </View>
          )}
      />
    )
  }
}

const NotificationsQuery = gql`
  query FeedQuery($offset: Int, $limit: Int){
    me {
      __typename
      feed(offset: $offset, limit: $limit, type: "Notification") {
        __typename
        groups {
          __typename
          id: key
          key
          length
          user {
            id
            name
            slug
          }
          is_single
          verb
          object {
            __typename
            ...ChannelWord
            ...ConnectableWord
            ...UserWord
          }
          object_phrase
          connector
          target {
            __typename
            ...ChannelWord
            ...ConnectableWord
            ...UserWord
          }
          target_phrase
          created_at(relative: true)
        }
      }
    }
  }
  ${FeedWordLink.fragments.channel}
  ${FeedWordLink.fragments.connectable}
  ${FeedWordLink.fragments.user}
`

NotificationContents.propTypes = {
  data: PropTypes.any.isRequired,
  limit: PropTypes.number,
  offset: PropTypes.number,
}

NotificationContents.defaultProps = {
  limit: 20,
  offset: 0,
}

const NotificationsWithData = graphql(NotificationsQuery)(NotificationContents)

export default NotificationsWithData
