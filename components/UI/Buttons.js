import styled from 'styled-components/native'
import { Border, Typography } from '../../constants/Style'

export const ButtonOutline = styled.TouchableOpacity`
  border-width: ${Border.borderWidth};
  border-color: ${Border.borderColor};
  border-radius: ${Border.borderRadius};
`

export const Button = ButtonOutline.extend`
  padding-vertical: ${Typography.fontSize.base / 2};
  padding-horizontal: ${Typography.fontSize.base};
`

export const SmallButton = Button.extend`
  padding-vertical: ${Typography.fontSize.xsmall / 2};
  padding-horizontal: ${Typography.fontSize.xsmall};
`

export const XSmallButton = Button.extend`
  padding-vertical: ${Typography.fontSize.xsmall / 4};
  padding-horizontal: ${Typography.fontSize.xsmall / 2};
`

export const ButtonLabel = styled.Text`
  fontSize: ${Typography.fontSize.base};
  fontWeight: ${Typography.fontWeight.medium};
`

export const SmallButtonLabel = ButtonLabel.extend`
  fontSize: ${Typography.fontSize.xsmall};
  fontWeight: ${Typography.fontWeight.medium};
`
