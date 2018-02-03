import Expo from 'expo'
import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import userDefaults from 'react-native-user-defaults'

import Modal from './components/Modal'
import { dismissAlertsOnCurrentRoute } from './components/Alerts'

import createRootNavigator from './navigation/Routes'

import Store from './state/Store'
import Client from './state/Apollo'
import config from './config'

import navigationService from './utilities/navigationService'
import cacheAssetsAsync from './utilities/cacheAssetsAsync'
import currentUserService from './utilities/currentUserService'
import { trackPage } from './utilities/analytics'
import navigateOnce from './utilities/navigateOnce'

import cachedAssets from './cachedAssets'

const StatusBarWithState = connect(({ ui: { modal: { active } } }) => ({
  hidden: active,
}))(StatusBar)

export default class AppContainer extends Component {
  state = {
    isAssetsLoaded: false,
    isReady: false,
  }

  async componentWillMount() {
    try {
      await Promise.all([
        this.loadAssetsAsync(),
        this.checkLoginStateAsync(),
      ])
    } finally {
      this.setState({ isReady: true })
    }
  }

  onNavigationStateChange = (prevState, currentState) => {
    const currentRoute = navigationService.getCurrentRoute(currentState)
    const prevRoute = navigationService.getCurrentRoute(prevState)

    if (prevRoute.routeName !== currentRoute.routeName) {
      trackPage({ page: currentRoute.routeName })

      dismissAlertsOnCurrentRoute()
    }
  }

  getInitialRoute = () =>
    (this.state.isLoggedIn ? 'feed' : 'loggedOut')

  async loadAssetsAsync() {
    try {
      await cacheAssetsAsync(cachedAssets)
    } finally {
      this.setState({ isAssetsLoaded: true })
    }
  }

  async checkLoginStateAsync() {
    try {
      const [user] = await Promise.all([
        currentUserService.get(),
        Client.query({ query: gql`{ me { id } }` }), // Ping user to check to see if actually logged in
      ])

      this.setState({ isLoggedIn: true })
      userDefaults.set('authToken', user.authentication_token, 'group.com.AddtoArena').then(data => console.log('token success'))
      userDefaults.set('appToken', config.X_APP_TOKEN, 'group.com.AddtoArena').then(data => console.log(data))
    } catch (err) {
      // TODO: Log only in dev mode?
      // `console.error` causes a red screen
      console.log('checkLoginStateAsync', err)

      currentUserService.clear()

      this.setState({ isLoggedIn: false })
    }
  }

  render() {
    if (this.state.isReady) {
      const Navigation = createRootNavigator(this.getInitialRoute())
      Navigation.router.getStateForAction = navigateOnce(Navigation.router.getStateForAction)

      return (
        <ApolloProvider store={Store} client={Client}>
          <View style={StyleSheet.absoluteFill}>
            <StatusBarWithState />

            <Navigation
              onNavigationStateChange={this.onNavigationStateChange}
              ref={navigationService.setContainer}
            />
            <Modal />
          </View>
        </ApolloProvider>
      )
    }

    return <Expo.AppLoading />
  }
}

console.ignoredYellowBox = [
  'Header.HEIGHT is deprecated and will be removed before react-navigation comes out of beta',
]
