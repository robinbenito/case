import React, { Component } from 'react'
import { propType } from 'graphql-anywhere'
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
  makeConnection(connection) {
    return { obj: this, connection }
  }

  render() {
    if (this.props.data && this.props.data.error) {
      return (
        <View>
          <Text>
            Profile not found
          </Text>
        </View>
      )
    }

    if (this.props.data && this.props.data.loading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    const connections = []

    this.props.data.me.recent_connections.forEach(connection =>
      connections.push(
        <ConnectionItem
          connection={connection}
          onPress={this.makeConnection}
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
  data: propType(RecentConnectionsQuery).isRequired,
}

const RecentConnectionsWithData = graphql(RecentConnectionsQuery)(RecentConnections)

export default RecentConnectionsWithData
