import React, { Component } from 'react'
import { propType } from 'graphql-anywhere'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import ConnectionItem from './ConnectionItem'

import layout from '../constants/Layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

class RecentConnections extends Component {
  render() {
    const { data, onSelectConnection } = this.props

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
          onPress={onSelectConnection}
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
  onSelectConnection: PropTypes.func,
}

RecentConnections.defaultProps = {
  onSelectConnection: () => null,
}

const RecentConnectionsWithData = graphql(RecentConnectionsQuery)(RecentConnections)

export default RecentConnectionsWithData
