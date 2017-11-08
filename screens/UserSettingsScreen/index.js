import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { Text, ScrollView } from 'react-native'

import Apollo from '../../state/Apollo'

import currentUserService from '../../utilities/currentUserService'
import navigationService from '../../utilities/navigationService'
import openExternalArenaPath from '../../utilities/openExternalArenaPath'

import { Colors } from '../../constants/Style'

import { Fieldset, FieldsetLabel, InputDescription } from '../../components/UI/Inputs'
import { StackedButton, StackedJumpButton } from '../../components/UI/Buttons'
import { Container, Section } from '../../components/UI/Layout'
import UserAvatar from '../../components/UserAvatar'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

class UserSettingsScreen extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      me: PropTypes.object.isRequired,
    }).isRequired,
  }

  logOut = () => {
    currentUserService.clear()

    Apollo.resetStore()

    navigationService.navigate('loggedOut')
  }

  render() {
    const { data: { me } } = this.props

    return (
      <Container>
        <ScrollView>
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

              <StackedJumpButton
                onPress={() => navigationService.navigate('editAccountBio')}
              >
                Bio
              </StackedJumpButton>

              <StackedJumpButton
                label="Email"
                onPress={() => navigationService.navigate('editAccountEmail')}
              >
                {me.email}
              </StackedJumpButton>
            </Fieldset>
          </Section>

          <Section space={3}>
            <FieldsetLabel>
              Notifications
            </FieldsetLabel>

            <Fieldset>
              <StackedJumpButton
                label="Email Notifications"
                onPress={() => navigationService.navigate('editEmailNotifications')}
              >
                {{
                  digest: 'Periodic Digest',
                  notifications: 'Every Notification',
                  none: 'None',
                }[me.settings.receive_email]}
              </StackedJumpButton>

              <StackedJumpButton
                label="Newsletter"
                onPress={() => navigationService.navigate('editAccountReceiveNewsletter')}
              >
                {{
                  true: 'Subscribed',
                  false: 'Unsubscribed',
                }[me.settings.receive_newsletter]}
              </StackedJumpButton>
            </Fieldset>
          </Section>

          <Section space={3}>
            <FieldsetLabel>
              Plan
            </FieldsetLabel>

            <Fieldset>
              <StackedJumpButton
                label="Current Plan"
                onPress={() => openExternalArenaPath('settings/billing')}
              >
                {me.plan}
              </StackedJumpButton>
            </Fieldset>

            {me.plan === 'Free' &&
              <InputDescription>
                You are currently using {`${me.counts.private_connections} `}
                out of {`${me.counts.private_connections_limit} `} available
                private blocks for free account
              </InputDescription>
            }
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

              <StackedButton onPress={this.logOut}>
                <Text style={{ color: Colors.state.alert }}>
                  Log Out
                </Text>
              </StackedButton>
            </Fieldset>
          </Section>
        </ScrollView>
      </Container>
    )
  }
}

const UserSettingsQuery = gql`
  query UserSettingsQuery {
    me {
      id
      name
      email
      ... Avatar
      settings {
        receive_email
        receive_newsletter
      }
      plan
      counts {
        private_connections
        private_connections_limit
      }
    }
  }
  ${UserAvatar.fragments.avatar}
`

const DecoratedUserSettingsScreen = withLoadingAndErrors(UserSettingsScreen, {
  errorMessage: 'Error getting your settings',
})

const UserSettingsScreenWithData = graphql(UserSettingsQuery)(DecoratedUserSettingsScreen)

export default UserSettingsScreenWithData
