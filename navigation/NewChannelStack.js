import { StackNavigator } from 'react-navigation'
import { enhance } from 'react-navigation-addons'
import headerNavigationOptions from '../constants/Header'
import NewChannelScreen from '../screens/NewChannelScreen'
import ChannelVisibility from '../components/ChannelVisibility'

const NewChannelStack = enhance(StackNavigator)({
  newChannel: {
    screen: NewChannelScreen,
    navigationOptions: {
      title: 'New Channel',
      ...headerNavigationOptions,
    },
  },
  channelVisibility: {
    screen: ChannelVisibility,
    navigationOptions: {
      title: 'Channel Privacy',
      ...headerNavigationOptions,
    },
  },
}, {
  cardStyle: {
    backgroundColor: 'white',
  },
})

export default NewChannelStack
