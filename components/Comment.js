import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import UserAvatar from './UserAvatar'
import UserNameText from './UserNameText'

import layout from '../constants/Layout'
import colors from '../constants/Colors'
import type from '../constants/Type'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: layout.padding * 2,
  },
  avatarContainer: {
    marginRight: layout.padding,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  body: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  date: {
    color: colors.gray.text,
    fontSize: type.sizes.normal,
    paddingTop: layout.padding,
  },
})

export default class Comment extends React.Component {
  render() {
    const { comment } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <UserAvatar user={comment.user} size={30} />
        </View>
        <View style={styles.contentContainer}>
          <UserNameText user={comment.user} />
          <Text style={styles.body}>{comment.body}</Text>
          <Text style={styles.date}>
            {comment.updated_at.toUpperCase()}
          </Text>
        </View>
      </View>
    )
  }
}

Comment.fragments = {
  comment: gql`
    fragment CommentItem on Comment {
      __typename
      id
      body
      updated_at(relative: true)
      user {
        __typename
        id
        name
        slug
        initials
        avatar(size: SMALL)
      }
    }
  `,
}


Comment.propTypes = {
  comment: PropTypes.any,
}

Comment.defaultProps = {
  comment: {},
}
