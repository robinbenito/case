import {
  createRouter,
} from '@exponent/ex-navigation';

import RootNavigation from './RootNavigation';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/index.js';
import ChannelScreen from '../screens/ChannelScreen/index.js'
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';

export default createRouter(() => ({
  rootNavigation: () => RootNavigation,
  home: () => HomeScreen,
  profile: () => ProfileScreen,
  settings: () => SettingsScreen,
  channel: () => ChannelScreen,
  login: () => LoginScreen
}));
