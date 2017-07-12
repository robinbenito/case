import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
} from 'react-native'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import t from 'tcomb-form-native'
import stylesheet from '../../../styles/form'

t.form.Form.stylesheet = stylesheet
const Form = t.form.Form

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
    alignSelf: 'center',
    fontWeight: '500',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 2,
  },
  button: {
    height: 36,
    width: 300,
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
})

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      user: null,
      error: null,
      value: {
        email: '',
        password: '',
      },
    }

    this.onPress = this.onPress.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(value) {
    this.setState({ value })
  }

  async onPress() {
    const { email, password } = this.state.value
    const options = {
      variables: {
        email,
        password,
      },
    }

    let response

    try {
      response = await this.props.mutate(options)
    } catch (error) {
      return this.setState({
        error: 'Login failed, please try again.',
      })
    }

    try {
      const currentUser = JSON.stringify(response.data.login.me)
      await AsyncStorage.setItem('@arena:CurrentUser', currentUser)
    } catch (error) {
      return this.setState({
        error: 'Error logging in, please try again',
      })
    }
    return this.props.onLogin()
  }

  render() {
    const email = {
      label: 'Email',
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      placeholder: 'Email address',
      returnKeyType: 'next',
      onSubmitEditing: () => {
        this.refs.form.getComponent('password').refs.input.focus()
      },
    }

    const password = {
      ref: 'Password',
      label: 'Password',
      maxLength: 12,
      secureTextEntry: true,
      placeholder: 'Password',
      returnKeyType: 'go',
      onSubmitEditing: this.onPress,
    }

    const loginForm = t.struct({
      email: t.String,
      password: t.String,
    })

    const options = {
      stylesheet,
      fields: {
        email,
        password,
      },
    }

    return (
      <View>
        <Form
          type={loginForm}
          options={options}
          value={this.state.value}
          onChange={this.onChange}
        />
        <Text style={styles.error}>{this.state.error}</Text>
        <TouchableHighlight style={styles.button} onPress={this.onPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
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
