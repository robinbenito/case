import React from 'react'

import {
  StyleSheet,
  View,
} from 'react-native'

import NotificationsHeader from './components/NotificationsHeader'
<<<<<<< HEAD
=======
import NotificationContents from './components/NotificationContents'
>>>>>>> dcaa3f5530277d014999f9c4b49fff18d3999d68

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
<<<<<<< HEAD
=======
        <NotificationContents />
>>>>>>> dcaa3f5530277d014999f9c4b49fff18d3999d68
      </View>
    )
  }
}
