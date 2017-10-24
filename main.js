import Expo from 'expo'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import AddMenu from './components/AddMenu'

import createRootNavigator from './navigation/Routes'

import Store from './state/Store'
import { SET_CURRENT_ROUTE } from './state/actions'
import Client from './state/Apollo'

import navigationService from './utilities/navigationService'
import cacheAssetsAsync from './utilities/cacheAssetsAsync'
import currentUserService from './utilities/currentUserService'
import { trackPage } from './utilities/analytics'

import { dismissAlertsOnCurrentRoute } from './components/Alerts'

const logo = require('./assets/images/logo.png')
const searchIcon = require('./assets/images/searchIcon.png')

const getCurrentRouteName = (navigationState) => {
  if (!navigationState) return null

  const route = navigationState.routes[navigationState.index]

  // Dive into nested navigators
  if (route.routes) return getCurrentRouteName(route)

  return route.routeName
}

const AddMenuWithState = connect(({ routes, ui }) => ({
  routes,
  active: ui.isAddMenuActive,
}))(AddMenu)

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
    const currentScreen = getCurrentRouteName(currentState)
    const prevScreen = getCurrentRouteName(prevState)

    Store.dispatch({
      type: SET_CURRENT_ROUTE,
      current: currentScreen,
    })

    if (prevScreen !== currentScreen) {
      trackPage({ page: currentScreen })

      dismissAlertsOnCurrentRoute()
    }
  }

  async loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
          logo,
          searchIcon,
        ],
      })
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
      const initialRouteName = isLoggedIn ? 'main' : 'loggedOut'
      const Navigation = createRootNavigator(initialRouteName)

      Store.dispatch({
        type: SET_CURRENT_ROUTE,
        current: initialRouteName,
      })

      return (
        <ApolloProvider store={Store} client={Client}>
          <View style={StyleSheet.absoluteFill}>
            <Navigation
              onNavigationStateChange={this.onNavigationStateChange}
              ref={navigationService.setContainer}
            />
            <AddMenuWithState />
          </View>
        </ApolloProvider>
      )
    }

    return <Expo.AppLoading />
  }
}

Expo.registerRootComponent(AppContainer)
