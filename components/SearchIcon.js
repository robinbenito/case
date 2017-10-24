import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'

import NavigationService from '../utilities/navigationService'

import { Colors, Units } from '../constants/Style'

const Container = styled.View`
  margin-horizontal: ${Units.scale[2]};
`

const Button = styled.TouchableWithoutFeedback`
  background-color: white;
`

const Icon = styled(Ionicons)`
  background-color: white;
`

export default () => (
  <Container>
    <Button onPress={() => NavigationService.navigate('search')}>
      <Icon name="ios-search-outline" size={25} color={Colors.gray.medium} />
    </Button>
  </Container>
)
