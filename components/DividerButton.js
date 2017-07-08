import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import layout from '../constants/Layout';

export default class DividerButton extends React.Component {
  render() {
    const { buttonText, onPress } = this.props;

    return (
      <View style={styles.buttonContainer}>
        <TouchableHighlight style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderColor: '#000',
    borderTopWidth: 1,
    marginBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: layout.padding,
  },
  buttonIcon: {
    marginRight: (layout.padding / 2),
  },
  buttonText: {
    fontSize: 12,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
