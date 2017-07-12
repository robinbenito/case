import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import layout from '../constants/Layout'

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

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.navigationOptions = {
      header: () => (
        <Text>Connect</Text>
      ),
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View>
            <Text>
              This is where the feed will be.
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
