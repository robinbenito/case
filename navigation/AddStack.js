import { StackNavigator } from 'react-navigation'

import AddMenuScreen from '../screens/AddScreen'
import AddTextScreen from '../screens/AddScreen/components/AddTextScreen'
import SelectConnectionsScreen from '../components/SelectConnections/index'

const AddStack = StackNavigator({
  addMenu: {
    screen: AddMenuScreen,
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
