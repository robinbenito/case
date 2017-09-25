import { KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native'
import { HEADER_HEIGHT } from '../Header'
import { Units, Colors } from '../../constants/Style'

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
  background-color: ${({ color }) => color || Colors.semantic.text};
`
