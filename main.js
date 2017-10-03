import Expo from 'expo'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { updateFocus } from 'react-navigation-is-focused-hoc'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import AddMenu from './components/AddMenu'
import createRootNavigator from './navigation/Routes'
import Store from './state/Store'
import { SET_CURRENT_ROUTE } from './state/actions'
import Client from './state/Apollo'
import NavigatorService from './utilities/navigationService'
import cacheAssetsAsync from './utilities/cacheAssetsAsync'
import CurrentUser from './utilities/currentUserService'

const logo = require('./assets/images/logo.png')

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

class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assetsLoaded: false,
      storageChecked: false,
    }
  }

  componentWillMount() {
    this.loadAssetsAsync()
    this.checkLoginStateAsync()
  }

  async loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
          logo,
        ],
      })
    } finally {
      this.setState({ assetsLoaded: true })
    }
  }

  async checkLoginStateAsync() {
    try {
      await Promise.all([
        CurrentUser.get(),
        Client.query({ query: gql`{ me { id } }` }), // Ping user to check to see if actually logged in
      ])

      this.setState({
        loggedIn: true,
        storageChecked: true,
      })
    } catch (err) {
      CurrentUser.clear()

      this.setState({
        loggedIn: false,
        storageChecked: true,
      })
    }
  }

  render() {
    if (this.state.assetsLoaded && this.state.storageChecked) {
      const initialRouteName = this.state.loggedIn ? 'main' : 'loggedOut'
      const Navigation = createRootNavigator(initialRouteName)

      Store.dispatch({
        type: SET_CURRENT_ROUTE,
        current: initialRouteName,
      })

      return (
        <ApolloProvider store={Store} client={Client}>
          <View style={StyleSheet.absoluteFill}>
            <Navigation
              onNavigationStateChange={(prevState, currentState) => {
                Store.dispatch({
                  type: SET_CURRENT_ROUTE,
                  current: getCurrentRouteName(currentState),
                })
                updateFocus(currentState)
              }}
              ref={(navigatorRef) => {
                NavigatorService.setContainer(navigatorRef)
              }}
            />
            <AddMenuWithState />
          </View>
        </ApolloProvider>
      )
    }
    return (
      <Expo.AppLoading />
    )
  }
}

Expo.registerRootComponent(AppContainer)
