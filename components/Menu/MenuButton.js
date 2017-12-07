import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Colors, Typography, Units } from '../../constants/Style'

const MENU_BUTTON_HEIGHT = 48
const MenuButtonHitArea = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding-horizontal: ${Units.scale[3]};
  flex-direction: row;
  align-items: center;
  height: ${MENU_BUTTON_HEIGHT};
`

const MenuButtonIcon = styled.Image`
  margin-top: 1;
  width: 25;
  height: 25;
  align-self: center;
  margin-right: ${Units.scale[3]};
`

const MenuButtonLabel = styled.Text.attrs({
  numberOfLines: 1,
})`
  flex: 1;
  font-size: ${Typography.fontSize.smedium};
  font-weight: ${Typography.fontWeight.medium};
  ${x => x.centered && 'text-align: center;'}
  color: ${({ active, secondary }) => {
    const colors = Colors.semantic.label
    if (active) return colors.active
    if (secondary) return colors.secondary
    return colors.default
  }};
`

export default class MenuButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.number,
    centered: PropTypes.bool.isRequired,
    active: PropTypes.bool,
    secondary: PropTypes.bool,
  }

  static defaultProps = {
    icon: null,
    centered: false,
    active: false,
    secondary: false,
  }

  static height = MENU_BUTTON_HEIGHT
  static HitArea = MenuButtonHitArea
  static Icon = MenuButtonIcon
  static Label = MenuButtonLabel

  render() {
    const {
      children,
      icon,
      centered,
      active,
      secondary,
      ...rest
    } = this.props

    return (
      <MenuButtonHitArea {...rest}>
        {icon &&
          <MenuButtonIcon source={icon} />
        }

        <MenuButtonLabel centered={centered} active={active} secondary={secondary}>
          {children}
        </MenuButtonLabel>
      </MenuButtonHitArea>
    )
  }
}
