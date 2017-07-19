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
import FeedContents from './FeedContents'

import layout from '../../../constants/Layout'
import colors from '../../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.border,
    padding: layout.padding,
  },
})

class FeedContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
    }
    this.onEndReached = this.onEndReached.bind(this)
  }

  onEndReached() {
    const offset = this.state.offset + this.props.limit
    this.props.loadMore(offset)
  }

  render() {
    if (this.props.data.error) {
      console.log('error', this.props.data.error)
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

    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.listContainer}
        data={this.props.data.me.feed.groups}
        refreshing={data.networkStatus === 4}
        keyExtractor={group => group.key}
        onRefresh={() => data.refetch()}
        onEndReached={this.onEndReached}
        renderItem={({ item }) => {
          return (
            <View key={item.key} style={styles.itemContainer} >
              <FeedSentence group={item} />
              {item.items.length > 0 && <FeedContents items={item.items} />}
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
      __typename
      feed(offset: $offset, limit: $limit) {
        __typename
        groups {
          __typename
          id: key
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
              id
              name
              slug
              href
              initials
              avatar(size: SMALL)
            }
          }
          object_phrase
          connector
          items {
            __typename
            ... on User {
              id
              name
              slug
              href
              initials
              avatar(size: MEDIUM)
            }
            ... on Channel {
              visibility
            }
            ... on Block {
              id
              title
              updated_at(relative: true)
              user {
                name
              }
              klass
              kind {
                type: __typename
                ... on Embed {
                  source_url
                }
                ... on Attachment {
                  image_url(size: DISPLAY)
                }
                ... on Text {
                  content
                }
                ... on Image {
                  image_url(size: DISPLAY)
                }
                ... on Link {
                  image_url(size: DISPLAY)
                }
              }
            }
          }
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
              id
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
  limit: PropTypes.number,
  loadMore: PropTypes.any.isRequired,
}

FeedContainer.defaultProps = {
  limit: 20,
}

const FeedContainerWithData = graphql(FeedQuery, {
  options: ({ offset, limit }) => ({
    variables: { offset, limit },
  }),
  props: (props) => {
    const data = props.data
    return {
      data,
      loadMore(offset) {
        console.log('loadMore', offset)
        return props.data.fetchMore({
          variables: {
            offset,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            console.log('fetchMore', fetchMoreResult)
            if (!fetchMoreResult.me.feed.groups.length) { return previousResult }
            const response = Object.assign({}, previousResult, {
              me: {
                feed: {
                  groups: [...previousResult.me.feed.groups, ...fetchMoreResult.me.feed.groups],
                },
              },
            })
            console.log('response', response)
            return response
          },
        })
      },
    }
  },
})(FeedContainer)

export default FeedContainerWithData
