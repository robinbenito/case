import { StackNavigator } from 'react-navigation'
import { enhance } from 'react-navigation-addons'

import headerStyle from '../constants/Header'

import AddMenuScreen from '../screens/AddScreen'
import AddTextScreen from '../screens/AddScreen/components/AddTextScreen'
import AddLinkScreen from '../screens/AddScreen/components/AddLinkScreen'
import NewChannelScreen from '../screens/AddScreen/components/NewChannelScreen'
import ChannelVisibility from '../screens/AddScreen/components/ChannelVisibility'
import SelectConnectionsScreen from '../components/SelectConnections/index'

const AddStack = enhance(StackNavigator)({
  addMenu: {
    screen: AddMenuScreen,
    navigationOptions: () => ({
      title: 'Add Block',
      headerStyle,
    }),
  },
  newChannel: {
    screen: NewChannelScreen,
    navigationOptions: () => ({
      title: 'New Channel',
      headerStyle,
    }),
  },
  channelVisibility: {
    screen: ChannelVisibility,
    navigationOptions: () => ({
      title: 'Channel Privacy',
      headerStyle,
    }),
  },
  addLink: {
    screen: AddLinkScreen,
    navigationOptions: () => ({
      title: 'Add Link',
      headerStyle,
    }),
  },
  addText: {
    screen: AddTextScreen,
    navigationOptions: () => ({
      title: 'Add Text',
      headerStyle,
    }),
  },
  connect: {
    screen: SelectConnectionsScreen,
  },
}, {
  cardStyle: {
    backgroundColor: '#fff',
  },
})

export default AddStack
