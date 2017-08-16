import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

import { ImagePicker } from 'expo'
import { NavigationActions } from 'react-navigation'

import IconButton from '../../components/IconButton'

import colors from '../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

class AddScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      text: null,
    }
    this.showCamera = this.showCamera.bind(this)
    this.showPhotos = this.showPhotos.bind(this)
    this.addText = this.addText.bind(this)
    this.addLink = this.addLink.bind(this)
    this.reset = this.reset.bind(this)
  }

  goBack() {
    this.props.navigation.navigate('home')
  }

  reset() {
    this.setState({
      image: null,
      text: null,
    })
  }

  addText() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'addText',
    })

    this.props.navigation.dispatch(navigateAction)
  }

  addLink() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'addLink',
    })

    this.props.navigation.dispatch(navigateAction)
  }

  navigateToConnect() {
    const { text, image } = this.state

    const navigateAction = NavigationActions.navigate({
      routeName: 'connect',
      params: { text, image },
    })

    this.props.navigation.dispatch(navigateAction)
  }

  async showCamera() {
    const result = await ImagePicker.launchCameraAsync({})
    if (!result.cancelled) {
      this.setState({ image: result.uri })
      this.navigateToConnect()
    }
  }

  async showPhotos() {
    const result = await ImagePicker.launchImageLibraryAsync({})
    if (!result.cancelled) {
      this.setState({ image: result.uri })
      this.navigateToConnect()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <IconButton
          onPress={this.addText}
          iconName="ios-paper-outline"
          buttonText="Add text"
        />
        <IconButton
          onPress={this.addLink}
          iconName="ios-link-outline"
          buttonText="Add link"
        />
        <IconButton
          onPress={this.showPhotos}
          iconName="ios-photos-outline"
          buttonText="Choose from photos"
        />
        <IconButton
          onPress={this.showCamera}
          iconName="ios-camera-outline"
          buttonText="Take picture"
        />
      </View>
    )
  }
}

AddScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
}

export default AddScreen
