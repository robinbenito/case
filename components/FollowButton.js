import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

import layout from '../constants/Layout'
import colors from '../constants/Colors'

const styles = StyleSheet.create({
  button: {
    borderColor: colors.gray.border,
    borderWidth: 1,
    marginBottom: 5,
    padding: (layout.padding / 2),
    borderRadius: 4,
    width: 100,
  },
  text: {
    textAlign: 'center',
  },
})

export class FollowButton extends React.Component {
  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    const { id, type, data: { followable } } = this.props
    const { __typename } = followable
    const mutation = followable.is_followed ? 'unfollow' : 'follow'

    const optimisticResponse = {
      [mutation]: {
        followable: {
          __typename,
          id,
          is_followed: !followable.is_followed,
        },
      },
    }

    const options = {
      variables: { id, type },
      optimisticResponse,
    }

    if (followable.is_followed) {
      this.props.unfollow(options)
    } else {
      this.props.follow(options)
    }
  }

  render() {
    const followTitle = this.props.data.followable && this.props.data.followable.is_followed ? 'Unfollow' : 'Follow'
    return (
      <TouchableHighlight onPress={this.handlePress} style={styles.button}>
        <Text style={styles.text} accessibilityLabel={followTitle}>
          {followTitle}
        </Text>
      </TouchableHighlight>
    )
  }
}

const FollowableQuery = gql`
  query FollowQuery($id: ID!, $type: FollowableTypeEnum){
    followable(id: $id, type: $type) {
      __typename
      ... on User {
        id
        is_followed
      }
      ... on Channel {
        id
        is_followed
      }
    }
  }
`
const FollowMutation = gql`
  mutation FollowMutation($id: ID!, $type: FollowableTypeEnum!){
    follow(input: { id: $id, type: $type }) {
      followable {
        __typename
        ... on User {
          id
          is_followed
        }
        ... on Channel {
          id
          is_followed
        }
      }
    }
  }
`

const UnfollowMutation = gql`
  mutation UnfollowMutation($id: ID!, $type: FollowableTypeEnum!){
    unfollow(input: { id: $id, type: $type }) {
      followable {
        __typename
        ... on User {
          id
          is_followed
        }
        ... on Channel {
          id
          is_followed
        }
      }
    }
  }
`

FollowButton.propTypes = {
  id: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['USER', 'CHANNEL']).isRequired,
  data: PropTypes.any.isRequired,
  follow: PropTypes.func,
  unfollow: PropTypes.func,
}

FollowButton.defaultProps = {
  id: null,
  type: null,
  data: {},
  follow: () => null,
  unfollow: () => null,
}

const update = (proxy, { data }) => {
  const response = data.follow ? data.follow : data.unfollow
  const { followable: { id, __typename } } = response
  const newProps = proxy.readQuery({
    query: FollowableQuery,
    variables: { id, type: __typename.toUpperCase() },
  })
  newProps.followable = response.followable
  proxy.writeQuery({ query: FollowableQuery, data: newProps })
}

export default compose(
  graphql(FollowableQuery),
  graphql(FollowMutation, { name: 'follow', options: { update } }),
  graphql(UnfollowMutation, { name: 'unfollow', options: { update } }),
)(FollowButton)
