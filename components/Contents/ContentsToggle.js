import React, { Component } from 'react';
import {
  SegmentedControlIOS
} from 'react-native';

import HTMLView from 'react-native-htmlview'

export default class ContentsToggle extends Component {
  render() {
    return (
      <SegmentedControlIOS 
        tintColor="#222" 
        values={['Channels', 'Blocks']} 
        selectedIndex={0}
        onValueChange={(value) => { this.props.onToggleChange(value) }}
      />
    );
  }
}