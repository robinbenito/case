import { StackNavigator } from 'react-navigation'

import headerOptions from '../constants/Header'

import FeedScreen from '../screens/FeedScreen'
import BlockStack from './BlockStack'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'

const FeedStack = StackNavigator({
  feed: {
    screen: FeedScreen,
    navigationOptions: () => ({
      ...headerOptions,
      title: 'Feed',
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
  cardStyle: {
    backgroundColor: '#fff',
  },
})

export default FeedStack
