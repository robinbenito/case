import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import SearchResult from './SearchResult'

import Empty from '../../../components/Empty'
import { RelativeFill } from '../../../components/UI/Layout'

class SearchContents extends React.Component {
  render() {
    const { data, q } = this.props
    const { error, loading, search } = data

    if (error) {
      return (
        <RelativeFill>
          <Empty text="Start typing" />
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

    const empty = (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Empty text="No results found" />
      </View>
    )

    if (search.length === 0) return empty

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
  q: PropTypes.string,
}

SearchContents.defaultProps = {
  q: '',
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

