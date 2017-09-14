import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import SearchResult from './SearchResult'

import { Units } from '../../../constants/Style'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  channelItem: {
    marginHorizontal: Units.base,
  },
  loadingContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Units.base,
  },
  footer: {
    paddingVertical: Units.base * 2,
  },
})

class SearchContents extends React.Component {
  render() {
    const { data } = this.props
    const { error, loading, search } = data

    if (error) {
      console.log('error', error)
      return (
        <View style={styles.loadingContainer} >
          <Text>
            Nothing found
          </Text>
        </View>
      )
    }

    if (loading) {
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
  query SearchQuery($q: String, $type: SearchType) {
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

