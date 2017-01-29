import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/index.js';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';
import LoginScreen from '../screens/LoginScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  profile: () => ProfileScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  login: () => LoginScreen
}));
