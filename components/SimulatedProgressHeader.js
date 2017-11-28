import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import ProgressBar from './ProgressBar'
import PlainHeader from './PlainHeader'
import { HEADER_HEIGHT } from './Header'

import { Units } from '../constants/Style'

export const SimulatedProgressBar = styled(ProgressBar).attrs({
  shouldSimulate: true,
})`
  position: absolute;
  top: ${HEADER_HEIGHT - Units.statusBarHeight};
  right: 0;
  left: 0;
`

const SimulatedProgressHeader = ({ children, ...rest }) => (
  <View {...rest}>
    <PlainHeader>
      {children}
    </PlainHeader>

    <SimulatedProgressBar />
  </View>
)

SimulatedProgressHeader.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SimulatedProgressHeader
