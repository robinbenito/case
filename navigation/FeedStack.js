import { StackNavigator } from 'react-navigation'

import FeedScreen from '../screens/FeedScreen'
import BlockScreen from '../screens/BlockScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'

import colors from '../constants/Colors'

const headerStyle = {
  backgroundColor: colors.gray.background,
  borderBottomWidth: 1,
  borderBottomColor: colors.gray.border,
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
