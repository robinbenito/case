/* eslint-disable react/no-multi-comp */
// TODO: Organize these into a sub-folder

import React, { Component } from 'react'
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
  color: ${x => (x.disabled ? Colors.gray.regular : Colors.semantic.text)};
  background-color: white;
`

const INPUT_HEIGHT = Typography.fontSize.base * 3

export const StackedInputField = Input.extend`
  width: 100%;
  height: ${INPUT_HEIGHT};
  padding-horizontal: ${Units.scale[2]};
  font-size: ${Typography.fontSize.smedium};
`

const StackedInputOutline = styled.View`
  border-top-width: ${Units.hairlineWidth};
  border-color: ${Border.borderColor};
  flex-direction: row;
  align-items: center;
`
// Baselines in `Text` are `1` off from from `Input`... apparently
// Hence the `top: -1`
const StackedInputLabel = styled.Text`
  top: -1;
  font-size: ${Typography.fontSize.smedium};
  color: ${Colors.semantic.text};
  padding-left: ${Units.scale[2]};
  padding-right: ${Units.scale[3]};
`

export class StackedInput extends Component {
  static propTypes = {
    label: PropTypes.string,
  }

  static defaultProps = {
    label: null,
  }

  focus() {
    this.Input.focus()
  }

  render() {
    const { label, ...rest } = this.props

    return (
      <StackedInputOutline>
        {label &&
          <StackedInputLabel>
            {label}
          </StackedInputLabel>
        }

        <StackedInputField
          innerRef={ref => this.Input = ref}
          {...rest}
        />
      </StackedInputOutline>
    )
  }
}

const StackedTextAreaInput = StackedInputField.extend.attrs({
  multiline: true,
})`
  height: ${x => INPUT_HEIGHT * (x.rows || 2)};
  padding-top: ${Units.scale[2]};
  border-top-width: ${Units.hairlineWidth};
  border-color: ${Border.borderColor};
`

export class StackedTextArea extends Component {
  focus() {
    this.Input.focus()
  }

  render() {
    return (
      <StackedTextAreaInput
        innerRef={ref => this.Input = ref}
        {...this.props}
      />
    )
  }
}

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

export class UnderlineInput extends Component {
  focus() {
    this.Input.focus()
  }

  render() {
    return (
      <Underline>
        <ShortTextInput
          innerRef={ref => this.Input = ref}
          {...this.props}
        />
      </Underline>
    )
  }
}

export const InputDescription = styled.Text`
  margin-vertical: ${Units.scale[2]};
  margin-left: ${Units.scale[2]};
  margin-right: ${Units.scale[3]};
  color: ${Colors.gray.semiBold};
  font-size: ${Typography.fontSize.small};
  line-height: ${Typography.lineHeightFor('small', 'compact')};
`

/* eslint-enable react/no-multi-comp */
