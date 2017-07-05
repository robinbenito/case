import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import colors from "../constants/Colors"

export default class Connection extends Component {
  render() {
    const { connection, onPress } = this.props
    const color = colors.channel[connection.visibility]

    return (
      <View style={styles.connection} onPress={onPress}>
        <Text style={{ color: colors.gray.text }}>{connection.user.name}</Text>
        <Text style={{ color: colors.gray.text }} > / </Text>
        <Text style={{ color: color }}>{connection.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  connection: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: -1,
    borderColor: colors.gray.border,
    borderWidth: 1,
    backgroundColor: colors.gray.background,
    padding: 10
  },
});
