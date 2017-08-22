import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import layout from '../constants/Layout'
import type from '../constants/Type'
import colors from '../constants/Colors'

const styles = StyleSheet.create({
  container: {
    padding: layout.padding,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: type.sizes.subheadline,
    color: colors.gray.text,
  },
})

export default class Empty extends React.Component {
  render() {
    const { children, text } = this.props
    const content = children || (
      <Text style={styles.text}>{text}</Text>
    )

    return (
      <View style={styles.container}>
        {content}
      </View>
    )
  }
}

Empty.propTypes = {
  children: PropTypes.any,
  text: PropTypes.string,
}

Empty.defaultProps = {
  children: null,
  text: null,
}
