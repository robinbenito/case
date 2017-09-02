import React from 'react'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import {
  StyleSheet,
} from 'react-native'

import colors from '../constants/Colors'
import layout from '../constants/Layout'

const styles = StyleSheet.create({
  icon: {
    marginLeft: layout.padding,
  },
})

export default class BlockItemIcon extends React.Component {
  render() {
    const { block: { kind: { __typename: type } }, size, color } = this.props
    const iconName = {
      Link: 'ios-link',
      Embed: 'ios-play',
      Attachment: 'ios-paper-outline',
    }[type]
    if (!iconName) { return null }
    return (
      <Ionicons name={iconName} size={size} color={color} style={styles.icon} />
    )
  }
}

BlockItemIcon.propTypes = {
  block: PropTypes.any.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
}

BlockItemIcon.defaultProps = {
  size: 10,
  color: colors.gray.text,
}
