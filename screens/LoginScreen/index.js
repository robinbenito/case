import React from 'react'
import {
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'

import Store from '../../state/Store'
import { LoginWithData } from './components/LoginWithData'

import layout from '../../constants/Layout'

export default class LoginScreen extends React.Component {
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
    padding: layout.padding
  },
  logo: {
    width: 100,
    height: 100,
  },
});