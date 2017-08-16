import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  View,
  Text,
} from 'react-native'
import { findIndex } from 'lodash'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import ChannelItem from '../ChannelItem'

class RecentConnections extends Component {

  isSelected(channel) {
    const { selected } = this.props
    const index = findIndex(selected, selectedChannel => selectedChannel.id === channel.id)
    return index > -1
  }

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
          <ChannelItem
            isSelected={this.isSelected(item)}
            channel={item}
            onToggleSelect={onToggleConnection}
          />
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
