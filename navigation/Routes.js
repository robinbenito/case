import React from 'react'
import { DrawerNavigator } from 'react-navigation'
import StackModalNavigator from '../utilities/stackModalNavigator'
import LoggedOutScreen from '../screens/LoggedOutScreen'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import MainStack from './MainStack'
import NotificationsScreen from '../screens/NotificationsScreen'
import SearchStack from './SearchStack'
import NewChannelStack from './NewChannelStack'
import AddTextScreen from '../screens/AddTextScreen'
import AddLinkScreen from '../screens/AddLinkScreen'
import AddConnectionsScreen from '../screens/AddConnectionScreen'

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


export default (loggedIn = false) => StackModalNavigator({
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
  newChannel: {
    screen: NewChannelStack,
    navigationOptions: {
      header: null,
      cardStyle: {
        backgroundColor: 'white',
      },
    },
  },
  newText: {
    screen: AddTextScreen,
  },
  newLink: {
    screen: AddLinkScreen,
  },
  connect: {
    screen: AddConnectionsScreen,
  },
}, {
  headerMode: 'screen',
  initialRouteName: loggedIn ? 'main' : 'loggedOut',
})
