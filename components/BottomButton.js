import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, StyleSheet, Text, TouchableHighlight } from 'react-native'

import colors from '../constants/Colors'
import type from '../constants/Type'

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: colors.gray.border,
    backgroundColor: '#fff',
    height: 60,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: type.sizes.headline,
    fontWeight: 'bold',
  },
})

export default class BottomButton extends React.Component {
  render() {
    const { text, onPress } = this.props
    const { width } = Dimensions.get('window')

    return (
      <TouchableHighlight onPress={onPress} style={[styles.button, { width }]}>
        <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
    )
  }
}

BottomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

BottomButton.defaultProps = {
  onPress: () => null,
}
