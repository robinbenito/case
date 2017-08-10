import { StackNavigator } from 'react-navigation'

import AddScreen from '../screens/AddScreen'
import ConnectScreen from '../screens/AddScreen/components/ConnectScreen'

const AddStack = StackNavigator({
  add: {
    screen: AddScreen,
  },
  connect: {
    screen: ConnectScreen,
  },
}, {
  navigationOptions: {
    header: null,
  },
})

export default AddStack
