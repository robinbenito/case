import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Border, Units, Typography } from '../constants/Style'

const styles = StyleSheet.create({
  underline: {
    width: '75%',
    marginHorizontal: '12.5%',
    marginVertical: Units.base,
    borderColor: Border.borderColor,
    borderBottomWidth: Border.borderWidth,
  },
  input: {
    fontSize: Typography.fontSize.small,
    height: Typography.fontSize.small + Units.base,
    paddingHorizontal: Units.base / 2,
  },
})

export default props => (
  <View style={styles.underline}>
    <TextInput
      {...props}
      style={styles.input}
    />
  </View>
)
