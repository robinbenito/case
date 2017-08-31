import { StackNavigator } from 'react-navigation'

import BlockScreen from '../screens/BlockScreen'
import SelectConnectionsScreen from '../components/SelectConnections/index'
import CommentScreen from '../screens/CommentScreen/index'

import headerStyle from '../constants/Header'

const BlockStack = StackNavigator({
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
  comment: {
    screen: CommentScreen,
    navigationOptions: () => ({
      tabBarVisible: false,
      title: 'Comment',
      headerStyle,
    }),
  },
}, {
  headerMode: 'none',
  mode: 'modal',
  cardStyle: {
    backgroundColor: '#fff',
  },
})

export default BlockStack
