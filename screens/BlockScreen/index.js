import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import layout from '../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: (layout.padding * 4),
    alignItems: 'center',
  },
})

export default class BlockScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    )
  }
}
