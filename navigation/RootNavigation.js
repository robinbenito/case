import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
  Notifications,
} from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
  withNavigation
} from '@expo/ex-navigation';

import { Ionicons } from '@expo/vector-icons';
import Router from '../navigation/Router';
import Store from '../state/Store';
import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

@withNavigation
export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  onPress(tabItemOnPress, event) {
    tabItemOnPress();
    this.props.navigation.performAction(({ tabs, stacks }) => {
      const { currentNavigatorUID, navigators } = this.props.navigation.navigationState;
      if (navigators[currentNavigatorUID].routes[0] && 
          navigators[currentNavigatorUID].routes[0].routeName &&
          navigators[currentNavigatorUID].routes[0].routeName === currentNavigatorUID &&
          navigators[currentNavigatorUID].routes.length > 1) {
            stacks(currentNavigatorUID).immediatelyResetStack([Router.getRoute('profile')], 0);
      }
    });
  }

  render() {
    return (
      <TabNavigation
        tabBarHeight={45}
        initialTab="home"
        id="main"
        navigatorUID="main">
        
        <TabNavigationItem
          id="home"
          title="Feed"
          onPress={this.onPress}
          renderTitle={isSelected => this._renderTitle('Feed', isSelected)}
          selectedStyle={styles.selectedTab}>
          <StackNavigation navigatorUID="home" initialRoute="home" />
        </TabNavigationItem>

        <TabNavigationItem
          id="add"
          onPress={this.onPress}
          renderIcon={isSelected => (
          <Ionicons
            name="ios-add-circle-outline"
            size={24}
            color="black"
          />)}
          selectedStyle={styles.selectedTab}>
          <StackNavigation navigatorUID="add" initialRoute="add" />
        </TabNavigationItem>

        <TabNavigationItem
          id="profile"
          title="Profile"
          onPress={this.onPress}
          renderTitle={isSelected => this._renderTitle('Profile', isSelected)}
          selectedStyle={styles.selectedTab}>
          <StackNavigation navigatorUID="profile" initialRoute="profile" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderTitle(text, isSelected) {
    return (
      <Text style={[styles.titleText, isSelected ? styles.selectedTitleText : {}]}>
        {text}
      </Text>
    );
  };

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({origin, data}) => {
    // this.props.navigator.showLocalAlert(
    //   `Push notification ${origin} with data: ${JSON.stringify(data)}`,
    //   Alerts.notice
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 13,
    color: "#aaa"
  },
  selectedTitleText: {
    color: "#222"
  },
  selectedTab: {},
});
