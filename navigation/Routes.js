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
      tabBarLabel: 'Feed',
      tabBarIcon: props => (
        <Ionicons name="ios-list-box-outline" size={24} color={props.tintColor} />
      ),
    },
  },
  add: {
    screen: AddStack,
    navigationOptions: {
      tabBarLabel: 'Add',
      tabBarIcon: props => (
        <Ionicons name="ios-add-circle-outline" size={24} color={props.tintColor} />
      ),
    },
  },
  profile: {
    screen: ProfileStack,
    navigationOptions: {
      title: 'Profile',
      tabBarLabel: 'Profile',
      tabBarIcon: props => (
        <Ionicons name="ios-person" size={24} color={props.tintColor} />
      ),
    },
  },
}

const tabOptions = {
  initialRouteName: 'home',
  tabBarOptions: {
    tabBarPosition: 'bottom',
    activeTintColor: '#000',
    inactiveTintColor: colors.tabIconDefault,
    style: {
      backgroundColor: '#fff',
      borderColor: '#fff',
    },
    tabStyle: {
      backgroundColor: '#fff',
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
        backgroundColor: '#fff',
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
