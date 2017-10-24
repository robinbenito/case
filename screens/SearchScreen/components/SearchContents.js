import React from 'react'
import {
  ActivityIndicator,
  FlatList,
} from 'react-native'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import SearchResult from './SearchResult'

import Empty from '../../../components/Empty'
import { RelativeFill } from '../../../components/UI/Layout'

class SearchContents extends React.Component {
  render() {
    const { data } = this.props
    const { error, loading, search } = data

    if (error) {
      return (
        <RelativeFill>
          <Empty text="No results" />
        </RelativeFill>
      )
    }

    if (loading) {
      return (
        <RelativeFill>
          <ActivityIndicator />
        </RelativeFill>
      )
    }

    return (
      <FlatList
        contentContainerStyle={{ backgroundColor: '#fff' }}
        data={search}
        refreshing={data.networkStatus === 4}
        onRefresh={this.onRefresh}
        keyboardShouldPersistTaps="always"
        keyExtractor={(item, index) => `${item.klass}-${item.id}-${index}`}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        renderItem={({ item }) => <SearchResult item={item} />}
      />
    )
  }
}

SearchContents.propTypes = {
  data: PropTypes.any.isRequired,
}

const SearchQuery = gql`
  query SearchQuery($q: String!, $type: SearchType) {
    search(q: $q, per: 15, type: $type) {
      ... on User {
        ...UserItem
      }
      ... on Connectable {
        ...ConnectableItem
      }
      ... on Channel {
        ...ChannelItem
      }
    }
  }
  ${SearchResult.fragments.connectable}
  ${SearchResult.fragments.user}
  ${SearchResult.fragments.channel}
`

export default graphql(SearchQuery, {
  options: { fetchPolicy: 'network-only' },
})(SearchContents)

