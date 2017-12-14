import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, CameraRoll } from 'react-native'
import { ImagePicker } from 'expo'
import styled from 'styled-components/native'

import { AbsoluteFill, HorizontalRule } from '../UI/Layout'
import { Color } from '../UI/Texts'
import MenuButtonGroup from '../Menu/MenuButtonGroup'
import MenuButton from '../Menu/MenuButton'
import { closeModal } from '../Modal'
import Header from '../Header'

import { Border, Colors, Typography, Units } from '../../constants/Style'

import navigationService from '../../utilities/navigationService'

import ICONS from './icons'

const ContextualHint = styled.View`
  height: ${Header.HEIGHT};
  padding-top: ${Units.statusBarHeight};
  margin-horizontal: ${Units.base};
  justify-content: center;
`

const Hint = styled.Text`
  font-size: ${Typography.fontSize.smedium};
  font-weight: ${Typography.fontWeight.semiBold};
  color: ${Colors.semantic.label.default};
  background-color: transparent;
  text-align: center;
`

const Menu = styled.View`
  width: 100%;
`

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

const Container = styled(AbsoluteFill)`
  padding-horizontal: ${Units.base};
  justify-content: space-between;
`

class AddMenuOptions extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    newChannel: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    title: 'Are.na',
    color: null,
  }

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
    const { title, color, newChannel } = this.props

    return (
      <Container>
        <ContextualHint>
          <Hint>
            Add to <Color color={color}>{title}</Color>:
          </Hint>
        </ContextualHint>

        <Menu>
          <MenuButtonGroup>
            {newChannel &&
              <View>
                <MenuButton onPress={this.newChannel} icon={ICONS.add}>
                  New channel
                </MenuButton>

                <HorizontalRule />
              </View>
            }

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
        </Menu>
      </Container>
    )
  }
}

export default AddMenuOptions
