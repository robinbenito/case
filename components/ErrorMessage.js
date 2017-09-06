import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

import layout from '../constants/Layout'
import colors from '../constants/Colors'
import typography from '../constants/Type'

const styles = StyleSheet.create({
  message: {
    margin: layout.unit,
    fontSize: typography.sizes.normal,
    lineHeight: typography.lineHeights.normal,
    color: colors.state.alert,
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
