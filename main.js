import Expo from 'expo'
import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import Modal from './components/Modal'
import { dismissAlertsOnCurrentRoute } from './components/Alerts'

import createRootNavigator from './navigation/Routes'

import Store from './state/Store'
import Client from './state/Apollo'

import navigationService from './utilities/navigationService'
import cacheAssetsAsync from './utilities/cacheAssetsAsync'
import currentUserService from './utilities/currentUserService'
import { trackPage } from './utilities/analytics'

import cachedAssets from './cachedAssets'

const StatusBarWithState = connect(({ ui: { modal: { active } } }) => ({
  hidden: active,
}))(StatusBar)

class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAssetsLoaded: false,
      isStorageChecked: false,
    }
  }

  componentWillMount() {
    this.loadAssetsAsync()
    this.checkLoginStateAsync()
  }

  onNavigationStateChange = (prevState, currentState) => {
    const currentRoute = navigationService.getCurrentRoute(currentState)
    const prevRoute = navigationService.getCurrentRoute(prevState)

    if (prevRoute.routeName !== currentRoute.routeName) {
      trackPage({ page: currentRoute.routeName })

      dismissAlertsOnCurrentRoute()
    }
  }

  async loadAssetsAsync() {
    try {
      await cacheAssetsAsync(cachedAssets)
    } finally {
      this.setState({ isAssetsLoaded: true })
    }
  }

  async checkLoginStateAsync() {
    try {
      await Promise.all([
        currentUserService.get(),
        Client.query({ query: gql`{ me { id } }` }), // Ping user to check to see if actually logged in
      ])

      this.setState({
        isLoggedIn: true,
        isStorageChecked: true,
      })
    } catch (err) {
      // TODO: Log only in dev mode?
      // `console.error` causes a red screen
      console.log('checkLoginStateAsync', err)

      currentUserService.clear()

      this.setState({
        isLoggedIn: false,
        isStorageChecked: true,
      })
    }
  }

  render() {
    const { isAssetsLoaded, isStorageChecked, isLoggedIn } = this.state

    if (isAssetsLoaded && isStorageChecked) {
      const initialRouteName = isLoggedIn ? 'feed' : 'loggedOut'
      const Navigation = createRootNavigator(initialRouteName)

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

Expo.registerRootComponent(AppContainer)
