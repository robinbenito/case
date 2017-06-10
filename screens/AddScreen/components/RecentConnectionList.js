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
    
  }

  render() {
    if (this.props.data.error) {
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

    this.props.data.me.recent_connections.each( connection => 
      connections.push(<ConnectionItem connection={connection} onPress={this.makeConnection}/>)
    )
    
    return (
      <View style={styles.container}>
        <Text>{this.props.data.me.name}</Text>
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
    user(id: 15) {
      name
      recent_connections(per: 5) {
        user {
          name
        }
        slug
        id
        title
        status
      }
    }
  }
`

export const RecentConnectionsWithData = graphql(RecentConnectionsQuery)(RecentConnections)