import { StackNavigator } from 'react-navigation'

import headerOptions from '../constants/Header'
import BlockStack from './BlockStack'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'
import UserSettingsScreen from '../screens/UserSettingsScreen'
import LoginScreen from '../screens/LoginScreen'

const ProfileStack = StackNavigator({
  profile: {
    screen: ProfileScreen,
    navigationOptions: {
      ...headerOptions,
      title: 'Profile',
    },
  },
  channel: {
    screen: ChannelScreen,
    navigationOptions: {
      ...headerOptions,
      title: 'Channel',
    },
  },
  block: {
    screen: BlockStack,
    navigationOptions: {
      ...headerOptions,
      tabBarVisible: false,
      title: 'Block',
    },
  },
  userSettings: {
    screen: UserSettingsScreen,
    navigationOptions: {
      ...headerOptions,
      tabBarVisible: false,
      title: 'Settings',
    },
  },
}, {
  cardStyle: {
    backgroundColor: 'white',
  },
})

export default ProfileStack
