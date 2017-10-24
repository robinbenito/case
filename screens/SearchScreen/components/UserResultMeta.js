import React from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { Meta, MetaText } from './Meta'

class UserResultMeta extends React.Component {
  render() {
    const { user, loading, error } = this.props.data

    if (loading || error) {
      return (
        <Meta>
          <MetaText>•</MetaText>
        </Meta>
      )
    }

    return (
      <Meta>
        <MetaText onPress={this.goToChannel}>
          {user.counts.channels} channels • {user.counts.blocks} blocks
        </MetaText>
      </Meta>
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
