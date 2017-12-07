import React, { Component } from 'react'
import { CameraRoll } from 'react-native'
import { ImagePicker } from 'expo'
import styled from 'styled-components/native'

import { AbsoluteFill, HorizontalRule } from '../UI/Layout'
import MenuButtonGroup from '../Menu/MenuButtonGroup'
import MenuButton from '../Menu/MenuButton'
import { closeModal } from '../Modal'

import { Border, Colors, Units } from '../../constants/Style'

import navigationService from '../../utilities/navigationService'

import ICONS from './icons'

const CancelButtonGroup = styled(MenuButtonGroup)`
  margin-vertical: ${Units.base};
  border-width: 0;
`

const CancelButton = styled(MenuButton).attrs({
  secondary: true,
})`
  border-color: ${Colors.semantic.label.secondary};
  border-width: 1;
  border-radius: ${Border.borderRadius}
`

const BackgroundFill = styled(AbsoluteFill)`
  padding-horizontal: ${Units.base};
  justify-content: flex-end;
`

class AddMenuOptions extends Component {
  newChannel = () => {
    this.close()
    navigationService.navigate('newChannel')
  }

  enterText = () => {
    this.close()
    navigationService.navigate('newText')
  }

  pasteLink = () => {
    this.close()
    navigationService.navigate('newLink')
  }

  uploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({})

    if (result.cancelled) return

    this.handleImageResult(result)
  }

  takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({})

    if (result.cancelled) return

    CameraRoll.saveToCameraRoll(result.uri)

    this.handleImageResult(result)
  }

  handleImageResult = (result) => {
    this.setState({ image: result.uri })

    const block = {
      kind: {
        image_url: result.uri,
      },
    }

    this.close()
    navigationService.navigate('newImage', { block })
  }

  close = () =>
    closeModal()

  render() {
    return (
      <BackgroundFill>
        <MenuButtonGroup>
          <MenuButton onPress={this.newChannel} icon={ICONS.add}>
            New channel
          </MenuButton>

          <HorizontalRule />

          <MenuButton onPress={this.enterText} icon={ICONS.text}>
            New text block
          </MenuButton>

          <HorizontalRule />

          <MenuButton onPress={this.pasteLink} icon={ICONS.link}>
            Paste link
          </MenuButton>

          <HorizontalRule />

          <MenuButton onPress={this.uploadImage} icon={ICONS.image}>
            Upload image
          </MenuButton>

          <HorizontalRule />

          <MenuButton onPress={this.takePhoto} icon={ICONS.camera}>
            Take picture
          </MenuButton>
        </MenuButtonGroup>

        <CancelButtonGroup>
          <CancelButton onPress={this.close} icon={ICONS.cancel}>
            Cancel
          </CancelButton>
        </CancelButtonGroup>
      </BackgroundFill>
    )
  }
}

export default AddMenuOptions
