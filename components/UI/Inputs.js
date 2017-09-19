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
  margin-bottom: ${Units.scale[1] / 2};
  margin-horizontal: ${Units.scale[1]};
`

export const FieldsetLabel = ({ children }) => (
  <Label>{children.toUpperCase()}</Label>
)

FieldsetLabel.propTypes = {
  children: PropTypes.node.isRequired,
}

export const Input = styled.TextInput`
  font-size: ${Typography.fontSize.small};
  height: ${Typography.fontSize.small + (Units.scale[1])};
  padding-horizontal: ${Units.scale[1]};
  color: ${Colors.semantic.text};
  background-color: white;
`

export const StackedInputBorder = styled.View`
  border-top-width: ${Units.hairlineWidth};
  border-color: ${Border.borderColor};
`

export const StackedInput = props => (
  <StackedInputBorder>
    <Input {...props} />
  </StackedInputBorder>
)

export const Underline = styled.View`
  width: 75%;
  margin-horizontal: 12.5%;
  margin-vertical: ${Units.scale[1]};
  border-color: ${Border.borderColor};
  border-bottom-width: ${Border.borderWidth};
  padding-top: ${Units.scale[2]};
`

export const ShortTextInput = styled.TextInput`
  font-size: ${Typography.fontSize.small};
  height: ${Typography.fontSize.small * Typography.lineHeight.base};
  padding-horizontal: ${Units.scale[1]};
`

export const UnderlineInput = props => (
  <Underline>
    <ShortTextInput {...props} />
  </Underline>
)
