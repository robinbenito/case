import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import NavigatorService from '../utilities/navigationService'

export default class UserNameText extends React.Component {
  goToProfile = () => {
    this.props.onPress()

    NavigatorService.navigate('profile', {
      id: this.props.user.id,
      title: this.props.user.name,
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

UserNameText.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.any,
  }).isRequired,
  onPress: PropTypes.func,
}

UserNameText.defaultProps = {
  onPress: () => null,
}
