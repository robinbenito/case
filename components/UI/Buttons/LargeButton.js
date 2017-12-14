import React, { Component } from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'

import ButtonOutline from './ButtonOutline'

import { Typography, Units, Colors } from '../../../constants/Style'

const LargeButtonOutline = styled(ButtonOutline)`
  padding-vertical: ${Units.scale[2]};
  padding-horizontal: ${Units.scale[3]};
`

const LargeButtonLabel = styled.Text`
  text-align: center;
  font-size: ${Typography.fontSize.medium};
  font-weight: ${Typography.fontWeight.bold};
  color: ${x => x.color || Colors.semantic.label.default};
`

export default class LargeButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
  }

  static defaultProps = {
    color: undefined,
  }

  static Outline = LargeButtonOutline
  static Label = LargeButtonLabel

  render() {
    const { onPress, children, color, ...rest } = this.props

    return (
      <LargeButtonOutline onPress={onPress} color={color} {...rest}>
        <LargeButtonLabel color={color}>
          {children}
        </LargeButtonLabel>
      </LargeButtonOutline>
    )
  }
}
