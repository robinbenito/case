import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ListView,
  ActivityIndicator,
  ScrollView,
  Text,
  Image,
} from 'react-native'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import ConnectionItem from './ConnectionItem'

class RecentConnections extends Component {
  makeConnection(connection) {
    console.log('make connection', connection)
  }

  render() {
    console.log('this.props.data', this.props.data)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

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

export const RecentConnectionsWithData = graphql(RecentConnectionsQuery)(RecentConnections)
