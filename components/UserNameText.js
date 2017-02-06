import React from 'react';
import Router from '../navigation/Router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';

@withNavigation
export default class UserNameText extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this._goToProfile}>
        <Text 
          style={[styles.text, this.props.style]} 
          onPress={this._goToProfile}>
            {this.props.user.name}
        </Text>
      </TouchableOpacity>
    )
  }

  _goToProfile = () => {
    this.props.navigator.push(Router.getRoute('profile', { id: this.props.user.slug }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
  text: {
    fontWeight: "bold"
  }
});