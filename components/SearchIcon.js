import React from 'react'
import styled from 'styled-components/native'

import navigationService from '../utilities/navigationService'

import { Units } from '../constants/Style'

const searchIcon = require('../assets/images/searchIcon.png')

const Container = styled.View`
  margin-horizontal: ${Units.scale[2]};
`

const Button = styled.TouchableOpacity`
`

export const Icon = styled.Image.attrs({
  source: searchIcon,
})`
  margin-top: 1;
  width: 20;
  height: 20;
  align-self: center;
`

const navigateToSearch = () =>
  navigationService.navigate('search')

export default () => (
  <Container>
    <Button onPress={navigateToSearch}>
      <Icon />
    </Button>
  </Container>
)
