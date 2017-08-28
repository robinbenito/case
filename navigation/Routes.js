import React from 'react'
import { StackNavigator, TabNavigator, NavigationActions, StateUtils } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import LoginScreen from '../screens/LoginScreen'

import colors from '../constants/Colors'

import FeedStack from './FeedStack'
import AddStack from './AddStack'
import ProfileStack from './ProfileStack'

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


const tabs = {
  home: {
    screen: FeedStack,
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: (tab, jumpToIndex) => { onTabPress(navigation, tab, jumpToIndex) },
      tabBarIcon: options => (
        <Ionicons name="md-reorder" size={30} color={options.tintColor} />
      ),
    }),
  },
  add: {
    screen: AddStack,
    navigationOptions: {
      tabBarIcon: options => (
        <Ionicons name="md-add" size={30} color={options.tintColor} />
      ),
    },
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

export const createRootNavigator = (loggedIn = false) => StackNavigator({
  login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      header: null,
      cardStyle: {
        backgroundColor: '#fff',
      },
    }),
  },
  main: {
    screen: MainNav,
  },
}, {
  headerMode: 'screen',
  initialRouteName: loggedIn ? 'main' : 'login',
  navigationOptions: {
    header: null,
  },
})
