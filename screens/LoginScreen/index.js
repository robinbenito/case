import React from 'react'
import {
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'
import PropTypes from 'prop-types'

import { NavigationActions } from 'react-navigation'
import LoginWithData from './components/LoginWithData'

const logo = require('../../assets/images/logo.png')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 50,
  },
})


export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.resetStack = this.resetStack.bind(this)
  }

  resetStack() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'main' }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          style={styles.logo}
          source={logo}
        />
        <LoginWithData onLogin={this.resetStack} />
      </KeyboardAvoidingView>
    )
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
}
