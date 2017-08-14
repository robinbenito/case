import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import LoginScreen from '../screens/LoginScreen'

import colors from '../constants/Colors'

import FeedStack from './FeedStack'
import AddStack from './AddStack'
import ProfileStack from './ProfileStack'

const tabs = {
  home: {
    screen: FeedStack,
    navigationOptions: {
      tabBarIcon: props => (
        <Ionicons name="md-reorder" size={30} color={props.tintColor} />
      ),
    },
  },
  add: {
    screen: AddStack,
    navigationOptions: {
      tabBarIcon: props => (
        <Ionicons name="md-add" size={30} color={props.tintColor} />
      ),
    },
  },
  profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarIcon: props => (
        <Ionicons name="ios-person" size={30} color={props.tintColor} />
      ),
    },
  },
}

const tabOptions = {
  initialRouteName: 'home',
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

tabs.home.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
}
tabs.add.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
}
tabs.profile.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
}

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
  cardStyle: {
    backgroundColor: '#fff',
  },
  navigationOptions: {
    header: null,
  },
})
