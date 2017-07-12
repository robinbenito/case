import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import ConnectionItem from './ConnectionItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

class RecentConnections extends Component {
  render() {
    const { data, onToggleConnection } = this.props

    if (data && data.error) {
      return (
        <View>
          <Text>
            Profile not found
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

    const connections = []

    data.me.recent_connections.forEach(connection =>
      connections.push(
        <ConnectionItem
          connection={connection}
          onToggleConnection={onToggleConnection}
          key={connection.id}
        />,
      ),
    )

    return (
      <View style={styles.container}>
        {connections}
      </View>
    )
  }
}

const RecentConnectionsQuery = gql`
  query RecentConnectionsQuery {
    me {
      name
      recent_connections(per: 5) {
        ...Connection
      }
    }
  }
  ${ConnectionItem.fragments.connection}
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
