import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  View,
  StyleSheet,
  Text,
} from 'react-native'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import ChannelItem from '../ChannelItem'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
})

class SearchConnection extends Component {
  shouldComponentUpdate(newProps) {
    if (newProps.data && newProps.data.loading) { return false }
    return true
  }

  render() {
    const { q, onToggleConnection, data } = this.props

    if (data && data.error) {
      return (
        <View>
          <Text>
            No results found
          </Text>
        </View>
      )
    }

    if (data && data.loading) {
      return (
        <View>
          <Text>Searching for {q}</Text>
        </View>
      )
    }
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={data.me.connection_search}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="always"
        renderItem={({ item }) => (
          <ChannelItem channel={item} onToggleSelect={onToggleConnection} />
        )}
      />
    )
  }
}

const ConnectionSearchQuery = gql`
  query ConnectionSearchQuery($q: String!) {
    me {
      connection_search(q: $q) {
        ...ChannelThumb
      }
    }
  }
  ${ChannelItem.fragments.channel}
`

SearchConnection.propTypes = {
  data: PropTypes.any.isRequired,
  q: PropTypes.string.isRequired,
  onToggleConnection: PropTypes.func,
}

SearchConnection.defaultProps = {
  onToggleConnection: () => null,
}


const ConnectionSearchWithData = graphql(ConnectionSearchQuery)(SearchConnection)

export default ConnectionSearchWithData
