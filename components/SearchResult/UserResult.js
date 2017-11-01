import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Title, Metadata } from './Meta'
import UserMeta from './UserMeta'
import UserAvatar from '../UserAvatar'

import navigationService from '../../utilities/navigationService'

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export default class UserResult extends React.Component {
  onPress = () => {
    const { user: { id } } = this.props

    navigationService.navigate('profile', { id })
  }

  render() {
    const { user } = this.props

    return (
      <Container>
        <Metadata>
          <Title>{user.name}</Title>

          <UserMeta id={user.id} />
        </Metadata>

        <UserAvatar user={user} size={35} onPress={this.onPress} />
      </Container>
    )
  }
}

// TYPE FRAGMENT
UserResult.propTypes = {
  user: PropTypes.any.isRequired,
}
