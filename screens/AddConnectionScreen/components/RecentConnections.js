import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import { has } from 'lodash'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import Empty from '../../../components/Empty'
import ChannelItem from '../../../components/ChannelItem'

class RecentConnections extends Component {
  isSelected = (channel) => {
    const { selectedConnections } = this.props
    return has(selectedConnections, channel.id)
  }

  keyExtractor = item => item.id

  renderItem = ({ item }) => {
    const { onToggleConnection } = this.props

    return (
      <ChannelItem
        channel={item}
        isSelected={this.isSelected(item)}
        onToggleSelect={onToggleConnection}
      />
    )
  }

  render() {
    const { data: { error, loading, me } } = this.props

    // TODO: Use error message or HOC
    if (error) {
      return (
        <Empty text="No recent connections" />
      )
    }

    if (loading) {
      return (
        <Empty text="Loading" />
      )
    }

    return (
      <FlatList
        data={me.recent_connections}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        extraData={this.props.selectedConnections}
      />
    )
  }
}

export const RecentConnectionsQuery = gql`
  query RecentConnectionsQuery {
    me {
      id
      recent_connections(per: 5) {
        ...ChannelThumb
      }
    }
  }
  ${ChannelItem.fragments.channel}
`

RecentConnections.propTypes = {
  data: PropTypes.object.isRequired,
  onToggleConnection: PropTypes.func,
  selectedConnections: PropTypes.object,
}

RecentConnections.defaultProps = {
  onToggleConnection: () => null,
  selectedConnections: {},
}

const RecentConnectionsWithData = graphql(RecentConnectionsQuery)(RecentConnections)

export default RecentConnectionsWithData
