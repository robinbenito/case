import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import CurrentUser from '../../../utilities/currentUserService'
import formatErrors from '../../../utilities/formatErrors'
import PillButton from '../../../components/PillButton'
import UnderlineInput from '../../../components/UnderlineInput'
import ErrorMessage from '../../../components/ErrorMessage'

const styles = StyleSheet.create({
  form: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
})

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit() {
    const { email, password } = this.state

    try {
      const res = await this.props.mutate({
        variables: { email, password },
      })

      await CurrentUser.set(res.data.login.me)

      return this.props.onLogin()
    } catch (err) {
      const error = formatErrors(err)
      this.setState({ error })

      // Clear error messages after a moment
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)

      return false
    }
  }

  render() {
    return (
      <View style={styles.form}>
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
          onSubmitEditing={this.onSubmit}
          autoCorrect={false}
        />
        <ErrorMessage message={this.state.error} />
        <PillButton onPress={this.onSubmit}>
          Log In
        </PillButton>
      </View>
    )
  }
}

LoginScreen.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

const loginMutation = gql`
  mutation loginMutation($email: String!, $password: String!) {
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

const LoginWithData = graphql(loginMutation)(LoginScreen)

export default LoginWithData
