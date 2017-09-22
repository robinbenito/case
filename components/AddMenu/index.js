import React from 'react'
import styled from 'styled-components/native'
import { ImagePicker } from 'expo'
import { CameraRoll } from 'react-native'

import {
  Border,
  Typography,
  Units,
  Colors,
} from '../../constants/Style'

import NavigationService from '../../utilities/navigationService'
import AddIcon from './AddIcon'

const AddModal = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${({ active }) => (active ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,00)')};
  width: ${({ active }) => (active ? '100%' : 100)};
  height: ${({ active }) => (active ? '100%' : 100)};
  align-items: center;
  justify-content: center;
`

const Menu = styled.View`
  border-width: ${Border.borderWidth};
  border-color: ${Border.borderColor};
  border-radius: ${Border.borderRadius};
  width: 66%;
  background-color: white;
`

const Item = styled.TouchableOpacity`
  border-bottom-width: ${Border.borderWidth};
  border-bottom-color: ${Border.borderColor};
  margin-bottom: -${Border.borderWidth};
  padding-horizontal: ${Units.scale[2]};
  padding-vertical: ${Units.scale[2]};
  align-items: center;
  justify-content: center;
`

const ItemText = styled.Text`
  font-weight: ${Typography.fontWeight.semiBold};
  font-size: ${Typography.fontSize.medium};
  color: ${Colors.gray.semiBold}
`

export default class AddMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }
    this.toggleActive = this.toggleActive.bind(this)
    this.showPhotos = this.showPhotos.bind(this)
    this.takePhoto = this.takePhoto.bind(this)
  }

  toggleActive() {
    const { active } = this.state
    this.setState({ active: !active })
  }

  async showPhotos() {
    const result = await ImagePicker.launchImageLibraryAsync({})
    if (!result.cancelled) {
      this.setState({ image: result.uri })
      NavigationService.navigate('connect', { image: result.uri })
    }
  }

  async takePhoto() {
    const result = await ImagePicker.launchCameraAsync({})
    if (!result.cancelled) {
      CameraRoll.saveToCameraRoll(result.uri)
      this.setState({ image: result.uri })
      NavigationService.navigate('connect', { image: result.uri })
    }
  }

  renderMenu() {
    return (
      <Menu>
        <Item onPress={() => NavigationService.navigate('newChannel')} >
          <ItemText>New Channel</ItemText>
        </Item>
        <Item onPress={() => NavigationService.navigate('newText')}>
          <ItemText>Enter text</ItemText>
        </Item>
        <Item onPress={() => NavigationService.navigate('newLink')}>
          <ItemText>Paste link</ItemText>
        </Item>
        <Item onPress={() => this.showPhotos()}>
          <ItemText>Upload image</ItemText>
        </Item>
        <Item onPress={() => this.takePhoto()}>
          <ItemText>Take photo</ItemText>
        </Item>
      </Menu>
    )
  }

  render() {
    const { active } = this.state
    const menu = active ? this.renderMenu() : null

    return (
      <AddModal activeOpacity={1} active={active} onPress={this.toggleActive} >
        <AddIcon active={active} onPress={this.toggleActive} />
        {menu}
      </AddModal>
    )
  }
}

