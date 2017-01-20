import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { ProfileWithData } from './components/ProfileWithData';

export default class ProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title: "Profile",
      backgroundColor: "rgba(255, 255, 255, 0.1)"
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ProfileWithData />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});