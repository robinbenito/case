import {
  createRouter,
} from '@expo/ex-navigation';

import RootNavigation from './RootNavigation';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen/index'
import ProfileScreen from '../screens/ProfileScreen/index';
import ChannelScreen from '../screens/ChannelScreen/index'
import LoginScreen from '../screens/LoginScreen';

export default createRouter(() => ({
  rootNavigation: () => RootNavigation,
  home: () => HomeScreen,
  add: () => AddScreen,
  profile: () => ProfileScreen,
  channel: () => ChannelScreen,
  login: () => LoginScreen
}));
