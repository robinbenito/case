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
      cardStyle: {
        backgroundColor: '#fff',
      },
      titleStyle: {
        fontSize: 17,
        fontWeight: 'normal',
      },
      headerStyle: {
        backgroundColor: '#fafafa',
        borderBottomWidth: 0.5,
        borderBottomColor: '#f0f0f0',
        shadowColor: 'transparent',
      },
    }),
  },
  block: {
    screen: BlockScreen,
    navigationOptions: () => ({
      tabBarVisible: false,
      title: 'Block',
      headerStyle: {
        backgroundColor: '#fafafa',
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
        backgroundColor: '#fafafa',
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
        backgroundColor: '#fafafa',
      },
      cardStyle: {
        backgroundColor: '#fff',
      },
    }),
  },
})

export default FeedStack
