import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import FeedScreen from '../screens/FeedScreen'
import BlockScreen from '../screens/BlockScreen'
import AddScreen from '../screens/AddScreen'
import ConnectScreen from '../screens/AddScreen/components/ConnectScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'
import LoginScreen from '../screens/LoginScreen'

import colors from '../constants/Colors'

const FeedStack = StackNavigator({
  feed: {
    screen: FeedScreen,
    navigationOptions: () => ({
      title: 'Feed',
    }),
  },
  block: {
    screen: BlockScreen,
  },
  channel: {
    screen: ChannelScreen,
    navigationOptions: () => ({
      title: 'Channel',
    }),
  },
  feedProfile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
    }),
  },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#fff',
    },
  },
})

const AddStack = StackNavigator({
  add: {
    screen: AddScreen,
  },
  connect: {
    screen: ConnectScreen,
  },
}, {
  navigationOptions: {
    header: null,
  },
})

const ProfileStack = StackNavigator({
  profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
      headerStyle: {
        backgroundColor: '#fff',
      },
      cardStyle: {
        backgroundColor: '#fff',
      },
    }),
  },
  channel: {
    screen: ChannelScreen,
    navigationOptions: () => ({
      title: 'Channel',
      headerStyle: {
        backgroundColor: '#fff',
      },
      cardStyle: {
        backgroundColor: '#fff',
      },
    }),
  },
  block: {
    screen: BlockScreen,
    navigationOptions: () => ({
      title: 'Block',
      headerStyle: {
        backgroundColor: '#fff',
      },
      cardStyle: {
        backgroundColor: '#fff',
      },
    }),
  },
})

const tabs = {
  home: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: props => (
        <Ionicons name="ios-list-outline" size={24} color={props.tintColor} />
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
        <Ionicons name="ios-hand-outline" size={24} color={props.tintColor} />
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
