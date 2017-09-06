import React from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

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
      loggedIn: false,
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

      const currentUser = JSON.stringify(res.data.login.me)
      await AsyncStorage.setItem('@arena:CurrentUser', currentUser)

      return this.props.onLogin()
    } catch (err) {
      this.setState({
        error: formatErrors(err),
      })

      setTimeout(() => {
        this.setState({ error: null })
      }, 25000)

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
        />
        <UnderlineInput
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={password => this.setState({ password })}
          onSubmitEditing={this.onSubmit}
          secureTextEntry
        />
        <ErrorMessage message={this.state.error} />
        <PillButton onPress={this.onSubmit}>
          Login
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
