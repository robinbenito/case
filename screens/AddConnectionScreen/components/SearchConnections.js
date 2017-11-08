import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import { has } from 'lodash'
import { gql, graphql } from 'react-apollo'

import Empty from '../../../components/Empty'
import ChannelItem from '../../../components/ChannelItem'

class SearchConnection extends Component {
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
    const { q, data: { loading, error, me } } = this.props

    // TODO: Use error message or HOC
    if (error) {
      return (
        <Empty text="No results found" />
      )
    }


    if (loading) {
      return (
        <Empty text={`Searching for ${q}`} />
      )
    }

    return (
      <FlatList
        data={me.connection_search}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        keyboardShouldPersistTaps="always"
      />
    )
  }
}

const ConnectionSearchQuery = gql`
  query ConnectionSearchQuery($q: String!) {
    me {
      id
      connection_search(q: $q) {
        ...ChannelThumb
      }
    }
  }
  ${ChannelItem.fragments.channel}
`

SearchConnection.propTypes = {
  data: PropTypes.object.isRequired,
  q: PropTypes.string.isRequired,
  onToggleConnection: PropTypes.func,
  selectedConnections: PropTypes.object,
}

SearchConnection.defaultProps = {
  onToggleConnection: () => null,
  selectedConnections: {},
}

export default graphql(ConnectionSearchQuery)(SearchConnection)
