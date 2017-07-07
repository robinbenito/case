import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen.js';
import AddScreen from '../screens/AddScreen/index'
import ProfileScreen from '../screens/ProfileScreen/index';
import ChannelScreen from '../screens/ChannelScreen/index'
import LoginScreen from '../screens/LoginScreen';

import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/Colors';
import {
  Text,
} from 'react-native';

const ProfileStack = StackNavigator({
  profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => ({
      title: `Profile`,
      headerStyle: {
        backgroundColor: '#fff'
      },
      cardStyle: {
        backgroundColor: '#fff'
      }
    }),
  }
})

const tabs = {
  home: { 
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: (props) => {
        return (
          <Ionicons name="ios-list-outline" size={24} color={props.tintColor} />
        )
      }
    },
  },
  add: { 
    screen: AddScreen,
    navigationOptions: {
      tabBarLabel: 'Add',
      tabBarIcon: (props) => {
        return (
          <Ionicons name="ios-add-circle-outline" size={24} color={props.tintColor} />
        )
      }
    },
  },
  profile: {
    screen: ProfileStack,
    navigationOptions: {
      title: 'Profile',
      tabBarLabel: 'Profile',
      tabBarIcon: (props) => {
        return (
          <Ionicons name="ios-hand-outline" size={24} color={props.tintColor} />
        )
      }
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
    }
  }
}

export const MainNav = TabNavigator(tabs, tabOptions)

export const GlobalNav = StackNavigator({
  login: { 
    screen: LoginScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
      headerStyle: {
        backgroundColor: '#fff'
      },
      cardStyle: {
        backgroundColor: '#fff',
        padding: 40
      }
    }),
  },
  main: {
    screen: MainNav
  },
}, { 
  headerMode: 'screen',
  navigationOptions: {
    header: null
  }
});