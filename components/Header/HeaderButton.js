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

const ColorableCaretGlyph = styled(CaretGlyph)`
  color: ${x => x.color || Colors.semantic.label.default};
`

export const Caret = props => (
  <CaretSpacer>
    <ColorableCaretGlyph {...props} />
  </CaretSpacer>
)

export const HeaderButton = styled.TouchableOpacity`
  border-radius: ${Border.borderRadius};
  background-color: transparent;
  padding-horizontal: ${Units.base};
  padding-vertical: ${HEADER_BUTTON_V_PADDING};
  max-width: 65%;
  align-self: center;
`

export const HeaderButtonLabel = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${x => x.color || Colors.semantic.label[x.active ? 'active' : 'default']};
  font-size: ${Typography.fontSize.smedium};
  line-height: ${Typography.lineHeightFor('smedium')}
  font-weight: ${Typography.fontWeight.semiBold};
  align-self: center;
`
