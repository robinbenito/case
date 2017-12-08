import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import Header from '../../Header'
import Alerts from '../../Alerts'

const HeaderMargin = styled.View`
  flex: 1;
  margin-top: ${Header.HEIGHT};
`

const HeaderAwareContainer = ({ children, ...rest }) => (
  <HeaderMargin {...rest}>
    {children}
    <Alerts />
  </HeaderMargin>
)

HeaderAwareContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HeaderAwareContainer
