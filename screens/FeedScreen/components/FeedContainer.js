import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import FeedSentence from './FeedSentence'
import FeedWordLink from './FeedWordLink'
import FeedContents from './FeedContents'
import BlockItem from '../../../components/BlockItem'
import ChannelItem from '../../../components/ChannelItem'
import Empty from '../../../components/Empty'

import layout from '../../../constants/Layout'

const { width } = Dimensions.get('window')

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
  footer: {
    paddingVertical: layout.padding,
  },
  itemContainer: {
    paddingHorizontal: layout.padding,
    marginBottom: layout.padding * 6,
    minHeight: width / 2,
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
    const emptyComponent = (<Empty text="This is your feed" />)

    if (data.me.feed.groups.length === 0) {
      return emptyComponent
    }

    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.container}
        data={data.me.feed.groups}
        refreshing={data.loading}
        initialNumToRender={4}
        keyExtractor={group => group.key}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={this.renderLoader}
        ListEmptyComponent={emptyComponent}
        renderItem={({ item, index }) => (
          <View key={`${item.key}-${index}`} style={styles.itemContainer} >
            <FeedSentence group={item} />
            {item.items.length > 0 && <FeedContents items={item.items} verb={item.verb} />}
          </View>
          )}
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
          items {
            __typename
            ... on User {
              id
              first_name
              last_name
              slug
              href
              initials
              avatar(size: MEDIUM)
            }
            ...ChannelThumb
            ...BlockThumb
          }
        }
      }
    }
  }
  ${BlockItem.fragments.block}
  ${ChannelItem.fragments.channel}
  ${FeedWordLink.fragments.channel}
  ${FeedWordLink.fragments.connectable}
  ${FeedWordLink.fragments.user}
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
            const { __typename: meTypename } = previousResult.me
            const { __typename: feedTypename } = previousResult.me.feed
            const response = {
              me: {
                __typename: meTypename,
                feed: {
                  __typename: feedTypename,
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
