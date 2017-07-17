import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import FeedSentence from './FeedSentence'

import layout from '../../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding,
  },
})

class FeedContainer extends React.Component {
  render() {
    if (this.props.data.error) {
      console.log('this.props.data.error', this.props.data.error)
      return (
        <View style={styles.loadingContainer} >
          <Text>
            Error fetching feed
          </Text>
        </View>
      )
    }

    if (this.props.data.loading) {
      return (
        <View style={styles.loadingContainer} >
          <ActivityIndicator />
        </View>
      )
    }

    const { data } = this.props

    console.log('data.networkStatus === 4', data.networkStatus === 4)

    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.listContainer}
        data={this.props.data.me.feed.groups}
        refreshing={data.networkStatus === 4}
        keyExtractor={group => group.key}
        onRefresh={() => {
          console.log('data', data)
          return data.refetch()
        }}
        renderItem={({ item }) => {
          return (
            <View key={item.key}>
              <FeedSentence group={item} />
            </View>
          )
        }}
      />
    )
  }
}

const FeedQuery = gql`
  query FeedQuery($offset: Int, $limit: Int){
    me {
      feed(offset: $offset, limit: $limit) {
        total
        groups {
          key
          length
          user {
            name
            slug
          }
          is_single
          verb
          object {
            __typename
            ... on Block {
              id
              title
            }
            ... on Channel {
              id
              slug
              title
              visibility
            }
            ... on User {
              name
              slug
              href
            }
          }
          object_phrase
          connector
          target {
            __typename
            ... on Block {
              id
              title
            }
            ... on Channel {
              id
              slug
              title
              visibility
            }
            ... on User {
              name
              slug
              href
            }
          }
          target_phrase
          created_at(relative: true)
        }
      }
    }
  }
`

FeedContainer.propTypes = {
  data: PropTypes.any.isRequired,
}

const FeedContainerWithData = graphql(FeedQuery)(FeedContainer)

export default FeedContainerWithData
