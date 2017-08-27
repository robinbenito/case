import { StackNavigator } from 'react-navigation'
import { enhance } from 'react-navigation-addons'

import BlockScreen from '../screens/BlockScreen'
import SelectConnectionsScreen from '../components/SelectConnections/index'

import headerStyle from '../constants/Header'

const BlockStack = enhance(StackNavigator)({
  block: {
    screen: BlockScreen,
    navigationOptions: () => ({
      tabBarVisible: false,
      headerStyle,
    }),
  },
  connect: {
    screen: SelectConnectionsScreen,
    navigationOptions: () => ({
      tabBarVisible: false,
      title: 'Connect',
      headerStyle,
    }),
  },
}, {
  headerMode: 'none',
  mode: 'modal',
})

export default BlockStack
