import React from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import { Border, Typography, Units, Colors } from '../../constants/Style'

export const ButtonOutline = styled.TouchableOpacity`
  border-width: ${Border.borderWidth};
  border-color: ${Border.borderColor};
  border-radius: ${Border.borderRadius};
`

export const Button = ButtonOutline.extend`
  padding-vertical: ${Typography.fontSize.base / 2};
  padding-horizontal: ${Typography.fontSize.base};
`

export const BlockButton = Button.extend`
  width: 100%;
  align-items: center;
`

export const SmallButton = Button.extend`
  padding-vertical: ${Typography.fontSize.xsmall / 2};
  padding-horizontal: ${Typography.fontSize.xsmall};
`

export const XSmallButton = Button.extend`
  padding-vertical: ${Typography.fontSize.xsmall / 4};
  padding-horizontal: ${Typography.fontSize.xsmall / 2};
`

export const ButtonLabel = styled.Text`
  fontSize: ${Typography.fontSize.base};
  fontWeight: ${Typography.fontWeight.medium};
`

export const SmallButtonLabel = ButtonLabel.extend`
  fontSize: ${Typography.fontSize.xsmall};
  fontWeight: ${Typography.fontWeight.medium};
`

export const StackedButtonBorder = styled.TouchableHighlight.attrs({
  underlayColor: Border.borderColor,
})`
  border-top-width: ${Units.hairlineWidth};
  border-color: ${Border.borderColor};
  padding-vertical: ${Units.base};
  padding-left: ${Units.base};
`

export const StackedButtonLabel = styled.Text`
  font-size: ${Typography.fontSize.small};
  padding-vertical: ${Units.base / 3};
  padding-right: ${Units.base};
  color: ${Colors.semantic.text};
`

export const StackedButton = ({ children, ...rest }) => (
  <StackedButtonBorder {...rest}>
    <StackedButtonLabel>{children}</StackedButtonLabel>
  </StackedButtonBorder>
)

StackedButton.propTypes = {
  children: PropTypes.node.isRequired,
}
