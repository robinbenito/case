import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ImagePicker } from 'expo'
import { CameraRoll, View } from 'react-native'
import { Border, Typography, Units, Colors } from '../../constants/Style'
import { AbsoluteFill, BlurredAbsoluteFill, HorizontalRule } from '../UI/Layout'
import Store from '../../state/Store'
import { TOGGLE_ADD_MENU } from '../../state/actions'
import NavigationService from '../../utilities/navigationService'
import AddButton from './AddButton'

const addIcon = require('./icons/add.png')
const textIcon = require('./icons/text.png')
const linkIcon = require('./icons/link.png')
const imageIcon = require('./icons/image.png')
const cameraIcon = require('./icons/camera.png')

const ADD_MENU_ROUTE_WHITELIST = [
  'main',
  'feed',
  'channel',
  'profile',
]

const AddModal = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${({ active }) => (active ? '100%' : 100)};
  height: ${({ active }) => (active ? '100%' : 100)};
  align-items: center;
  justify-content: center;
`

const BackgroundFill = styled(AbsoluteFill)`
  padding-horizontal: ${Units.base};
  justify-content: flex-end;
`

const Menu = styled.View`
  width: 100%;
  border-color: black;
  border-radius: ${Border.borderRadius};
  border-width: 1;
  background-color: white;
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

const ITEM_LINE_HEIGHT = 48

const Item = styled.TouchableOpacity`
  padding-horizontal: ${Units.scale[3]};
  flex-direction: row;
  align-items: center;
  height: ${ITEM_LINE_HEIGHT};
`

const Icon = styled.Image`
  margin-top: 1;
  width: 25;
  height: 25;
  align-self: center;
  margin-right: ${Units.scale[3]};
`

const ItemText = styled.Text`
  font-size: ${Typography.fontSize.smedium};
  font-weight: ${Typography.fontWeight.medium};
  color: ${Colors.semantic.text};
`

export default class AddMenu extends Component {
  newChannel = () => {
    Store.dispatch({ type: TOGGLE_ADD_MENU })
    NavigationService.navigate('newChannel')
  }

  enterText = () => {
    Store.dispatch({ type: TOGGLE_ADD_MENU })
    NavigationService.navigate('newText')
  }

  pasteLink = () => {
    Store.dispatch({ type: TOGGLE_ADD_MENU })
    NavigationService.navigate('newLink')
  }

  uploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({})

    if (result.cancelled) return

    this.setState({ image: result.uri })
    const block = { kind: { image_url: result.uri }, title: result.uri.split('/').pop() }
    Store.dispatch({ type: TOGGLE_ADD_MENU })
    NavigationService.navigate('newImage', { block })
  }

  takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({})

    if (result.cancelled) return

    CameraRoll.saveToCameraRoll(result.uri)
    this.setState({ image: result.uri })
    const block = { kind: { image_url: result.uri }, title: result.uri.split('/').pop() }
    Store.dispatch({ type: TOGGLE_ADD_MENU })
    NavigationService.navigate('newImage', { block })
  }

  toggleAddMenu = () => {
    Store.dispatch({ type: TOGGLE_ADD_MENU })
  }

  render() {
    const { active, routes: { current } } = this.props

    if (ADD_MENU_ROUTE_WHITELIST.includes(current)) {
      return (
        <AddModal
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

              <Menu>
                <Item onPress={this.newChannel}>
                  <Icon source={addIcon} />
                  <ItemText>New channel</ItemText>
                </Item>

                <HorizontalRule />

                <Item onPress={this.enterText}>
                  <Icon source={textIcon} />
                  <ItemText>Enter text</ItemText>
                </Item>

                <Item onPress={this.pasteLink}>
                  <Icon source={linkIcon} />
                  <ItemText>Paste link</ItemText>
                </Item>

                <Item onPress={this.uploadImage}>
                  <Icon source={imageIcon} />
                  <ItemText>Upload image</ItemText>
                </Item>

                <Item onPress={this.takePhoto}>
                  <Icon source={cameraIcon} />
                  <ItemText>Take photo</ItemText>
                </Item>
              </Menu>

              <Cancel>Cancel</Cancel>
            </BackgroundFill>
          }
        </AddModal>
      )
    }

    return <View />
  }
}

AddMenu.propTypes = {
  active: PropTypes.bool.isRequired,
  routes: PropTypes.shape({
    current: PropTypes.string,
  }).isRequired,
}

AddMenu.defaultProps = {
  routes: {},
}
