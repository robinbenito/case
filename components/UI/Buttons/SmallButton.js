import React, { Component } from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'

import ButtonOutline from './ButtonOutline'

import { Typography, Units, Colors } from '../../../constants/Style'

const SmallButtonOutline = styled(ButtonOutline)`
  padding-vertical: ${Units.scale[1]};
  padding-horizontal: ${Units.scale[2]};
`

const SmallButtonLabel = styled.Text`
  text-align: center;
  font-size: ${Typography.fontSize.small};
  font-weight: ${Typography.fontWeight.bold};
  color: ${x => x.color || Colors.semantic.label.default};
`

export default class SmallButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
  }

  static defaultProps = {
    color: undefined,
  }

  static Outline = SmallButtonOutline
  static Label = SmallButtonLabel

  render() {
    const { onPress, children, color, ...rest } = this.props

    return (
      <SmallButtonOutline onPress={onPress} color={color} {...rest}>
        <SmallButtonLabel color={color}>
          {children}
        </SmallButtonLabel>
      </SmallButtonOutline>
    )
  }
}
