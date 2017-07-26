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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  footer: {
    paddingVertical: layout.padding / 2,
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
    this.renderFooter = this.renderFooter.bind(this)
  }

  onEndReached() {
    if (this.props.data.loading) return false
    const offset = this.state.offset + this.props.limit
    this.setState({ offset })
    return this.props.loadMore(offset)
  }

  renderFooter() {
    if (!this.props.data.loading) return null

    return (
      <View style={styles.footer}>
        <ActivityIndicator />
      </View>
    )
  }

  render() {
    if (this.props.data.error) {
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
        refreshing={data.loading}
        initialNumToRender={4}
        keyExtractor={group => group.key}
        onRefresh={() => data.refetch()}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={this.renderFooter}
        renderItem={({ item, index }) => (
          <View key={`${item.key}-${index}`} style={styles.itemContainer} >
            <FeedSentence group={item} />
            {item.items.length > 0 && <FeedContents items={item.items} />}
          </View>
          )}
      />
    )
  }
}

const FeedQuery = gql`
  query FeedQuery($offset: Int, $limit: Int){
    me {
      feed(offset: $offset, limit: $limit) {
        groups {
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
          target {
            __typename
            ... on Block {
              id
              title
            }
            ... on Channel {
              id
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
                  image_url(size: DISPLAY)
                  source_url
                }
                ... on Attachment {
                  image_url(size: DISPLAY)
                }
                ... on Text {
                  content(format: HTML)
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
        return props.data.fetchMore({
          variables: {
            offset,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult.me.feed.groups.length) { return previousResult }
            const response = {
              me: {
                feed: {
                  groups: [...previousResult.me.feed.groups, ...fetchMoreResult.me.feed.groups],
                },
              },
            }
            return response
          },
        })
      },
    }
  },
})(FeedContainer)

export default FeedContainerWithData
