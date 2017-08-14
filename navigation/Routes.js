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
      tabBarLabel: null,
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
    activeTintColor: '#000',
    showLabel: false,
    inactiveTintColor: colors.tabIconDefault,
    style: {
      backgroundColor: '#fafafa',
    },
    tabStyle: {
      backgroundColor: '#fafafa',
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
      headerStyle: {
        borderColor: '#000',
      },
      cardStyle: {
        backgroundColor: '#fff',
        padding: 40,
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
