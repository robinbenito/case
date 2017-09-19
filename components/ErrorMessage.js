import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import { Typography, Colors, Units } from '../constants/Style'

const styles = StyleSheet.create({
  message: {
    margin: Units.base,
    fontSize: Typography.fontSize.tiny,
    color: Colors.state.alert,
    textAlign: 'center',
  },
})

const ErrorMessage = props => (
  <Text style={styles.message}>
    {props.message}
  </Text>
)

ErrorMessage.propTypes = {
  message: PropTypes.string,
}

ErrorMessage.defaultProps = {
  message: null,
}

export default ErrorMessage
