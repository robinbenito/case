import styled from 'styled-components/native'

import { Colors, Typography, Units } from '../../constants/Style'

export const Metadata = styled.View`
  flex: 1;
`

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: ${Typography.fontSize.smedium}
  color: ${Colors.gray.semiBold};
  padding-right: ${Units.base};
`

export const Attribution = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: ${Typography.fontSize.small};
  line-height: ${Typography.lineHeightFor('small')};
  color: ${Colors.gray.semiBold};
`
