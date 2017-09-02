import React from 'react'

import {
  StyleSheet,
  View,
} from 'react-native'

import NotificationsHeader from './components/NotificationsHeader'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default class NotificationsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NotificationsHeader />
      </View>
    )
  }
}
