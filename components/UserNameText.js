import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import layout from '../constants/Layout'

export default class UserNameText extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.goToProfile}>
        <Text
          style={[styles.text, this.props.style]}
          onPress={this._goToProfile}
        >
          {this.props.user.name}
        </Text>
      </TouchableOpacity>
    )
  }

  goToProfile() {
    this.props.navigator.push(Router.getRoute('profile', { id: this.props.user.slug }))
  }
}

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
