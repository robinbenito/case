import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import UserMeta from './UserMeta'
import UserAvatar from '../UserAvatar'

import navigationService from '../../utilities/navigationService'

import { Typography } from '../../constants/Style'

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const Section = styled.View`
  justify-content: center;
`

const UserName = styled.Text`
  font-size: ${Typography.fontSize.smedium}
`

export default class UserResult extends React.Component {
  onPress = () => {
    const { user } = this.props
    navigationService.navigate('profile', { id: user.id })
  }

  render() {
    const { user } = this.props
    return (
      <Container>
        <Section>
          <UserName>{user.name}</UserName>

          <UserMeta id={user.id} />
        </Section>

        <Section>
          <UserAvatar user={user} size={35} onPress={this.onPress} />
        </Section>
      </Container>
    )
  }
}

// TYPE FRAGMENT
UserResult.propTypes = {
  user: PropTypes.any.isRequired,
}
