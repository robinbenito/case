import React from 'react'
import PropTypes from 'prop-types'

import ProfileContainer from './components/ProfileContainer'
import { Container } from '../../components/UI/Layout'
import AddMenu from '../../components/AddMenu'

import currentUserService from '../../utilities/currentUserService'

export default class ProfileScreen extends React.Component {
  render() {
    const { navigation } = this.props
    const profileParam = navigation.state.params && navigation.state.params.id
    const id = profileParam || currentUserService.sync.get('id')

    return (
      <Container>
        <ProfileContainer
          id={id}
          type="CHANNEL"
          page={1}
        />
        <AddMenu />
      </Container>
    )
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
