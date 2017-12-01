import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'

import { Attribution } from './Meta'

import { pluralize } from '../../utilities/inflections'

class UserMeta extends Component {
  render() {
    const { data: { loading, error, user } } = this.props

    if (loading || error) {
      return (
        <Attribution>&nbsp;</Attribution>
      )
    }

    return (
      <Attribution>
        {pluralize(user.counts.channels, 'channel')} • {pluralize(user.counts.blocks, 'block')}
      </Attribution>
    )
  }
}

UserMeta.fragments = {
  meta: gql`
    fragment UserMeta on User {
      counts {
        channels
        blocks
      }
    }
  `,
}

const UserMetaQuery = gql`
  query UserMetaQuery($id: ID!) {
    user(id: $id) {
      ...UserMeta
    }
  }
  ${UserMeta.fragments.meta}
`

UserMeta.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    user: propType(UserMeta.fragments.meta),
  }).isRequired,
}

export default graphql(UserMetaQuery)(UserMeta)
