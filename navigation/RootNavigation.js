import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
  Notifications,
} from 'exponent';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }
  // renderIcon={isSelected => this._renderIcon('cog', isSelected)}
  render() {
    return (
      <TabNavigation
        tabBarHeight={45}
        initialTab="home">
        <TabNavigationItem
          id="home"
          title="Feed"
          renderTitle={isSelected => this._renderTitle('Feed', isSelected)}
          selectedStyle={styles.selectedTab}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>

        <TabNavigationItem
          id="profile"
          title="Profile"
          renderTitle={isSelected => this._renderTitle('Profile', isSelected)}
          selectedStyle={styles.selectedTab}>
          <StackNavigation initialRoute="profile" />
        </TabNavigationItem>

        <TabNavigationItem
          id="settings"
          title="Settings"
          renderTitle={isSelected => this._renderTitle('Settings', isSelected)}
          selectedStyle={styles.selectedTab}>
          <StackNavigation initialRoute="settings" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderTitle(text: string, isSelected: boolean) {
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
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
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
