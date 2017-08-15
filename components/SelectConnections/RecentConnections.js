import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  View,
  Text,
} from 'react-native'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import ChannelItem from '../ChannelItem'

class RecentConnections extends Component {
  render() {
    const { data, onToggleConnection, selected } = this.props

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
        data={data.me.recent_connections}
        keyExtractor={item => item.id}
        extraData={selected}
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
  selected: PropTypes.any,
}

RecentConnections.defaultProps = {
  onToggleConnection: () => null,
  selected: [],
}

const RecentConnectionsWithData = graphql(RecentConnectionsQuery)(RecentConnections)

export default RecentConnectionsWithData
