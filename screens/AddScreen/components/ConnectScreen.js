import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import { RecentConnectionsWithData } from "./RecentConnectionList"

import colors from '../../../constants/Colors'
import layout from '../../../constants/Layout'

export default class ConnectScreen extends React.Component {
  
  search(text) {
    console.log('hello', text)
  }

  render() {
    const { text, image } = this.props
    const { height, width } = Dimensions.get('window')

    const imageStyle = {
      width: width - (layout.padding * 2),
      height: width - (layout.padding * 2),
      resizeMode: 'contain',
      marginTop: (layout.padding / 2),
      borderWidth: 1,
      borderColor: colors.gray.border
    }

    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <ScrollView>
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
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: layout.padding,
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
    padding: (layout.padding / 2)
  }
});
