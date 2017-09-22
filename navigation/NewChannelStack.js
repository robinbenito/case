import { StackNavigator } from 'react-navigation'
import { enhance } from 'react-navigation-addons'

import headerStyle from '../constants/Header'

import NewChannelScreen from '../screens/NewChannelScreen'
import ChannelVisibility from '../screens/NewChannelScreen/components/ChannelVisibility'

const NewChannelStack = enhance(StackNavigator)({
  newChannel: {
    screen: NewChannelScreen,
    navigationOptions: {
      title: 'New Channel',
      headerStyle,
    },
  },
  channelVisibility: {
    screen: ChannelVisibility,
    navigationOptions: () => ({
      title: 'Channel Privacy',
      headerStyle,
    }),
  },
}, {
  cardStyle: {
    backgroundColor: '#fff',
  },
})

export default NewChannelStack
