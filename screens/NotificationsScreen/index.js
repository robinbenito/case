import React from 'react'

import {
  StyleSheet,
  View,
} from 'react-native'

import NotificationsHeader from './components/NotificationsHeader'
import NotificationContents from './components/NotificationContents'
import NotificationsFooter from './components/NotificationFooter'

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
        <NotificationContents />
        <NotificationsFooter />
      </View>
    )
  }
}
