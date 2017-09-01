import React from 'react'

import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

// import gql from 'graphql-tag'
// import { graphql } from 'react-apollo'

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

class NotificationContents extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Notifications</Text>
      </View>
    )
  }
}

export default NotificationContents
