import React from 'react';
import {
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import { NavigationActions, withNavigation } from '@exponent/ex-navigation';
import Store from '../../state/Store';
import Router from '../../navigation/Router'
import { LoginWithData } from './components/LoginWithData';

@withNavigation
export default class LoginScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false
    }
  }

  _resetStack() {
    let navigatorUID = this.props.navigation.getCurrentNavigatorUID(); 
    Store.dispatch(NavigationActions.replace(navigatorUID, Router.getRoute("rootNavigation")));
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
        />
        <LoginWithData onLogin={this._resetStack.bind(this)} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    width: 100,
    height: 100,
  },
});