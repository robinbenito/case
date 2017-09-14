import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import UserResultMeta from './UserResultMeta'
import UserAvatar from '../../../components/UserAvatar'

import { Units, Typography, Colors } from '../../../constants/Style'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.black,
  },
  meta: {
    paddingTop: Units.base / 2,
  },
  metaText: {
    fontSize: Typography.fontSize.xsmall,
    color: Colors.gray.semiBold,
  },
})

export default class SearchResultUserItem extends React.Component {
  render() {
    const { user } = this.props
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            {user.name}
          </Text>
          <UserResultMeta id={user.id} />
        </View>
        <View style={styles.right}>
          <UserAvatar user={user} size={40} />
        </View>
      </View>
    )
  }
}

SearchResultUserItem.propTypes = {
  user: PropTypes.any.isRequired,
}
