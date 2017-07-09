import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import layout from '../constants/Layout'

const styles = StyleSheet.create({
  button: {
    height: 36,
    width: 300,
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: (layout.padding / 2),
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
})

export default class IconButton extends React.Component {
  render() {
    const { iconName, buttonText, onPress } = this.props

    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <View style={styles.buttonContainer}>
          <Ionicons
            name={iconName}
            size={18}
            color="black"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>{buttonText}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

