import React from 'react'
import { TabNavigator, NavigationActions, DrawerNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import ArenaLogo from '../components/ArenaLogo'
import LoggedOutScreen from '../screens/LoggedOutScreen'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'

import StackModalNavigator from '../utilities/stackModalNavigator'

import colors from '../constants/Colors'

import FeedStack from './FeedStack'
import NotificationsScreen from '../screens/NotificationsScreen'
import ProfileStack from './ProfileStack'
import SearchStack from './SearchStack'

import NewChannelStack from './NewChannelStack'
import AddTextScreen from '../screens/AddScreen/components/AddTextScreen'
import AddLinkScreen from '../screens/AddScreen/components/AddLinkScreen'

import SelectConnectionsScreen from '../components/SelectConnections/index'

function onTabPress(navigation, tab, jumpToIndex) {
  // if tab currently focused tab
  if (tab.focused) {
    // if not on first screen of the StackNavigator in focused tab.
    if (tab.route.index !== 0) {
      // go to first screen of the StackNavigator
      navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: tab.route.routes[0].routeName }),
        ],
      }))
    }
  } else {
    // go to another tab (the default behavior)
    jumpToIndex(tab.index)
  }
}

const FeedScreenWithDrawer = DrawerNavigator({
  feed: {
    screen: FeedStack,
  },
}, {
  contentComponent: () => (<NotificationsScreen />),
  header: null,
  drawerPosition: 'right',
  cardStack: {
    gesturesEnabled: false,
  },
})

const tabs = {
  home: {
    screen: FeedScreenWithDrawer,
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: (tab, jumpToIndex) => { onTabPress(navigation, tab, jumpToIndex) },
      tabBarIcon: options => (
        <ArenaLogo size={17} fill={options.tintColor} />
      ),
    }),
  },
  profile: {
    screen: ProfileStack,
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: (tab, jumpToIndex) => { onTabPress(navigation, tab, jumpToIndex) },
      tabBarIcon: options => (
        <Ionicons name="ios-person" size={30} color={options.tintColor} />
      ),
    }),
  },
}

const tabOptions = {
  initialRouteName: 'home',
  lazy: true,
  tabBarOptions: {
    tabBarPosition: 'bottom',
    activeTintColor: colors.gray.hover,
    showLabel: false,
    inactiveTintColor: colors.tabIconDefault,
    style: {
      backgroundColor: colors.gray.tab,
    },
    tabStyle: {
      backgroundColor: colors.gray.tab,
    },
  },
}

export const MainNav = TabNavigator(tabs, tabOptions)

export const createRootNavigator = (loggedIn = false) => StackModalNavigator({
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
    screen: MainNav,
    navigationOptions: {
      header: null,
      cardStyle: {
        backgroundColor: 'white',
      },
    },
  },
  search: {
    screen: SearchStack,
  },
  newChannel: {
    screen: NewChannelStack,
  },
  newText: {
    screen: AddTextScreen,
  },
  newLink: {
    screen: AddLinkScreen,
    navigationOptions: {
      title: 'New link',
    },
  },
  connect: {
    screen: SelectConnectionsScreen,
  },
}, {
  headerMode: 'screen',
  initialRouteName: loggedIn ? 'main' : 'loggedOut',
})
