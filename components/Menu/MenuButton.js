import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Colors, Typography, Units } from '../../constants/Style'

const MENU_BUTTON_HEIGHT = 48

export const MenuButtonHitArea = styled.TouchableOpacity`
  padding-horizontal: ${Units.scale[3]};
  flex-direction: row;
  align-items: center;
  height: ${MENU_BUTTON_HEIGHT};
  ${x => x.centered && 'justify-content: center;'}
`

export const MenuButtonIcon = styled.Image`
  margin-top: 1;
  width: 25;
  height: 25;
  align-self: center;
  margin-right: ${Units.scale[3]};
`

export const MenuButtonLabel = styled.Text`
  font-size: ${Typography.fontSize.smedium};
  font-weight: ${Typography.fontWeight.medium};
  color: ${Colors.semantic.text};
`

const MenuButton = ({ children, ...rest }) => (
  <MenuButtonHitArea centered {...rest}>
    <MenuButtonLabel>
      {children}
    </MenuButtonLabel>
  </MenuButtonHitArea>
)

MenuButton.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MenuButton
