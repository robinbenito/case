import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Units, Typography, Colors, Border } from '../../constants/Style'

export const Fieldset = styled.View`
  background-color: white;
  border-top-width: ${Units.hairlineWidth};
  border-bottom-width: ${Units.hairlineWidth};
  border-color: ${Border.borderColor};
`

export const Label = styled.Text`
  font-size: ${Typography.fontSize.xsmall};
  color: ${Colors.gray.semiBold};
  margin-bottom: ${Units.base / 2};
  margin-horizontal: ${Units.base};
`

export const FieldsetLabel = ({ children }) => (
  <Label>{children.toUpperCase()}</Label>
)

FieldsetLabel.propTypes = {
  children: PropTypes.node.isRequired,
}

export const Input = styled.TextInput`
  font-size: ${Typography.fontSize.small};
  height: ${Typography.fontSize.small + (Units.base * 3)};
  padding-horizontal: ${Units.base};
  color: ${Colors.semantic.text};
  background-color: white;
`

export const StackedInputBorder = styled.View`
  border-top-width: ${Units.hairlineWidth};
  border-color: ${Border.borderColor};
`

export const StackedButtonBorder = styled.TouchableHighlight.attrs({
  underlayColor: Border.borderColor,
})`
  border-top-width: ${Units.hairlineWidth};
  border-color: ${Border.borderColor};
  padding-vertical: ${Units.base};
  padding-left: ${Units.base};
`

export const StackedInput = props => (
  <StackedInputBorder>
    <Input {...props} />
  </StackedInputBorder>
)

export const Underline = styled.View`
  width: 75%;
  margin-horizontal: 12.5%;
  margin-vertical: ${Units.base};
  border-color: ${Border.borderColor};
  border-bottom-width: ${Border.borderWidth};
`

export const ShortTextInput = styled.TextInput`
  font-size: ${Typography.fontSize.small};
  height: ${Typography.fontSize.small + Units.base};
  padding-horizontal: ${Units.base / 2};
`

export const UnderlineInput = props => (
  <Underline>
    <ShortTextInput {...props} />
  </Underline>
)

// Move this out of file
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
