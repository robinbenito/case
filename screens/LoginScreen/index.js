import React from 'react'
import { TouchableOpacity } from 'react-native'
import LoginWithData from './components/LoginWithData'
import { SmallLogo } from '../../components/UI/Logos'
import { P, CenteringPane } from '../../components/UI/Layout'
import navigate from '../../utilities/navigationService'

export default class LoginScreen extends React.Component {
  render() {
    return (
      <CenteringPane>
        <P space={3}>
          <TouchableOpacity onPress={() => navigate.reset('loggedOut')}>
            <SmallLogo />
          </TouchableOpacity>
        </P>
        <LoginWithData onLogin={() => navigate.reset('main')} />
      </CenteringPane>
    )
  }
}
