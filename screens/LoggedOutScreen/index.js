import React from 'react'
import { View } from 'react-native'
import navigate from '../../utilities/navigationService'
import { SmallLogo } from '../../components/UI/Logos'
import { CenteringPane, CenterColumn } from '../../components/UI/Layout'
import LargeButton from '../../components/UI/Buttons/LargeButton'

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

          <LargeButton space={1} onPress={() => navigate.reset('login')}>
            Log In
          </LargeButton>

          <LargeButton space={1} onPress={() => navigate.reset('signUp')}>
            Join
          </LargeButton>
        </CenterColumn>
      </CenteringPane>
    )
  }
}
