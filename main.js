import Expo from 'expo'
import React from 'react'
import {
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native'
import { ApolloProvider } from 'react-apollo'

import { createRootNavigator } from './navigation/Routes'

import Store from './state/Store'
import Client from './state/Apollo'

import NavigatorService from './utilities/navigationService'
import cacheAssetsAsync from './utilities/cacheAssetsAsync'

const logo = require('./assets/images/logo.png')

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

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
      const currentUser = await AsyncStorage.getItem('@arena:CurrentUser')
      this.setState({ loggedIn: currentUser !== null, storageChecked: true })
    } catch (e) {
      this.setState({ loggedIn: false, storageChecked: true })
    }
  }

  render() {
    if (this.state.assetsLoaded && this.state.storageChecked) {
      const Navigation = createRootNavigator(this.state.loggedIn)
      return (
        <View style={styles.container}>
          <ApolloProvider store={Store} client={Client}>
            <Navigation
              ref={(navigatorRef) => {
                NavigatorService.setContainer(navigatorRef)
              }}
            />
          </ApolloProvider>
        </View>
      )
    }
    return (
      <Expo.AppLoading />
    )
  }
}

Expo.registerRootComponent(AppContainer)
