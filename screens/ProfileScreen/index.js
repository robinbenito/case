import React from 'react'
import PropTypes from 'prop-types'
import { AsyncStorage, View } from 'react-native'
import ProfileContainerWithData from './components/ProfileContainer'
import { Container } from '../../components/UI/Layout'

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      this.setState({ currentUser: false, storageSynced: true })
    }
  }

  render() {
    if (this.state.storageSynced) {
      const { navigation } = this.props
      const profileParam = navigation.state.params && navigation.state.params.id

      const id = profileParam || this.state.currentUser.id

      return (
        <Container>
          <ProfileContainerWithData
            id={id}
            type="CHANNEL"
            page={1}
          />
        </Container>
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
