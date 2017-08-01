import React from 'react'
import PropTypes from 'prop-types'
import { last } from 'lodash'
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
    const { user } = this.props
    const { routeName, routes } = NavigatorService.getCurrentRoute()

    const lastStack = last(routes)
    if (lastStack.params && lastStack.params.id === user.id) {
      return false
    }

    const route = routeName === 'home' ? 'feedProfile' : 'profile'
    return NavigatorService.navigate(route, { id: user.slug })
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
  user: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
}
