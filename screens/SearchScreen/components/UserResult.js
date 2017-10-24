import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import UserResultMeta from './UserResultMeta'
import UserAvatar from '../../../components/UserAvatar'
import NavigationService from '../../../utilities/navigationService'

import { Typography } from '../../../constants/Style'

const UserResult = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const Section = styled.View`
  justify-content: center;
`

const UserName = styled.Text`
  font-size: ${Typography.fontSize.smedium}
`

export default class SearchResultUserItem extends React.Component {
  onPress = () => {
    const { user } = this.props
    NavigationService.navigate('profile', { id: user.id })
  }

  render() {
    const { user } = this.props
    return (
      <UserResult>
        <Section>
          <UserName>{user.name}</UserName>
          <UserResultMeta id={user.id} />
        </Section>
        <Section>
          <UserAvatar user={user} size={35} onPress={this.onPress} />
        </Section>
      </UserResult>
    )
  }
}

SearchResultUserItem.propTypes = {
  user: PropTypes.any.isRequired,
}
