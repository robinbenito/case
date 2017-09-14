import { StackNavigator } from 'react-navigation'

import headerOptions from '../constants/Header'

import SearchScreen from '../screens/SearchScreen'
import BlockStack from './BlockStack'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'


const FeedStack = StackNavigator({
  search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  block: {
    screen: BlockStack,
    navigationOptions: () => ({
      ...headerOptions,
      title: 'Block',
      mode: 'card',
    }),
  },
  channel: {
    screen: ChannelScreen,
    navigationOptions: () => ({
      ...headerOptions,
      title: 'Channel',
      mode: 'card',
    }),
  },
  searchProfile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      ...headerOptions,
      title: 'Profile',
      mode: 'card',
    }),
  },
}, {
  mode: 'card',
  cardStyle: {
    backgroundColor: '#fff',
  },
})

export default FeedStack
