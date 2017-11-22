import Expo from 'expo'
import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { defer } from 'lodash'

import AddMenu from './components/AddMenu'
import Modal from './components/Modal'
import { dismissAlertsOnCurrentRoute } from './components/Alerts'

import createRootNavigator from './navigation/Routes'

import Store from './state/Store'
import { SET_CURRENT_ROUTE, SET_CURRENT_ABILITY } from './state/actions'
import Client from './state/Apollo'

import navigationService from './utilities/navigationService'
import cacheAssetsAsync from './utilities/cacheAssetsAsync'
import currentUserService from './utilities/currentUserService'
import { trackPage } from './utilities/analytics'

const logo = require('./assets/images/logo.png')
const searchIcon = require('./assets/images/searchIcon.png')

const AddMenuWithState = connect(({ routes, ability, ui }) => ({
  routes, ability, active: ui.isAddMenuActive,
}))(AddMenu)

const StatusBarWithState = connect(({ ui }) => ({
  hidden: (ui.isAddMenuActive || ui.isHeaderMenuActive),
}))(StatusBar)

const ModalWithState = connect(({ ui }) => ({
  ...ui.modal,
}))(Modal)

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

      Store.dispatch({ type: SET_CURRENT_ROUTE, currentRoute })

      defer(() => {
        // TODO: Is there a way around this deferral?
        // ChannelContainer#componentWillReceiveProps fires *after* a `back`
        // navigation is executed and the component should unload.
        // `onNavigationStateChange` executes *before* that happens, for whatever reason
        // causing the Channel's `can` ability to get set over our reset state.
        // Confusing.
        Store.dispatch({ type: SET_CURRENT_ABILITY, can: {} })
      })

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
      const initialRouteName = isLoggedIn ? 'main' : 'loggedOut'
      const Navigation = createRootNavigator(initialRouteName)

      Store.dispatch({
        type: SET_CURRENT_ROUTE,
        currentRoute: {
          routeName: initialRouteName,
        },
      })

      return (
        <ApolloProvider store={Store} client={Client}>
          <View style={StyleSheet.absoluteFill}>
            <StatusBarWithState />
            <Navigation
              onNavigationStateChange={this.onNavigationStateChange}
              ref={navigationService.setContainer}
            />
            <AddMenuWithState />
            <ModalWithState />
          </View>
        </ApolloProvider>
      )
    }

    return <Expo.AppLoading />
  }
}

Expo.registerRootComponent(AppContainer)
