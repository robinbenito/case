import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

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
  goToProfile() {
    // this.props.navigator.push(Router.getRoute('profile', { id: this.props.user.slug }))
    return this
  }
  render() {
    return (
      <TouchableOpacity onPress={this.goToProfile}>
        <Text
          style={styles.text}
          onPress={this.goToProfile}
        >
          {this.props.user.name}
        </Text>
      </TouchableOpacity>
    )
  }
}

UserNameText.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
}
