import { StackNavigator } from 'react-navigation'

import FeedScreen from '../screens/FeedScreen'
import BlockScreen from '../screens/BlockScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'

const headerStyle = {
  backgroundColor: '#fafafa',
  borderBottomWidth: 0.5,
  borderBottomColor: '#f0f0f0',
  shadowColor: 'transparent',
}

const FeedStack = StackNavigator({
  feed: {
    screen: FeedScreen,
    navigationOptions: () => ({
      title: 'Feed',
      cardStyle: {
        backgroundColor: '#fff',
      },
      headerStyle,
    }),
  },
  block: {
    screen: BlockScreen,
    navigationOptions: () => ({
      tabBarVisible: false,
      title: 'Block',
      headerStyle,
      cardStyle: {
        backgroundColor: '#fff',
      },
    }),
  },
  channel: {
    screen: ChannelScreen,
    navigationOptions: () => ({
      title: 'Channel',
      headerStyle,
      cardStyle: {
        backgroundColor: '#fff',
      },
    }),
  },
  feedProfile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
      headerStyle,
      cardStyle: {
        backgroundColor: '#fff',
      },
    }),
  },
})

export default FeedStack
