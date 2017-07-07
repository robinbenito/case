import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage
} from 'react-native'


import gql from 'graphql-tag'
import { graphql, withApollo } from 'react-apollo'

import t from 'tcomb-form-native'
import stylesheet from '../../../styles/form'
t.form.Form.stylesheet = stylesheet
const Form = t.form.Form

import layout from '../../../constants/Layout'

class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      user: null,
      error: null,
      value: {
        email: "",
        password: "",
      }
    }
  }

  onChange(value) {
    this.setState({ value });
  }

  async onPress(email, password) {
    const options = {
      variables: {
        email: email,
        password: password,
      }
    };

    let response;

    try {
      response = await this.props.mutate(options)
    } catch (error) {
      console.log('error', error)
      return this.setState({
        error: "Login failed, please try again."
      })
    }

    try {
      const currentUser = JSON.stringify(response.data.login.me);
      await AsyncStorage.setItem('@arena:CurrentUser', currentUser);
    } catch (error) {
      return this.setState({
        error: "Error logging in, please try again"
      })
    }
    this.props.onLogin()    
  }

  render() {
    let onButtonPress = this.onPress.bind(
      this,
      this.state.value.email,
      this.state.value.password
    );

    const email = {
      label: "Email",
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      placeholder: "Email address",
      returnKeyType: "next",
      onSubmitEditing: (event) => { 
        this.refs.form.getComponent('password').refs.input.focus(); 
      }
    };

    const password = {
      ref: "Password",
      label: "Password",
      maxLength: 12,
      secureTextEntry: true,
      placeholder: "Password",
      returnKeyType: "go",
      onSubmitEditing: onButtonPress
    };

    const loginForm = t.struct({
      email: t.String,
      password: t.String
    });

    let options = {
      stylesheet: stylesheet,
      fields: {
        email,
        password
      }
    }

    return (
      <View>
        <Form ref='form'
          type={loginForm}
          options={options}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <Text style={styles.error}>{this.state.error}</Text>
        <TouchableHighlight style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
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
`;

export const LoginWithData = graphql(loginMutation)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 40
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
    alignSelf: 'center',
    fontWeight: '500'
  },
  error: {
    color: "red",
    textAlign: "center",
    alignSelf: 'center',
    marginBottom: 2
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
  }
});