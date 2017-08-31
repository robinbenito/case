import { StackNavigator } from 'react-navigation'
import { enhance } from 'react-navigation-addons'

import headerStyle from '../constants/Header'

import FeedScreen from '../screens/FeedScreen'
import BlockStack from './BlockStack'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'

const FeedStack = enhance(StackNavigator)({
  feed: {
    screen: FeedScreen,
    navigationOptions: () => ({
      title: 'Feed',
      headerBackTitle: null,
      headerTintColor: '#000',
      headerStyle,
    }),
  },
  block: {
    screen: BlockStack,
    navigationOptions: () => ({
      title: 'Block',
      headerBackTitle: null,
      headerTintColor: '#000',
      headerStyle,
    }),
  },
  channel: {
    screen: ChannelScreen,
    navigationOptions: () => ({
      title: '',
      headerBackTitle: null,
      headerTintColor: '#000',
      headerStyle,
    }),
  },
  feedProfile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
      headerBackTitle: null,
      headerTintColor: '#000',
      headerStyle,
    }),
  },
}, {
  cardStyle: {
    backgroundColor: '#fff',
  },
})

export default FeedStack
