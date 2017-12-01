import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { View } from 'react-native'

import currentUser from '../../utilities/currentUserService'
import alertErrors from '../../utilities/alertErrors'
import navigationService from '../../utilities/navigationService'

import Alerts, { dismissAllAlerts } from '../../components/Alerts'
import { StatusMessage } from '../../components/UI/Alerts'
import { Button, ButtonLabel, SecondaryButton } from '../../components/UI/Buttons'
import { CenteringPane, CenterColumn, Spacer } from '../../components/UI/Layout'
import { SmallLogo } from '../../components/UI/Logos'
import { UnderlineInput } from '../../components/UI/Inputs'

import { Units } from '../../constants/Style'

class SignUpScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      isSigningUp: false,
    }
  }

  onChangeText = key => (value) => {
    this.setState({
      [key]: value,
    })
  }

  onSubmit = () => {
    dismissAllAlerts()

    const variables = pick(this.state, [
      'first_name',
      'last_name',
      'email',
      'password',
      'password_confirmation',
    ])

    this.setState({ isSigningUp: true })

    this.props
      .mutate({ variables })

      .then(({ data: { registration: { me } } }) => {
        currentUser.set(me)
      })

      .then(() => {
        navigationService.reset('feed')
      })

      .catch((err) => {
        alertErrors(err)

        this.setState({ isSigningUp: false })
      })
  }

  render() {
    const {
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      isSigningUp,
    } = this.state

    return (
      <CenteringPane>
        {isSigningUp &&
          <View>
            <SmallLogo alignSelf="center" />
            <StatusMessage>
              Registering…
            </StatusMessage>
          </View>
        }

        {!isSigningUp &&
          <View width="100%">
            <UnderlineInput
              value={first_name}
              placeholder="First name"
              onChangeText={this.onChangeText('first_name')}
              autoCorrect={false}
              autoFocus
            />

            <UnderlineInput
              value={last_name}
              placeholder="Last name"
              onChangeText={this.onChangeText('last_name')}
              autoCorrect={false}
            />

            <UnderlineInput
              value={email}
              autoCapitalize="none"
              placeholder="Email address"
              keyboardType="email-address"
              onChangeText={this.onChangeText('email')}
              autoCorrect={false}
            />

            <UnderlineInput
              value={password}
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={this.onChangeText('password')}
              autoCorrect={false}
            />

            <UnderlineInput
              value={password_confirmation}
              secureTextEntry
              placeholder="Confirm password"
              autoCapitalize="none"
              onChangeText={this.onChangeText('password_confirmation')}
              onSubmitEditing={this.onSubmit}
              autoCorrect={false}
            />

            <Spacer space={4} />

            <CenterColumn>
              <Button onPress={this.onSubmit}>
                <ButtonLabel>Create account</ButtonLabel>
              </Button>

              <Spacer space={2} />

              <SecondaryButton
                style={{ alignSelf: 'center' }}
                onPress={() => navigationService.reset('loggedOut')}
              >
                cancel
              </SecondaryButton>
            </CenterColumn>
          </View>
        }

        <Alerts style={{ top: Units.statusBarHeight }} />
      </CenteringPane>
    )
  }
}

SignUpScreen.propTypes = {
  mutate: PropTypes.func.isRequired,
}

const register = gql`
  mutation registrationMutation($first_name: String!, $last_name: String!, $email: String!, $password: String!, $password_confirmation: String!) {
    registration(input: { first_name: $first_name, last_name: $last_name, email: $email, password: $password, password_confirmation: $password_confirmation }) {
      clientMutationId
      me {
        id
        slug
        name
        authentication_token
      }
    }
  }
`

const SignUpScreenWithData = graphql(register)(SignUpScreen)

export default SignUpScreenWithData
