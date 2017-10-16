import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ImagePicker } from 'expo'
import { CameraRoll, View } from 'react-native'
import { Border, Typography, Units, Colors } from '../../constants/Style'
import { AbsoluteFill, BlurredAbsoluteFill, HorizontalRule } from '../UI/Layout'
import { BaseIcon } from '../UI/Icons'
import Store from '../../state/Store'
import { TOGGLE_ADD_MENU } from '../../state/actions'
import NavigationService from '../../utilities/navigationService'
import AddButton from './AddButton'

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

const Item = styled.TouchableOpacity`
  padding-horizontal: ${Units.scale[2]};
  flex-direction: row;
  align-items: center;
`

const ITEM_LINE_HEIGHT = 48

const ItemIcon = styled(BaseIcon)`
  font-size: 30;
  width: ${ITEM_LINE_HEIGHT};
  line-height: ${ITEM_LINE_HEIGHT};
  margin-right: ${Units.scale[2]};
  text-align: center;
  bottom: -0.5;
  background-color: transparent;
`

const ItemText = styled.Text`
  font-size: ${Typography.fontSize.smedium};
  font-weight: ${Typography.fontWeight.medium};
  color: ${Colors.semantic.text};
`

export default class AddMenu extends Component {
  newChannel = () => {
    NavigationService.navigate('newChannel')
  }

  enterText = () => {
    NavigationService.navigate('newText')
  }

  pasteLink = () => {
    NavigationService.navigate('newLink')
  }

  uploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({})

    if (result.cancelled) return

    this.setState({ image: result.uri })
    const block = { kind: { image_url: result.uri }, title: result.uri.split('/').pop() }
    NavigationService.navigate('newImage', { block })
  }

  takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({})

    if (result.cancelled) return

    CameraRoll.saveToCameraRoll(result.uri)
    this.setState({ image: result.uri })
    const block = { kind: { image_url: result.uri }, title: result.uri.split('/').pop() }
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
                  <ItemIcon name="ios-add" />
                  <ItemText>New channel</ItemText>
                </Item>

                <HorizontalRule />

                <Item onPress={this.enterText}>
                  <ItemIcon name="ios-create-outline" />
                  <ItemText>Enter text</ItemText>
                </Item>

                <Item onPress={this.pasteLink}>
                  <ItemIcon name="ios-link-outline" />
                  <ItemText>Paste link</ItemText>
                </Item>

                <Item onPress={this.uploadImage}>
                  <ItemIcon name="ios-image-outline" />
                  <ItemText>Upload image</ItemText>
                </Item>

                <Item onPress={this.takePhoto}>
                  <ItemIcon name="ios-camera-outline" />
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
