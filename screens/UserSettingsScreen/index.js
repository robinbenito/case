import React from 'react'
import { Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Client from '../../state/Apollo'
import CurrentUser from '../../utilities/currentUserService'
import NavigatorService from '../../utilities/navigationService'
import { Colors, Units } from '../../constants/Style'
import { Fieldset } from '../../components/UI/Inputs'
import { StackedButton } from '../../components/UI/Buttons'
import { Section } from '../../components/UI/Layout'
import openExternalArenaPath from '../../utilities/openExternalArenaPath'

export default class UserSettingsScreen extends React.Component {
  render() {
    return (
      <KeyboardAwareScrollView backgroundColor={Colors.semantic.background}>
        <Section>
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
            <StackedButton
              onPress={() => {
                CurrentUser.clear()
                Client.resetStore()
                NavigatorService.navigate('login')
              }}
            >
              <Text style={{ color: Colors.state.alert }}>Log Out</Text>
            </StackedButton>
          </Fieldset>
        </Section>
      </KeyboardAwareScrollView>
    )
  }
}
