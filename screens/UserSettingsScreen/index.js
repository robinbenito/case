import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Client from '../../state/Apollo'
import CurrentUser from '../../utilities/currentUserService'
import navigationService from '../../utilities/navigationService'
import { Colors } from '../../constants/Style'
import { Fieldset, FieldsetLabel } from '../../components/UI/Inputs'
import { StackedButton, StackedJumpButton } from '../../components/UI/Buttons'
import { Container, Section } from '../../components/UI/Layout'
import UserAvatar from '../../components/UserAvatar'
import openExternalArenaPath from '../../utilities/openExternalArenaPath'
import withLoadingAndErrors from '../../components/WithLoadingAndErrors'

class UserSettingsScreen extends React.Component {
  logOut = () => {
    CurrentUser.clear()
    Client.resetStore()
    navigationService.navigate('loggedOut')
  }

  render() {
    const { data: { me } } = this.props

    return (
      <Container>
        <KeyboardAwareScrollView>
          <Section>
            <UserAvatar user={me} style={{ alignSelf: 'center' }} />
          </Section>

          <Section space={3}>
            <FieldsetLabel>
              Profile
            </FieldsetLabel>
            <Fieldset>
              <StackedJumpButton
                label="Name"
                onPress={() => navigationService.navigate('editAccountName')}
              >
                {me.name}
              </StackedJumpButton>

              {/* TODO:
                <StackedJumpButton label="Email">
                  {me.email}
                </StackedJumpButton>

                <StackedJumpButton>
                  Bio
                </StackedJumpButton>
              */}
            </Fieldset>
          </Section>

          <Section space={3}>
            <Fieldset>
              <StackedButton onPress={() => openExternalArenaPath('about')}>
                About Are.na
              </StackedButton>

              <StackedButton onPress={() => openExternalArenaPath('terms')}>
                Terms of Service
              </StackedButton>

              <StackedButton onPress={() => openExternalArenaPath('privacy')}>
                Privacy Policy
              </StackedButton>
            </Fieldset>
          </Section>

          <Section space={3}>
            <Fieldset>
              <StackedButton onPress={this.logOut}>
                <Text style={{ color: Colors.state.alert }}>
                  Log Out
                </Text>
              </StackedButton>
            </Fieldset>
          </Section>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

UserSettingsScreen.propTypes = {
  data: PropTypes.any.isRequired,
}

const UserSettingsQuery = gql`
  query UserSettingsQuery {
    me {
      id
      name
      email
      ... Avatar
    }
  }
  ${UserAvatar.fragments.avatar}
`

const DecoratedUserSettingsScreen = withLoadingAndErrors(UserSettingsScreen, {
  errorMessage: 'Error getting your settings',
})

const UserSettingsScreenWithData = graphql(UserSettingsQuery)(DecoratedUserSettingsScreen)

export default UserSettingsScreenWithData
