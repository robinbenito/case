/* eslint-disable camelcase */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import { gql, graphql } from 'react-apollo'
import { View } from 'react-native'

import currentUser from '../../utilities/currentUserService'
import formatErrors from '../../utilities/formatErrors'
import navigationService from '../../utilities/navigationService'
import wait from '../../utilities/wait'

import { StatusMessage, ErrorMessage } from '../../components/UI/Alerts'
import { Button, ButtonLabel, SecondaryButton } from '../../components/UI/Buttons'
import { CenteringPane, CenterColumn, Section } from '../../components/UI/Layout'
import { SmallLogo } from '../../components/UI/Logos'
import { UnderlineInput } from '../../components/UI/Inputs'

class SignUpScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // Model
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      password_confirmation: null,
      // UI
      error: null,
      signingUp: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    const variables = pick(this.state, [
      'first_name',
      'last_name',
      'email',
      'password',
      'password_confirmation',
    ])

    this.setState({ signingUp: true })

    this.props
      .mutate({ variables })
      .then(({ data: { registration: { me } } }) => {
        currentUser.set(me)
      })
      .then(() => {
        navigationService.reset('main')
      })
      .catch(async (err) => {
        const error = formatErrors(err)
        this.setState({
          error,
          signingUp: false,
        })

        await wait(5000)

        this.setState({ error: null })
      })
  }

  render() {
    return (
      <CenteringPane>
        {this.state.signingUp &&
          <View>
            <SmallLogo alignSelf="center" />
            <StatusMessage>
              Registering…
            </StatusMessage>
          </View>
        }

        {!this.state.signingUp &&
          <View width="100%">
            <UnderlineInput
              placeholder="First name"
              onChangeText={first_name => this.setState({ first_name })}
              autoFocus
            />

            <UnderlineInput
              placeholder="Last name"
              onChangeText={last_name => this.setState({ last_name })}
            />

            <UnderlineInput
              autoCapitalize="none"
              placeholder="Email address"
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}
              autoCorrect={false}
            />

            <UnderlineInput
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              autoCorrect={false}
            />

            <UnderlineInput
              secureTextEntry
              placeholder="Confirm password"
              autoCapitalize="none"
              onChangeText={password_confirmation => this.setState({ password_confirmation })}
              onSubmitEditing={this.onSubmit}
              autoCorrect={false}
            />

            <ErrorMessage>
              {this.state.error}
            </ErrorMessage>

            <CenterColumn>
              <Button onPress={this.onSubmit}>
                <ButtonLabel>Create account</ButtonLabel>
              </Button>

              <Section space={3} alignSelf="center">
                <SecondaryButton onPress={() => navigationService.reset('loggedOut')}>
                  cancel
                </SecondaryButton>
              </Section>
            </CenterColumn>
          </View>
        }
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
