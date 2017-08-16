import { StackNavigator } from 'react-navigation'
import { enhance } from 'react-navigation-addons'

import AddMenuScreen from '../screens/AddScreen'
import AddTextScreen from '../screens/AddScreen/components/AddTextScreen'
import AddLinkScreen from '../screens/AddScreen/components/AddLinkScreen'
import NewChannelScreen from '../screens/AddScreen/components/NewChannelScreen'
import SelectConnectionsScreen from '../components/SelectConnections/index'

const AddStack = enhance(StackNavigator)({
  addMenu: {
    screen: AddMenuScreen,
  },
  newChannel: {
    screen: NewChannelScreen,
  },
  addLink: {
    screen: AddLinkScreen,
  },
  addText: {
    screen: AddTextScreen,
  },
  connect: {
    screen: SelectConnectionsScreen,
  },
}, {
  navigationOptions: {
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#fff',
    },
  },
})

export default AddStack
