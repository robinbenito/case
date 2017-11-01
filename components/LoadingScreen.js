import React from 'react'
import { ActivityIndicator } from 'react-native'
import { RelativeFill } from './UI/Layout'

export default props => (
  <RelativeFill {...props}>
    <ActivityIndicator />
  </RelativeFill>
)
