import Expo from 'expo';
import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';

import { GlobalNav } from './navigation/Routes'

import { ApolloProvider } from 'react-apollo';
import Store from './state/Store';
import Client from './state/Apollo';

import cacheAssetsAsync from './utilities/cacheAssetsAsync';

class AppContainer extends React.Component {
  state = {
    assetsLoaded: false,
    storageChecked: false,
  }

  componentWillMount() {
    this._loadAssetsAsync();
    this._checkLoginStateAsync();
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
          require('./assets/images/logo.png'),
        ],
      });
    } catch(e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({ assetsLoaded: true });
    }
  }

  async _checkLoginStateAsync() {
    try {
      const currentUser = await AsyncStorage.getItem('@arena:CurrentUser');
      this.setState({ loggedIn: currentUser !== null, storageChecked: true })
    } catch (e) {
      console.warn('Error fetching currentUser from localStorage', e)
      this.setState({ loggedIn: false, storageChecked: true });
    } 
  }

  render() {
    if (this.state.assetsLoaded && this.state.storageChecked) {
      return (
        <View style={styles.container}>
          <ApolloProvider store={Store} client={Client}>
            <GlobalNav/>
          </ApolloProvider>
        </View>
      );
    } else {
      return (
        <Expo.AppLoading />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

Expo.registerRootComponent(AppContainer);
