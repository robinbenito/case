import React from 'react'
import {
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'

import { NavigationActions } from 'react-navigation'
import Store from '../../state/Store'
import { LoginWithData } from './components/LoginWithData'

import layout from '../../constants/Layout'

export default class LoginScreen extends React.Component {
  _resetStack() {
    NavigationActions.init()
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'main' }),
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    console.log('rendering login')
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
    padding: 20,
    backgroundColor: '#fff'
  },
  logo: {
    width: 100,
    height: 100,
  },
});