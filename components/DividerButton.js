import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import layout from '../constants/Layout'

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
})

export default class DividerButton extends React.Component {
  render() {
    const { buttonText, onPress } = this.props

    return (
      <View style={styles.buttonContainer}>
        <TouchableHighlight style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}


DividerButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}
