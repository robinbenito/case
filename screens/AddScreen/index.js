import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

import { ImagePicker } from 'expo'
import { NavigationActions } from 'react-navigation'

import IconButton from '../../components/IconButton'

const styles = StyleSheet.create({
  container: {
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
    }
    this.showCamera = this.showCamera.bind(this)
    this.showPhotos = this.showPhotos.bind(this)
    this.navigate = this.navigate.bind(this)
    this.reset = this.reset.bind(this)
  }

  goBack() {
    this.props.navigation.navigate('home')
  }

  reset() {
    this.setState({
      image: null,
    })
  }

  navigate(routeName) {
    const navigateAction = NavigationActions.navigate({
      routeName,
    })

    this.props.navigation.dispatch(navigateAction)
  }

  navigateToConnect() {
    const { image } = this.state

    const navigateAction = NavigationActions.navigate({
      routeName: 'connect',
      params: { image },
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
          onPress={() => this.navigate('newChannel')}
          iconName="ios-square-outline"
          buttonText="New channel"
        />
        <IconButton
          onPress={() => this.navigate('addText')}
          iconName="ios-paper-outline"
          buttonText="New text"
        />
        <IconButton
          onPress={() => this.navigate('addLink')}
          iconName="ios-link-outline"
          buttonText="New link"
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
