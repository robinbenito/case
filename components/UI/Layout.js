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
