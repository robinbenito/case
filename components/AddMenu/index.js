import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ImagePicker } from 'expo'
import { CameraRoll, View } from 'react-native'

import AddButton from './AddButton'
import MenuButtonGroup from '../Menu/MenuButtonGroup'
import { MenuButtonHitArea, MenuButtonLabel, MenuButtonIcon } from '../Menu/MenuButton'
import {
  TouchableFill,
  AbsoluteFill,
  BlurredAbsoluteFill,
  HorizontalRule,
} from '../UI/Layout'

import Store from '../../state/Store'
import { TOGGLE_ADD_MENU, CLOSE_ADD_MENU } from '../../state/actions'

import navigationService from '../../utilities/navigationService'

import { Typography, Units, Colors } from '../../constants/Style'

const addIcon = require('./icons/add.png')
const textIcon = require('./icons/text.png')
const linkIcon = require('./icons/link.png')
const imageIcon = require('./icons/image.png')
const cameraIcon = require('./icons/camera.png')

const ADD_MENU_ROUTE_WHITELIST = [
  'feed',
  'channel',
  'profile',
]

const BackgroundFill = styled(AbsoluteFill)`
  padding-horizontal: ${Units.base};
  justify-content: flex-end;
`

const Cancel = styled.Text`
  align-self: center;
  padding-vertical: ${Units.base};
  margin-vertical: ${Units.scale[2]};
  font-size: ${Typography.fontSize.medium};
  font-weight: ${Typography.fontWeight.normal};
  color: ${Colors.state.alert};
  background-color: transparent;
`

export default class AddMenu extends Component {
  newChannel = () => {
    this.closeAddMenu()
    navigationService.navigate('newChannel')
  }

  enterText = () => {
    this.closeAddMenu()
    navigationService.navigate('newText')
  }

  pasteLink = () => {
    this.closeAddMenu()
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

    this.closeAddMenu()

    navigationService.navigate('newImage', { block })
  }

  closeAddMenu = () =>
    Store.dispatch({ type: CLOSE_ADD_MENU })

  toggleAddMenu = () =>
    Store.dispatch({ type: TOGGLE_ADD_MENU })

  render() {
    const { active, routes: { currentRoute: { routeName } } } = this.props

    if (!ADD_MENU_ROUTE_WHITELIST.includes(routeName)) return <View />

    return (
      <TouchableFill
        activeOpacity={1}
        active={active}
        onPress={this.toggleAddMenu}
      >
        {!active &&
          <AddButton
            active={active}
            onPress={this.toggleAddMenu}
          />
        }

        {active &&
          <BackgroundFill>
            <BlurredAbsoluteFill />

            <MenuButtonGroup>
              <MenuButtonHitArea onPress={this.newChannel}>
                <MenuButtonIcon source={addIcon} />
                <MenuButtonLabel>
                  New channel
                </MenuButtonLabel>
              </MenuButtonHitArea>

              <HorizontalRule />

              <MenuButtonHitArea onPress={this.enterText}>
                <MenuButtonIcon source={textIcon} />
                <MenuButtonLabel>
                  Enter text
                </MenuButtonLabel>
              </MenuButtonHitArea>

              <MenuButtonHitArea onPress={this.pasteLink}>
                <MenuButtonIcon source={linkIcon} />
                <MenuButtonLabel>
                  Paste link
                </MenuButtonLabel>
              </MenuButtonHitArea>

              <MenuButtonHitArea onPress={this.uploadImage}>
                <MenuButtonIcon source={imageIcon} />
                <MenuButtonLabel>
                  Upload image
                </MenuButtonLabel>
              </MenuButtonHitArea>

              <MenuButtonHitArea onPress={this.takePhoto}>
                <MenuButtonIcon source={cameraIcon} />
                <MenuButtonLabel>
                  Take photo
                </MenuButtonLabel>
              </MenuButtonHitArea>
            </MenuButtonGroup>

            <Cancel>Cancel</Cancel>
          </BackgroundFill>
        }
      </TouchableFill>
    )
  }
}

AddMenu.propTypes = {
  active: PropTypes.bool.isRequired,
  routes: PropTypes.shape({
    currentRoute: PropTypes.shape({
      routeName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

AddMenu.defaultProps = {
  routes: {
    currentRoute: {},
  },
}
