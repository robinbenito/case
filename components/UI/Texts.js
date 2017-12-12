import styled from 'styled-components/native'
import { Typography } from '../../constants/Style'

export const H1 = styled.Text`
  font-size: ${Typography.fontSize.h1};
  font-weight: ${Typography.fontWeight.semiBold};
`

export const H2 = styled.Text`
  font-size: ${Typography.fontSize.h2};
  font-weight: ${Typography.fontWeight.semiBold};
`

export const Strong = styled.Text`
  font-weight: ${Typography.fontWeight.bold};
`

export const Color = styled.Text`
  ${x => x.color && `color: ${x.color};`}
`
