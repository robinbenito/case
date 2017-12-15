import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { propType } from 'graphql-anywhere'

import navigationService from '../utilities/navigationService'

const userNameFragment = gql`
  fragment UserNameText on User {
    id
    name
  }
`

export default class UserNameText extends Component {
  static propTypes = {
    user: propType(userNameFragment).isRequired,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    onPress: () => null,
  }

  static fragment = userNameFragment

  goToProfile = () => {
    const { onPress, user: { id, name } } = this.props

    onPress()

    navigationService.navigate('profile', {
      id, title: name,
    })
  }

  render() {
    const { user: { name }, onPress, ...rest } = this.props

    return (
      <Text onPress={this.goToProfile} {...rest}>
        {name}
      </Text>
    )
  }
}
