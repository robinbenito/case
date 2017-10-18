import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Client from '../../state/Apollo'
import CurrentUser from '../../utilities/currentUserService'
import NavigatorService from '../../utilities/navigationService'
import { Colors, Units } from '../../constants/Style'
import { Fieldset } from '../../components/UI/Inputs'
import { StackedButton } from '../../components/UI/Buttons'
import { Container, Section, CenteringPane } from '../../components/UI/Layout'
import UserAvatar from '../../components/UserAvatar'
import openExternalArenaPath from '../../utilities/openExternalArenaPath'
import formatErrors from '../../utilities/formatErrors'
import { ErrorMessage, StatusMessage } from '../../components/UI/Alerts'

class UserSettingsScreen extends React.Component {
  render() {
    const { data: { loading, error, me } } = this.props

    // TODO
    if (loading) {
      return <View />
    }

    // TODO
    if (error) {
      return (
        <CenteringPane>
          <StatusMessage>
            Error getting settings
          </StatusMessage>

          <ErrorMessage>
            {formatErrors(error)}
          </ErrorMessage>
        </CenteringPane>
      )
    }

    return (
      <Container>
        <KeyboardAwareScrollView>
          <Section>
            <UserAvatar user={me} style={{ alignSelf: 'center' }} />
          </Section>

          <Section space={3}>
            <Fieldset>
              <StackedButton
                style={{ marginTop: -Units.hairlineWidth }}
                onPress={() => openExternalArenaPath('about')}
              >
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
              <StackedButton
                onPress={() => {
                  CurrentUser.clear()
                  Client.resetStore()
                  NavigatorService.navigate('loggedOut')
                }}
                style={{ marginTop: -Units.hairlineWidth }}
              >
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
      first_name
      last_name
      email
      ... Avatar
    }
  }
  ${UserAvatar.fragments.avatar}
`

const UserSettingsScreenWithData = graphql(UserSettingsQuery)(UserSettingsScreen)

export default UserSettingsScreenWithData
