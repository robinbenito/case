import React from 'react'
import { StackNavigator } from 'react-navigation'

import headerOptions from '../constants/Header'
import BlockStack from './BlockStack'
import FeedScreen from '../screens/FeedScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'
import HeaderIcon from '../screens/FeedScreen/components/HeaderIcons'

export default StackNavigator({
  feed: {
    screen: FeedScreen,
    navigationOptions: ({ navigation }) => ({
      ...headerOptions,
      title: 'Feed',
      headerRight: (<HeaderIcon navigation={navigation} />),
    }),
  },
  block: {
    screen: BlockStack,
    navigationOptions: {
      ...headerOptions,
      title: 'Block',
    },
  },
  channel: {
    screen: ChannelScreen,
    navigationOptions: {
      ...headerOptions,
      title: 'Channel',
    },
  },
  feedProfile: {
    screen: ProfileScreen,
    navigationOptions: {
      ...headerOptions,
      title: 'Profile',
    },
  },
}, {
  cardStyle: {
    backgroundColor: 'white',
  },
})
