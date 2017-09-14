import { KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native'
import { Units } from '../../constants/Style'

export const Section = styled.View`
  margin-vertical: ${Units.base * 2}
`

export const CenteringPane = styled(KeyboardAvoidingView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`

export const CenterColumn = styled.View`
  width: 50%;
  margin-horizontal: 25%;
  flex-direction: row;
  justify-content: center;
`
