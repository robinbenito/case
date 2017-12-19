import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Border, Colors, Typography, Units } from '../../constants/Style'

import { CaretGlyph } from '../UI/Icons'

const HEADER_BUTTON_V_PADDING = Units.scale[2]
const HEADER_BUTTON_LABEL_LINE_HEIGHT = Typography.lineHeightFor(Typography.fontSize.h2)
export const HEADER_BUTTON_HEIGHT = (HEADER_BUTTON_V_PADDING * 2) + HEADER_BUTTON_LABEL_LINE_HEIGHT

const CaretSpacer = styled.View`
  width: ${Units.base};
  height: ${Typography.fontSize.smedium};
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-right: ${x => (x.isWithLabel ? -Units.base : 0)};
`

const ColorableCaretGlyph = styled(CaretGlyph)`
  top: 1;
  color: ${x => x.color || Colors.semantic.label.default};
`

export const Caret = ({ color, isWithLabel, ...rest }) => (
  <CaretSpacer isWithLabel={isWithLabel} {...rest}>
    <ColorableCaretGlyph color={color} />
  </CaretSpacer>
)

Caret.propTypes = {
  color: PropTypes.string,
  isWithLabel: PropTypes.bool.isRequired,
}

Caret.defaultProps = {
  color: null,
}

export const HeaderButton = styled.TouchableOpacity`
  border-radius: ${Border.borderRadius};
  background-color: transparent;
  padding-horizontal: ${Units.base};
  padding-vertical: ${HEADER_BUTTON_V_PADDING};
  max-width: 65%;
  align-self: center;
  flex-direction: row;
`

export const HeaderButtonLabel = styled.Text.attrs({
  numberOfLines: 1,
})`
  align-self: center;
  max-width: 95%;
  color: ${x => x.color || Colors.semantic.label[x.active ? 'active' : 'default']};
  font-size: ${Typography.fontSize.smedium};
  line-height: ${Typography.lineHeightFor('smedium')};
  font-weight: ${Typography.fontWeight.semiBold};
`
