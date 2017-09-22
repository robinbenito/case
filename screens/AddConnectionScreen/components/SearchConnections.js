import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  View,
  StyleSheet,
  Text,
} from 'react-native'
import { findIndex } from 'lodash'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import ChannelItem from '../../../components/ChannelItem'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
})

class SearchConnection extends Component {
  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.isSelected = this.isSelected.bind(this)
  }

  shouldComponentUpdate(newProps) {
    if (newProps.data && newProps.data.loading) { return false }
    return true
  }

  isSelected(channel) {
    const { selected } = this.props
    const index = findIndex(selected, selectedChannel => selectedChannel.id === channel.id)
    return index > -1
  }

  renderItem({ item }) {
    const isSelected = this.isSelected(item)
    const { onToggleConnection } = this.props
    return (
      <ChannelItem
        isSelected={isSelected}
        channel={item}
        onToggleSelect={onToggleConnection}
      />
    )
  }

  render() {
    const { q, data } = this.props

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
        renderItem={this.renderItem}
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
  data: PropTypes.any.isRequired,
  q: PropTypes.string.isRequired,
  onToggleConnection: PropTypes.func,
  selected: PropTypes.any,
}

SearchConnection.defaultProps = {
  onToggleConnection: () => null,
  selected: [],
}


const ConnectionSearchWithData = graphql(ConnectionSearchQuery)(SearchConnection)

export default ConnectionSearchWithData
