import React from 'react'
import styled from 'styled-components/native'
import { BaseIcon } from '../UI/Icons'
import { Colors } from '../../constants/Style'

const SIZE = 40

const ToggleCheckIcon = styled(BaseIcon).attrs({
  name: 'ios-checkmark',
})`
  font-size: ${SIZE};
  background-color: transparent;
  top: 2;
  color: ${Colors.gray.semiBold}
`

const ToggleCheckBox = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${SIZE * 1.25};
  align-items: center;
  justify-content: center;
`

export default () => (
  <ToggleCheckBox>
    <ToggleCheckIcon />
  </ToggleCheckBox>
)
