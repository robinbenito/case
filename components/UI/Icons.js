import React from 'react'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import { Typography, Colors } from '../../constants/Style'

const BaseGlyph = styled(Ionicons)`
  color: ${Colors.semantic.text};
  font-size: ${Typography.fontSize.base};
  position: relative;
  bottom: -1;
`

export const BaseIcon = ({ name, ...rest }) => (
  <BaseGlyph
    name={name}
    {...rest}
  />
)
