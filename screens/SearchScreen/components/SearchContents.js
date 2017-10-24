import React from 'react'
import {
  ActivityIndicator,
  FlatList,
} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import SearchResult from './SearchResult'

import Empty from '../../../components/Empty'
import { Units } from '../../../constants/Style'

const Container = styled.View`
  flex: 1;
  background-color: white;
`

class SearchContents extends React.Component {
  render() {
    const { data, q } = this.props
    const { error, loading, search } = data

    if (error) {
      return (
        <Container>
          <Empty text="Start typing" />
        </Container>
      )
    }

    if (loading) {
      return (
        <Container>
          <Empty>
            <ActivityIndicator />
          </Empty>
        </Container>
      )
    }

    const empty = (
      <Container>
        <Empty text="No results found" />
      </Container>
    )

    console.log('q', q)

    if (search.length === 0) return empty

    return (
      <FlatList
        contentContainerStyle={{ backgroundColor: '#fff', paddingHorizontal: Units.scale[3] }}
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

