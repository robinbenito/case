import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import { RecentConnectionsWithData } from "./RecentConnectionList"

const PADDING = 20

export default class ConnectScreen extends React.Component {
  
  search(text) {
    console.log('hello', text)
  }

  render() {
    const { text, image } = this.props
    const { height, width } = Dimensions.get('window')

    const imageStyle = {
      width: width - (PADDING * 2),
      height: width - (PADDING * 2),
      resizeMode: 'contain',
      marginTop: 10
    }

    return (
      <ScrollView style={styles.container}>
        <Image 
          source={{ uri: image }}
          style={imageStyle} 
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.search(text)}
        />
        <Text style={styles.label}>Recent channels</Text>
        <RecentConnectionsWithData />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING,
  },
  label: {
    fontSize: 12,
    color: '#222',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderRadius: 0.125,
    fontSize: 12,
    backgroundColor: '#f7f7f7',
    color: '#585858',
    borderColor: '#cbcbcb',
    borderWidth: 1,
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    padding: 10
  }
});
