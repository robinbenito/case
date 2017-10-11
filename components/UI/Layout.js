import { KeyboardAvoidingView } from 'react-native'
import { BlurView } from 'expo'
import styled from 'styled-components/native'
import { HEADER_HEIGHT } from '../Header'
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
  width: 100%;
  height: ${Units.window.height - HEADER_HEIGHT};
  justify-content: center;
  align-items: center;
`

export const Section = styled.View`
  margin-vertical: ${props => Units.scale[props.space || 1]};
`

export const Container = styled.View`
  flex: 1;
  margin-top: ${HEADER_HEIGHT};
`

export const CenteringPane = styled(KeyboardAvoidingView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`

export const CenterColumn = styled.View`
  width: 50%;
  align-self: center;
  flex-direction: column;
  justify-content: center;
`

export const HorizontalRule = styled.View`
  width: 100%;
  height: ${Units.hairlineWidth};
  background-color: ${({ color }) => color || Border.borderColor};
`
