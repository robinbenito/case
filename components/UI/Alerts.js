import styled from 'styled-components/native'
import { Colors, Typography, Units } from '../../constants/Style'

export const GenericMessage = styled.Text`
  margin-horizontal: ${Units.base};
  font-size: ${Typography.fontSize.medium};
  line-height: ${Typography.lineHeightFor('medium')};
  text-align: center;
  color: ${Colors.semantic.text};
`

export const StatusMessage = styled.Text`
  margin-horizontal: ${Units.base};
  font-size: ${Typography.fontSize.base};
  line-height: ${Typography.lineHeightFor('base')};
  text-align: center;
  color: ${Colors.semantic.text};
`

export const ErrorMessage = styled.Text`
  margin-vertical: ${Units.base};
  margin-horizontal: ${Units.base};
  text-align: center;
  font-size: ${Typography.fontSize.small};
  line-height: ${Typography.lineHeightFor('small', 'compact')};
  color: ${Colors.state.alert};
`
