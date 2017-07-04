import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';

import { ProfileContainerWithData } from './components/ProfileContainer';
import { ContentsWithData } from '../../components/Contents/ContentsContainer';

import BackButton from '../../components/BackButton';

export default class ProfileScreen extends React.Component {
  state = {
    type: "Channels",
    currentUser: false,
    storageSynced: false
  }

  componentWillMount() {
    this._checkLoginStateAsync()
  }

  async _checkLoginStateAsync() {
    try {
      const currentUser = await AsyncStorage.getItem('@arena:CurrentUser');
      this.setState({ currentUser: JSON.parse(currentUser), storageSynced: true })
    } catch (e) {
      console.warn('Error fetching currentUser from localStorage', e)
      this.setState({ currentUser: false, storageSynced: true });
    } 
  }



  render() {
    if (this.state.storageSynced) {
      console.log('this.state.currentUser', this.state.currentUser)
      const userId = this.state.currentUser.slug;
      return (
        <ScrollView style={styles.container}>
          <ProfileContainerWithData userId={userId} />
        </ScrollView>
      );
    } else {
      return (
        <View />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});