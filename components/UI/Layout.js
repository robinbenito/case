import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BlurView } from 'expo'
import styled from 'styled-components/native'

import { HEADER_HEIGHT } from '../Header'
import Alerts from '../Alerts'
import { Units, Colors } from '../../constants/Style'

const TouchableHighlightHitArea = styled.TouchableHighlight.attrs({
  underlayColor: 'white',
  activeOpacity: 0.5,
})`
`
export const TouchableHighlight = ({ children, ...rest }) => (
  <TouchableHighlightHitArea {...rest}>
    <View>
      {children}
    </View>
  </TouchableHighlightHitArea>
)

TouchableHighlight.propTypes = {
  children: PropTypes.node.isRequired,
}

export const TouchableFill = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${({ active, inactiveWidth }) => (active ? '100%' : (inactiveWidth || 0))};
  height: ${({ active, inactiveHeight }) => (active ? '100%' : (inactiveHeight || 0))};
  align-items: center;
  justify-content: center;
`

export const AbsoluteFill = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`

export const BlurredAbsoluteFill = styled(BlurView).attrs({
  intensity: 100,
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`
export const RelativeFill = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Section = styled.View`
  margin-vertical: ${x => Units.scale[x.space || 1]};
  ${x => x.spaceT && `margin-top: ${Units.scale[x.spaceT]};`}
  ${x => x.spaceB && `margin-bottom: ${Units.scale[x.spaceB]};`}
  ${x => (x.fill ? 'flex: 1;' : '')}
`

const HeaderMargin = styled.View`
  flex: 1;
  margin-top: ${HEADER_HEIGHT};
`

const StatusBarMargin = styled.View`
  flex: 1;
  margin-top: ${Units.statusBarHeight};
`

export const StatusBarAwareContainer = ({ children, ...rest }) => (
  <StatusBarMargin {...rest}>
    {children}
    <Alerts />
  </StatusBarMargin>
)

StatusBarAwareContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

// TODO: Rename to HeaderAwareContainer
export const Container = ({ children, ...rest }) => (
  <HeaderMargin {...rest}>
    {children}
    <Alerts />
  </HeaderMargin>
)

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export const CenteringPane = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})``

export const CenterColumn = styled.View`
  width: 55%;
  align-self: center;
  flex-direction: column;
  justify-content: center;
`

export const HorizontalRule = styled.View`
  width: 100%;
  height: ${Units.hairlineWidth};
  background-color: ${({ color }) => color || Colors.semantic.divider};
`

export const Spacer = styled.View`
  height: ${x => Units.scale[x.space || 1]}
`
