import { StackNavigator } from 'react-navigation'

import BlockScreen from '../screens/BlockScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ChannelScreen from '../screens/ChannelScreen'

const ProfileStack = StackNavigator({
  profile: {
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
})

export default ProfileStack
