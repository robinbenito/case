import React from 'react'
import navigate from '../../utilities/navigationService'
import { SmallLogo } from '../../components/UI/Logos'
import { CenteringPane, CenterColumn } from '../../components/UI/Layout'
import { Button, ButtonLabel } from '../../components/UI/Buttons'

export default class LoginScreen extends React.Component {
  render() {
    return (
      <CenteringPane>
        <SmallLogo />

        <CenterColumn>
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
