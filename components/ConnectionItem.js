import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { gray, channel } from "../../../constants/Colors"

export default class Connection extends Component {
  render() {
    const { connection, onPress } = this.props
    const color = channel[connection.status]

    return (
      <View style={styles.container} onPress={onPress}>
        <Text>{connection.user.name}</Text>
        <Text>/</Text>
        <Text style={{ color }}>{connection.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  connection: {
    marginTop: -1,
    borderColor: gray.border,
    borderWidth: 1,
    backgroundColor: gray.background,
    color: gray.text,
  },
});
