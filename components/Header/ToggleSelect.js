import styled from 'styled-components/native'
import { Border, Units } from '../../constants/Style'

export const ToggleSelect = styled.View`
  border-radius: ${Border.borderRadius};
  background-color: white;
  width: 65%;
  align-self: center;
`

export const ToggleSelectOption = styled.TouchableOpacity`
  align-self: center;
  padding-horizontal: ${Units.base};
  padding-vertical: ${Units.scale[2]};
  width: 100%;
`
