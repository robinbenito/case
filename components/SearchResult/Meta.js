import styled from 'styled-components/native'

import { Units, Typography, Colors } from '../../constants/Style'

export const Section = styled.View``

export const Meta = styled.View`
  padding-top: ${Units.scale[1]};
`

export const MetaText = styled.Text`
  font-size: ${Typography.fontSize.small};
  color: ${Colors.gray.semiBold};
`

export default {
  Section,
  Meta,
  MetaText,
}
