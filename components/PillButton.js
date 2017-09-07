import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import { Border, Typography, Units } from '../constants/Style'

const styles = StyleSheet.create({
  pill: {
    width: '50%',
    marginHorizontal: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Units.base * 2,
    paddingVertical: Units.base,
    ...Border,
  },
  label: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
})

const PillButton = props => (
  <TouchableHighlight
    style={styles.pill}
    underlayColor={Border.borderColor}
    onPress={props.onPress}
  >
    <Text style={styles.label}>
      {props.children}
    </Text>
  </TouchableHighlight>
)

PillButton.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node.isRequired,
}

PillButton.defaultProps = {
  onPress: () => null,
}

export default PillButton
