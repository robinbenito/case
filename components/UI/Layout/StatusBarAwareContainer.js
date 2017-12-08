import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import Alerts from '../../Alerts'

import { Units } from '../../../constants/Style'

const StatusBarMargin = styled.View`
  flex: 1;
  margin-top: ${Units.statusBarHeight};
`

const StatusBarAwareContainer = ({ children, ...rest }) => (
  <StatusBarMargin {...rest}>
    {children}
    <Alerts />
  </StatusBarMargin>
)

StatusBarAwareContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default StatusBarAwareContainer
