import React from 'react'
import PropTypes from 'prop-types'
import ProfileContainerWithData from './components/ProfileContainer'
import { Container } from '../../components/UI/Layout'
import currentUserService from '../../utilities/currentUserService'

export default class ProfileScreen extends React.Component {
  render() {
    const { navigation } = this.props
    const profileParam = navigation.state.params && navigation.state.params.id
    const id = profileParam || currentUserService.sync.get('id')

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
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
