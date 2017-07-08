import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  ActivityIndicator,
  ScrollView,
  Text,
  Image,
} from 'react-native';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ConnectionItem from './ConnectionItem';

class ConnectionSearch extends Component {
  shouldComponentUpdate(newProps) {
    if (newProps.data && newProps.data.loading) { return false; }
    return true;
  }

  render() {
    const { q } = this.props;

    if (this.props.data && this.props.data.error) {
      return (
        <View>
          <Text>
            No results found
          </Text>
        </View>
      );
    }

    if (this.props.data && this.props.data.loading) {
      return (
        <View>
          <Text>Searching for {q}</Text>
        </View>
      );
    }

    const connections = [];

    this.props.data.me.connection_search.forEach(connection =>
      connections.push(
        <ConnectionItem
          connection={connection}
          onPress={this.makeConnection}
          key={connection.id}
        />,
      ),
    );

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

const ConnectionSearchQuery = gql`
  query ConnectionSearchQuery($q: String!) {
    me {
      name
      connection_search(q: $q) {
        ...Connection
      }
    }
  }
  ${ConnectionItem.fragments.connection}
`;

export const ConnectionSearchWithData = graphql(ConnectionSearchQuery)(ConnectionSearch);

const ProfileWithData = graphql(ConnectionSearchQuery, {
  options: ({ q }) => ({ variables: { q } }),
})(ConnectionSearch);
