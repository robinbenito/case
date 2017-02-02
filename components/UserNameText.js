import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';

@withNavigation
export default class UserNameText extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this._goToProfile}>
        <Text onPress={this._goToProfile}>{this.props.user.name}</Text>
      </TouchableOpacity>
    )
  }

  _goToProfile = () => {
    if (this.props.navigator.getCurrentIndex() > 0) {
      this.props.navigator.pop();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
});