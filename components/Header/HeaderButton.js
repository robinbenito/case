import React from 'react'
import styled from 'styled-components/native'
import { Border, Colors, Typography, Units } from '../../constants/Style'
import { CaretGlyph } from '../UI/Icons'

const HEADER_BUTTON_V_PADDING = Units.scale[2]
const HEADER_BUTTON_LABEL_LINE_HEIGHT = Typography.lineHeightFor(Typography.fontSize.h2)
export const HEADER_BUTTON_HEIGHT = (HEADER_BUTTON_V_PADDING * 2) + HEADER_BUTTON_LABEL_LINE_HEIGHT

const CaretSpacer = styled.View`
  width: ${Units.base};
  height: ${Typography.fontSize.h2};
  align-items: center;
  justify-content: center;
  align-self: center;
  position: absolute;
  right: 0;
`

export const Caret = () => (
  <CaretSpacer>
    <CaretGlyph />
  </CaretSpacer>
)

export const HeaderButton = styled.TouchableOpacity`
  border-radius: ${Border.borderRadius};
  background-color: white;
  padding-horizontal: ${Units.base};
  padding-vertical: ${HEADER_BUTTON_V_PADDING};
  width: 65%;
  align-self: center;
`

export const HeaderButtonLabel = styled.Text`
  color: ${Colors.semantic.text};
  font-size: ${Typography.fontSize.h2};
  line-height: ${Typography.lineHeightFor(Typography.fontSize.h2)}
  font-weight: ${({ active }) => Typography.fontWeight[active ? 'medium' : 'normal']};
  align-self: center;
`
