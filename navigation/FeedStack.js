import { StackNavigator } from 'react-navigation'

import FeedScreen from '../screens/FeedScreen'
import BlockScreen from '../screens/BlockScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'

const FeedStack = StackNavigator({
  feed: {
    screen: FeedScreen,
    navigationOptions: () => ({
      title: 'Feed',
    }),
  },
  block: {
    screen: BlockScreen,
    navigationOptions: () => ({
      tabBarVisible: false,
      title: 'Block',
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
  feedProfile: {
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
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#fff',
    },
  },
})

export default FeedStack
