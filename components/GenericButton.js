import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'

import layout from '../constants/Layout'
import colors from '../constants/Colors'
import typography from '../constants/Type'

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.gray.border,
    borderRadius: layout.padding / 4,
    paddingHorizontal: layout.padding * 2,
    paddingVertical: layout.padding,
  },
  label: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.semibold,
  },
})

const GenericButton = ({ label, onPress }) => (
  <TouchableHighlight
    style={styles.button}
    underlayColor={colors.gray.border}
    onPress={onPress}
  >
    <Text style={styles.label}>
      {label}
    </Text>
  </TouchableHighlight>
)

GenericButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

GenericButton.defaultProps = {
  onPress: () => null,
}

export default GenericButton
