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
import type from '../constants/Type'

const styles = StyleSheet.create({
  button: {
    width: 300,
    borderColor: '#000',
    borderWidth: 1,
    marginTop: layout.padding,
    marginBottom: layout.padding,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.padding * 2,
    paddingVertical: layout.padding,
    borderRadius: layout.padding / 4,
  },
  buttonIcon: {
    marginRight: layout.padding,
  },
  buttonText: {
    fontSize: type.sizes.medium,
    fontWeight: type.weights.semibold,
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
            size={24}
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
  onPress: PropTypes.func,
}

IconButton.defaultProps = {
  onPress: () => null,
}
