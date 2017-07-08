import React, { Component } from 'react';
import {
  SegmentedControlIOS,
} from 'react-native';

export default class ContentsToggle extends Component {
  render() {
    const values = ['Channels', 'Blocks'];
    const selectedSegment = this.props.selectedSegment;
    const selectedIndex = values.findIndex(value => value == selectedSegment);

    return (
      <SegmentedControlIOS
        tintColor="#000"
        values={values}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
        }}
        onValueChange={this.props.onToggleChange}
      />
    );
  }
}
