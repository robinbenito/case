import React from 'react'
import { DrawerNavigator } from 'react-navigation'

import StackModalNavigator from '../utilities/stackModalNavigator'
import LoggedOutScreen from '../screens/LoggedOutScreen'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import MainStack from './MainStack'
import NotificationsScreen from '../screens/NotificationsScreen'

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
}, {
  headerMode: 'screen',
  initialRouteName,
})
