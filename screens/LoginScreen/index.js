import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { TouchableOpacity, View } from 'react-native'
import { pick } from 'lodash'

import { SmallLogo } from '../../components/UI/Logos'
import { P, CenteringPane, CenterColumn } from '../../components/UI/Layout'
import { StatusMessage, ErrorMessage } from '../../components/UI/Alerts'
import CurrentUser from '../../utilities/currentUserService'
import formatErrors from '../../utilities/formatErrors'
import { UnderlineInput } from '../../components/UI/Inputs'
import { Button, ButtonLabel } from '../../components/UI/Buttons'
import navigationService from '../../utilities/navigationService'
import wait from '../../utilities/wait'


class LoginScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // Model
      email: '',
      password: '',
      // UI
      error: null,
      loggingIn: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit() {
    const variables = pick(this.state, ['email', 'password'])

    this.setState({ loggingIn: true })

    await wait(500)

    this.props
      .mutate({ variables })

      .then(({ data: { login: { me } } }) => {
        CurrentUser.set(me)
      })

      .then(() => {
        navigationService.reset('main')
      })

      .catch(async (err) => {
        const error = formatErrors(err)

        this.setState({
          error,
          loggingIn: false,
        })

        await wait(5000)

        this.setState({ error: null })
      })
  }

  render() {
    return (
      <CenteringPane>
        <P space={3}>
          <TouchableOpacity onPress={() => navigationService.reset('loggedOut')}>
            <SmallLogo />
          </TouchableOpacity>
        </P>

        {this.state.loggingIn &&
          <StatusMessage>
            Logging in…
          </StatusMessage>
        }

        {!this.state.loggingIn &&
          <View width="100%">
            <UnderlineInput
              autoCapitalize="none"
              placeholder="Email address"
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}
              autoCorrect={false}
              autoFocus
            />

            <UnderlineInput
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              onSubmitEditing={this.onSubmit}
              autoCorrect={false}
            />

            <ErrorMessage>
              {this.state.error}
            </ErrorMessage>

            <CenterColumn>
              <Button onPress={this.onSubmit}>
                <ButtonLabel>Log In</ButtonLabel>
              </Button>
            </CenterColumn>
          </View>
        }
      </CenteringPane>
    )
  }
}

LoginScreen.propTypes = {
  mutate: PropTypes.func.isRequired,
}

const login = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
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

const LoginScreenWithData = graphql(login)(LoginScreen)

export default LoginScreenWithData
