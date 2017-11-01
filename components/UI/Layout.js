import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BlurView } from 'expo'
import styled from 'styled-components/native'

import { HEADER_HEIGHT } from '../Header'
import Alerts from '../Alerts'
import { Units, Border } from '../../constants/Style'

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
`

export const HeaderAwareContainer = styled.View`
  flex: 1;
  margin-top: ${HEADER_HEIGHT};
`

export const StatusBarAwareContainer = styled.View`
  flex: 1;
  margin-top: ${Units.statusBarHeight};
`

export const Container = ({ children, ...rest }) => (
  <HeaderAwareContainer {...rest}>
    {children}
    <Alerts />
  </HeaderAwareContainer>
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
  background-color: ${({ color }) => color || Border.borderColor};
`

export const Spacer = styled.View`
  height: ${x => Units.scale[x.space || 1]}
`
