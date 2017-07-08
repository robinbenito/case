import React, { Component } from 'react'
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native'

import gql from 'graphql-tag'
import colors from "../constants/Colors"

export default class ConnectionItem extends Component {
  render() {
    const { connection, onPress } = this.props
    const color = colors.channel[connection.visibility]

    return (
      <TouchableHighlight onPress={() => onPress(connection)}>
        <View style={styles.connection}>
          <Text style={{ color: colors.gray.text }}>{connection.user.name}</Text>
          <Text style={{ color: colors.gray.text }} > / </Text>
          <Text style={{ color: color }}>{connection.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

ConnectionItem.fragments = {
  connection: gql`
    fragment Connection on Channel {
      user {
        name
      }
      slug
      id
      title
      visibility
    }
  `,
};

const styles = StyleSheet.create({
  connection: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: -1,
    borderColor: colors.gray.border,
    borderWidth: 1,
    backgroundColor: colors.gray.background,
    padding: 10,
    overflow: 'hidden'
  },
});
