import React from 'react'
import { ActivityIndicator } from 'react-native'
import { CenteringPane } from './UI/Layout'

export default props => (
  <CenteringPane {...props}>
    <ActivityIndicator />
  </CenteringPane>
)
