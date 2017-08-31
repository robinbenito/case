import { StackNavigator } from 'react-navigation'
import { enhance } from 'react-navigation-addons'

import headerStyle from '../constants/Header'

import BlockStack from './BlockStack'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'


const ProfileStack = enhance(StackNavigator)({
  profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: '',
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
  block: {
    screen: BlockStack,
    navigationOptions: () => ({
      tabBarVisible: false,
      title: '',
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

export default ProfileStack
