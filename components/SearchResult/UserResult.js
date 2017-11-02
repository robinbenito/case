import React, { Component } from 'react'
import styled from 'styled-components/native'
import { gql } from 'react-apollo'
import { propType } from 'graphql-anywhere'

import { Title, Metadata } from './Meta'
import UserMeta from './UserMeta'
import UserAvatar from '../UserAvatar'

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export default class UserResult extends Component {
  render() {
    const { user } = this.props

    return (
      <Container>
        <Metadata>
          <Title>{user.name}</Title>

          <UserMeta id={user.id} />
        </Metadata>

        <UserAvatar user={user} size={35} />
      </Container>
    )
  }
}

UserResult.fragments = {
  user: gql`
    fragment UserResult on User {
      id
      name
      ...Avatar
    }
    ${UserAvatar.fragments.avatar}
  `,
}

UserResult.propTypes = {
  user: propType(UserResult.fragments.user).isRequired,
}
