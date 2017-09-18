import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import { pick } from 'lodash'

import formatErrors from '../../utilities/formatErrors'
import navigate from '../../utilities/navigationService'
import CurrentUser from '../../utilities/currentUserService'
import { CenteringPane, CenterColumn } from '../../components/UI/Layout'
import { UnderlineInput } from '../../components/UI/Inputs'
import { Button, ButtonLabel } from '../../components/UI/Buttons'
import ErrorMessage from '../../components/ErrorMessage'

class SignUpScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      password_confirmation: null,
      error: null,
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

    this.props
      .mutate({ variables })
      .then(({ data: { registration: { me } } }) => {
        CurrentUser.set(me)
      })
      .then(() => {
        navigate.reset('main')
      })
      .catch((err) => {
        const error = formatErrors(err)
        this.setState({ error })
      })
  }

  render() {
    return (
      <CenteringPane>
        <UnderlineInput
          placeholder="First name"
          onChangeText={first_name => this.setState({ first_name })}
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
        <ErrorMessage message={this.state.error} />
        <CenterColumn>
          <Button onPress={this.onSubmit}>
            <ButtonLabel>Create account</ButtonLabel>
          </Button>
        </CenterColumn>
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
