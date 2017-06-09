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
import { Ionicons } from '@expo/vector-icons';

import IconButton from "../../components/IconButton"

export default class CameraScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  constructor (props) {
    super(props)
    this.state = {
      image: null
    }
  }

  render() {
    
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

    let { image } = this.state;

    return (
      <View style={styles.container}>
        <IconButton 
          onPress={() => showCamera()} 
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
        {image &&
          <Image 
            source={{ uri: image }}
            style={{ width: 200, height: 200 }} 
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20
  },
  contentContainer: {
    paddingTop: 80,
    alignItems: "center"
  }
});
