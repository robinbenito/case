import React from 'react'

import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import NotificationsCount from '../../../components/NotificationCount'

import layout from '../../../constants/Layout'
import type from '../../../constants/Type'
import colors from '../../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: layout.topbar - layout.padding,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.border,
  },
  text: {
    fontSize: type.sizes.medium,
  },
})

export default class NotificationsHeader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Notifications </Text>
        <NotificationsCount />
      </View>
    )
  }
}
