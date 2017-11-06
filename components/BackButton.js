import React from 'react'
import styled from 'styled-components/native'

import navigationService from '../utilities/navigationService'

import { BaseIcon } from './UI/Icons'

import { Units, Colors } from '../constants/Style'

const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-left: ${Units.scale[1]};
  padding-right: ${Units.scale[4]};
  background-color: transparent;
`

const BackIcon = styled(BaseIcon).attrs({
  name: 'ios-arrow-back',
})`
  font-size: 24;
  color: ${Colors.gray.semiBold};
  padding-horizontal: ${Units.scale[1]};
`

export default class BackButton extends React.Component {
  back = () =>
    navigationService.back()

  render() {
    return (
      <Container onPress={this.back}>
        <BackIcon />
      </Container>
    )
  }
}
