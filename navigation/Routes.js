import React from 'react'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import { enhance } from 'react-navigation-addons'

import StackModalNavigator from '../utilities/stackModalNavigator'
import LoggedOutScreen from '../screens/LoggedOutScreen'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import MainStack from './MainStack'
import NotificationsScreen from '../screens/NotificationsScreen'
import SearchStack from './SearchStack'
import AddTextScreen from '../screens/AddTextScreen'
import AddImageScreen from '../screens/AddImageScreen'
import AddLinkScreen from '../screens/AddLinkScreen'
import AddConnectionsScreen from '../screens/AddConnectionScreen'

import headerNavigationOptions from '../constants/Header'

const MainStackWithDrawer = DrawerNavigator({
  feed: {
    screen: MainStack,
  },
}, {
  contentComponent: () => (<NotificationsScreen />),
  header: null,
  drawerPosition: 'right',
  cardStack: {
    gesturesEnabled: false,
  },
})


export default initialRouteName => StackModalNavigator({
  loggedOut: {
    screen: LoggedOutScreen,
    navigationOptions: {
      header: null,
      cardStyle: {
        backgroundColor: 'white',
      },
    },
  },

  login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
      cardStyle: {
        backgroundColor: 'white',
      },
    },
  },

  signUp: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null,
      cardStyle: {
        backgroundColor: 'white',
      },
    },
  },

  main: {
    screen: MainStackWithDrawer,
    navigationOptions: {
      header: null,
      cardStyle: {
        backgroundColor: 'white',
      },
    },
  },

  search: {
    screen: SearchStack,
    navigationOptions: {
      header: null,
      cardStyle: {
        backgroundColor: 'white',
      },
    },
  },

  // TODO: Pull these onto the main stack
  newText: {
    screen: enhance(StackNavigator)({
      newText: { screen: AddTextScreen },
    }),
    navigationOptions: {
      ...headerNavigationOptions,
    },
  },

  newImage: {
    screen: enhance(StackNavigator)({
      newText: { screen: AddImageScreen },
    }),
    navigationOptions: {
      ...headerNavigationOptions,
    },
  },

  newLink: {
    screen: enhance(StackNavigator)({
      newLink: { screen: AddLinkScreen },
    }),
    navigationOptions: {
      ...headerNavigationOptions,
    },
  },

  connect: {
    screen: enhance(StackNavigator)({
      connect: {
        screen: AddConnectionsScreen,
        navigationOptions: {
          ...headerNavigationOptions,
        },
      },
    }),
  },
}, {
  headerMode: 'screen',
  initialRouteName,
})
