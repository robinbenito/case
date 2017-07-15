import React from 'react'
import {
  StyleSheet,
  ScrollView,
} from 'react-native'

import FeedContainer from './components/FeedContainer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
})

export default class FeedScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <FeedContainer />
      </ScrollView>
    )
  }
}
