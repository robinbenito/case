import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { values, keys } from 'lodash'
import { SegmentedControlIOS } from 'react-native'

export default class ContentsToggle extends Component {
  render() {
    const options = {
      Channels: 'CHANNEL',
      Blocks: 'BLOCK',
    }
    const labelKeys = keys(options)
    const selectedSegment = this.props.selectedSegment

    const optionValues = values(options)
    const selectedIndex = optionValues.findIndex(value => value === selectedSegment)

    return (
      <SegmentedControlIOS
        tintColor="#000"
        values={labelKeys}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          this.setState({
            selectedIndex: event.nativeEvent.selectedSegmentIndex,
          })
        }}
        onValueChange={this.props.onToggleChange}
      />
    )
  }
}

ContentsToggle.propTypes = {
  onToggleChange: PropTypes.func.isRequired,
  selectedSegment: PropTypes.string.isRequired,
}
