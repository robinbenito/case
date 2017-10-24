import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import { gql, graphql } from 'react-apollo'
import { TouchableOpacity, View } from 'react-native'

import currentUserService, { LoginFragment } from '../../utilities/currentUserService'
import formatErrors from '../../utilities/formatErrors'
import navigationService from '../../utilities/navigationService'
import wait from '../../utilities/wait'

import Alerts, { sendAlert, dismissAllAlerts } from '../../components/Alerts'
import { StatusMessage } from '../../components/UI/Alerts'
import { Button, ButtonLabel } from '../../components/UI/Buttons'
import { UnderlineInput } from '../../components/UI/Inputs'
import { Section, CenteringPane, CenterColumn } from '../../components/UI/Layout'
import { SmallLogo } from '../../components/UI/Logos'

import { Units } from '../../constants/Style'

class LoginScreen extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      isLoggingIn: false,
    }
  }

  onChangeText = key => (value) => {
    this.setState({
      [key]: value,
    })
  }

  onSubmit = async () => {
    dismissAllAlerts()

    const variables = pick(this.state, ['email', 'password'])

    this.setState({ isLoggingIn: true })

    await wait(500)

    this.props
      .mutate({ variables })

      .then(({ data: { login: { me } } }) => {
        currentUserService.set(me)
      })

      .then(() => {
        navigationService.reset('main')
      })

      .catch(async (err) => {
        const error = formatErrors(err)

        sendAlert({ children: error })

        this.setState({
          isLoggingIn: false,
        })
      })
  }

  render() {
    const { isLoggingIn, email } = this.state

    return (
      <CenteringPane>
        {isLoggingIn &&
          <View>
            <SmallLogo alignSelf="center" />
            <StatusMessage>
              Logging in…
            </StatusMessage>
          </View>
        }

        {!isLoggingIn &&
          <View width="100%">
            <Section space={3}>
              <TouchableOpacity onPress={() => navigationService.reset('loggedOut')}>
                <SmallLogo alignSelf="center" />
              </TouchableOpacity>
            </Section>

            <UnderlineInput
              autoCapitalize="none"
              placeholder="Email address"
              keyboardType="email-address"
              onChangeText={this.onChangeText('email')}
              autoCorrect={false}
              autoFocus={!email}
              value={email}
            />

            <UnderlineInput
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={this.onChangeText('password')}
              onSubmitEditing={this.onSubmit}
              autoCorrect={false}
              autoFocus={!!email}
            />

            <Section space={4}>
              <CenterColumn>
                <Button onPress={this.onSubmit}>
                  <ButtonLabel>Log In</ButtonLabel>
                </Button>
              </CenterColumn>
            </Section>
          </View>
        }

        <Alerts style={{ top: Units.statusBarHeight }} />
      </CenteringPane>
    )
  }
}

const login = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      clientMutationId
      me {
        ...Login
      }
    }
  }
  ${LoginFragment}
`

const LoginScreenWithData = graphql(login)(LoginScreen)

export default LoginScreenWithData
