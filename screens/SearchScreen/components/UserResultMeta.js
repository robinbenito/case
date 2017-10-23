import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { Units, Typography, Colors } from '../../../constants/Style'

const UserMeta = styled.View`
  padding-top: ${Units.scale[1]};
`

const MetaText = styled.Text`
  font-size: ${Typography.fontSize.small};
  color: ${Colors.gray.semiBold};
`

class UserResultMeta extends React.Component {
  render() {
    const { user, loading, error } = this.props.data

    if (loading || error) {
      return (
        <UserMeta>
          <MetaText>•</MetaText>
        </UserMeta>
      )
    }

    return (
      <UserMeta>
        <MetaText onPress={this.goToChannel}>
          {user.counts.channels} channels • {user.counts.blocks} blocks
        </MetaText>
      </UserMeta>
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
