import { createStackNavigator } from 'react-navigation'

import LoggedOutRoutes from './LoggedOutRoutes'
import LoggedInRoutes from './LoggedInRoutes'

export default initialRouteName => createStackNavigator({
  ...LoggedOutRoutes,
  ...LoggedInRoutes,
}, {
  initialRouteName,
  headerMode: 'float',
  cardStyle: {
    backgroundColor: 'white',
  },
})
