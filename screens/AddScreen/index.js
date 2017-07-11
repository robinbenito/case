import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

import { ImagePicker } from 'expo'
import { NavigationActions } from 'react-navigation'
import IconButton from '../../components/IconButton'

import layout from '../../constants/Layout'

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: layout.padding,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: (layout.padding * 4),
    alignItems: 'center',
  },
})


export default class AddScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      text: null,
    }
  }

  navigateToConnect() {
    const { text, image } = this.state

    const navigateAction = NavigationActions.navigate({
      routeName: 'connect',
      params: { text, image },
    })

    this.props.navigation.dispatch(navigateAction)
  }

  render() {
    const showCamera = async () => {
      const result = await ImagePicker.launchCameraAsync({})
      if (!result.cancelled) {
        this.setState({ image: result.uri })
        this.navigateToConnect()
      }
    }

    const showPhotos = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({})
      if (!result.cancelled) {
        this.setState({ image: result.uri })
        this.navigateToConnect()
      }
    }
    
    return (
      <View style={styles.menuContainer}>
        <IconButton
          iconName="ios-paper-outline"
          buttonText="Enter text"
        />
        <IconButton
          onPress={() => showCamera()}
          iconName="ios-camera-outline"
          buttonText="Take picture"
        />
        <IconButton
          onPress={() => showPhotos()}
          iconName="ios-photos-outline"
          buttonText="Choose from photos"
        />
      </View>
    )
  }
}

AddScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
}
