import React from 'react'
import { Image, StyleSheet } from 'react-native'

import LoginWithData from './components/LoginWithData'
import { CenteringPane } from '../../components/UI/Layout'
import NavigationService from '../../utilities/navigationService'

const logo = require('../../assets/images/logo.png')

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    marginBottom: 50,
  },
})

export default class LoginScreen extends React.Component {
  render() {
    return (
      <CenteringPane>
        <Image
          style={styles.logo}
          source={logo}
        />
        <LoginWithData
          onLogin={() => NavigationService.reset('main')}
        />
      </CenteringPane>
    )
  }
}
