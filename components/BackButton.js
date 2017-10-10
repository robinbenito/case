import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import NavigatorService from '../utilities/navigationService'
import { Units } from '../constants/Style'

const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-left: ${Units.scale[1]};
  padding-right: ${Units.scale[4]};
  background-color: transparent;
`

export default class BackButton extends React.Component {
  back = () => {
    NavigatorService.back()
  }

  render() {
    return (
      <Container onPress={this.back}>
        <Ionicons
          name="ios-arrow-back"
          size={24}
          color="black"
          onPress={this.back}
          style={{ paddingHorizontal: Units.scale[1] }}
        />
      </Container>
    )
  }
}
