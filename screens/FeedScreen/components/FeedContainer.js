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
import BlockItem from '../../../components/BlockItem'

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
    paddingVertical: layout.padding,
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
    this.renderLoader = this.renderLoader.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onEndReached() {
    if (this.props.data.loading) return false
    const offset = this.state.offset + this.props.limit
    this.setState({ offset })
    return this.props.loadMore(offset)
  }

  onRefresh() {
    this.setState({
      offset: 0,
    })
    this.props.data.refetch({ notifyOnNetworkStatusChange: true })
  }

  renderLoader() {
    if (!this.props.data.loading) return null
    return (
      <ActivityIndicator animating size="small" style={styles.footer} />
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

    if (this.props.data.loading && !this.props.data.me) {
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
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={this.renderLoader}
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
            ... on Channel {
              id
              title
              visibility
            }
            ... on Connectable {
              id
              title
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
            ... on Channel {
              id
              title
              visibility
            }
            ... on Connectable {
              id
              title
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
            ... on Channel {
              id
              title
              visibility
            }
            ...BlockThumb
          }
        }
      }
    }
  }
  ${BlockItem.fragments.block}
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
    notifyOnNetworkStatusChange: true,
  }),
  props: (props) => {
    const { data } = props
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
