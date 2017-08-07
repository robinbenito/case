import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { keys } from 'lodash'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'

import layout from '../constants/Layout'
import color from '../constants/Colors'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.gray.border,
    padding: layout.padding,
  },
  textSelected: {
    fontWeight: 'bold',
  },
  tabSelected: {
    borderBottomColor: '#000',
  },
})

export default class TabToggle extends Component {
  render() {
    const options = {
      Channels: 'CHANNEL',
      Blocks: 'BLOCK',
    }
    const labelKeys = keys(options)
    const selectedSegment = this.props.selectedSegment

    const tabs = labelKeys.map((label) => {
      const isSelected = options[label] === selectedSegment
      const tabStyle = isSelected ? styles.tabSelected : {}
      const tabTextStyle = isSelected ? styles.textSelected : {}
      return (
        <TouchableWithoutFeedback key={label} onPress={() => this.props.onToggleChange(label)}>
          <View style={[styles.tab, tabStyle]}>
            <Text style={tabTextStyle}>
              {label}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )
    })

    return (
      <View style={styles.container}>
        {tabs}
      </View>
    )
  }
}

TabToggle.propTypes = {
  onToggleChange: PropTypes.func.isRequired,
  selectedSegment: PropTypes.string.isRequired,
}
