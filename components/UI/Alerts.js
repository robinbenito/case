import styled from 'styled-components/native'
import { Colors, Typography, Units } from '../../constants/Style'

export const StatusMessage = styled.Text`
  color: ${Colors.semantic.text};
  font-size: ${Typography.fontSize.base};
`

export const ErrorMessage = styled.Text`
  font-size: ${Typography.fontSize.small};
  color: ${Colors.state.alert};
  text-align: center;
  margin-vertical: ${Units.base};
`
