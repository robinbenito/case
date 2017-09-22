import { StackNavigator } from 'react-navigation'

import BlockScreen from '../screens/BlockScreen'
import BlockTextScreen from '../screens/BlockScreen/components/BlockText'
import SelectConnectionsScreen from '../components/SelectConnections/index'
import CommentScreen from '../screens/CommentScreen/index'

import headerOptions from '../constants/Header'

const BlockStack = StackNavigator({
  block: {
    screen: BlockScreen,
    navigationOptions: {
      ...headerOptions,
      tabBarVisible: false,
    },
  },
  blockConnect: {
    screen: SelectConnectionsScreen,
    navigationOptions: {
      ...headerOptions,
      tabBarVisible: false,
      title: 'Connect',
    },
  },
  comment: {
    screen: CommentScreen,
    navigationOptions: {
      ...headerOptions,
      tabBarVisible: false,
      title: 'Comment',
    },
  },
  text: {
    screen: BlockTextScreen,
    navigation: {
      ...headerOptions,
      tabBarVisible: false,
      title: 'Connect',
    },
  },
}, {
  headerMode: 'none',
  mode: 'modal',
  cardStyle: {
    backgroundColor: '#fff',
  },
})

export default BlockStack
