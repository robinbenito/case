import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { HEADER_HEIGHT } from './Header'

import { Colors, Typography, Units } from '../constants/Style'

const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: ${HEADER_HEIGHT - Units.statusBarHeight}
`

const Label = styled.Text`
  font-weight: ${Typography.fontWeight.semiBold};
  color: ${Colors.gray.semiBold};
  font-size: ${Typography.fontSize.smedium};
`

export default class PlainHeader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <Container {...rest}>
        <Label>
          {children}
        </Label>
      </Container>
    )
  }
}
