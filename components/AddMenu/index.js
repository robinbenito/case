import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ImagePicker } from 'expo'
import { CameraRoll, View, Text } from 'react-native'
import { connect } from 'react-redux'

import AddButton from './AddButton'
import MenuButtonGroup from '../Menu/MenuButtonGroup'
import MenuButton from '../Menu/MenuButton'

import {
  TouchableFill,
  AbsoluteFill,
  BlurredAbsoluteFill,
  HorizontalRule,
} from '../UI/Layout'

import Store from '../../state/Store'
import { TOGGLE_ADD_MENU, CLOSE_ADD_MENU } from '../../state/actions'

import navigationService from '../../utilities/navigationService'

import { Border, Colors, Units } from '../../constants/Style'

const addIcon = require('./icons/add.png')
const textIcon = require('./icons/text.png')
const linkIcon = require('./icons/link.png')
const imageIcon = require('./icons/image.png')
const cameraIcon = require('./icons/camera.png')
const cancelIcon = require('./icons/cancel.png')

const ADD_MENU_ROUTE_WHITELIST = [
  'feed',
  'channel',
  'profile',
]

const INACTIVE_HEIGHT = AddButton.height + (Units.scale[2] * 2)

const CancelButtonGroup = styled(MenuButtonGroup)`
  margin-vertical: ${Units.scale[2]};
  border-width: 0;
`

const CancelButton = styled(MenuButton)`
  border-color: ${Colors.gray.semiBold};
  border-width: 1;
  border-radius: ${Border.borderRadius}
`

const BackgroundFill = styled(AbsoluteFill)`
  padding-horizontal: ${Units.base};
  justify-content: flex-end;
`

class AddMenu extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    routes: PropTypes.shape({
      currentRoute: PropTypes.shape({
        routeName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    routes: {
      currentRoute: {},
    },
  }

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
        inactiveWidth="100%"
        inactiveHeight={INACTIVE_HEIGHT}
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
              <MenuButton
                onPress={this.newChannel}
                icon={addIcon}
              >
                New channel
              </MenuButton>

              <HorizontalRule />

              <MenuButton
                onPress={this.enterText}
                icon={textIcon}
              >
                New text block
              </MenuButton>

              <HorizontalRule />

              <MenuButton
                onPress={this.pasteLink}
                icon={linkIcon}
              >
                Paste link
              </MenuButton>

              <HorizontalRule />

              <MenuButton
                onPress={this.uploadImage}
                icon={imageIcon}
              >
                Upload image
              </MenuButton>

              <HorizontalRule />

              <MenuButton
                onPress={this.takePhoto}
                icon={cameraIcon}
              >
                Take picture
              </MenuButton>
            </MenuButtonGroup>

            <CancelButtonGroup>
              <CancelButton
                onPress={this.toggleAddMenu}
                icon={cancelIcon}
              >
                <Text style={{ color: Colors.gray.semiBold }}>
                  Cancel
                </Text>
              </CancelButton>
            </CancelButtonGroup>
          </BackgroundFill>
        }
      </TouchableFill>
    )
  }
}

export default connect(({ routes, ui }) => ({
  routes, active: ui.isAddMenuActive,
}))(AddMenu)
