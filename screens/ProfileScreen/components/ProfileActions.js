import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'

import FollowButtonWithData from '../../../components/FollowButton'
import SmallButton from '../../../components/UI/Buttons/SmallButton'

import navigationService from '../../../utilities/navigationService'

import { Units } from '../../../constants/Style'

const Actions = styled.View`
  margin-vertical: ${Units.scale[2]};
  flex-direction: row;
  justify-content: center;
`

const FollowButton = styled(FollowButtonWithData)`
  margin-horizontal: ${Units.scale[1]};
`

const Action = styled(SmallButton)`
  margin-horizontal: ${Units.scale[1]};
`

const profleActionsFragment = gql`
  fragment ProfileActions on User {
    id
    can {
      follow
    }
  }
`

export default class ProfileActions extends Component {
  static propTypes = {
    user: propType(profleActionsFragment).isRequired,
    isTheCurrentUser: PropTypes.bool.isRequired,
  }

  static fragment = profleActionsFragment

  settings = () =>
    navigationService.navigate('userSettings')

  render() {
    const { isTheCurrentUser, user: { id, can } } = this.props

    return (
      <Actions>
        {can.follow &&
          <FollowButton id={id} type="USER" />
        }

        {isTheCurrentUser &&
          <Action onPress={this.settings}>
            Settings
          </Action>
        }
      </Actions>
    )
  }
}
