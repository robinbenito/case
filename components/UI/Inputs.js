import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Units, Typography, Colors, Border } from '../../constants/Style'

export const Fieldset = styled.View`
  background-color: white;
  border-bottom-width: ${Units.hairlineWidth};
  border-bottom-color: ${Border.borderColor};
`

export const Label = styled.Text`
  font-size: ${Typography.fontSize.small};
  color: ${Colors.gray.semiBold};
  margin-bottom: ${Units.scale[1]};
  margin-horizontal: ${Units.scale[2]};
`

export const FieldsetLabel = ({ children }) => (
  <Label>{children.toUpperCase()}</Label>
)

FieldsetLabel.propTypes = {
  children: PropTypes.node.isRequired,
}

export const Input = styled.TextInput`
  font-size: ${Typography.fontSize.base};
  height: ${Typography.fontSize.base + Units.scale[1]};
  padding-horizontal: ${Units.scale[1]};
  color: ${Colors.semantic.text};
  background-color: white;
`

const INPUT_HEIGHT = Typography.fontSize.base * 3

export const StackedInput = Input.extend`
  height: ${INPUT_HEIGHT};
  padding-horizontal: ${Units.scale[2]};
  border-top-width: ${Units.hairlineWidth};
  border-color: ${Border.borderColor};
  font-size: ${Typography.fontSize.smedium};
`

export const StackedTextArea = StackedInput.extend.attrs({
  multiline: true,
})`
  padding-top: ${Units.scale[2]};
  height: ${x => INPUT_HEIGHT * (x.rows || 2)};
`

export const Underline = styled.View`
  width: 75%;
  margin-horizontal: 12.5%;
  margin-vertical: ${Units.scale[1]};
  border-color: ${Border.borderColor};
  border-bottom-width: ${Border.borderWidth};
  padding-top: ${Units.scale[2]};
`

export const ShortTextInput = styled.TextInput`
  font-size: ${Typography.fontSize.base};
  height: ${Typography.fontSize.base * Typography.lineHeight.base};
  padding-horizontal: ${Units.scale[1]};
`

export const UnderlineInput = props => (
  <Underline>
    <ShortTextInput {...props} />
  </Underline>
)

export const InputDescription = styled.Text`
  margin-vertical: ${Units.scale[2]};
  margin-left: ${Units.scale[2]};
  margin-right: ${Units.scale[3]};
  color: ${Colors.gray.semiBold};
  font-size: ${Typography.fontSize.small};
  line-height: ${Typography.lineHeightFor('small', 'compact')};
`
