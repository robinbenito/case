import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import { ImagePicker } from 'expo'
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

  render() {
    const showCamera = async () => {
      const result = await ImagePicker.launchCameraAsync({})
      if (!result.cancelled) {
        this.setState({ image: result.uri })
      }
    }

    const showPhotos = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({})
      if (!result.cancelled) {
        this.setState({ image: result.uri })
      }
    }

    // const { text, image } = this.state

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
