import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

import layout from '../constants/Layout'
import colors from '../constants/Colors'
import typography from '../constants/Type'

const styles = StyleSheet.create({
  input: {
    height: typography.lineHeights.normal + (layout.unit * 2),
    marginVertical: layout.unit / 2,
    paddingHorizontal: layout.unit,
    borderWidth: 1,
    borderColor: colors.gray.border,
    borderRadius: layout.borderRadius,
  },
})

export default props => (
  <TextInput
    {...props}
    style={styles.input}
  />
)
