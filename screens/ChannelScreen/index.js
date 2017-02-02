import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native';

import BackButton from '../../components/BackButton'
import { ChannelContainerWithData } from './components/ChannelContainer';

export default class ChannelScreen extends React.Component {
  static route = {
    navigationBar: {
      title: "",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      renderLeft: () => { return (<BackButton />) }
    }
  }

  render() {
    return (
      <ChannelContainerWithData id={this.props.id} />
    )
  }
}