import React from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import Swipeout from 'react-native-swipeout'
import { StyleSheet } from 'react-native'

import { BaseIcon } from './Icons'

import { Border, Typography, Units, Colors } from '../../constants/Style'

export const ButtonOutline = styled.TouchableOpacity`
  border-width: ${Border.borderWidthMedium};
  border-radius: ${Border.borderRadius};
  border-color: ${Colors.semantic.text};
`

export const Button = ButtonOutline.extend`
  padding-vertical: ${Units.scale[2]};
  padding-horizontal: ${Units.scale[3]};
  margin-vertical: ${props => Units.scale[props.space || 0]}
  align-items: center;
`

export const SmallButton = Button.extend`
  padding-vertical: ${Units.scale[1]};
  padding-horizontal: ${Units.scale[2]};
`

export const ButtonLabel = styled.Text`
  font-size: ${Typography.fontSize.medium};
  font-weight: ${Typography.fontWeight.medium};
  color: ${Colors.semantic.text};
  text-align: center;
`

export const SmallButtonLabel = ButtonLabel.extend`
  font-size: ${Typography.fontSize.small};
  font-weight: ${Typography.fontWeight.medium};
`

export const StackedButtonBorder = styled.View`
  border-color: ${Border.borderColor};
  border-top-width: ${Units.hairlineWidth};
`

export const StackedButtonHitArea = styled.TouchableOpacity`
  padding-left: ${Units.scale[2]};
  padding-vertical: ${Units.scale[2]};
`

export const StackedButtonLabel = styled.Text.attrs({
  numberOfLines: 1,
})`
  max-width: 90%;
  padding-left: ${x => (x.secondary ? Units.scale[2] : 0)};
  text-align: ${x => (x.secondary ? 'right' : 'left')};
  font-size: ${Typography.fontSize.smedium};
  color: ${x => (x.secondary ? Colors.gray.medium : Colors.semantic.text)};
`

export const StackedButton = ({ children, ...rest }) => (
  <StackedButtonBorder>
    <StackedButtonHitArea {...rest}>
      <StackedButtonLabel>{children}</StackedButtonLabel>
    </StackedButtonHitArea>
  </StackedButtonBorder>
)

StackedButton.propTypes = {
  children: PropTypes.node.isRequired,
}

const ArrowForward = styled(BaseIcon).attrs({
  name: 'ios-arrow-forward',
})`
  font-size: 24;
  color: ${Colors.gray.regular};
  background-color: transparent;
`

const RightIcon = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  padding-horizontal: ${Units.scale[2]};
  background-color: white;
`

const StackedJumpLabel = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding-right: ${Units.scale[4]};
`

export const StackedJumpButton = ({ label, children, ...rest }) => (
  <StackedButtonBorder>
    <StackedButtonHitArea {...rest}>
      <StackedJumpLabel>
        {label &&
          <StackedButtonLabel>
            {label}
          </StackedButtonLabel>
        }

        <StackedButtonLabel secondary={!!label}>
          {children}
        </StackedButtonLabel>
      </StackedJumpLabel>

      <RightIcon>
        <ArrowForward />
      </RightIcon>
    </StackedButtonHitArea>
  </StackedButtonBorder>
)

StackedJumpButton.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
}

StackedJumpButton.defaultProps = {
  label: null,
}

const Checkmark = ArrowForward.extend.attrs({
  name: 'ios-checkmark',
})`
  font-size: 40;
  color: ${Colors.semantic.text};
`

export const StackedToggle = ({ active, children, ...rest }) => (
  <StackedButtonBorder>
    <StackedButtonHitArea {...rest}>
      <StackedButtonLabel>
        {children}
      </StackedButtonLabel>

      {active &&
        <RightIcon>
          <Checkmark />
        </RightIcon>
      }
    </StackedButtonHitArea>
  </StackedButtonBorder>
)

StackedToggle.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

StackedToggle.defaultProps = {
  active: false,
}

export const SecondaryButtonLabel = styled.Text`
  color: ${Colors.gray.medium};
  font-size: ${Typography.fontSize.small}
`

export const SecondaryButton = ({ children, ...rest }) => (
  <StackedButtonHitArea {...rest}>
    <SecondaryButtonLabel>{children}</SecondaryButtonLabel>
  </StackedButtonHitArea>
)

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
}

const StackedSwipeableArea = styled.View`
  padding-left: ${Units.scale[2]};
  padding-vertical: ${Units.scale[2]};
`

export const StackedSwipeable = ({ children, right, ...rest }) => (
  <Swipeout
    right={right}
    style={{
      backgroundColor: 'white',
      borderTopWidth: Units.hairlineWidth,
      borderTopColor: Border.borderColor,
    }}
    {...rest}
  >
    <StackedSwipeableArea>
      <StackedButtonLabel>{children}</StackedButtonLabel>
    </StackedSwipeableArea>
  </Swipeout>
)

StackedSwipeable.propTypes = {
  children: PropTypes.node.isRequired,
  right: PropTypes.array.isRequired,
}
