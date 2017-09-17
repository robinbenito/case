import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import colors from '../constants/Colors'
import layout from '../constants/Layout'
import type from '../constants/Type'

const styles = StyleSheet.create({
  button: {
    paddingRight: layout.padding,
    paddingHorizontal: layout.padding,
  },
  text: {
    color: colors.gray.text,
    fontSize: type.sizes.normal,
    fontWeight: 'bold',
  },
})

export default class HeaderRightButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSaving: false,
    }
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    if (this.state.isSaving) return false
    this.setState({ isSaving: true })
    return this.props.onPress()
  }

  render() {
    const { text } = this.props

    return (
      <TouchableOpacity onPress={this.onPress} style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
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
