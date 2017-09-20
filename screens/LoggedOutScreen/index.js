import React from 'react'
import { View } from 'react-native'
import navigate from '../../utilities/navigationService'
import { SmallLogo } from '../../components/UI/Logos'
import { CenteringPane, CenterColumn } from '../../components/UI/Layout'
import { Button, ButtonLabel } from '../../components/UI/Buttons'

export default class LoginScreen extends React.Component {
  render() {
    return (
      <CenteringPane>
        <CenterColumn>
          <View
            alignSelf="center"
            marginBottom="50%"
          >
            <SmallLogo />
          </View>

          <Button space={1} onPress={() => navigate.reset('login')}>
            <ButtonLabel>Log In</ButtonLabel>
          </Button>

          <Button space={1} onPress={() => navigate.reset('signUp')}>
            <ButtonLabel>Join</ButtonLabel>
          </Button>
        </CenterColumn>
      </CenteringPane>
    )
  }
}
