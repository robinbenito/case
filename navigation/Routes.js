import { StackNavigator } from 'react-navigation'

import LoggedOutRoutes from './LoggedOutRoutes'
import LoggedInRoutes from './LoggedInRoutes'

export default initialRouteName => StackNavigator({
  ...LoggedOutRoutes,
  ...LoggedInRoutes,
}, {
  initialRouteName,
  headerMode: 'float',
  cardStyle: {
    backgroundColor: 'white',
  },
})
