import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { Units, Typography, Colors } from '../../../constants/Style'

const styles = StyleSheet.create({
  meta: {
    paddingTop: Units.base / 2,
  },
  metaText: {
    fontSize: Typography.fontSize.small,
    color: Colors.gray.semiBold,
  },
})

class UserResultMeta extends React.Component {
  render() {
    const { user, loading, error } = this.props.data

    if (loading || error) {
      return (
        <View style={styles.meta}>
          <Text style={styles.metaText}>•</Text>
        </View>
      )
    }

    return (
      <View style={styles.meta}>
        <Text style={styles.metaText} onPress={this.goToChannel}>
          {user.counts.channels} channels • {user.counts.blocks} blocks
        </Text>
      </View>
    )
  }
}

const UserMetaQuery = gql`
  query UserMetaQuery($id: ID!) {
    user(id: $id) {
      counts {
        channels
        blocks
      }
    }
  }
`

UserResultMeta.propTypes = {
  data: PropTypes.any.isRequired,
}

export default graphql(UserMetaQuery)(UserResultMeta)
