import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  ActivityIndicator,
  ScrollView,
  Text,
  Image
} from 'react-native';

import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

import ConnectionItem from '../../../components/ConnectionItem'

class RecentConnections extends Component {

  makeConnection() {
    console.log('make connection', this)
  }

  render() {
    if (this.props.data.error) {
      console.log('this.props.data.error', this.props.data.error)
      return (
        <View style={styles.loadingContainer} >
          <Text>
            Profile not found
          </Text>
        </View>
      );
    }
    
    if (this.props.data.loading) {
      return (
        <View style={styles.loadingContainer} >
          <ActivityIndicator />
        </View>
      );
    }

    let connections = []

    this.props.data.me.recent_connections.forEach( connection => 
      connections.push(
        <ConnectionItem 
          connection={connection} 
          onPress={this.makeConnection}
          key={connection.id}
        />
      )
    )
    
    return (
      <View style={styles.container}>
        {connections}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RecentConnectionsQuery = gql`
  query RecentConnectionsQuery {
    me {
      name
      recent_connections(per: 5) {
        user {
          name
        }
        slug
        id
        title
        visibility
      }
    }
  }
`

export const RecentConnectionsWithData = graphql(RecentConnectionsQuery)(RecentConnections)