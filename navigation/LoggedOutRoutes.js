import LoggedOutScreen from '../screens/LoggedOutScreen'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'

const navigationOptions = {
  header: null,
}

export default {
  loggedOut: {
    screen: LoggedOutScreen,
    navigationOptions,
  },

  login: {
    screen: LoginScreen,
    navigationOptions,
  },

  signUp: {
    screen: SignUpScreen,
    navigationOptions,
  },
}
