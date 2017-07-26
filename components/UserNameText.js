import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import NavigatorService from '../utilities/navigationService'

import layout from '../constants/Layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: layout.padding,
  },
  text: {
    fontWeight: 'bold',
  },
})

export default class UserNameText extends React.Component {
  constructor(props) {
    super(props)
    this.goToProfile = this.goToProfile.bind(this)
  }

  goToProfile() {
    const { user, mode } = this.props
    const routeName = mode === 'feed' ? 'feedProfile' : 'profile'
    NavigatorService.navigate(routeName, { id: user.slug })
  }

  render() {
    return (
      <TouchableOpacity onPress={this.goToProfile}>
        <Text style={styles.text} onPress={this.goToProfile}>{this.props.user.name} </Text>
      </TouchableOpacity>
    )
  }
}

UserNameText.propTypes = {
  mode: PropTypes.oneOf(['feed', 'default']),
  user: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
}

UserNameText.defaultProps = {
  mode: 'default',
}
