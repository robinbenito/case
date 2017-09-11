import React from 'react'
import { StackNavigator } from 'react-navigation'

import headerOptions from '../constants/Header'

import SearchScreen from '../screens/SearchScreen'
import BlockStack from './BlockStack'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'

import HeaderIcon from '../screens/FeedScreen/components/HeaderIcons'

const FeedStack = StackNavigator({
  search: {
    screen: SearchScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  block: {
    screen: BlockStack,
    navigationOptions: () => ({
      ...headerOptions,
      title: 'Block',
    }),
  },
  channel: {
    screen: ChannelScreen,
    navigationOptions: () => ({
      ...headerOptions,
      title: 'Channel',
    }),
  },
  feedProfile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      ...headerOptions,
      title: 'Profile',
    }),
  },
}, {
  headerMode: 'none',
  mode: 'modal',
  cardStyle: {
    backgroundColor: '#fff',
  },
})

export default FeedStack
