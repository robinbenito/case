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

import ChannelItem from './ChannelItem'

const styles = StyleSheet.create({
})

class RecentConnections extends Component {
  render() {
    const { data, onToggleConnection } = this.props

    if (data && data.error) {
      return (
        <View>
          <Text>
            No connections found
          </Text>
        </View>
      )
    }

    if (data && data.loading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={data.me.recent_connections}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ChannelItem channel={item} onToggleSelect={onToggleConnection} />
        )}
      />
    )
  }
}

const RecentConnectionsQuery = gql`
  query RecentConnectionsQuery {
    me {
      name
      recent_connections(per: 5) {
        ...ChannelThumb
      }
    }
  }
  ${ChannelItem.fragments.channel}
`

RecentConnections.propTypes = {
  data: PropTypes.any.isRequired,
  onToggleConnection: PropTypes.func,
}

RecentConnections.defaultProps = {
  onToggleConnection: () => null,
}

const RecentConnectionsWithData = graphql(RecentConnectionsQuery)(RecentConnections)

export default RecentConnectionsWithData
