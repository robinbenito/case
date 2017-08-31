import { StackNavigator } from 'react-navigation'

import headerStyle from '../constants/Header'

import BlockStack from './BlockStack'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'


const ProfileStack = StackNavigator({
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
