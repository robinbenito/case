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

export const LoginNav = StackNavigator({
  login: { 
    screen: LoginScreen,
    header: null
  }
});

const tabs = {
  home: { 
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: (props) => {
        return (
          <Ionicons name="ios-home-outline" size={24} color={props.tintColor} />
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
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: (props) => {
        return (
          <Ionicons name="ios-person-outline" size={24} color={props.tintColor} />
        )
      }
    },
  },
}
const tabOptions = {
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