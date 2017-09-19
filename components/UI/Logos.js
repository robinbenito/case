import React from 'react'
import { Image, StyleSheet } from 'react-native'

const logo = require('../../assets/images/logo.png')

const styles = StyleSheet.create({
  small: {
    width: 50,
    height: 50,
  },
})

// eslint-disable-next-line
export const SmallLogo = props => (
  <Image
    style={styles.small}
    source={logo}
  />
)
