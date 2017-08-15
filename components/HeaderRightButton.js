import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'

import colors from '../constants/Colors'
import layout from '../constants/Layout'
import type from '../constants/Type'

const styles = StyleSheet.create({
  button: {
    paddingRight: layout.padding,
  },
  text: {
    color: colors.gray.text,
    fontSize: type.sizes.normal,
    fontWeight: 'bold',
  },
})

export default class HeaderRightButton extends React.Component {
  render() {
    const { text, onPress } = this.props

    return (
      <TouchableHighlight onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
    )
  }
}

HeaderRightButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

HeaderRightButton.defaultProps = {
  onPress: () => null,
}
