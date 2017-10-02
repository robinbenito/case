import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'

import NavigatorService from '../utilities/navigationService'

import { Units } from '../constants/Style'

const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${Units.scale[1]};
`

export default class BackButton extends React.Component {
  render() {
    return (
      <Container onPress={() => NavigatorService.back()}>
        <Ionicons
          name="ios-arrow-back"
          size={24}
          color="black"
          onPress={() => NavigatorService.back()}
          style={{ paddingHorizontal: Units.scale[1] }}
        />
      </Container>
    )
  }
}
