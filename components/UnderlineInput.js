import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Colors, Border, Units, Typography } from '../constants/Style'

const styles = StyleSheet.create({
  underline: {
    marginVertical: Units.base / 2,
    borderColor: Colors.grayRegular,
    borderBottomWidth: Border.borderWidth,
  },
  input: {
    fontSize: Typography.fontSize.base,
    height: Typography.fontSize.base + (Units.base * 2),
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
