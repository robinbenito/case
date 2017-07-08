import React from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { ImagePicker } from 'expo'
import IconButton from "../../components/IconButton"
import ConnectScreen from "./components/ConnectScreen"

import layout from '../../constants/Layout'

export default class AddScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      image: null,
      text: null
    }
  }

  renderConnectScreen() {
    console.log('renderConnectScreen')
    const { text, image } = this.state
    return (
      <ConnectScreen image={image} text={text}/>
    )
  }

  renderMenu() {
    const showCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({});
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };

    const showPhotos = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({});
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };

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
    );
  }

  render() {
    const { text, image } = this.state
    const showConnect = text || image

    return showConnect ? this.renderConnectScreen() : this.renderMenu()
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    padding: layout.padding,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: (layout.padding * 4),
    alignItems: "center",
  }
});
