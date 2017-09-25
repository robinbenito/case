import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import { gql, graphql } from 'react-apollo'
import { TouchableOpacity, View } from 'react-native'

import currentUser from '../../utilities/currentUserService'
import formatErrors from '../../utilities/formatErrors'
import navigationService from '../../utilities/navigationService'
import wait from '../../utilities/wait'

import { StatusMessage, ErrorMessage } from '../../components/UI/Alerts'
import { Button, ButtonLabel } from '../../components/UI/Buttons'
import { UnderlineInput } from '../../components/UI/Inputs'
import { Section, CenteringPane, CenterColumn } from '../../components/UI/Layout'
import { SmallLogo } from '../../components/UI/Logos'

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
        currentUser.set(me)
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
        {this.state.loggingIn &&
          <View>
            <SmallLogo alignSelf="center" />
            <StatusMessage>
              Logging in…
            </StatusMessage>
          </View>
        }

        {!this.state.loggingIn &&
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
