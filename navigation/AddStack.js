import { StackNavigator } from 'react-navigation'

import AddMenuScreen from '../screens/AddScreen'
import AddTextScreen from '../screens/AddScreen/components/AddTextScreen'
import ConnectScreen from '../screens/AddScreen/components/ConnectScreen'

const AddStack = StackNavigator({
  addMenu: {
    screen: AddMenuScreen,
  },
  addText: {
    screen: AddTextScreen,
  },
  connect: {
    screen: ConnectScreen,
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
