import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Colors, Typography, Units } from '../../constants/Style'

const MENU_BUTTON_HEIGHT = 48

const MenuButtonHitArea = styled.TouchableOpacity`
  padding-horizontal: ${Units.scale[3]};
  flex-direction: row;
  align-items: center;
  height: ${MENU_BUTTON_HEIGHT};
  ${x => x.centered && 'justify-content: center;'}
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
  font-size: ${Typography.fontSize.smedium};
  font-weight: ${Typography.fontWeight.medium};
  color: ${Colors.semantic.text};
`

export default class MenuButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.number,
    centered: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    icon: null,
    centered: false,
  }

  static height = MENU_BUTTON_HEIGHT
  static HitArea = MenuButtonHitArea
  static Icon = MenuButtonIcon
  static Label = MenuButtonLabel

  render() {
    const { children, icon, centered, ...rest } = this.props

    return (
      <MenuButtonHitArea centered={centered} {...rest}>
        {icon &&
          <MenuButtonIcon source={icon} />
        }

        <MenuButtonLabel>
          {children}
        </MenuButtonLabel>
      </MenuButtonHitArea>
    )
  }
}
