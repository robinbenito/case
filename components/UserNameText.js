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
    NavigatorService.navigateToProfile(this.props.user.id)
  }

  render() {
    const { style } = this.props

    return (
      <Text style={[styles.text, style]} onPress={this.goToProfile}>{this.props.user.name} </Text>
    )
  }
}

UserNameText.propTypes = {
  style: PropTypes.any,
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.any,
  }).isRequired,
}

UserNameText.defaultProps = {
  style: {},
}
