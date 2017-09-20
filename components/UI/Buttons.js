import React from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { Border, Typography, Units, Colors } from '../../constants/Style'

export const ButtonOutline = styled.TouchableOpacity`
  border-width: ${Border.borderWidth};
  border-radius: ${Border.borderRadius};
  border-color: black;
`

export const Button = ButtonOutline.extend`
  padding-vertical: ${Units.scale[2]};
  padding-horizontal: ${Units.scale[3]};
  margin-vertical: ${props => Units.scale[props.space || 0]}
  align-items: center;
`

export const SmallButton = Button.extend`
  padding-vertical: ${Units.scale[1]};
  padding-horizontal: ${Units.scale[2]};
`

export const ButtonLabel = styled.Text`
  fontSize: ${Typography.fontSize.medium};
  fontWeight: ${Typography.fontWeight.medium};
  color: black;
`

export const SmallButtonLabel = ButtonLabel.extend`
  fontSize: ${Typography.fontSize.small};
  fontWeight: ${Typography.fontWeight.medium};
`

export const StackedButtonBorder = styled.TouchableHighlight.attrs({
  underlayColor: Colors.gray.medium,
})`
  border-color: ${Colors.gray.medium};
  border-top-width: ${Units.hairlineWidth};
  padding-left: ${Units.scale[2]};
  padding-vertical: ${Units.scale[2]};
`

export const StackedButtonLabel = styled.Text`
  font-size: ${Typography.fontSize.base};
  color: black;
`

export const StackedButton = ({ children, ...rest }) => (
  <StackedButtonBorder {...rest}>
    <StackedButtonLabel>{children}</StackedButtonLabel>
  </StackedButtonBorder>
)

StackedButton.propTypes = {
  children: PropTypes.node.isRequired,
}

export const SecondaryButtonLabel = styled.Text`
  color: ${Colors.gray.medium};
  font-size: ${Typography.fontSize.small}
`

export const SecondaryButton = ({ children, ...rest }) => (
  <TouchableOpacity {...rest}>
    <SecondaryButtonLabel>{children}</SecondaryButtonLabel>
  </TouchableOpacity>
)

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
}
