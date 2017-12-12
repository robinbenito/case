import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { decode } from 'he'
import { View } from 'react-native'
import styled from 'styled-components/native'

import navigationService from '../../utilities/navigationService'

import { Border, Units, Colors } from '../../constants/Style'

import { HeaderButtonLabel } from './HeaderButton'
import { HorizontalRule } from '../UI/Layout'
import { closeModal } from '../Modal'

export const Select = styled.View`
  width: 100%;
  background-color: white;
  align-self: center;
  width: 100%;
  border-color: ${Colors.gray.semiBold};
  border-radius: ${Border.borderRadius};
  border-width: 1;
  background-color: white;
`

export const SelectOption = styled.TouchableOpacity`
  align-self: center;
  padding-horizontal: ${Units.base};
  padding-vertical: ${Units.scale[2]};
  width: 100%;
`

export default class HeaderPullDownDrawerOption extends Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  navigate = () => {
    const { href } = this.props

    closeModal()

    navigationService.reset(href)
  }

  render() {
    const { title } = this.props

    return (
      <View>
        <HorizontalRule />

        <SelectOption onPress={this.navigate}>
          <HeaderButtonLabel>
            {title && decode(title)}
          </HeaderButtonLabel>
        </SelectOption>
      </View>
    )
  }
}
