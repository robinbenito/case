import { StackNavigator } from 'react-navigation'

import headerOptions from '../constants/Header'

import BlockStack from './BlockStack'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'


const ProfileStack = StackNavigator({
  profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      ...headerOptions,
      title: 'Profile',
    }),
  },
  channel: {
    screen: ChannelScreen,
    navigationOptions: () => ({
      ...headerOptions,
      title: '',
    }),
  },
  block: {
    screen: BlockStack,
    navigationOptions: () => ({
      ...headerOptions,
      tabBarVisible: false,
      title: '',
    }),
  },
}, {
  cardStyle: {
    backgroundColor: '#fff',
  },
})

export default ProfileStack
