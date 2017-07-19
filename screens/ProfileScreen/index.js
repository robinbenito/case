import React from 'react'
import PropTypes from 'prop-types'
import {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'

import { ProfileContainerWithData } from './components/ProfileContainer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'Channels',
      currentUser: false,
      storageSynced: false,
    }
  }

  componentWillMount() {
    this.checkLoginStateAsync()
  }

  async checkLoginStateAsync() {
    try {
      const currentUser = await AsyncStorage.getItem('@arena:CurrentUser')
      this.setState({ currentUser: JSON.parse(currentUser), storageSynced: true })
    } catch (e) {
      // console.warn('Error fetching currentUser from localStorage', e)
      this.setState({ currentUser: false, storageSynced: true })
    }
  }

  render() {
    if (this.state.storageSynced) {
      const { navigation } = this.props
      const profileParam = navigation.state.params && navigation.state.params.id
      const userId = profileParam || this.state.currentUser.slug

      return (
        <ScrollView style={styles.container}>
          <ProfileContainerWithData userId={userId} />
        </ScrollView>
      )
    }
    return (
      <View />
    )
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
}
