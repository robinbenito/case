import {
  createRouter,
} from '@expo/ex-navigation';

import RootNavigation from './RootNavigation';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen/index'
import ProfileScreen from '../screens/ProfileScreen/index';
import ChannelScreen from '../screens/ChannelScreen/index'
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
