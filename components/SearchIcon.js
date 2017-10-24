import React from 'react'
import styled from 'styled-components/native'

import NavigationService from '../utilities/navigationService'

import { BaseIcon } from '../components/UI/Icons'
import { Colors, Units, Typography } from '../constants/Style'

const Container = styled.View`
  margin-horizontal: ${Units.scale[2]};
`

const Button = styled.TouchableWithoutFeedback`
  background-color: white;
`

const Icon = styled(BaseIcon).attrs({
  name: 'ios-search',
})`
  font-size: ${Typography.fontSize.h1};
  background-color: white;
  color: ${Colors.gray.medium};
`

export default () => (
  <Container>
    <Button onPress={() => NavigationService.navigate('search')}>
      <Icon />
    </Button>
  </Container>
)
